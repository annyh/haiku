import nltk
from collections import defaultdict
import json

templates = []


with open("famous_haikus.txt", "r") as haikus:
	template = {}
	counter = 1
	for line in haikus:
		if "=" in line:
			templates.append(template)
			template = {}
			counter = 1
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
			template[counter] = correct_parts
			counter += 1
			# num_words_to_template[num_words].append(correct_parts)
	#num_words_to_template needs to be split into correct format for JSON dumping

# for key in num_words_to_template.keys():
# 	grammar_templates['7'][key] = num_words_to_template[key]
# 	if key <= 5:
# 		grammar_templates['5'][key] = num_words_to_template[key]

print templates

open('grammar_templates.json', 'w').write(json.dumps(templates))