const loggedPeople = localStorage.getItem("loggedPeople");
const loggedID = localStorage.getItem("loggedID");

const parsedPeople = parse(loggedPeople);

var currentTable = "table-participant";
var tableCounter = 0;
var participantTableBool = false

sayHello(loggedID);

if (localStorage.getItem("participant") == "true") {
    datesLabel();
    datesTable();
    loadDataTable(findDates(loggedID));
}

if (localStorage.getItem("admin") == "true") {
    participantTableBool = true;
    datesLabel();

    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        currentTable = "table-" + i;
        console.log(currentTable);
        nameLabel(i);
        datesTable();
        loadDataTable(findDates(i));
    }
}

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

    if (localStorage.getItem("admin") == "true") {
        document.getElementById("adminTitle").innerHTML = "ADMIN";
    }
}

function findPerson(id) {
    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        if (id == Object.keys(parsedPeople)[i]) {
            return parsedPeople[i];
        }
    }
}

function datesLabel() {
    const datesAvailableText = document.createElement("p");
    datesAvailableText.setAttribute("class", "description");

    if (!participantTableBool) {
        var node = document.createTextNode("Tukaj so na voljo tvoji dejti:");
        console.log("1");
    } else {
        var node = document.createTextNode("Tukaj so na voljo dejti vseh udeležencev:");
        console.log("2");
    }
    datesAvailableText.appendChild(node);

    const element = document.getElementById("container");
    element.appendChild(datesAvailableText);
}

function nameLabel(id) {
    const nameText = document.createElement("p");
    nameText.setAttribute("class", "description");

    var node = document.createTextNode(parsedPeople[id]["name"] + " " + parsedPeople[id]["surname"]);
    nameText.appendChild(node);

    const element = document.getElementById("container");
    element.appendChild(nameText);
}

function datesTable() {
    console.log("1.5");
    const dateTable = document.createElement("table");
    dateTable.setAttribute("class", currentTable);
    dateTable.setAttribute("id", currentTable);

    const header = document.createElement("tr");

    const name = document.createElement("td");
    const nameText = document.createTextNode("Ime");
    name.appendChild(nameText);

    const surname = document.createElement("td");
    const surnameText = document.createTextNode("Priimek");
    surname.appendChild(surnameText);

    const number = document.createElement("td");
    const numberText = document.createTextNode("Telefon");
    number.appendChild(numberText);

    header.appendChild(name);
    header.appendChild(surname);
    header.appendChild(number);

    dateTable.appendChild(header);
    
    const element = document.getElementById("container");
    element.appendChild(dateTable);
}

function findDates(id) {
    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        if (id == Object.keys(parsedPeople)[i]) {
            return parsedPeople[i]["dates"];
        }
    }
}

function loadDataTable(dateList) {
    var table = document.getElementById(currentTable);

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