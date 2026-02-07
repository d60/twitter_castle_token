from ..utils import arr_to_2dig_hex_string, n_digit_hex
from ..xxtea_encrypt import xxtea_encrypt


def to_byte_array_manual(int_array):
    result = []
    for num in int_array:
        num = num & 0xFFFFFFFF
        result.append(num & 255)
        result.append((num >> 8) & 255)
        result.append((num >> 16) & 255)
        result.append((num >> 24) & 255)
    return result


def time_index_encrypt(index, input, time):
    time_unsigned = time & 0xFFFFFFFF
    return to_byte_array_manual(
        xxtea_encrypt(input.encode(), [index, time_unsigned, 2107336303, 2241668600, 1517820919, 2554034554, 1164413191])
    )


def prepare_value(index, case):
    return n_digit_hex((index & 31) << 3 | case & 7, 2)


def encode_field_case3(index, input, _):
    case = 3
    value = prepare_value(index, case)
    return value + n_digit_hex(input, 2)


def encode_field_case4(index, input, time):
    case = 4
    value = prepare_value(index, case)
    arr = time_index_encrypt(index, input, time)
    return value + n_digit_hex(len(arr), 2) + arr_to_2dig_hex_string(arr)


def encode_field_case5(index, input, _):
    case = 5
    value = prepare_value(index, case)

    if (input & 0x7FFF) > 127:
        num = (1 << 15) | (input & 0x7FFF)
        hex = n_digit_hex(num, 4)
    else:
        hex = n_digit_hex(input & 0xFF, 2)

    return value + hex


def encode_field_case6(index, input, _):
    case = 6
    value = prepare_value(index, case)
    return value + n_digit_hex(round(input * 10), 2)


def encode_field_case7(index, input, _):
    case = 7
    value = prepare_value(index, case)
    return value + input


def encode_field_default(index, input, _, case):
    return prepare_value(index, case)


ENCODE_FUNCTIONS = {
    3: encode_field_case3,
    4: encode_field_case4,
    5: encode_field_case5,
    6: encode_field_case6,
    7: encode_field_case7
}


def encode_field(index, case, input, time = None):
    # WK[Cx]
    # arguments = (e, t, r, i)
    if case not in ENCODE_FUNCTIONS:
        return encode_field_default(index, input, time, case)
    encode_function = ENCODE_FUNCTIONS[case]
    return encode_function(index, input, time)


def index_of(arr, value):
    if value in arr:
        return arr.index(value)
    return -1
