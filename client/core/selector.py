from ._tokenizer import tokenize_sentences


def create_selection(text: str, summary: str):
    # tokenize
    text_sentences = tokenize_sentences(text)
    sum_sentences = tokenize_sentences(summary)
    # compute
    selection = [0] * len(text_sentences)
    # TODO: refactor? (find (text_sentence => text_sentence.__contains__(sentence)
    for sum_sentence in sum_sentences:
        for i, txt_sentence in enumerate(text_sentences):
            if txt_sentence.__contains__(sum_sentence):
                selection[i] += 1

    # TODO: return and destructure as obj?
    return selection, text_sentences, sum_sentences
