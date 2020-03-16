"""
NOTE: Здесь описываем базовое использование модуля (без прочих настроек)
"""

from lib import summ

example = """
Lorem ipsum omle roque
Lorem ipsum omle roque
Lorem ipsum omle roque
Requie somebody close KPFU
"""

summ.summarise(example)
"""
>> Lorem ipsum omle roque
Requie somebody close KPFU
"""
