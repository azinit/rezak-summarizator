from core import summarize, create_selection, fonts

with open('./fixtures.txt', 'r', encoding='utf-8') as fixture:
    # compute summary
    text = fixture.read()
    summary = summarize(text)
    # FIXME: summary as str for uniform tokenizing. Modify?
    # compute selection
    selection, text_sentences, sum_sentences = create_selection(text, ''.join(summary))
    # print results
    for i, sentence in enumerate(text_sentences):
        if selection[i]:
            print(i, f'[{selection[i]}]', fonts.red + sentence + fonts.end)
        else:
            print(i, '[0]', sentence)

    print(selection, len(selection))