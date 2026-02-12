from .encode import encode_field, encode_optional_index, index_of, bits_to_hex


def index0():
    # WK[tw]
    return encode_field(0, 3, 0)


def index1(time_zone, time=None):
    # window.Intl.DateTimeFormat().resolvedOptions().timeZone
    TIME_ZONES = [
        "America/New_York",
        "America/Sao_Paulo",
        "America/Chicago",
        "America/Los_Angeles",
        "America/Mexico_City",
        "Asia/Shanghai",
    ]
    index = index_of(TIME_ZONES, time_zone)
    return encode_optional_index(1, index, time_zone, time)


def index2(languages, time=None):
    # window.navigator.languages
    LANGUAGES = ["US-US,US", "US-US", "BR-BR,BR,US-US,US", "ES-ES,ES", "CN-CN,CN"]
    languages_str = ",".join(languages)
    print(languages_str)
    index = index_of(LANGUAGES, languages_str)
    return encode_optional_index(2, index, languages_str, time)


# TODO
def index6(number):
    # WK[NA]() vendor.dd6f616a.js
    return encode_field(6, 5, number)


def index10(castle_runtime_flags):
    """
    Object.values(WK[BO]())
    castle = WK[ww]() = {
        "ht": false,
        "gt": true,
        "yt": "https://m.castle.io/v1/monitor",
        "bt": 1000,
        "wt": {"Nt": "__cuid", "Ht": 34560000},
        "Mt": true,
        "xt": "pk_AvRa79bHyJSYSQHnRpcVtzyxetSvFerx",
    } WK[ww]()
    index0 -> castle['Mt']
    index1 -> castle['ht']
    index2 -> Boolean(window.localStorage)
    index3 -> !(localStoage is empty + localStorage 1023-char write failed) * localStorage Exists
    """
    hex = bits_to_hex(castle_runtime_flags)
    return encode_field(10, 7, hex)


def index12(to_fixed_error_message_length):
    # `toFixed` error message length fingerprint js/112.js
    return encode_field(12, 5, to_fixed_error_message_length)


def index13(bot_detection_flags):
    """
    [
        sentryOrCoreJsEnabled,
        sentryReplayEnabled,
        canvasTampered,
        screenTampered,
        dprMediaQueryMismatch,
        deviceDimensionMismatch,
        pluginMimeTypeInconsistent,
        iframeTampered,
        bgColorCheckFailed,
        webdriverDetected,
        FunctiontoStringFound
    ]
    """
    hex = bits_to_hex(bot_detection_flags)
    return encode_field(13, 7, hex)


def index14(ua_platform_missing):
    # (await navigator.userAgentData.getHighEntropyValues([])).platform
    case = 2 if ua_platform_missing else 1
    return encode_field(14, case, '')


def index16(worker_integrity_flags):
    """
    worker_integrity_flags = [
        webglMismatch,
        languagesMismatch,
        languageMismatch,
        deviceMemoryMismatch,
        hardwareConcurrencyMismatch,
        platformMismatch,
        UAMismatch
        headlessInWorkerUA,
        swiftshaderDetectedInWorker
    ]
    """
    hex = bits_to_hex(worker_integrity_flags)
    return encode_field(16, 7, hex)
