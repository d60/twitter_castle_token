import math

import mmh3

from ..utils import n_digit_hex
from .encode import arr_to_2dig_hex_string, encode_field, index_of, time_index_encrypt


def pack_15_16_bits(value1, value2):
    # WK[aV]
    v1_15bits = value1 & 32767
    v2_16bits = value2 & 65535

    if v1_15bits == v2_16bits:
        return n_digit_hex(v1_15bits | 32768, 4)
    else:
        return n_digit_hex(v1_15bits, 4) + n_digit_hex(v2_16bits, 4)


def encode_optional_index(index, input1, input2, time):
    case = 3
    input = input1
    if input1 == -1:
        case = 4
        input = input2
    return encode_field(index, case, input, time)


def bits_to_hex(bits):
    # WK[iE]
    length_prefix = f'{len(bits) & 255:02x}'
    normalized_bits = list(map(bool, bits))

    body_hex = ''
    chunk_size = 24  # JavaScript: t[4] = 24
    for i in range(0, len(normalized_bits), chunk_size):
        chunk = normalized_bits[i : i + chunk_size]

        val = 0
        for bit in chunk:
            val = (val << 1) | bit
        chunk_len = len(chunk)
        if chunk_len == chunk_size:
            num_bytes = 3
        else:
            num_bytes = math.ceil(chunk_len / 8)
        body_hex += n_digit_hex(val, num_bytes*2)
    return length_prefix + body_hex


def index0(platform, time = None):
    # window.navigator.platform
    PLATFORMS = ['MacIntel', 'Win32', 'iPhone', 'Linux armv8l', 'iPad', 'Linux armv81', 'Linux aarch64', 'Linux x86_64', 'Linux armv7l']
    index = index_of(PLATFORMS, platform)
    return encode_optional_index(0, index, platform, time)


def index1(vendor, time = None):
    # window.navigator.vendor
    VENDORS = ['Google Inc.', 'Apple Computer, Inc.']
    index = index_of(VENDORS, vendor)
    return encode_optional_index(1, index, vendor, time)


def index2(language, time = None):
    # window.navigator.language ||
    # window.navigator.userLanguage ||
    # window.navigator.browserLanguage ||
    # window.navigator.systemLanguage
    LANGUAGES = ['US-US', 'ES-ES', 'FR-FR', 'BR-BR', 'GB-GB', 'DE-DE', 'RU-RU', 'us-us', 'gb-gb', 'CN-CN', 'ID-ID', 'US-US', 'IT-IT', 'MX-MX', 'PL-PL']
    index = index_of(LANGUAGES, language)
    return encode_optional_index(2, index, language, time)


def index3(device_memory):
    # window.navigator.deviceMemory
    if device_memory > 25.5:
        device_memory = round(device_memory)
        return encode_field(3, 5, round(device_memory))
    else:
        return encode_field(3, 6, device_memory)


def index4(width, avail_width, height, avail_height):
    # pack_15_16_bits(window.screen.width, window.screen.availWidth) +
    # pack_15_16_bits(window.screen.height, window.screen.availHeight)
    encoded = (pack_15_16_bits(width, avail_width) +
               pack_15_16_bits(height, avail_height))
    return encode_field(4, 7, encoded)


def index5(color_depth = None, pixel_depth = None):
    # window.screen.colorDepth ||
    # window.screen.pixelDepth
    if not (color_depth or pixel_depth):
        raise ValueError('color_depth or pixel_depth is required')
    return encode_field(5, 5, color_depth or pixel_depth)


def index6(hardware_concurrency):
    # window.navigator.hardwareConcurrency
    return encode_field(6, 5, hardware_concurrency)


def index7(device_pixel_ratio):
    # window.devicePixelRatio ||
    # window.screen.systemXDPI / window.screen.logicalXDPI
    if device_pixel_ratio > 25.5:
        device_pixel_ratio = round(device_pixel_ratio)
        return encode_field(7, 5, round(device_pixel_ratio))
    else:
        return encode_field(7, 6, device_pixel_ratio)


def index8(timezone_offset, summertime_offset_diff):
    # v1: (new Date).getTimezoneOffset()
    # v2 = (function () {
    #     var e = [];
    #     return e[1] = new Date,
    #         e[1]['setDate'](1),
    #         e[1]['setMonth'](0),
    #         e[2] = e[1]['getTimezoneOffset'](),
    #         e[1]['setMonth'](6),
    #         e[0] = e[1]['getTimezoneOffset'](),
    #         Math.abs(e[2] - e[0])
    # })()
    # n_dig_hex(v1 // 15, 2) + n_dig_hex(v2 // 15, 2)
    value = (n_digit_hex(timezone_offset // 15, 2) +
             n_digit_hex(summertime_offset_diff // 15, 2))
    return encode_field(8, 7, value)


def index9(mime_types):
    # ['application/pdf', 'text/pdf']
    # Array.from(navigator.mimeTypes, m => m.type).sort().join('')
    s = ''.join(sorted(mime_types))
    mmh3_hashed = mmh3.hash(s)
    value = n_digit_hex(len(mime_types), 2) + n_digit_hex(mmh3_hashed, 8, stop=True)
    return encode_field(9, 7, value)


def index10(plugins):
    # Array.from(navigator.plugins, p =>
    #     p.name + p.description + p.length + p.filename
    # )
    s = ''.join(sorted(plugins))
    mmh3_hashed = mmh3.hash(s)
    value = n_digit_hex(len(plugins), 2) + n_digit_hex(mmh3_hashed, 8, stop=True)
    return encode_field(10, 7, value)


def index11(bits):
    """
    [
        false,
        window.document.documentMode,
        'opr' in window && !!window.opr,
        window.navigator.oscpu,
        window.navigator.webdriver,
        'chrome' in window && !!window.chrome,
        window.navigator.serviceWorker,
        window.navigator.permissions,
        window.navigator.storage,
        window.navigator.bluetooth,
        window.navigator.credentials,
        window.navigator.cookieEnabled
    ].map(e=>Boolean(e))
    """
    hex = bits_to_hex(bits)
    return encode_field(11, 7, hex)


def index12(user_agent, time):
    # window.navigator.userAgent
    xxtea_encrypted = time_index_encrypt(12, user_agent, time)

    def calc_byte_length(n):
        length = 0
        while n != 0:
            n >>= 8
            length += 1
        return length

    byte_length = calc_byte_length(len(xxtea_encrypted))
    hex = n_digit_hex(byte_length, 2) + n_digit_hex(len(xxtea_encrypted), 2) + arr_to_2dig_hex_string(xxtea_encrypted)
    return encode_field(12, 7, hex)


def index13():
    ...