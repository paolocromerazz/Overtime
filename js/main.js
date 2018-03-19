// something here
let overtimeRate=0;
let hoursWorked=0;

window.onload = function() {
    var a = document.getElementById("load");
    a.onclick = readTextFile("../fullstackPeople.json", function(text){
        var data = JSON.parse(text);
        console.log(data);
    });
  }

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    //rawFile.send(null);
}

//usage:
// readTextFile("fullstackPeople.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });