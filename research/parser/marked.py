markedGrammar = '''
ADVP: {(<NP>?(<RB>|<RBR>)<NP>?)|(<CC> <RB>)}
PP: {<IN><DT>?}
CONJP: {<CC>}
NP: {<NNP>(<CC> <NNP>)?}
'''

markedFollower = {
    "ADVP": ["PRP"],
    "CONJP": ["PRP", "PP", "IN"],
    "NP": [","],
    "PP": ["IN"]
}
