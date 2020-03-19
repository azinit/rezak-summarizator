from summa import summarizer
from typing import List


def summa_summary(text: str, options: dict) -> List[str]:
    return summarizer.summarize(text, ratio=options["ratio"], split=True)
