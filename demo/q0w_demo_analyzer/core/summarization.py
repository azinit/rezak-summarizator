"""
Список реализаций сокращения текста.
Каждая функция позволяет сконфигурировать сокращатели под себя
"""
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

TEXT_SENT_COUNT = 10
RATIO = 0.4
SUMMARY_SENT_COUNT = TEXT_SENT_COUNT * RATIO


# TODO: add impls
def summarize_pytldr_lsa(text: str) -> str:
    from pytldr.summarize.lsa import LsaOzsoy
    return LsaOzsoy().summarize(text, length=5)


def summarize_pytldr_textrank(text: str) -> str:
    from pytldr.summarize.textrank import TextRankSummarizer
    return TextRankSummarizer().summarize(text, length=5)


def summarize_pytldr_relevance(text: str) -> str:
    from pytldr.summarize.relevance import RelevanceSummarizer
    return RelevanceSummarizer().summarize(text, length=5)


def summarize_gensim(text: str) -> str:
    from gensim.summarization.summarizer import summarize
    return summarize(text=text, ratio = RATIO)

def summarize_summa(text: str) -> str:
    from summa.summarizer import summarize
    return summarize(text, RATIO)

def summarize_sumy(text: str) -> str:
    
    from sumy.parsers.html import HtmlParser
    from sumy.parsers.plaintext import PlaintextParser
    from sumy.nlp.tokenizers import Tokenizer
    from sumy.summarizers.lsa import LsaSummarizer as Summarizer
    from sumy.nlp.stemmers import Stemmer
    from sumy.utils import get_stop_words
    from sumy.summarizers.luhn import LuhnSummarizer 
    from sumy.summarizers import luhn
    from sumy.nlp.tokenizers import Tokenizer as sumytoken

    stemmer = Stemmer('english')
    parser = PlaintextParser.from_string((text), sumytoken('english'))
    summarizer_luhn = LuhnSummarizer(stemmer)
    summarizer_luhn.stop_words = get_stop_words('english')
    sum_1 = summarizer_luhn(parser.document, SUMMARY_SENT_COUNT)
    sum_lex= []
    for sent in sum_1:  
        sum_lex.append(str(sent))
    return ' '.join(sum_lex)

def summarize_sumy1(text: str) -> str:
    from sumy.parsers.html import HtmlParser
    from sumy.parsers.plaintext import PlaintextParser
    from sumy.nlp.tokenizers import Tokenizer
    from sumy.summarizers.lsa import LsaSummarizer as Summarizer
    from sumy.nlp.stemmers import Stemmer
    from sumy.utils import get_stop_words
    from sumy.summarizers.luhn import LuhnSummarizer 
    from sumy.summarizers import luhn
    from sumy.nlp.tokenizers import Tokenizer as sumytoken

    stemmer = Stemmer('english')
    #parser = PlaintextParser.from_string((text), sumytoken('english'))
    from sumy.summarizers.lsa import LsaSummarizer as Summarizer
    parser = PlaintextParser.from_file(text, Tokenizer('enlish')) 
 # or
 # parser = PlaintextParser.from_string("Check this out.", Tokenizer(LANGUAGE))
    summarizer = Summarizer(Stemmer('english'))
    summarizer.stop_words = get_stop_words('english')
    summ_1 = summarizer(parser.document, SUMMARY_SENT_COUNT)
    sum_lex= []
    for sent in sum_1:  
        sum_lex.append(str(sent))
    return ' '.join(sum_lex)



impls = [
    summarize_gensim,
    summarize_summa,
    summarize_sumy,
   
]
