"""
NOTE: Здесь описываем базовое использование модуля (без прочих настроек)
"""

from gensim.summarization.summarizer import summarize

example = "There are many beautiful lakes and mountains in Scotland and England. The highest point in the Highlands " \
          "is Ben Nevis (1 340 metres). The longest river flows in England, it is the Severn. The main attraction in " \
          "the north of England is the Lake District. Thanks to the warm waters of Gulf Stream the island is very " \
          "green and the British climate is mild. Local summers are rather hot and winters are not cold. As the " \
          "weather is very changeable in Britain, it is the favourite topic for discussion with the British. "

summary = summarize(text=example, ratio=0.4, split=True)

print(summary)
