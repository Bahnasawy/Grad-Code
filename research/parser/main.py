from unmarked import unmarkedGrammar, unmarkedFollower
from marked import markedGrammar, markedFollower
from parse import parseText
import numpy as np
import pretty_errors

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

result = parseText(text, features)

# print(result)
# highlight = []
# for par, paragraph in enumerate(result[1]):
#     temp = []
#     for sen, sent in enumerate(paragraph):
#         for word in sent:
#             temp.append(result[0][par][sen][word])
#     highlight.append(temp)

# for word in highlight: print(word)







