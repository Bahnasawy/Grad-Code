from flask import Flask
from unmarked import unmarkedGrammar, unmarkedFollower
from marked import markedGrammar, markedFollower
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
        "follower": unmarkedFollower
    },
    {
        "name": "Marked Theme",
        "grammar": markedGrammar,
        "follower": markedFollower
    }
]
followers = [unmarkedFollower, markedFollower]

@app.route('/')
def hello_world():
    return parseText(text, features)

app.run()

