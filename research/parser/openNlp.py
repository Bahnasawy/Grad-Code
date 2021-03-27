import os, sys
from subprocess import Popen, PIPE
import nltk

BP = os.path.dirname(os.path.abspath(__file__))
CP = "%(BP)s/opennlp-tools-1.9.3.jar:%(BP)s/opennlp-tools-1.9.3/lib/maxent-2.5.2.jar:%(BP)s/opennlp-tools-1.9.3/lib/jwnl-1.3.3.jar:%(BP)s/opennlp-tools-1.9.3/lib/trove.jar" % dict(BP=BP)
cmd = "java -cp %(CP)s -Xmx1024m opennlp.tools.lang.english.TreebankParser -k 1 -d %(BP)s/opennlp.models/english/parser" % dict(CP=CP, BP=BP)
p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE, close_fds=True)
stdin, stdout, stderr = (p.stdin, p.stdout, p.stderr)
text = "This is my sample sentence."
stdin.write('%s\n' % text)
ret = stdout.readline()
ret = ret.split(' ')
prob = float(ret[1])
tree = nltk.Tree.parse(' '.join(ret[2:]))