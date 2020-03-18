""" Модуль для просчета выборки (вектора приориетов) текста """
from typing import List


def create_total_selection(text: str, impls) -> List[int]:
    """ Просчет общей выборки """
    from operator import add
    total_selection = []
    for impl in impls:
        summary = impl(text)
        # compute selection
        selection = create_selection(text, ''.join(summary))
        total_selection = map(add, total_selection, selection) if total_selection else selection
    return list(total_selection)


# FIXME: selector & tokenizer on news.covid19
def create_selection(text: str, summary: str) -> List[int]:
    """ Просчет единичной выборки """
    # FIXME: aka merge sort? (iter by text_sentences)
    from .tokenizer import tokenize_sentences
    # токенизируем текст и выдержку
    text_sentences = tokenize_sentences(text)
    sum_sentences = tokenize_sentences(summary)
    # пробегаемся по тексту, а не по выдержке,
    # т.к. в выдержке предложения потенциально могут быть изменены
    selection = [0] * len(text_sentences)
    for i, ts in enumerate(text_sentences):
        relevant_sentences = [ss for ss in sum_sentences if ts.__contains__(ss) or ss.__contains__(ts)]
        if relevant_sentences:
            selection[i] += 1
    return selection
