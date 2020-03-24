from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from sumy.summarizers.luhn import LuhnSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from typing import List
from math import ceil


LANGUAGE = "english"
tokenizer = Tokenizer(LANGUAGE)
stemmer = Stemmer(LANGUAGE)
stop_words = get_stop_words(LANGUAGE)
lsaSummarizer = LsaSummarizer(stemmer)
lexSummarizer = LexRankSummarizer(stemmer)
luhnSummarizer = LuhnSummarizer(stemmer)
for s in [lsaSummarizer, lexSummarizer, luhnSummarizer]:
    s.stop_words = stop_words


def _sumy_apply(summarizer, text: str, options: dict) -> List[str]:
    parser = PlaintextParser.from_string(text, tokenizer)
    sentences_count = ceil(len(parser.document.sentences) * options["ratio"])
    summ = summarizer(parser.document, sentences_count)
    return list(map(lambda s: str(s), summ))


def sumy_lsa_summary(text: str, options: dict) -> List[str]:
    return _sumy_apply(lsaSummarizer, text, options)


def sumy_lex_summary(text: str, options: dict) -> List[str]:
    return _sumy_apply(lexSummarizer, text, options)


def sumy_luhn_summary(text: str, options: dict) -> List[str]:
    return _sumy_apply(luhnSummarizer, text, options)
