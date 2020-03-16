from core import (
    create_total_selection,
    fonts,
    impls,
    tokenize_sentences
)

priorities = [
    '',
    '',     # fonts.yellow,
    fonts.red,
    fonts.red2
]

with open('./fixtures.txt', 'r', encoding='utf-8') as fixture:
    # compute total selection
    text = fixture.read()
    selection = create_total_selection(text, impls)
    text_sentences = tokenize_sentences(text)
    # print results
    for i, sentence in enumerate(text_sentences):
        weight = selection[i]
        priority = priorities[weight]
        # print(f'{i} [{weight}] {priority}{sentence}{fonts.end}')
        print(f'{priority}{sentence}{fonts.end}')
    print(selection, len(selection))