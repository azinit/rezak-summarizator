# Подробнее: https://pypi.org/project/PyTLDR/
def example_1():
    """
    1. Модуль содержит несколько реализаций
    Все экстрактивные:
    - the TextRank algorithm (based on PageRank)
    - Latent Semantic Analysis
    - a sentence relevance score
    """
    from pytldr.summarize.lsa import LsaOzsoy, LsaSteinberger
    from pytldr.summarize.relevance import RelevanceSummarizer
    from pytldr.summarize.textrank import TextRankSummarizer

    txt = """
    Hello! I just finished interviewing with Google and wanted to quickly catch you up on some interesting and frustrating steps of the process so that you can understand what to expect from Google interviews and the steps involved. I will also share some tips on how to prepare for the interview and mistakes to avoid. If you’re looking for a success story, this is the wrong post for you. I actually failed the interviewing process, but the whole experience was pretty interesting for me and leads me on to another stage of my career. I will share more details on this at the end of the post. All names and identifying details have been changed to protect the privacy of Google employees. Initial screening interview. My story starts on a rainy October morning. I received a message from Olivia, a Google recruiter, with the subject «Interested in solving high-impact engineering problems at Google?». At that moment in time I had recently finished several projects and was looking for new challenges. Working at Google seemed like a good opportunity that I didn’t want to miss, so I quickly responded, «Yes, definitely» and booked an appointment via Google Hangouts. Our chat took place two days later via Hangouts. Olivia told me how exciting it is to work at Google, and what the hiring process looks like. When I asked about the details of the position, she told me that they were looking for someone for their new office in Warsaw, Poland, to support and develop Google Cloud functions for enterprise customers. I asked about the exact responsibilities that would come under my remit, and the team I would be part of, but she said it didn’t matter at that stage – I could select the desired team and position later on when all steps of the interview process were completed. That was frustrating moment #1 for me, but I decided that it was worth persevering. Frustrating moment #1. What if there was no team at Google that I would like to join? From what Olivia told me, the interviewing process at Google comprises three stages: first of all, there are two remote coding interviews on algo and data structures. If you’re extraordinary, you might just have one interview, but for an average software engineer it will be two. The next stage is an on-site interview in one of the Google offices, which includes several coding interviews (again!), a system design interview, and last but not least, ‘Googleyness and Leadership’. The last one detects how well you’ll fit into the company. Tip #1. The Google interviewing process is difficult and will take up several weeks of your life. You need to go all-in to prepare for it.
    """

    GREEN = '\033[100m'
    END = '\033[0m'

    impls = {
        'LSA Ozsoy': LsaOzsoy(),
        'LSA Steinberger': LsaSteinberger(),
        'Relevance': RelevanceSummarizer(),
        'TextRank': TextRankSummarizer()
    }

    for label, impl in impls.items():
        print(f'\n\n{GREEN}{label}:{" " * 128}{END}\n')
        summary = impl.summarize(txt, length=5)
        for sentence in summary:
            print(sentence)


