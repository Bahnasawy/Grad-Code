unmarkedGrammar = '''
NP: {(<DT>?<JJ>*<NN>|<NNS>|<NNP>|<NNPS>)|(<NN>|<NNS>|<NNP>+|<NNPS>)|<PRP>|(<PRP$> <NN>|<NNS>)|<DT>}
PH: {<PRP>|<EX>}
NCH: {<WP><PRP>(<VB>|<VBD>)}
'''

unmarkedFollower = {
    "NP": ['VB', 'VBD', 'VBZ', 'VBP'],
    "PH": ["VB", "VBD"],
    "NCH": ["VBZ"]
}