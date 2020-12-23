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

    pos = nltk.pos_tag_sents(sentences)


    # Parsing
    results = []
    for feature in features:
        temp = []
        for sent in pos:
            temp.append(nltk.RegexpParser(feature["grammar"]).parse(sent))
        results.append(temp)


    # Clean Up
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
                    temp.append([leafArr ,tag.label()])
                else:
                    temp.append([tag[0],tag[1]])
            sents.append(temp)
        featuresTags[features[idx]["name"]] = sents


    # Separation of features results
    featuresIndicies = []
    for idxFeature, sents in enumerate(featuresTags):
        temp = []
        for sent in sents:
            tagList = []
            for idxTag, tag in enumerate(sent):
                if type(tag[0]) is not str and idxTag != len(sent) - 1 and sent[idxTag + 1][1] in features[idxFeature]["follower"][tag[1]]:
                    tagList.append(idxTag)
            temp.append(tagList)
        featuresIndicies.append(temp)
    
    # return (featuresTags, featuresIndicies)
    giveBack = {
        "Johnny Silverhand": {
            "Text 1": {
                "content": featuresTags,
                "highlight": {}
            },
        } 
    }

    for idx, feature in enumerate(features):
        giveBack["Johnny Silverhand"]["Text 1"]["highlight"][feature["name"]] = featuresIndicies[idx]
    return giveBack
