console.log('-----bg init-----')

try {
    require('./modules/test-1/background.js')
    require('./modules/test-2/background.js')
} catch (e) {
    console.log(e)
}