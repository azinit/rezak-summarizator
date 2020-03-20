"""
Точка входа в программу
:remark Предполагаемая логика работы: (консольная версия)
- core/ модули не знают друг о друге, main.py - связывает их все вместе
- на вход main.py поступает текст
- `tokenizer` разбивает исходный текст на предложения
- `selector` использует эти предложения и реализации из `summarization`, которые также задаются из точки входа
- По итоговой выборке `higlighter` окрашивает предложения
"""
from core import (
    create_total_selection,
    fonts,
    tokenize_sentences
)

from random import random

#We can use random!
priorities = fonts.get_priorities(random())

with open('./fixtures/it.web.rest-api.txt', 'r', encoding='utf-8') as fixture:
    # compute total selection
    text = fixture.read()
    text_sentences = tokenize_sentences(text)
    selection = create_total_selection(text_sentences, {"ratio": 0.6})
    # print results
    for i, sentence in enumerate(text_sentences):
        weight = selection[i]
        priority = priorities[weight]
        print(f'{i} [{weight}] {priority}{sentence}{fonts.end}')
        # print(f'{priority}{sentence}{fonts.end}')
    print(selection, len(selection), sum(selection))
