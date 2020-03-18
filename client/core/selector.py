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


def create_selection(text: str, summary: str) -> List[int]:
    """
    Просчет единичной выборки
    :remark Проверяем наличие каждого предложения из текста в выдержке
    Ввиду того, что выдержка может быть изменена
    :fixme [...}.]["{...]
    """
    from .tokenizer import tokenize_sentences
    text_sentences = tokenize_sentences(text)
    selection = [0] * len(text_sentences)
    for i, ts in enumerate(text_sentences):
        relevant_sentences = summary.__contains__(ts)
        if relevant_sentences:
            selection[i] += 1
    return selection
