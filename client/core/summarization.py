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


impls = [
    summarize_pytldr_textrank,
    summarize_pytldr_lsa,
    summarize_pytldr_relevance
]
