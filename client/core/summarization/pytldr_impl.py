from pytldr.summarize.lsa import LsaOzsoy
from pytldr.summarize.textrank import TextRankSummarizer
from pytldr.summarize.relevance import RelevanceSummarizer

lsa_ozsoy = LsaOzsoy()
text_rank_summarizer = TextRankSummarizer()
relevance_summarizer = RelevanceSummarizer()


# todo: fix warning The parameter "topics" must be <= rank(sentence_matrix) - 1 to avoid rank deficiency
def pytldr_lsa_zsoy_summary(text: str, options: dict) -> str:
    return lsa_ozsoy.summarize(text, length=options["ratio"])


def pytldr_text_rank_summary(text: str, options: dict) -> str:
    return text_rank_summarizer.summarize(text, length=options["ratio"])


def pytldr_relevance_summary(text: str, options: dict) -> str:
    return relevance_summarizer.summarize(text, length=options["ratio"])

