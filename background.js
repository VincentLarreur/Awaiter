const hour = 1000 * 60 * 60;
const day = hour * 24;
const week = day * 7;

chrome.storage.local.get(['date'], (result) => {
  if (result.date === undefined) {
    console.log('--- Initialize date ---');
    chrome.storage.local.set({date: new Date().toISOString()});
  }
});

chrome.action.setBadgeBackgroundColor({color: "#E17754"});

chrome.alarms.create({ periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.local.get(['date'], (result) => {
    console.log('--- Update Badge ---');
    let now = new Date().getTime();
    distance = new Date(result.date).getTime() - now;

    chrome.action.setBadgeText({text: 'None'});
    if (distance > 0) {
      const weeks = Math.floor(distance / (week));
      if(weeks > 0) {
        chrome.action.setBadgeText({text: `${weeks}w`});
      } else {
        const days = Math.floor((distance % (week)) / (day));
        if (days > 0) {
          chrome.action.setBadgeText({text: `${days}d`});
        } else {
          chrome.action.setBadgeText({text: `<1d`});
        }
      }
    }
  });
});