def example_2():
    """
    В модуль встроен свой sentence-tokenizer
    Tokenizer выполняет stemming в нескольких языках также хорошо, как удаление стоп-слов
    Можно указать свой собственный лист стоп-слов
    При этом, токенайзер указывается один раз, при создании сокращателя
    >> LsaSummarizer(tokenizer) и аналогично

    Примечание: поскольку алгоритмы экстрактивные, токенайзер не удаляет сам слова (как потестил)
    Но определенно, количество стоп слов влияют на ранжирование важности предложений
    """
    from pytldr.nlp.tokenizer import Tokenizer
    from pytldr.summarize.lsa import LsaSummarizer
    stopwords = ["the", "a", "but", " she", "said"]
    tokenizer = Tokenizer(language='english', stopwords=stopwords, stemming=True)
    # Note that if stopwords=None then the tokenizer loads stopwords from a bundled data-set
    # You can alternatively specify a text file or provide a list of words

    txt = """
    Hello! I just finished interviewing with Google and wanted to quickly catch you up on some interesting and frustrating steps of the process so that you can understand what to expect from Google interviews and the steps involved. I will also share some tips on how to prepare for the interview and mistakes to avoid. If you’re looking for a success story, this is the wrong post for you. I actually failed the interviewing process, but the whole experience was pretty interesting for me and leads me on to another stage of my career. I will share more details on this at the end of the post. All names and identifying details have been changed to protect the privacy of Google employees. Initial screening interview. My story starts on a rainy October morning. I received a message from Olivia, a Google recruiter, with the subject «Interested in solving high-impact engineering problems at Google?». At that moment in time I had recently finished several projects and was looking for new challenges. Working at Google seemed like a good opportunity that I didn’t want to miss, so I quickly responded, «Yes, definitely» and booked an appointment via Google Hangouts. Our chat took place two days later via Hangouts. Olivia told me how exciting it is to work at Google, and what the hiring process looks like. When I asked about the details of the position, she told me that they were looking for someone for their new office in Warsaw, Poland, to support and develop Google Cloud functions for enterprise customers. I asked about the exact responsibilities that would come under my remit, and the team I would be part of, but she said it didn’t matter at that stage – I could select the desired team and position later on when all steps of the interview process were completed. That was frustrating moment #1 for me, but I decided that it was worth persevering. Frustrating moment #1. What if there was no team at Google that I would like to join? From what Olivia told me, the interviewing process at Google comprises three stages: first of all, there are two remote coding interviews on algo and data structures. If you’re extraordinary, you might just have one interview, but for an average software engineer it will be two. The next stage is an on-site interview in one of the Google offices, which includes several coding interviews (again!), a system design interview, and last but not least, ‘Googleyness and Leadership’. The last one detects how well you’ll fit into the company. Tip #1. The Google interviewing process is difficult and will take up several weeks of your life. You need to go all-in to prepare for it.
    """

    [print(s) for s in LsaSummarizer(tokenizer).summarize(txt)]


def example_3():
    """
    TextRank Summarization
    `Ranks sentences` используют PageRank алгоритм,
    где `votes` или `in-links` представлены словами, распределенными между предложениями
    """
    from pytldr.summarize.textrank import TextRankSummarizer
    from pytldr.nlp.tokenizer import Tokenizer

    tokenizer = Tokenizer('english')
    summarizer = TextRankSummarizer(tokenizer)

    # If you don't specify a tokenizer when intiializing a summarizer then the
    # English tokenizer will be used by default
    summarizer = TextRankSummarizer()  # English tokenizer used

    # This object creates a summary using the summarize method:
    # e.g. summarizer.summarize(text, length=5, weighting='frequency', norm=None)

    # The length parameter specifies the length of the summary, either as a
    # number of sentences, or a percentage of the original text
    summary = summarizer.summarize("Some long article ...", length=4)
    print(summary)


def example_4():
    """
    Latent Semantic Analysis (LSA) Summarization
    Уменьшает размерность статьи используя несколько "тематических" кластеров, используя разлоение по сингулярным значениям
    и выбирает предложения, наиболее соответствующие этим темам
    Этот модуль поставляется с двумя различными реализациями, соответственно, двум научным статьям:
        J. Steinberger and K. Jezek (2004). Using latent semantic analysis in text summarization and summary evaluation.
        Ozsoy, M., Alpaslan, F., and Cicekli, I. (2011). Text summarization using latent semantic analysis.
    По умолчанию вызывается наиболее поздний (Ozsoy), но у них одинаковые интерфейсы
    """
    from pytldr.summarize.lsa import LsaSummarizer, LsaOzsoy, LsaSteinberger

    text = """
    Hello! I just finished interviewing with Google and wanted to quickly catch you up on some interesting and frustrating steps of the process so that you can understand what to expect from Google interviews and the steps involved. I will also share some tips on how to prepare for the interview and mistakes to avoid. If you’re looking for a success story, this is the wrong post for you. I actually failed the interviewing process, but the whole experience was pretty interesting for me and leads me on to another stage of my career. I will share more details on this at the end of the post. All names and identifying details have been changed to protect the privacy of Google employees. Initial screening interview. My story starts on a rainy October morning. I received a message from Olivia, a Google recruiter, with the subject «Interested in solving high-impact engineering problems at Google?». At that moment in time I had recently finished several projects and was looking for new challenges. Working at Google seemed like a good opportunity that I didn’t want to miss, so I quickly responded, «Yes, definitely» and booked an appointment via Google Hangouts. Our chat took place two days later via Hangouts. Olivia told me how exciting it is to work at Google, and what the hiring process looks like. When I asked about the details of the position, she told me that they were looking for someone for their new office in Warsaw, Poland, to support and develop Google Cloud functions for enterprise customers. I asked about the exact responsibilities that would come under my remit, and the team I would be part of, but she said it didn’t matter at that stage – I could select the desired team and position later on when all steps of the interview process were completed. That was frustrating moment #1 for me, but I decided that it was worth persevering. Frustrating moment #1. What if there was no team at Google that I would like to join? From what Olivia told me, the interviewing process at Google comprises three stages: first of all, there are two remote coding interviews on algo and data structures. If you’re extraordinary, you might just have one interview, but for an average software engineer it will be two. The next stage is an on-site interview in one of the Google offices, which includes several coding interviews (again!), a system design interview, and last but not least, ‘Googleyness and Leadership’. The last one detects how well you’ll fit into the company. Tip #1. The Google interviewing process is difficult and will take up several weeks of your life. You need to go all-in to prepare for it.
    """

    summarizer = LsaOzsoy()
    summarizer = LsaSteinberger()
    summarizer = LsaSummarizer()  # This is identical to the LsaOzsoy object

    summary = summarizer.summarize(
        text, topics=4, length=5, binary_matrix=True, topic_sigma_threshold=0.5
    )
    print(summary)
    # topics specifies the number of topics to cluster the article into.
    # topic_sigma_threshold removes all topics with a singular value less than a given
    # percentage of the largest singular value.


