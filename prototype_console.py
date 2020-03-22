"""
Точка входа в программу
:remark Предполагаемая логика работы: (консольная версия)
- core/ модули не знают друг о друге, app.py - связывает их все вместе
- на вход поступает текст
- `tokenizer` разбивает исходный текст на предложения
- `selector` использует эти предложения и реализации из `reducers`, которые также задаются из точки входа
- По итоговой выборке `higlighter` окрашивает предложения
"""


def read(filepath: str) -> str:
    with open(filepath, 'r', encoding='utf-8') as fixture:
        # compute total selection
        return fixture.read()


if __name__ == '__main__':
    from prototype_console import App
    text = read('fixtures/it.web.rest-api.txt')
    App.set_text(text)
    App.reduce()
    App.get_colors()
    App.colorize()
    # App.summarize(2)

