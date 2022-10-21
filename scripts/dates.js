const loggedPeople = localStorage.getItem("loggedPeople");
const loggedID = localStorage.getItem("loggedID");

const parsedPeople = parse(loggedPeople);

sayHello(loggedID);
loadDataTable(findDates(loggedID));

function parse(target) {
    return JSON.parse(target);
}

function sayHello(id) {
    var greet = ""

    let person = findPerson(id);

    if (person["gender"] == "M") {
        greet = "POZDRAVLJEN,";
    } else {
        greet = "POZDRAVLJENA,";
    }

    document.getElementById("greeting").innerHTML = greet + "<br />" + person["name"] + "!";
}

function findPerson(id) {
    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        if (id == Object.keys(parsedPeople)[i]) {
            return parsedPeople[i];
        }
    }
}

function findDates(id) {
    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        if (id == Object.keys(parsedPeople)[i]) {
            return parsedPeople[i]["dates"];
        }
    }
}

function loadDataTable(dateList) {
    var table = document.getElementById("dateTable");

    for (var i = 0; i < dateList.length; i++) {
        let date = findPerson(dateList[i])
        var row = table.insertRow();
        var c1 = row.insertCell();
        var c2 = row.insertCell();
        var c3 = row.insertCell();

        c1.innerHTML = date["name"];
        c2.innerHTML = date["surname"];
        c3.innerHTML = date["number"];
    }
}