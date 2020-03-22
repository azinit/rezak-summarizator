from random import random
from core import (
    create_total_selection,
    colors,
    tokenize_sentences,
    select
)


class App:
    text = ''
    selection = []
    sentences = []
    priorities = []

    @staticmethod
    def set_text(text: str):
        App.text = text

    @staticmethod
    def reduce():
        App.sentences = tokenize_sentences(App.text)
        App.selection = create_total_selection(App.sentences, {"ratio": 0.6})

    @staticmethod
    def get_colors():
        # We can use random!
        App.priorities = colors.get_priorities(random())

    @staticmethod
    def colorize():
        for i, sentence in enumerate(App.sentences):
            weight = App.selection[i]
            priority = App.priorities[weight]
            print(f'{i} [{weight}] {priority}{sentence}{colors.end}')
        print(App.selection, len(App.selection), sum(App.selection))

    @staticmethod
    def summarize(threshold: int):
        summarized_sentences = select(App.sentences, App.selection, threshold)
        for i, (sentence, weight) in enumerate(summarized_sentences):
            priority = App.priorities[weight]
            print(f'{i} [{weight}] {priority}{sentence}{colors.end}')
        print(App.selection, len(App.selection), sum(App.selection))

