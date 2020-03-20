TESTPHRASE = 'Lorem ipsum'

import colorsys

#HSV
#saturation in hsv
# с помощью изменения этого параметра мы получаем градацию
# от белого к самому насыщенному цвету выбранного оттенка.
# Потому достаточно найти удобные нам 5-6 значений в промежутке от 0 до 1
se = 0
sd = 0
#s2 = 0.18
s0 = 0.2
s1 = 0.37
s2 = 0.71
s3 = 1
#value in hsv
# выбор чего-то вроде гаммы, чем больше, тем более меняется
# цвет от черного к серому и дальше самому цвету
v = 1
#hue in hsv
# выбор самого оттенка, это может быть любой оттенок
#h =

end = '\x1b[0m'

def rgb_to_color(r: int, g: int, b: int):
    return f'\x1b[38;2;{r};{g};{b}m'

#Converting hsv to rgb
def hsv2rgb(h,s,v):
    return tuple(round(i * 255) for i in colorsys.hsv_to_rgb(h,s,v))

# Analog of rgb_to_color
# h,s,v  in {0, .., 1}
def hsv_to_color(h: float, s: float, v: float):
    res = hsv2rgb(h,s,v);
    return rgb_to_color(res[0],res[1],res[2])


# h in {0,..,1}!
def get_priorities(h):

    excess = rgb_to_color(117, 117, 117)
    dummy = hsv_to_color(h,sd,v)
    pr0 = hsv_to_color(h,s0,v)
    pr1 = hsv_to_color(h,s1,v)
    pr2 = hsv_to_color(h,s2,v)
    pr3 = hsv_to_color(h,s3,v)

    return [excess,dummy,pr0,pr1,pr2,pr3]
