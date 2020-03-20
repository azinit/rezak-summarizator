""" Модуль для просчета выборки (вектора приориетов) текста """
from typing import List
from .reducers import Summarizers


def create_total_selection(text_sentences: List[str], sum_options: dict) -> List[int]:
    """
    Просчет общей выборки
    :remark Итоговый текст соединяем разделителями параграфными для корректности работы
    :todo: передавать изначальный текст с изначальным разделением по парагрфам?
    (А потом добавить опциональный параметр?)
    """
    from operator import add
    total_selection = [0] * len(text_sentences)
    text = '\n'.join(text_sentences)
    for summarizer in Summarizers:
        summary = summarizer.summarize(text, sum_options)
        selection = create_selection(text_sentences, summary)
        total_selection = map(add, total_selection, selection)
    return list(total_selection)


def create_selection(text_sentences: List[str], summary: str) -> List[int]:
    """
    Просчет единичной выборки
    :remark Проверяем наличие каждого предложения из текста в выдержке
    Ввиду того, что выдержка может быть изменена
    :fixme [...}.]["{...]
    """
    selection = [0] * len(text_sentences)
    for i, ts in enumerate(text_sentences):
        relevant_sentences = summary.__contains__(ts)
        if relevant_sentences:
            selection[i] += 1
    return selection
