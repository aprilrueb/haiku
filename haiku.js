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
//var structure = [[5],[7],[5]];
//var structure = [[2,3],[1,3,3],[3,2]];
//var structure = [[1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1]];
var structure = [[2,3],[2,3,2],[5]];

function createHaiku(structure, syllabelsArr){
    var final = "";
    for(var i=0; i<structure.length; i++){
        final += "\n";
        for(var j=0; j<structure[i].length; j++){
            final += syllabelsArr[structure[i][j]][Math.ceil(Math.random()*(syllabelsArr[structure[i][j]].length))];
            final += " ";
        }
    }
    console.log(final.slice(0,-1));
    return final.slice(0,-1);
}

createHaiku(structure, syllabelsArr);