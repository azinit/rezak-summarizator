"""
Точка входа в программу
:remark Предполагаемая логика работы: (консольная версия)
- server/ модули не знают друг о друге, app.py - связывает их все вместе
- на вход app.py поступает текст
- `tokenizer` разбивает исходный текст на предложения
- `selector` использует эти предложения и реализации из `process`, которые также задаются из точки входа
- По итоговой выборке `higlighter` окрашивает предложения
"""

if __name__ == '__main__':
    from client import App

    App.run()
