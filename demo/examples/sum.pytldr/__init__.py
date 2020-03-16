""" docstrings """

"""
Метод для сокращения текста (RelevanceSummarizer)
:name pytldr/summarize/lsa/RelevanceSummarizer/summarize
:param text*: {str} Входной текст
:param length: {int = 5 | float} Требуемый объем сокращенного текста: 
- кол-во предложений (5)
- доля от общего текста (0.5)
:param binary_matrix: { bool = true} логическое значение, указывающее, должна ли матрица счетчиков слов быть двоичной
:return: {str} возвращает сокращенный текст в виде массива предложений
"""

"""
Метод для сокращения текста (TextRankSummarizer)
:name pytldr/summarize/relevance/TextRankSummarizer/summarize
:param text*: {str} Входной текст
:param length: {int = 5 | float} Требуемый объем сокращенного текста: 
- кол-во предложений (5)
- доля от общего текста (0.5)
:param weighting: {str = frequency} 'frequency', 'binary' or 'tfidf' взвешивание членов предложения
:param norm: (не разбирался)
:return: {str} возвращает сокращенный текст в виде массива предложений
"""

"""
Метод для сокращения текста (LsaSteinberger)
:name pytldr/summarize/relevance/LsaSteinberger/summarize
:param text*: {str} Входной текст
:param topics: количество тем / концепций, охватываемых во входном тексте 
(определяет степень уменьшения размерности на этапе SVD)
:param length: {int = 5 | float} Требуемый объем сокращенного текста: 
- кол-во предложений (5)
- доля от общего текста (0.5)
:param binary_matrix: { bool = true} логическое значение, указывающее, должна ли матрица счетчиков слов быть двоичной
:param topic_sigma_threshold: {float in [0..1], default = 0.5 } фильтрует темы/концепции с этим пороговым значением
:return: {str} возвращает сокращенный текст в виде массива предложений
"""