const loggedPeople = localStorage.getItem("loggedPeople");
const loggedID = localStorage.getItem("loggedID");

const parsedPeople = parse(loggedPeople);

var currentTable = "table-participant";
var isParticipant = false;
var isAdmin = false;

// TODO: main function
execute();

function execute() {
    let person = sayHello(loggedID);

    if (isParticipant && isAdmin) {
        runParticipant(loggedID, person);
        currentTable = "table-0";
        runAdmin();
        chooseFavourite();
    } else if (isParticipant) {
        console.log(loggedID);
        console.log(person);
        runParticipant(loggedID, person);
        chooseFavourite();
    } else {
        currentTable = "table-0";
        runAdmin();
    }
}

function parse(target) {
    return JSON.parse(target)
}

function sayHello(id) {
    var greet = "POZDRAVLJEN";

    let person = getData(id);
    checkStatus();

    if (person["gender"] == "F") {
        greet += "A";
    }

    document.getElementById("greeting").innerHTML = greet + ", <br />" + person["name"] + "!";

    if (isParticipant && isAdmin) {
        document.getElementById("adminTitle").innerHTML = "UDELEŽENEC & ADMIN";
    } else if (isAdmin) {
        document.getElementById("adminTitle").innerHTML = "ADMIN";
    }

    return person;
}

function getData(id) {
    return parsedPeople[id];
}

function checkStatus() {
    if (localStorage.getItem("participant") == "true") {
        isParticipant = true;
    }

    if (localStorage.getItem("admin") == "true") {
        isAdmin = true;
    }
}

function runParticipant(id, person) {
    subHeaderLabel();
    participantTable();
    fillTable(id, person);
}

function runAdmin() {
    let container = document.getElementById("scrollableContainer");

    container.style.overflowY = "scroll";
    container.style.height = "75%";

    subHeaderLabel();

    for (var i = 1; i < Object.keys(parsedPeople).length; i++) {
        if (i != loggedID && parsedPeople[i]["status"][0] == "participant") {
            currentTable = "table-" + i;
            participantLabel(i);
            participantTable();
            fillTable(i, parsedPeople[i]);
        }
    }
}

function subHeaderLabel() {
    const datesAvailableText = document.createElement("p");
    datesAvailableText.setAttribute("class", "description");

    if (currentTable == "table-participant") {
        var node = document.createTextNode("Tukaj so na voljo tvoji dejti:");
    } else {
        var node = document.createTextNode("Tukaj so na voljo dejti vseh udeležencev:");
    }

    datesAvailableText.appendChild(node);

    const element = document.getElementById("scrollableContainer");
    element.appendChild(datesAvailableText);
}

function participantLabel(id) {
    const nameText = document.createElement("p");
    nameText.setAttribute("class", "description");
    nameText.setAttribute("id", "participant");

    var node = document.createTextNode(parsedPeople[id]["name"] + " " + parsedPeople[id]["surname"]);
    nameText.appendChild(node);

    const element = document.getElementById("scrollableContainer");
    element.appendChild(nameText);
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

    const place = document.createElement("td");
    const placeText = document.createTextNode("Št. mesta");
    place.appendChild(placeText);

    header.appendChild(name);
    header.appendChild(surname);
    header.appendChild(place);

    dateTable.appendChild(header);
    
    const element = document.getElementById("scrollableContainer");
    element.appendChild(dateTable);
}

function fillTable(id, person) {
    var table = document.getElementById(currentTable);
    let empty = "--pavza--";

    for (var i = 0; i < person["dates"].length; i++) {
        var row = table.insertRow();
        var c1 = row.insertCell();
        var c2 = row.insertCell();
        var c3 = row.insertCell();

        console.log(person["dates"][i]);
        if (person["dates"][i] == null) {
            c1.innerHTML = empty;
            c2.innerHTML = empty;
            c3.innerHTML = empty;
        } else {
            console.log(person["dates"][i]);
            let date = getData(person["dates"][i]);

            c1.innerHTML = date["name"];
            c2.innerHTML = date["surname"];

            if (date["gender"] == "F") {
                c3.innerHTML = person["dates"][i];
            } else {
                c3.innerHTML = id;
            }
        }
    }
}

function chooseFavourite() {
    const favouriteButton = document.createElement("button");
    favouriteButton.setAttribute("onclick", "location.href='https://www.youtube.com/watch?v=QDia3e12czc'");

    var node = document.createTextNode("Izberi svojega favorita!");
    favouriteButton.appendChild(node);

    const element = document.getElementById("scrollableContainer");
    element.appendChild(favouriteButton);
}