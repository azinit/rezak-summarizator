from pytldr.summarize.lsa import LsaOzsoy


def summarize(text: str) -> str:
    # TODO: add impls
    return LsaOzsoy().summarize(text, length=5)
