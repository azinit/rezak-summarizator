from core.reducers import Summarizers
from core import tokenize_sentences
from prettytable import PrettyTable, ALL


def read(filepath: str) -> str:
    with open(filepath, 'r', encoding='utf-8') as fixture:
        # compute total selection
        return fixture.read()


def make_stats_by_sentences(text, sentences, options):
    result = [[] for i in range(len(sentences))]
    for index, s in enumerate(Summarizers):
        summary = s.summarize(text, options)
        selection = list(map(lambda sentence: sentence in summary, sentences))
        for i_sentence, is_in_summary in enumerate(selection):
            result[i_sentence].append(is_in_summary)
            # if is_in_summary is True:
            #     stats[i_sentence].append(s.name)
    return result


def make_stats_by_summarizers(text, sentences, options):
    result = [[] for i in range(len(Summarizers))]
    for index, s in enumerate(Summarizers):
        summary = s.summarize(text, options)
        selection = list(map(lambda sentence: sentence in summary, sentences))
        result[index] = selection
    return result


def create_html(table):
    with open('stats.html', 'w') as html:
        html.write('<html><head><style>')
        html.write("""
        body { font-family: sans-serif; }
        table {
          border-collapse: collapse;
        }
        th { 
            background: white;
            position: sticky;
            top: 0;
            box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td { padding: 5px; }
        tr:nth-child(even) {background-color: #f2f2f2;}
        tr>td:not(:nth-child(2)) { text-align: center; }
        tr>td:not(:nth-child(-n + 2)):not(:empty) { background-color: #ccc; }
        """)
        html.write('</style></head><body>')
        html.write(table.get_html_string())
        html.write('</body></html>')


RATIO = 0.5


if __name__ == '__main__':
    fixture = read('fixtures/it.web.rest-api.txt')
    sentences = tokenize_sentences(fixture)
    stats = make_stats_by_sentences(fixture, sentences, {"ratio": RATIO})
    headers = ['#', 'SENTENCE'] + [s.name for s in Summarizers]
    table = PrettyTable(field_names=headers)
    table.align['SENTENCE'] = 'l'
    table.hrules = ALL
    for index, sentence in enumerate(sentences):
        table.add_row([index + 1, sentence] + ['+' if x is True else '' for x in stats[index]])

    # Генерирует HTML страницу с таблицей
    create_html(table)
    # Выводит ASCII таблицу в консоль
    print(table)
