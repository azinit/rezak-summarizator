def select(text, weights, weight_threshold):
    return [text[id] for id, item in enumerate(weights) if item >= weight_threshold]