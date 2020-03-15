# TODO: при заполнении, удалить все `NOTE:` комментарии
# ================== Использование ==================
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


# ================== Другие примеры ==================
"""
NOTE: Здесь можно описывать и другие аспекты, которые идут параллельно основному использованию.
Если слишком длинно - можно и ссылками на офиц. доку
"""

### Конфигурация модуля / метода - если есть
summ.config(**{
    ... 
})


# ================== Docstring ==================
"""
NOTE: Здесь описываем базово основные методы с параметрами
В вольном формате =)
"""

"""
Метод для сокращения текста
:method 
:name lib/summ/summarise
:param required*: {str} Какой-нибудь обязательный параметр
:param optional: {str} Какой-нибудь опциональный параметр
:return: {str} возвращает сокращенный текст
"""

"""
Метод для конфигурации модуля
:void
:name lib/summ/config
:param required*: {str} Какой-нибудь обязательный параметр
:param optional: {int} Какой-нибудь опциональный параметр
"""
