from os import name
from .grammar import simpleGrammar, complexGrammar, compoundGrammar
from .parse import parseText
import numpy as np
import pretty_errors

text = open("sentences/text.txt", "r").read()

# print(complexGrammar)
features = [
    {
        "name": "Simple",
        "grammar": simpleGrammar,
    },
    {
        "name": "Complex",
        "grammar": complexGrammar
    },
    {
        "name": "Compound",
        "grammar": compoundGrammar
    }
]

# followers = [unmarkedFollower, markedFollower]

result = parseText(text, features)

print(result)
# highlight = []
# for par, paragraph in enumerate(result[1]):
#     temp = []
#     for sen, sent in enumerate(paragraph):
#         for word in sent:
#             temp.append(result[0][par][sen][word])
#     highlight.append(temp)

# for word in highlight: print(word)







