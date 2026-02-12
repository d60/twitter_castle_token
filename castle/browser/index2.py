from .encode import (
    bits_to_hex,
    encode_field,
    encode_optional_index,
    encode_xxtea_frame,
    index_of,
)


def base256_4dig(n):
    MAX = 256**4 - 1
    if n < 0 or n > MAX:
        return [0, 0, 0, 0]
    d1 = (n >> 24) & 0xFF
    d2 = (n >> 16) & 0xFF
    d3 = (n >> 8) & 0xFF
    d4 = n & 0xFF
    return [d4, d3, d2, d1]


def index0(platform, time=None):
    # getHighEntropyValues platform
    PLATFORMS = ['Android', 'iOS', 'macOS', 'Linux', 'Windows', 'Unknown']
    index = index_of(PLATFORMS, platform)
    return encode_optional_index(0, index, platform, time)


def index1(platform_version, time):
    # getHighEntropyValues platformVersion
    return encode_field(1, 4, platform_version, time)


def index2(browser_brand, time=None):
    # js/202.js
    BRANDS = ['Chromium', 'Google Chrome', 'Opera', 'Brave', 'Microsoft Edge']
    index = index_of(BRANDS, browser_brand)
    return encode_optional_index(2, index, browser_brand, time)


def index3(time_diff):
    # js/203.js
    return encode_field(3, 5, time_diff)


def index4(utc_minutes):
    # (new Date(time).getUTCMinutes()
    # time must be time for encoding
    return encode_field(4, 5, utc_minutes)


def index5(hostname, time):
    # window.location.hostname
    return encode_field(5, 4, hostname, time)


def index6(object_json, time):
    # empty object {} now
    hex = encode_xxtea_frame(6, object_json, time)
    return encode_field(6, 7, hex)


def index7(fields):
    # TODO
    # 46 fields
    fields.reverse()
    hex = bits_to_hex(fields)
    return encode_field(7, 7, hex)


def index8(available_linux_font_count):
    # int(0-12)
    # js/208.js
    return encode_field(8, 5, available_linux_font_count)
