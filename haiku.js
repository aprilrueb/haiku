var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n");
   var lineSplit;
   var result = {};
   lines.forEach(function(line){    
        lineSplit = line.split("  ");    
        if(lineSplit[1]!== undefined){
        var phoneme = lineSplit[1].split(" ");
        var counter = 0;
        for(var i=0; i<phoneme.length; i++){
            if(phoneme[i].match(/\d/)){
                counter++;
            }
        }
    }
    result[lineSplit[0]] = counter;
  }) 
    var syllabelsArr = [];
    for(var j=0; j<15; j++){
        var sylArray = [];
        for(var key in result){
            if(result[key] === j){
                sylArray.push(key);
            }
        }
        syllabelsArr.push(sylArray);
    }
    return syllabelsArr;
}

var syllabelsArr = formatData(cmudictFile);
var structure = [[5],[7],[5]];

function createHaiku(structure, syllabelsArr){
    console.log(syllabelsArr[structure[0][0]][Math.ceil(Math.random()*(syllabelsArr[structure[0][0]].length))] 
    + "\n" + syllabelsArr[structure[1][0]][Math.ceil(Math.random()*(syllabelsArr[structure[1][0]].length))]
    + "\n" + syllabelsArr[structure[2][0]][Math.ceil(Math.random()*(syllabelsArr[structure[2][0]].length))]);
}

createHaiku(structure, syllabelsArr);