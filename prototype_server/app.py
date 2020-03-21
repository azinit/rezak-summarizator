from flask import Flask, escape, request
from flask_cors import CORS
from random import random
from core import (
    create_total_selection,
    reducers_count,
    colors,
    tokenize_sentences
)

app = Flask(__name__)
CORS(app)


@app.route('/reduce', methods=['POST'])
def reduce():
    content = request.get_json()
    if "text" not in content:
        raise RuntimeError('Please provide text parameter')
    options = content["sum_options"] if "sum_options" in content else {"ratio": 0.5}
    text_sentences = tokenize_sentences(content["text"])
    selection = create_total_selection(text_sentences, options)

    return {"text_sentences": text_sentences, "total_selection": selection, "max_selection": reducers_count}


@app.route('/get-colors', methods=['GET'])
def get_colors():
    h = request.args.get('base_color', float)
    if not isinstance(h, float):
        h = random()
    return {"colors": colors.get_priorities_hex(h)}
