//Makes haikus from syllable_and_speech_tagged_words.json and haiku_templates.json (in /data)
var fs = require('fs');
var syllable_and_speech_tagged_words = JSON.parse(fs.readFileSync("data/syllable_and_speech_tagged_words.json"));
var haiku_templates = JSON.parse(fs.readFileSync("data/haiku_templates.json"));
var grammar_templates = JSON.parse(fs.readFileSync("data/grammar_templates.json"));

// var grammar_templates = {
// 	'5': {
// 		'1': [ ]
// 		...
// 		'5': [ ]

// 	},

// 	'7':{
// 		'1': [ ]
// 		...
// 		'7': [ ]
// 	}

// }


var replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var pickRandom = function(list) {
	return list[Math.floor(Math.random()*list.length)];
}

var reverseString = function(s){
    return s.split("").reverse().join("");
}

//Given a template, returns a line with the corresponding syllables and parts of speech.
// var wordify = function(list){
// 	var syllables = list
// 	var chosen = []
// 	while(syllables.length > 0){
// 		var word = pickRandom(syllable_and_speech_tagged_words[syllables[0].toString()])
// 		if(chosen.indexOf(word) === -1){
// 			chosen.push(word)
// 			syllables.shift()
// 		}
// 		else{
// 			continue
// 		}
// 	}
// 	return chosen.reduce(function(word1, word2){return word1 + " " + word2})
// }

//Given a syllable template, returns a haiku line.
var template_to_line = function(list){
	var returnList = [];
	var syllable_list = list.map(function(a){return a})
	var num_syllables = syllable_list.reduce(function(a, b){return a + b})
	var grammar_templatez = pickRandom(grammar_templates[num_syllables.toString()][syllable_list.length.toString()]) // One of the grammar templates with X syllables and Y words
	var grammar_template = grammar_templatez.map(function(a){return a}) //Otherwise, grammar_templatez is linked to the original JSON object
	while(grammar_template.length > 0){
		//punctuation
		if(grammar_template[0] === "," || grammar_template[0] === "?" || grammar_template[0] === "!" || grammar_template[0] === "--" || grammar_template[0] === "..." || grammar_template[0] === ":" || grammar_template[0] === "."){
			returnList.push({'part': grammar_template.shift()})
		}
		else{
			var alos = syllable_and_speech_tagged_words[syllable_list[0]] //that many syllables
			var viable_words = alos.filter(function(a){if(a.part === grammar_template[0]){return a}})
			var word_pair = pickRandom(viable_words)
			// var word_pair = {'word': word, 'part': grammar_template[0]}
			// if(returnList.indexOf(word_pair) === -1){
				returnList.push(word_pair)
				syllable_list.shift()
				grammar_template.shift()	
			// }
			// else{
			// 	continue
			// }
		}
	}
	//returnList at this point has both the word and the part.
	var returnWords = returnList.map(function(a){if(a === undefined){return "a"} if(a.word === undefined){return a.part;} return a.word;})
	//returnGrammar = returnList.map(function(a){return a.part})
	var line = returnWords.reduce(function(word1, word2){
		if(word2 === "," || word2 === "?" || word2 === "!" || word2 === "--" || word2 === "..." || word2 === "." || word2 === ":"){
			return word1 + word2;
		}
		else{
			return word1 + " " + word2;
		}})
	return line;
}



//Makes the haiku!
var makeHaiku = function(){
	var the_haiku = {}
	// var doYouGetCurveball = Math.random()
	// if(doYouGetCurveball < 0.05){
	// 	the_haiku[1] = "Surprise."
	// 	the_haiku[2] = "\n"
	// 	the_haiku[3] = template_to_line(pickRandom([[10, 10], [11, 10], [14], [19]]))
	// 	return the_haiku
	// }
	var template = pickRandom(haiku_templates)
	for(var i = 1; i < 4 ; i++){
		// console.log(replaceAll(":", "...", template_to_line(template[i-1])))
		if(i === 3){
			var line = replaceAll(":", "...", template_to_line(template[i-1]))
			if(line.slice(-1) === ","){
				the_haiku[i] = line.slice(0, line.length - 1)
			}
			else{
				the_haiku[i] = line
			}
		}
		else{
			the_haiku[i] = replaceAll(":", "...", template_to_line(template[i-1]))
		}
	}
	return the_haiku
}

exports.haikuify = function(){
	return makeHaiku()
}