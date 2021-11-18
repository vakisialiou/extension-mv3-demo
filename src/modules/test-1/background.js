
chrome.alarms.create('test-1', { periodInMinutes: 0.25 })
chrome.alarms.onAlarm.addListener((res) => {
    console.log(res, 'I am service worker and I am living.')
})