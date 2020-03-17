from typing import List
from .fonts import red, red2, yellow, green, end

# TODO: add customizing
prior_colors = [red2, red, yellow, green, '']
len_colors = len(prior_colors)


def colorize_sentences(text_sentences: List[str], selection: List[int]):
    max_weight = max(selection)
    for i, sentence in enumerate(text_sentences):
        weight = selection[i]
        print(colorize_sentence(sentence, weight, max_weight))
        # print(f'{i} [{weight}] {priority}{sentence}{fonts.end}')


# FIXME: max_weight
# FIXME: selection [9, 8, ..., 4, 3] => [9, 8, 4, 3] ?
def colorize_sentence(sentence: str, weight: int, max_weight: int):
    # FIXME: optimize
    processed_weight = min((max_weight - weight), len_colors - 1)
    # print(f'{weight} => {processed_weight} // {len_colors}, {max_weight}')
    prior_color = prior_colors[processed_weight]
    return f'{prior_color}{sentence}{end}'
