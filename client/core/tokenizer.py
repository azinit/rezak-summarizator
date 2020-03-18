""" Токенизатор текста """
from typing import List

PARAGRAPH_SEPARATOR = '\n'


def tokenize_sentences(text: str) -> List[str]:
    """
    Конвертация текста в предложения
    :public
    :remark Делим нестандартно (без промежуточных абзацев),
    т.к. нужно сохранить знаки пунктуации
    """
    marked_text = __markup_sentences(text)
    sentences = __tokenize_by_marks(marked_text)
    filtered_sentences = list(filter(lambda s: s != '', sentences))
    return filtered_sentences


def __markup_sentences(text: str) -> str:
    """
    Разметка предложений внутри текста
    :private
    :remark Нужна для сохранения знаков пунктуации
    """

    # FIXME: (again!) and etc...
    # FIXME: ... ago ?».
    # FIXME: (i.e. create a new user), (i.e. edit a post).
    # FIXME: invalid paragraphs? (lit)
    # FIXME: ($272.4 billion)
    # FIXME: The euro dropped nearly a U.S. cent ...
    # FIXME: ... case
    # FIXME: "There is no PLan B."
    # FIXME: "Even though it is not pleasant for any of us, this is about protecting our health."

    SPLIT_CHARS = ["».", "\".", ".", "!", "?"]
    separator = lambda char: char + PARAGRAPH_SEPARATOR
    text = text.strip()
    for SPLIT_CHAR in SPLIT_CHARS:
        text = text \
            .replace(SPLIT_CHAR + " ", separator(SPLIT_CHAR)) \
            .replace(SPLIT_CHAR, separator(SPLIT_CHAR))
    return text


def __tokenize_by_marks(text: str) -> List[str]:
    """
    Разделение текста по отметкам
    :private
    """
    sentences = text.split(PARAGRAPH_SEPARATOR)
    return sentences
