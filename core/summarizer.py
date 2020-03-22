def summarize(text, weights, weight_threshold):
    return [(text[i], weight) for i, weight in enumerate(weights) if weight >= weight_threshold]
