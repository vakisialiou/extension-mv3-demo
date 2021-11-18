
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'test-2') {
        console.log(request.data)
        sendResponse({data: 'Hi content!'})
    }
})