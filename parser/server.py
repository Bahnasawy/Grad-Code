from flask import Flask
from unmarked import unmarkedGrammar
from marked import markedGrammar
from parse import parseText
from flask_cors import CORS
import pretty_errors
app = Flask(__name__)
CORS(app)

text = open("speech.txt", "r").read()

features = [
    {
        "name": "Unmarked Theme",
        "grammar": unmarkedGrammar,
    },
    {
        "name": "Marked Theme",
        "grammar": markedGrammar,
    }
]

@app.route('/')
def hello_world():
    return parseText(text, features)

app.run()

