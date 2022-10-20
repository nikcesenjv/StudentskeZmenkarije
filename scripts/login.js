localStorage.clear();
document.getElementById("phoneNumber").innerHTML = "";

function redirect() {
    let validNumber = checkPhoneNumber(document.getElementById("phoneNumber").value);

    if (!validNumber) {
        console.log("Oblika telefonske številke ni pravilna.");
        document.getElementById("errorMessage").innerHTML = "Oblika telefonske številke ni pravilna";
    } else {
        var json = parseJson();
        localStorage.setItem("loggedPeople", JSON.stringify(json));

        for (var i = 0; i < Object.keys(json).length; i++) {
            console.log(json[i]["number"]);
            if (validNumber == json[i]["number"]) {
                localStorage.setItem("loggedID", JSON.stringify(i));
                window.location.href = "dates.html";
                return;
            }
        }

        console.log("404 Person not found.");
        document.getElementById("errorMessage").innerHTML = "Oseba s to številko ni bila najdena.";
    }
}

function checkPhoneNumber(phoneNumber) {
    if (phoneNumber.includes("+")) {
        if (phoneNumber.length == 12) {
            return phoneNumber
        }
    } else {
        if (phoneNumber.length == 9) {
            return "+386" + phoneNumber.substring(1);
        } else if (phoneNumber.length == 13) {
            return "+" + phoneNumber.substring(2)
        }
    }
    return false;
}

function parseJson() {
    var request = new XMLHttpRequest();
    request.open("GET", "../lib/info.json", false);
    request.send(null);
    return JSON.parse(request.responseText);
}