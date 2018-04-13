var host = 'https://www.tamaidan.com/imgs/'
var cutFirstUrl = function (urls, cut) {
    if (cut) return host + urls.split(',')[0]
    return urls.split(',').map(function (item) {
        console.log('url', host + item)
        return host + item
    })
}
module.exports = {
    cutFirstUrl: cutFirstUrl
};
module.exports.host = host;