import struct


def xxtea_encrypt(data, key):
    pad_len = (4 - len(data) % 4) % 4
    data_bytes = bytes(data) + b'\x00' * pad_len
    v = list(struct.unpack(f'<{len(data_bytes)//4}I', data_bytes))

    n = len(v) - 1
    if n < 0: return v

    z = v[n]
    sum_val = 0
    DELTA = 0x9E3779B9
    mask = 0xFFFFFFFF

    rounds = 6 + 52 // (n + 1)
    for _ in range(rounds):
        sum_val = (sum_val + DELTA) & mask
        e = (sum_val >> 2) & 3

        for p in range(n + 1):
            y = v[p + 1] if p < n else v[0]

            mx = (((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4)) ^
                  ((sum_val ^ y) + (key[(p & 3) ^ e] ^ z)))

            v[p] = (v[p] + mx) & mask
            z = v[p]

    return v

# data_input = [1, 2, 3, 4, 5, 6, 7]
# key_input = [1164413191, 3891440048, 218959117, 2746598870]

# print(xxtea_encrypt(data_input, key_input))
# [422468372, 946636156]