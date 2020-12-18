# Loading Libraries 
from nltk.tag import brill, brill_trainer
from nltk.tag import brill, brill_trainer 
from nltk.tag import DefaultTagger, UnigramTagger, BigramTagger, TrigramTagger
from nltk.corpus import treebank 
import pretty_errors
  
def train_brill_tagger(initial_tagger, train_sents, **kwargs): 
    templates = [ 
            brill.Template(brill.Pos([-1])), 
            brill.Template(brill.Pos([1])), 
            brill.Template(brill.Pos([-2])), 
            brill.Template(brill.Pos([2])), 
            brill.Template(brill.Pos([-2, -1])), 
            brill.Template(brill.Pos([1, 2])), 
            brill.Template(brill.Pos([-3, -2, -1])), 
            brill.Template(brill.Pos([1, 2, 3])), 
            brill.Template(brill.Pos([-1]), brill.Pos([1])), 
            brill.Template(brill.Word([-1])), 
            brill.Template(brill.Word([1])), 
            brill.Template(brill.Word([-2])), 
            brill.Template(brill.Word([2])), 
            brill.Template(brill.Word([-2, -1])), 
            brill.Template(brill.Word([1, 2])), 
            brill.Template(brill.Word([-3, -2, -1])), 
            brill.Template(brill.Word([1, 2, 3])), 
            brill.Template(brill.Word([-1]), brill.Word([1])), 
            ] 
      
    # Using BrillTaggerTrainer to train  
    trainer = brill_trainer.BrillTaggerTrainer( 
            initial_tagger, templates, deterministic = True) 
      
    return trainer.train(train_sents, **kwargs) 

def backoff_tagger(train_sents, tagger_classes, backoff=None):
    for cls in tagger_classes:
        backoff = cls(train_sents, backoff=backoff)
    return backoff


  
# Initializing 
default_tagger = DefaultTagger('NN') 
  
# initializing training and testing set     
train_data = treebank.tagged_sents()[:3000] 
test_data = treebank.tagged_sents()[3000:] 
  
initial_tag = backoff_tagger( 
        train_data, [UnigramTagger, BigramTagger,  
                    TrigramTagger], backoff = default_tagger) 
      
a = initial_tag.evaluate(test_data) 
print ("Accuracy of Initial Tag : ", a) 

brill_tag = train_brill_tagger(initial_tag, train_data) 
b = brill_tag.evaluate(test_data) 
print(brill_tag.tag("A wise old owl".split()))
