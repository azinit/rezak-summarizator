"""
Модуль для просчета вектора предложения
"""

from typing import List
from operator import add
from ._tokenizer import tokenize_sentences


# FIXME: get_sentence_vector from pytldr.vector?
# FIXME: modify
def create_total_selection(text: str, impls) -> List[int]:
    total_selection = []
    for impl in impls:
        summary = impl(text)
        # FIXME: summary as str for uniform tokenizing. Modify?
        # compute selection
        selection = create_selection(text, ''.join(summary))
        total_selection = map(add, total_selection, selection) if total_selection else selection
    return list(total_selection)


# FIXME: consider a order
def create_selection(text: str, summary: str) -> List[int]:
    # tokenize
    text_sentences = tokenize_sentences(text)
    sum_sentences = tokenize_sentences(summary)
    # compute
    selection = [0] * len(text_sentences)
    # TODO: refactor? (find (text_sentence => text_sentence.__contains__(sentence)
    for sum_sentence in sum_sentences:
        for i, txt_sentence in enumerate(text_sentences):
            if txt_sentence.__contains__(sum_sentence):
                selection[i] += 1

    # TODO: return and destructure as obj?
    return selection
