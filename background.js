let date = new Date();

chrome.storage.local.set({date: date.toISOString()}, function() {
    console.log('first date is stored ' + date.toISOString());
});

const hour = 1000 * 60 * 60;
const day = hour * 24;
const week = day * 7;

setBadge();

setInterval(setBadge, 1000);

chrome.browserAction.setBadgeBackgroundColor({color: "#E17754"});

function setBadge() {
    chrome.storage.local.get(['date'], function(result) {
        let now = new Date().getTime();
        distance = new Date(result.date).getTime() - now;

        const weeks = Math.floor(distance / (week));
        chrome.browserAction.setBadgeText({text: 'None'});
        if(weeks > 0) {
            chrome.browserAction.setBadgeText({text: `${weeks}w`});
        } else {
            const days = Math.floor((distance % (week)) / (day));
            if (days > 0) {
                chrome.browserAction.setBadgeText({text: `${days}d`});
            }
        }
    });
}