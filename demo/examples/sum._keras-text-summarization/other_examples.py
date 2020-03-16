"""
NOTE: Здесь можно описывать и другие аспекты, которые идут параллельно основному использованию.
Если слишком длинно - можно и ссылками на офиц. доку
"""


def example_1():
    from text_summarizer import summarizer
    summarizer.text = example
    summarizer.algo = Summ.TEXT_RANK
    summarizer.percentage = 0.25

if __name__ == "__main__":
    example_1()
