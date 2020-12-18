from unmarked import unmarkedGrammar, unmarkedFollower
from marked import markedGrammar, markedFollower
from parse import parseText
import pretty_errors

text = open("speech.txt", "r").read()


# Grammar Definition
features = [unmarkedGrammar, markedGrammar]
followers = [unmarkedFollower, markedFollower]

result = parseText(text, features, followers)

print(result[0])