from gensim.summarization.summarizer import summarize
from typing import List


def gensim_summary(text: str, options: dict) -> List[str]:
    return summarize(text, options["ratio"], None, True)
