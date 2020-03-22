TESTPHRASE = 'Lorem ipsum'

import colorsys

# HSV
# saturation in hsv
# с помощью изменения этого параметра мы получаем градацию
# от белого к самому насыщенному цвету выбранного оттенка.
# Потому достаточно найти удобные нам 5-6 значений в промежутке от 0 до 1
se = 0
sd = 0
# s2 = 0.18
s0 = 0.2
s1 = 0.37
s2 = 0.71
s3 = 1
# value in hsv
# выбор чего-то вроде гаммы, чем больше, тем более меняется
# цвет от черного к серому и дальше самому цвету
v = 1
# hue in hsv
# выбор самого оттенка, это может быть любой оттенок
# h =

end = '\x1b[0m'


def rgb2color(r: int, g: int, b: int):
    return f'\x1b[38;2;{r};{g};{b}m'


def hsv2rgb(h, s, v):
    return tuple(round(i * 255) for i in colorsys.hsv_to_rgb(h, s, v))


def hsv2color(h: float, s: float, v: float):
    """ h,s,v  in {0, .., 1} """
    res = hsv2rgb(h, s, v)
    return rgb2color(res[0], res[1], res[2])


def hsv2hex(h: float, s: float, v: float):
    return rgb2hex(*hsv2rgb(h, s, v))


def rgb2hex(r: int, g: int, b: int):
    return '#%02x%02x%02x' % (r, g, b,)


def get_priorities(h):
    """ h in {0,..,1}! """
    excess = rgb2color(117, 117, 117)
    # FIXME: default color (old: dummy = hsv2color(h, sd, v))
    dummy = ''
    pr0 = hsv2color(h, s0, v)
    pr1 = hsv2color(h, s1, v)
    pr2 = hsv2color(h, s2, v)
    pr3 = hsv2color(h, s3, v)

    return [excess, dummy, pr0, pr1, pr2, pr3, pr3, pr3]


def get_priorities_hex(h: float):
    excess = rgb2hex(117, 117, 117)
    pr0 = hsv2hex(h, s0, v)
    pr1 = hsv2hex(h, s1, v)
    pr2 = hsv2hex(h, s2, v)
    pr3 = hsv2hex(h, s3, v)

    return [excess, pr0, pr1, pr2, pr3, pr3, pr3, pr3]
