from itertools import product
import json

def format_for_json(a_partition):
	out = []
	for intervals in a_partition:
		out.append([i for i in intervals])
	return out

def partition(number):
	answer = set()
	answer.add((number, ))
	for x in range(1, number):
	 	for y in partition(number - x):
	    	 answer.add((x, ) + y)
	return answer

templates = product(format_for_json(partition(5)), format_for_json(partition(7)), format_for_json(partition(5)))

open('haiku_templates.json', 'w').write(json.dumps(format_for_json(list(templates))))
