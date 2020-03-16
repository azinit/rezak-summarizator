"""
NOTE: Здесь описываем базовое использование модуля (без прочих настроек)
"""

from lib import metric

example = """
Lorem ipsum omle roque
Lorem ipsum omle roque
Lorem ipsum omle roque
Requie somebody close KPFU
"""

metric.analyze(example)

"""
{ metric1: 0.5, metric2: 0.8, … }
"""