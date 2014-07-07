import nltk
from collections import defaultdict
import json

grammar_templates = defaultdict(dict)
num_words_to_template = defaultdict(list)


with open("famous_haikus.txt", "r") as haikus:
	template = []
	for line in haikus:
		if "=" in line:
			template = []
		else:
			parts = nltk.pos_tag(line.split())
			correct_parts = []
			for word in parts:
				if word[0] == "!" or word[0] == "?" or word[0] == "," or word[0] == "..." or word[0] == "." or word[0] == ":":
					correct_parts.append(word[0])
				else:
					correct_parts.append(word[1])
			num_words = 0
			for word in correct_parts:
				if word[0] == "!" or word[0] == "?" or word[0] == "," or word[0] == "..." or word[0] == "." or word[0] == ":":
					continue
				else:
					num_words += 1
			num_words_to_template[num_words].append(correct_parts)
	#num_words_to_template needs to be split into correct format for JSON dumping

for key in num_words_to_template.keys():
	grammar_templates['7'][key] = num_words_to_template[key]
	if key <= 5:
		grammar_templates['5'][key] = num_words_to_template[key]

open('grammar_templates.json', 'w').write(json.dumps(grammar_templates))