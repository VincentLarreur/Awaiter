const input = document.getElementById("date");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const weeks = day * 7;

let countdown = document.getElementById("countdown");
let content = document.getElementById("content");
let button = document.getElementById("btn");

button.addEventListener("click", function() { 
    chrome.runtime.openOptionsPage();
});

x = setInterval(function() {
    chrome.storage.local.get(['date'], function(result) {
    let now = new Date().getTime();
    distance = new Date(result.date).getTime() - now;

    document.getElementById("weeks").innerText = Math.floor(distance / (weeks));
    document.getElementById("days").innerText = Math.floor((distance % (weeks)) / (day));
    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / (second));

    if (distance < 0) {
        countdown.style.display = "none";
        content.style.display = "block";
    } else {
        countdown.style.display = "block";
        content.style.display = "none";
    }
  });
}, 0);