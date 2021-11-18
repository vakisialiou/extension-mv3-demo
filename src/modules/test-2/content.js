console.log('[Content test 2] Hello google!')

chrome.runtime.sendMessage({ type: 'test-2', data: 'Hi bg!' }, (res) => {
    console.log(res)
})