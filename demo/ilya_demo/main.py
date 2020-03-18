"""
Точка входа в программу
- высчитывает выборку по сокращенным предложениям
- токенизирует (еще раз) самостоятельно текст по предложениям
- отображает результат согласно вычисленным данным
"""
from core import (
    create_total_selection,
    impls,
    tokenize_sentences,
    colorize_sentences
)

with open('./fixtures/it.interviews.txt', 'r', encoding='utf-8') as fixture:
    # compute total selection
    text = fixture.read()
    selection = create_total_selection(text, impls)
    text_sentences = tokenize_sentences(text)
    # print results
    colorize_sentences(text_sentences, selection)
    print(selection, len(selection))