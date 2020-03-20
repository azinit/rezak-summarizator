from functools import partial
from enum import Enum
from typing import List
from core.tokenizer import tokenize_sentences
from core.process.gensim_impl import gensim_summary
from core.process.pytldr_impl import (
    pytldr_lsa_zsoy_summary,
    pytldr_relevance_summary,
    pytldr_text_rank_summary
)
from core.process.summa_impl import summa_summary
from core.process.sumy_impl import sumy_summary


class Summarizers(Enum):
    GENSIM = (gensim_summary,)
    PYTLDR_LSA = (pytldr_lsa_zsoy_summary,)
    PYTLDR_RELEVANCE = (pytldr_relevance_summary,)
    PYTLDR_TEXT_RANK = (pytldr_text_rank_summary,)
    SUMMA = (summa_summary,)
    SUMY = (sumy_summary,)

    def __init__(self, func):
        self.func = partial(func)

    def summarize(self, text: str, options: dict) -> List[str]:
        result = self.func(text, options)
        if isinstance(result, str):
            return tokenize_sentences(result)
        else:
            return result

