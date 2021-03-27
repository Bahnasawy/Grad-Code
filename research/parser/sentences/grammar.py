NP = '((<DT>?<JJ>*<NN>|<NNS>|<NNP>|<NNPS>)|(<NN>|<NNS>|<NNP>+|<NNPS>)|<PRP>|(<PRP$><NN>|<NNS>)|(<DT>.))'
VP = '(<VB>|<VBD>|<VBZ>|<VBP>)'


simpleGrammar = 'Simple:\n{^' + NP + VP + '<.*>*}\n}<;|,>|<CC>|<IN>{'

complexGrammar = 'Complex:\n{(^(<IN>|<W.*>)' + NP + VP + '<.*>*<,>' + NP + VP + '<.*>*)|(^' + NP + VP + '<.*>*' + '(<IN>|<W.*>)' + NP + '?' + VP + '<.*>*)}'

compoundGrammar = 'Compound:\n{^' + NP + VP + '<.*>*<,|;><CC|RB>' + NP + VP + '<.*>*}'