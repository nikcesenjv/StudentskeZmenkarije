function calculateTime() {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
    
    const countDown = Date.parse("dec 12, 2022 19:00:00"),
    x = setInterval(function() {    

        const now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById("day").innerText = Math.floor(distance / (day)),
        document.getElementById("hour").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minute").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("second").innerText = Math.floor((distance % (minute)) / second);

        if (distance < 0) {
        document.getElementById("headline").innerText = "Dogodek se dogaja!";
        clearInterval(x);
        }
    }, 0)
}

calculateTime();