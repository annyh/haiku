//Makes haikus from syllable_tagged_words.json and haiku_templates.json (in /data)
var fs = require('fs');
var syllable_tagged_words = JSON.parse(fs.readFileSync("data/syllable_tagged_words.json"));
var haiku_templates = JSON.parse(fs.readFileSync("data/haiku_templates.json"));

var pickRandom = function(list) {
	return list[Math.floor(Math.random()*list.length)];
}

//Given a template, returns a line with the corresponding syllables.
var wordify = function(list){
	var syllables = list
	var chosen = []
	while(syllables.length > 0){
		var word = pickRandom(syllable_tagged_words[syllables[0].toString()])
		if(chosen.indexOf(word) === -1){
			chosen.push(word)
			syllables.shift()
		}
		else{
			continue
		}
	}
	return chosen.reduce(function(word1, word2){return word1 + " " + word2})
}

//Makes the haiku!
var makeHaiku = function(){
	var doYouGetCurveball = Math.random()
	if(doYouGetCurveball < 0.005){
		the_haiku[1] = "Surprise."
		the_haiku[2] = ""
		the_haiku[3] = wordify([17])
		return the_haiku
	}
	var template = pickRandom(haiku_templates)
	var the_haiku = {}
	for(var i = 1; i < 4 ; i++){
		the_haiku[i] = wordify(template[i-1])
	}
	return the_haiku
}

exports.haikuify = function(){
	return makeHaiku()
}