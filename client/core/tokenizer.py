""" Токенизатор текста """
from typing import List


def tokenize_sentences(text: str) -> List[str]:
    """
    Конвертация текста в предложения
    :public
    """
    paragraphs = __tokenize_to_paragraphs(text)
    sentences = __tokenize_to_sentences(paragraphs)
    filtered_sentences = list(filter(lambda s: s != '', sentences))
    return filtered_sentences


def __tokenize_to_paragraphs(text: str) -> List[str]:
    """ 
    Конвертация текста в абзацы
    :private
    """
    return text.split('\n')


def __tokenize_to_sentences(paragraphs: List[str]) -> List[str]:
    """
    Конвертация абзацвев в предложения
    :private
    """
    from itertools import chain
    complex_sentences = list(map(__tokenize_paragraph, paragraphs))
    # convert to flat list
    sentences = list(chain(*complex_sentences))
    return sentences


def __tokenize_paragraph(paragraph: str) -> List[str]:
    """
    Конвертация абзаца в предложения
    :private
    """
    SPLIT_CHARS = ["».", "\".", ".", "!", "?"]
    SEPARATOR = '@@@SEPARATOR@@@'
    paragraph = paragraph.strip()
    for SPLIT_CHAR in SPLIT_CHARS:
        paragraph = paragraph\
            .replace(SPLIT_CHAR + " ", SEPARATOR)\
            .replace(SPLIT_CHAR, SEPARATOR)
    return paragraph.split(SEPARATOR)