def example_5():
    """
    Relevance Score Summarization
    Этот метод вычисляет и ранжирует предложения по `cosine similarity` через вектор предложения и весь документ,
    удаляя наиболее релевантное предложение на каждой итерации.
    Этот подход близко описан в работе:
        Y. Gong and X. Liu (2001). Generic text summarization using relevance measure and latent semantic analysis.
    """
    from pytldr.summarize.relevance import RelevanceSummarizer

    text = """
    Hello! I just finished interviewing with Google and wanted to quickly catch you up on some interesting and frustrating steps of the process so that you can understand what to expect from Google interviews and the steps involved. I will also share some tips on how to prepare for the interview and mistakes to avoid. If you’re looking for a success story, this is the wrong post for you. I actually failed the interviewing process, but the whole experience was pretty interesting for me and leads me on to another stage of my career. I will share more details on this at the end of the post. All names and identifying details have been changed to protect the privacy of Google employees. Initial screening interview. My story starts on a rainy October morning. I received a message from Olivia, a Google recruiter, with the subject «Interested in solving high-impact engineering problems at Google?». At that moment in time I had recently finished several projects and was looking for new challenges. Working at Google seemed like a good opportunity that I didn’t want to miss, so I quickly responded, «Yes, definitely» and booked an appointment via Google Hangouts. Our chat took place two days later via Hangouts. Olivia told me how exciting it is to work at Google, and what the hiring process looks like. When I asked about the details of the position, she told me that they were looking for someone for their new office in Warsaw, Poland, to support and develop Google Cloud functions for enterprise customers. I asked about the exact responsibilities that would come under my remit, and the team I would be part of, but she said it didn’t matter at that stage – I could select the desired team and position later on when all steps of the interview process were completed. That was frustrating moment #1 for me, but I decided that it was worth persevering. Frustrating moment #1. What if there was no team at Google that I would like to join? From what Olivia told me, the interviewing process at Google comprises three stages: first of all, there are two remote coding interviews on algo and data structures. If you’re extraordinary, you might just have one interview, but for an average software engineer it will be two. The next stage is an on-site interview in one of the Google offices, which includes several coding interviews (again!), a system design interview, and last but not least, ‘Googleyness and Leadership’. The last one detects how well you’ll fit into the company. Tip #1. The Google interviewing process is difficult and will take up several weeks of your life. You need to go all-in to prepare for it.
    """

    summarizer = RelevanceSummarizer()
    summary = summarizer.summarize(text, length=5, binary_matrix=True)
    print(summary)


if __name__ == '__main__':
    """
    Не забываем о:
        help(TextRankSummarizer)
        help(LsaSummarizer)
        help(RelevanceSummarizer)
    """
    # example_1()
    # example_2()
    # example_3()
    # example_4()
    example_5()
