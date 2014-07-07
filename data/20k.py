import csv

with open('10k-20k.txt', 'rb') as fin, open('words.txt', 'wb') as fout:
    freader = csv.reader(fin, delimiter = '\t')
    fwriter = csv.writer(fout, delimiter = '\t')
    for line in freader:
    	if len(line) != 3:
    		correct = line[1].split()
    		line[1] = correct[0]
    		line.append(correct[1])
    	del line[0]
    	del line[1]
        fwriter.writerow(line)
