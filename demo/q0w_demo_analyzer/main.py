"""
Точка входа в программу
- высчитывает выборку по сокращенным предложениям
- токенизирует (еще раз) самостоятельно текст по предложениям
- отображает результат согласно вычисленным данным
"""
from os import listdir
from os.path import isfile, join
from core import (
    create_total_selection,
    fonts,
    impls,
    tokenize_sentences
)

priorities = [
    '',
    fonts.yellow,
    fonts.red,
    fonts.red2
]


onlyfiles = [f for f in listdir('fixtures') if isfile(join('fixtures', f))]
onlyfiles = ['fixtures\\' + f for f in onlyfiles] 

for file in onlyfiles:
    with open(file, 'r', encoding='utf-8') as fixture:
        # compute total selection
        text = fixture.read()
        selection = create_total_selection(text, impls)
        text_sentences = tokenize_sentences(text)
        # print results
        for i, sentence in enumerate(text_sentences):
            weight = selection[i]
            priority = priorities[weight]
            # print(f'{i} [{weight}] {priority}{sentence}{fonts.end}')
            print(f'{priority}{sentence}{fonts.end}')
        print(selection, len(selection))