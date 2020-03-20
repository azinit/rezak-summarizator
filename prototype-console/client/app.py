from random import random
from server import (
    create_total_selection,
    colors,
    tokenize_sentences
)


class App:
    @staticmethod
    def run(**options):
        # We can use random!
        priorities = colors.get_priorities(random())

        with open('client/fixtures/it.web.rest-api.txt', 'r', encoding='utf-8') as fixture:
            # compute total selection
            text = fixture.read()
            text_sentences = tokenize_sentences(text)
            selection = create_total_selection(text_sentences, {"ratio": 0.6})
            # print results
            for i, sentence in enumerate(text_sentences):
                weight = selection[i]
                priority = priorities[weight]
                print(f'{i} [{weight}] {priority}{sentence}{colors.end}')
                # print(f'{priority}{sentence}{fonts.end}')
            print(selection, len(selection), sum(selection))
