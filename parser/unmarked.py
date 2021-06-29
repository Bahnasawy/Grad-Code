unmarkedGrammar = '''
NP: {(<DT>?<JJ>*<NN>|<NNS>|<NNP>+|<NNPS>)|<PRP>|(<PRP$> <NN>|<NNS>{1,2})|<DT>}
PH: {<PRP>|<EX>}
NCH: {<WP><PRP>(<VB>|<VBD>)}
'''

unmarkedFollower = {
    "NP": ['VB', 'VBD', 'VBZ', 'VBP'],
    "PH": ["VB", "VBD"],
    "NCH": ["VBZ"]
}