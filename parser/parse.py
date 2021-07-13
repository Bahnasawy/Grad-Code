# Imports
import nltk
from nltk import tree
import pretty_errors

def parseText(text, features):
    # Initialization
    tokens = nltk.tokenize.word_tokenize(text)

    sentences = []
    temp = []
    for token in tokens:
        if token == "." or token == "?" or token == "!":
            sentences.append(temp)
            temp = []
        else:
            temp.append(token)

    if sentences == []:
        sentences = [temp]
    pos = nltk.pos_tag_sents(sentences)

    # Parsing
    results = []
    for feature in features:
        temp = []
        for sent in pos:
            temp.append(nltk.RegexpParser(feature["string"]).parse(sent))
        results.append(temp)

    # Clean Up and Separation of features results
    featuresTags = {}
    for idx, feature in enumerate(features):
        sents = []
        for sent in results[idx]:
            temp = []
            for tag in sent:
                if type(tag) is tree.Tree:
                    leafArr = []
                    for leaf in tag.leaves():
                        leafArr.append(leaf[0])
                    temp.append([leafArr ,tag.label(), True])
                else:
                    temp.append([[tag[0]],tag[1], False])
            sents.append(temp)
        featuresTags[features[idx]["name"]] = sents

    return featuresTags

def parseSingle(text, features):
    tokens = nltk.tokenize.word_tokenize(text)
