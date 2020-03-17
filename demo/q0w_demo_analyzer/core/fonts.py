TESTPHRASE = 'Lorem ipsum'

# ANSI COLORS
# ====== FAMILY ===== #
end = '\33[0m'
bold = '\33[1m'
italic = '\33[3m'
underline = '\33[4m'
blink = '\33[5m'
blink2 = '\33[6m'
selected = '\33[7m'
# ====== COLOR ====== #
# greyscale
black = '\33[97m'
grey = '\33[90m'
grey2 = '\33[37m'
white = '\33[30m'
# less saturation
red = '\33[91m'
yellow = '\33[33m'
green = '\33[32m'
beige = '\33[36m'
blue = '\33[94m'
violet = '\33[35m'
# more saturation
red2 = '\33[31m'
yellow2 = '\33[93m'
green2 = '\33[92m'
beige2 = '\33[96m'
blue2 = '\33[34m'
violet2 = '\33[95m'
# === BACKGROUND ==== #
# greyscale
blackbg = '\33[107m'
greybg = '\33[100m'
greybg2 = '\33[47m'
whitebg = '\33[40m'
# less saturation
redbg = '\33[101m'
yellowbg = '\33[43m'
greenbg = '\33[42m'
beigebg = '\33[46m'
bluebg = '\33[104m'
violetbg = '\33[45m'
# more saturation
redbg2 = '\33[41m'
yellowbg2 = '\33[103m'
greenbg2 = '\33[102m'
beigebg2 = '\33[106m'
bluebg2 = '\33[44m'
violetbg2 = '\33[105m'

backs = [whitebg, greybg, greybg2, blackbg, redbg, redbg2, yellowbg, yellowbg2, greenbg, greenbg2, beigebg, beigebg2,
         bluebg,
         bluebg2, violetbg, violetbg2]

simples = [white, grey, grey2, black, red, red2, yellow, yellow2, green, green2, beige, beige2, blue,
           blue2, violet, violet2]


# TODO: lists => dict with pairs; bg, sm => invert value (bg <=> sm)


def bg(simple_color):
    return backs[simples.index(simple_color)]


def sm(back_color):
    return simples[backs.index(back_color)]


def enhance(color):
    list_color = simples if color in simples else backs
    if color in list_color:
        ind = list_color.index(color)
        if ind % 2 == 1 and ind > 2:
            return color
        else:
            return list_color[ind + 1]
    else:
        return color


def paint(value, content_color=beige, next_color=end, total=False):
    if total:
        for c in simples + backs + [end]:
            if c != content_color:
                value = str(value).replace(c, '')
    return content_color + str(value) + next_color


def family():
    print('bold:      | %s' % bold + TESTPHRASE + end)
    print('italic:    | %s' % italic + TESTPHRASE + end)
    print('url:       | %s' % underline + TESTPHRASE + end)
    print('blink:     | %s' % blink + TESTPHRASE + end)
    print('blink2:    | %s' % blink2 + TESTPHRASE + end)
    print('selected:  | %s' % selected + TESTPHRASE + end)


def color():
    print('black:     | %s' % black + TESTPHRASE + end)
    print('grey:      | %s' % grey + TESTPHRASE + end)
    print('grey2:     | %s' % grey2 + TESTPHRASE + end)
    print('white:     | %s' % white + TESTPHRASE + end)
    print('red:       | %s' % red + TESTPHRASE + end)
    print('red2:      | %s' % red2 + TESTPHRASE + end)
    print('yellow:    | %s' % yellow + TESTPHRASE + end)
    print('yellow2:   | %s' % yellow2 + TESTPHRASE + end)
    print('green:     | %s' % green + TESTPHRASE + end)
    print('green2:    | %s' % green2 + TESTPHRASE + end)
    print('beige:     | %s' % beige + TESTPHRASE + end)
    print('beige2:    | %s' % beige2 + TESTPHRASE + end)
    print('blue:      | %s' % blue + TESTPHRASE + end)
    print('blue2:     | %s' % blue2 + TESTPHRASE + end)
    print('violet:    | %s' % violet + TESTPHRASE + end)
    print('violet2:   | %s' % violet2 + TESTPHRASE + end)


def background():
    print('blackbg:   | %s' % blackbg + TESTPHRASE + end)
    print('greybg:    | %s' % greybg + TESTPHRASE + end)
    print('greybg2:   | %s' % greybg2 + grey + TESTPHRASE + end)
    print('whitebg:   | %s' % whitebg + black + TESTPHRASE + end)
    print('redbg:     | %s' % redbg + white + TESTPHRASE + end)
    print('redbg2:    | %s' % redbg2 + white + TESTPHRASE + end)
    print('yellowbg:  | %s' % yellowbg + white + TESTPHRASE + end)
    print('yellowbg2: | %s' % yellowbg2 + grey2 + TESTPHRASE + end)
    print('greenbg:   | %s' % greenbg + white + TESTPHRASE + end)
    print('greenbg2:  | %s' % greenbg2 + white + TESTPHRASE + end)
    print('beigebg:   | %s' % beigebg + white + TESTPHRASE + end)
    print('beigebg2:  | %s' % beigebg2 + white + TESTPHRASE + end)
    print('bluebg:    | %s' % bluebg + white + TESTPHRASE + end)
    print('bluebg2:   | %s' % bluebg2 + white + TESTPHRASE + end)
    print('violetbg:  | %s' % violetbg + white + TESTPHRASE + end)
    print('violetbg2: | %s' % violetbg2 + white + TESTPHRASE + end)


if __name__ == "__main__":
    if blackbg in backs:
        print(bg(simple_color=red2) + black + TESTPHRASE + end)
    print(sm(back_color=beigebg) + TESTPHRASE + end)
    print(paint(value=TESTPHRASE, content_color=red2))
    print(enhance(color=violet) + TESTPHRASE + end)
    print(enhance(color=whitebg) + TESTPHRASE + end)
    family()
    color()
    background()
