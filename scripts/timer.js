function calculateTime() {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
    
    const countDown = Date.parse("dec 13, 2022 20:00:00 GMT+2"),
    x = setInterval(function() {    

        const now = new Date().getTime(),
              distance = countDown - now;

        document.getElementById("day").innerText = Math.floor(distance / (day)),
        document.getElementById("hour").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minute").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("second").innerText = Math.floor((distance % (minute)) / second);

        if (distance <= 750) {
            window.location.href = "pages/login.html"
            clearInterval(x);
            return;
        }

    }, 0)
}

calculateTime();