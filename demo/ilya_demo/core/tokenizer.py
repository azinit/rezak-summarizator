"""
Токенизатор текста
"""
from typing import List
from itertools import chain
from pytldr.nlp.tokenizer import Tokenizer


def tokenize_sentences(text: str):
    paragraphs = Tokenizer().tokenize_paragraphs(text)
    sentences = _tokenize_sentences(paragraphs)
    filtered_sentences = list(filter(lambda s: s != '', sentences))
    # FIXME: refactor
    return filtered_sentences


def _tokenize_sentences(paragraphs: List[str]) -> List[str]:
    complex_sentences = list(map(_split_paragraph, paragraphs))
    sentences = list(chain(*complex_sentences))
    return sentences


def _split_paragraph(paragraph: str):
    import re
    # print()
    # print(paragraph)
    # print(re.split("[.!?]+", paragraph.strip()[:-1:]))
    # TODO: map: [! ] => [!] for all SPLIT_CHARS
    # FIXME: refactor + modify pattern
    # FIXME: return re.split("[.!?]+", paragraph[:-1:])
    SPLIT_CHARS = ["».", "\".", ".", "!", "?"]
    SEPARATOR = '@@@SEPARATOR@@@'
    paragraph = paragraph.strip()
    for SPLIT_CHAR in SPLIT_CHARS:
        paragraph = paragraph.replace(SPLIT_CHAR + " ", SEPARATOR).replace(SPLIT_CHAR, SEPARATOR)
    return paragraph.split(SEPARATOR)
