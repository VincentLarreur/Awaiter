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
const weeks = day * 7;

let headline = document.getElementById("headline");
let countdown = document.getElementById("countdown");
let content = document.getElementById("content");

x = setInterval(function() {
  chrome.storage.local.set({date: new Date(input.value).toISOString()}, function() {
    console.log('new date is stored ' + new Date(input.value).toISOString());
  });
  let now = new Date().getTime();
  distance = new Date(input.value).getTime() - now;

  document.getElementById("weeks").innerText = Math.floor(distance / (weeks));
  document.getElementById("days").innerText = Math.floor((distance % (weeks)) / (day));
  document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
  document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
  document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

  if (distance < 0) {
    headline.innerText = "GOAL REACHED !";
    countdown.style.display = "none";
    content.style.display = "block";
  } else {
    headline.innerText = "REACHING YOUR GOAL IN";
    countdown.style.display = "block";
    content.style.display = "none";
  }
}, 250);