from text_summarizer import text_summarizer


def textrank_summary(text: str, options: dict) -> str:
    return text_summarizer.summarizer.summarize(text, algo="textrank", percentage=options["ratio"])
