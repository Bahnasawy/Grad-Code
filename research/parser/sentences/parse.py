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
            temp.append(token)
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
                    temp.append([leafArr ,tag.label()])
                else:
                    temp.append([tag[0],tag[1]])
            sents.append(temp)
        featuresTags[features[idx]["name"]] = sents


    # featuresIndicies = {}
    # for feature in features:
    #     featureTemp = []
    #     for idxSent, sent in enumerate(featuresTags[feature["name"]]):
    #         tagTemp = -1
    #         for idxTag, tag in enumerate(sent):
    #             if type(tag[0]) is not str and idxTag != len(sent) - 1 and sent[idxTag + 1][1] in feature["follower"][tag[1]]:
    #                 tagTemp = idxTag
    #                 break
    #         featureTemp.append(tagTemp)
    #     featuresIndicies[feature["name"]] = featureTemp



    # giveBack = {
    #     "Obama": {
    #         "Text 1": {
    #             "content": featuresTags,
    #             "highlight": featuresIndicies
    #         },
    #     } 
    # }

    return featuresTags
