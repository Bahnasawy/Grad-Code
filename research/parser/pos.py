from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from os import system

while(True):
    string = str(input())
    system('clear')
    print(string)
    tagged_words = pos_tag(word_tokenize(string))
    tokens = []
    tags = []
    for word in tagged_words:
        tokens.append(word[0])
        tags.append(word[1])
    print(tokens, tags)