from flask import Flask, request
from unmarked import unmarkedGrammar
from marked import markedGrammar
from parse import parseText
from flask_cors import CORS
import pretty_errors
app = Flask(__name__)
CORS(app)

@app.route('/', methods=["POST"])
def hello_world():
    response = {}
    for author, texts in request.json['texts'].items():
        response[author] = {}
        for title, content in texts.items():
            response[author][title] = parseText(content, request.json['grammar'])
    return response

app.run()

