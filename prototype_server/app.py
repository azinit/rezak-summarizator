from flask import Flask, escape, request
from flask_cors import CORS
from random import random
from core import (
    create_total_selection,
    colors,
    tokenize_sentences
)

app = Flask(__name__)
CORS(app)


@app.route('/reduce', methods=['POST'])
def reduce():
    content = request.get_json()
    if not content.text:
        raise AttributeError('Please provide text parameter')
    options = content.sum_options if content.sum_options else {"ratio": 0.5}
    text_sentences = tokenize_sentences(content.text)
    selection = create_total_selection(text_sentences, options)
    return {"text_sentences": text_sentences, "total_selection": selection}
