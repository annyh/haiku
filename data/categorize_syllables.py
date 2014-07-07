# -*- coding: utf-8 -*-

"""
{
	2:
	[
		{
			part: "NN"
			word: "cow"
		},
	]
}
"""

import json
from collections import defaultdict
import nltk

def num_syllables(word):
	return len(word.split("•"))

def wordify(word):
	word_parts = word.split("•")
	word_parts = [word.strip() for word in word_parts]
	return reduce(lambda x, y: x + y, word_parts)


syllables_to_words = defaultdict(set)

most_common_words = set()

with open("15k.txt", "r") as file:
	for line in file:
		line = line.strip()
		most_common_words.add(line)

with open("mhyph/mhyphutf8.txt", "r") as file:
	for line in file:
		line = line.strip()
		words = line.split()
		for word in words:
			#Only add if word is in the 10,000 most common words.
			the_word = wordify(word)
			if the_word in most_common_words:
				syllables_to_words[num_syllables(word)].add(the_word)

wordsyllables = defaultdict()
for key in syllables_to_words.keys():
	wordsyllables[key] = nltk.pos_tag(list(syllables_to_words[key]))

jsonify_me = defaultdict(list)
for key in wordsyllables.keys():
	for word_tuple in wordsyllables[key]:
		jsonify_me[key].append({"part": word_tuple[1], "word": word_tuple[0]})

open('syllable_and_speech_tagged_words.json', 'w').write(json.dumps(jsonify_me))