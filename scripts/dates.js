const loggedPeople = localStorage.getItem("loggedPeople");
const loggedID = localStorage.getItem("loggedID");

const parsedPeople = parse(loggedPeople);
var currentTable = "table-participant";
var isAdmin = false;
var hasEveryStatus = false;

var sessionReload = 0;

sayHello(loggedID);
showData();
sessionTimer();

function showData() {
    if (localStorage.getItem("participant") == "true") {
        runParticipant();
    }
    
    if (localStorage.getItem("admin") == "true") {
        runAdmin();
    }
    
    if (!isAdmin || hasEveryStatus) {
        chooseFavourite();
    }
}

function removeScrolling() {
    
}

function runParticipant() {
    subHeaderLabel();
    participantTable();
    loadDataTable(findDates(loggedID));
}

function runAdmin() {
    isAdmin = true;

    subHeaderLabel();
    for (var i = 0; i < Object.keys(parsedPeople).length; i++) {
        if (i != loggedID && parsedPeople[i]["status"][0] == "participant" && parsedPeople[i]["status"][1] != "admin"
            || (parsedPeople[i]["status"][0] == "participant" && parsedPeople[i]["status"][1] == "admin")) {
            currentTable = "table-" + i;
            participantLabel(i);
            participantTable();
            loadDataTable(findDates(i));
        }
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

    if (localStorage.getItem("participant") == "true" && localStorage.getItem("admin") == "true") {
        document.getElementById("adminTitle").innerHTML = "UDELEŽENEC & ADMIN";
        hasEveryStatus = true;
    } else if (localStorage.getItem("admin") == "true") {
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

function participantLabel(id) {
    const nameText = document.createElement("p");
    nameText.setAttribute("class", "description");
    nameText.setAttribute("id", "participant");

    var node = document.createTextNode(parsedPeople[id]["name"] + " " + parsedPeople[id]["surname"]);
    nameText.appendChild(node);

    const element = document.getElementById("datesTable");
    element.appendChild(nameText);
}

function subHeaderLabel() {
    const datesAvailableText = document.createElement("p");
    datesAvailableText.setAttribute("class", "description");

    if (!isAdmin) {
        var node = document.createTextNode("Tukaj so na voljo tvoji dejti:");
    } else {
        var node = document.createTextNode("Tukaj so na voljo dejti vseh udeležencev:");
    }
    datesAvailableText.appendChild(node);

    const element = document.getElementById("datesTable");
    element.appendChild(datesAvailableText);
}

function participantTable() {
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
    
    const element = document.getElementById("datesTable");
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

function chooseFavourite() {
    const favouriteButton = document.createElement("button");
    favouriteButton.setAttribute("onclick", "location.href='https://www.google.si'");

    var node = document.createTextNode("Izberi svojega favorita!");
    favouriteButton.appendChild(node);

    const element = document.getElementById("datesTable");
    element.appendChild(favouriteButton);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function sessionTimer() {
    for (var minute = 0; minute < 20; minute++) {
        for (var second = 0; second < 60; second++) {
            await sleep(1000);
                console.log(second);
        }
        console.log("minuta " + minute + " je potekla");
    }

    reloadPage();
}

function reloadPage() {
    window.location.reload();
}