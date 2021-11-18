
console.log('[Override page] Hello google!')

navigator.serviceWorker
    .getRegistrations()
    .then((res) => console.log(res))