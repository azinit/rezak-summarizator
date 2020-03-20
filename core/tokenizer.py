""" Токенизатор текста """
from typing import List

PARAGRAPH_SEPARATOR = '\n'


def tokenize_sentences(text: str) -> List[str]:
    """
    Конвертация текста в предложения
    :public
    :remark Делим нестандартно (без промежуточных абзацев),
    т.к. нужно сохранить знаки пунктуации и некоторые специальные выражения
    :see MarkupProtector
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
    :see MarkupProtector
    """

    # FIXME: fixtures: redux-toolkit, covid2019
    # FIXME: invalid paragraphs? (lit-fixture)

    text = text.strip()
    # protect special patterns
    text = MarkupProtector.protect(text)
    # markup logic
    SPLIT_CHARS = [".", "!", "?"]
    for pattern in SPLIT_CHARS:
        # помечаем подходящие случае разделителем абзацев
        text = text \
            .replace(pattern + " ", pattern + PARAGRAPH_SEPARATOR) \
            .replace(pattern + "",  pattern + PARAGRAPH_SEPARATOR)
    # reset special patterns
    text = MarkupProtector.unprotect(text)
    return text


def __tokenize_by_marks(text: str) -> List[str]:
    """
    Разделение текста по отметкам
    :private
    """
    sentences = text.split(PARAGRAPH_SEPARATOR)
    return sentences


# FIXME: Вынести в отдельный файл, когда будут дособраны модуля
class MarkupProtector:
    """
    Служебный класс для "защиты" от разметки особенных выражений в текстах
    :todo ProtectDiary?
    """
    PROTECTED_PATTERNS = {
        '@@PROTECTED__THREE_DOTS@@': "...",
        '@@PROTECTED__THAT_IS@@': "i.e.",
        '@@PROTECTED__ET_CETERA@@': "etc.",
        '@@PROTECTED__EXCLAMATION_BRACKET_ROUND@@': "!)",
        '@@PROTECTED__EXCLAMATION_BRACKET_SQUARE@@': "!]",
        '@@PROTECTED__QUESTION_BRACKET_ROUND@@': "?)",
        '@@PROTECTED__QUESTION_BRACKET_SQUARE@@': "?]",
        '@@PROTECTED__DOT_BRACKET_ROUND@@': ".)",
        '@@PROTECTED__DOT_BRACKET_SQUARE@@': ".]",
        '@@PROTECTED__EXCLAMATION_SPEECH_DOUBLE@@': "!\"",
        '@@PROTECTED__EXCLAMATION_SPEECH_EXTENDED@@': "!»",
        '@@PROTECTED__QUESTION_SPEECH_DOUBLE@@': "?\"",
        '@@PROTECTED__QUESTION_SPEECH_EXTENDED@@': "?»",
        '@@PROTECTED__DOT_SPEECH_DOUBLE@@': ".\"",
        '@@PROTECTED__DOT_SPEECH_EXTENDED@@': ".»",
    }
    PROTECTED_RULES = {
        '@@PROTECTED__DATE@@': {
            'test': r'\d+\.\d+\.\d+'
        },
        '@@PROTECTED__ABBREVIATION@@': {
            'test': r'(([A-Za-z]\.){2,})',
            'get': lambda result: [] if not result else [result[0][0]]
        },
        '@@PROTECTED__FLOAT@@': {
            'test': r'\d+\.\d+'
        },
    }

    PROTECTED_RULE_TMPL = '@@PROTECTED_RULE_CASE__'
    temp = []

    @staticmethod
    def protect(text):
        import re
        cls = MarkupProtector
        # пробегаемся по простым выражениям
        for key, pattern in cls.PROTECTED_PATTERNS.items():
            text = text.replace(pattern, key)
        # пробегаемся по особым правилам
        for key, rule in cls.PROTECTED_RULES.items():
            test, get = rule['test'], rule.get('get', lambda x: x)
            # получаем все результаты по вхождениям и используем кастомный getter, если имеется
            results = get(re.findall(test, text))
            if results:
                # Пробегаемся по результатам, заменяя их в тексте и добавляя в временное хранилище
                for term in results:
                    i = len(cls.temp)
                    cls.temp.append(term)
                    text = text.replace(term, f'{cls.PROTECTED_RULE_TMPL}{i}@@', 1)
        return text

    @staticmethod
    def unprotect(text):
        cls = MarkupProtector
        # пробегаемся по простым выражениям
        for key, pattern in cls.PROTECTED_PATTERNS.items():
            text = text.replace(key, pattern)
        # пробегаемся по особым правилам
        for i, rule_term in enumerate(cls.temp):
            # возвращаем старые текстовые значения из временного хранилища
            text = text.replace(f'{cls.PROTECTED_RULE_TMPL}{i}@@', rule_term)
        return text
