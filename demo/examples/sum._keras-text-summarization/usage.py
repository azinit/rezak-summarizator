"""
NOTE: Здесь описываем базовое использование модуля (без прочих настроек)
"""

from text_summarizer import summarizer

example = """
Lorem ipsum omle roque
Lorem ipsum omle roque
Lorem ipsum omle roque
Require somebody close KPFU
"""
summarizer.summarize(example)
summarizer.summarize(example, "textrank", 0.5)
summ.summarise(example)



