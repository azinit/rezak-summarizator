# Sumy

## Установка
```
pip install git+git://github.com/miso-belica/sumy.git
```
## Использвание
```
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
parser = PlaintextParser.from_file("document.txt", Tokenizer(LANGUAGE)) 
 # or
 # parser = PlaintextParser.from_string("Check this out.", Tokenizer(LANGUAGE))
summarizer = Summarizer(Stemmer(LANGUAGE))
summarizer.stop_words = get_stop_words(LANGUAGE)
summary = summarizer(parser.document, SENTENCES_COUNT)
```
В общем аналогично для каждого метода, но для метода Edmundson также необходимо ввести bonus_words, stigma_word и null_words
## Другие методы
```
from sumy.summarizers.luhn import LuhnSummarizer
from sumy.summarizers.text_rank import TextRankSummarizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from sumy.summarizers.kl import KLSummarizer
from sumy.summarizers.edmundson import EdmundsonSummarizer
  summarizer.null_words = get_stop_words(LANGUAGE)
  summarizer.bonus_words = parser.significant_words
  summarizer.stigma_words = parser.stigma_words
