thetags = {}
number = raw_input("How many trees are there?")

if number == "1":
	next_question = "What kind of tree is it?"
	thetags['number'] = "a"
	thetags['number2'] = "is"
	thetags['number3'] = "needs"
	thetags['number4'] = "has"
	thetags['tree'] = "tree"
elif number == "2":
	next_question = "What kinds of trees are they?"
	thetags['number'] = "a couple"
	thetags['number2'] = "are"
	thetags['number3'] = "need"
	thetags['number4'] = "have"
	thetags['tree'] = "trees"
else:
	next_question = "What kinds of trees are they?"
	thetags['number'] = "a few"
	thetags['number2'] = "are"
	thetags['number3'] = "need"
	thetags['number4'] = "have"
	thetags['tree'] = "trees"

thetags['species'] = raw_input(next_question).title()
if not len(thetags['species']):
	thetags['species'] = thetags['tree']
else:
	thetags['species']+=' '+thetags['tree']
problem = raw_input('What\'s wrong with the {tree}'.format(**thetags))

if problem == 'dead':
	thetags['problem'] = thetags['number2'] + ' dead'
	thetags['treatment'] = 'remove the ' + thetags['tree']
elif problem == 'wild hairs':
	thetags['problem'] = thetags['number3'] + ' some pruning'
	thetags['treatment'] = 'prune ' + thetags['tree']
elif problem == 'hazardous limbs':
	thetags['problem'] = thetags['number4'] + ' some hazardous limbs that could fall the next time the wind picks up'
	thetags['treatment'] = 'remove the problem limbs'
elif problem == 'diseased':
	disease = raw_input('What kind of disease?').title()
	treatment = raw_input('What kind of treatment?')
	if treatment == 'treat':
		thetags['problem'] = thetags['number4'] + ' ' + disease + ' disease and should probably be treated sooner rather than later'
		thetags['treatment'] = 'do the treatment'
	elif treatment == 'remove':
		thetags['problem'] = thetags['number4'] + ' ' + disease + ' disease and should probably be removed to avoid spreading to other trees'
		thetags['treatment'] = 'remove the ' + thetags['tree']
else:
	thetags['problem'] = thetags['number3'] + ' some work'
	thetags['treatment'] = 'do the work'

payment = raw_input('For how many dollars?')
if payment == '':
	thetags['payment'] = 'the next time we\'re in the area'
else:
	thetags['payment'] = 'for about $' + payment

try:
	first_letter = thetags['species'][0].lower()
	if first_letter in ["a","e","i","o","u"] and thetags['number'] == "a":
		thetags['number'] = "an"
except:
	pass

themessage = '''Hi there,\n\nWe were working by your house on Monday and noticed you have {number} {species} in your yard that {problem}.\n\nWe could {treatment} {payment} if you\'re interested.  Just give us a call or send us an email.\n\nThanks for your time!\n\nNick Araya\nTreeCare LA\nnick@treecarela.com\n(323) 327-1611'''

newmessage = themessage.format(**thetags)
print '\n'
print newmessage
print '\n'