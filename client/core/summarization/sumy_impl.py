from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from typing import List
from math import ceil


LANGUAGE = "english"
tokenizer = Tokenizer(LANGUAGE)
stemmer = Stemmer(LANGUAGE)
summarizer = Summarizer(stemmer)
summarizer.stop_words = get_stop_words(LANGUAGE)


def sumy_summary(text: str, options: dict) -> List[str]:
    parser = PlaintextParser.from_string(text, tokenizer)
    sentences_count = ceil(len(parser.document.sentences) * options["ratio"])
    summ = summarizer(parser.document, sentences_count)
    return list(map(lambda s: str(s), summ))
