const input = document.getElementById("date");

chrome.storage.local.get(['date'], function(result) {
  input.value = new Date(result.date).toDateString().slice(3);
});

const myDatePicker = MCDatepicker.create({ 
  el: '#date',
  dateFormat: 'MMM DD YYYY'
});

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

let headline = document.getElementById("headline");
let countdown = document.getElementById("countdown");
let content = document.getElementById("content");

x = setInterval(function() {
  chrome.storage.local.set({date: new Date(input.value).toISOString()}, function() {
    console.log('new date is stored ' + new Date(input.value).toISOString());
  });
  let now = new Date().getTime();
  distance = new Date(input.value).getTime() - now;

  document.getElementById("weeks").innerText = Math.floor(distance / (week));
  document.getElementById("days").innerText = Math.floor((distance % (week)) / (day));
  document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
  document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
  document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

  if (distance < 0) {
    headline.innerText = "GOAL REACHED !";
    countdown.style.display = "none";
    content.style.display = "block";

    chrome.action.setBadgeText({text: 'None'});
  } else {
    headline.innerText = "REACHING YOUR GOAL IN";
    countdown.style.display = "block";
    content.style.display = "none";

    const weeks = Math.floor(distance / (week));
    if(weeks > 0) {
        chrome.action.setBadgeText({text: `${weeks}w`});
    } else {
        const days = Math.floor((distance % (week)) / (day));
        if (days > 0) {
            chrome.action.setBadgeText({text: `${days}d`});
        }
    }
  }
}, 250);