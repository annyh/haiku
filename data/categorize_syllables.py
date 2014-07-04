# -*- coding: utf-8 -*-

import json
from collections import defaultdict

def num_syllables(word):
	return len(word.split("•"))

def wordify(word):
	word_parts = word.split("•")
	word_parts = [word.strip() for word in word_parts]
	return reduce(lambda x, y: x + y, word_parts)


syllables_to_words = defaultdict(set)

with open("mhyph/mhyphutf8.txt", "r") as file:
	for line in file:
		line = line.strip()
		words = line.split()
		for word in words:
			syllables_to_words[num_syllables(word)].add(wordify(word))

jsonify_me = defaultdict()
for key in syllables_to_words.keys():
	jsonify_me[key] = list(syllables_to_words[key])

open('syllable_tagged_words.json', 'w').write(json.dumps(jsonify_me))