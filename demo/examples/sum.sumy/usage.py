"""
Пример из гита, используется метод LSA: 
"""
from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words


LANGUAGE = "english"
SENTENCES_COUNT = 10

example = """
Kazan is the capital and largest city of the Republic of Tatarstan, Russia. With a population of 1,243,500, it is the sixth most
populous city in Russia.

Kazan lies at the confluence of the Volga and Kazanka Rivers in European Russia, about 715 kilometres (444 mi) east from Moscow.
In the Late Middle Ages, Kazan was an important trade and political center within the Golden Horde. In 1438, the city became the
capital of the Khanate of Kazan. In 1552, Kazan was captured by Ivan the Terrible and became part of Russia. The city was largely
destroyed during Pugachev's Rebellion, but was later rebuilt during the reign of Catherine the Great. In the following centuries,
Kazan grew to become a major industrial, cultural and religious center in Russia.

Kazan is renowned for its vibrant mix of Oriental and Russian cultures. In 2015, 2.1 million tourists visited Kazan, and 1.5 million
tourists visited the Kazan Kremlin, a World Heritage Site. In April 2009, the Russian Patent Office granted Kazan the right to
brand itself as the "Third Capital" of Russia. In 2009 it was chosen as the "sports capital of Russia" and it still is referred to
as such.
"""

if __name__ == "__main__":
    # choosing between url, file and string text
    # url = "https://en.wikipedia.org/wiki/Automatic_summarization"
    # parser = HtmlParser.from_url(url, Tokenizer(LANGUAGE))
    # parser = PlaintextParser.from_file("document.txt", Tokenizer(LANGUAGE))
    parser = PlaintextParser.from_string(example, Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)

    summarizer = Summarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in summarizer(parser.document, SENTENCES_COUNT):
        print(sentence)

"""
>> Kazan is the capital and largest city of the Republic of Tatarstan, Russia.
Kazan lies at the confluence of the Volga and Kazanka Rivers in European Russia, about 715 kilometres (444 mi) east from Moscow.
In the Late Middle Ages, Kazan was an important trade and political center within the Golden Horde.
In 1552, Kazan was captured by Ivan the Terrible and became part of Russia.
The city was largely destroyed during Pugachev's Rebellion, but was later rebuilt during the reign of Catherine the Great.
In the following centuries, Kazan grew to become a major industrial, cultural and religious center in Russia.
Kazan is renowned for its vibrant mix of Oriental and Russian cultures.
In 2015, 2.1 million tourists visited Kazan, and 1.5 million tourists visited the Kazan Kremlin, a World Heritage Site.
In April 2009, the Russian Patent Office granted Kazan the right to brand itself as the "Third Capital" of Russia.
In 2009 it was chosen as the "sports capital of Russia" and it still is referred to as such.
"""
