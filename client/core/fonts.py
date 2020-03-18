def rgb_to_color(r: int, g: int, b: int):
    return f'\x1b[38;2;{r};{g};{b}m'


# pr0 = rgb_to_color(204, 31, 0)
# pr1 = rgb_to_color(204, 58, 0)
# pr2 = rgb_to_color(204, 75, 0)
# pr3 = rgb_to_color(204, 105, 0)
# pr4 = rgb_to_color(204, 153, 0)
# pr5 = rgb_to_color(204, 187, 0)

pr0 = rgb_to_color(173 - 64, 237, 234)
pr1 = rgb_to_color(149 - 64, 204, 201)
pr2 = rgb_to_color(136 - 64, 186, 183)
pr3 = rgb_to_color(121 - 64, 166, 163)

end = '\x1b[0m'

excess = rgb_to_color(117, 117, 117)
dummy = ''
