let API_HOST = "https://m.tamaidan.com/backtest";
let DEBUG = true;//切换数据入口
let MOCK_DATA = require('./mockDatas.js')
let route = require('./mockRoute.js')
var Mock = require('mock.js')
//小程序请求
var _wxRequst = function (query) {
    wx.request({
        url: config.API_HOST + query.url,
        method: method ? method : 'get',
        data: query.data,
        header: header ? header : { "Content-Type": "application/json" },
        success: function (res) {
            query.success(res);
        },
        fail: function (error) {
            query.fail(error)
        }
    });
}
// function ajax(pathname = '', data = {}, successFn, failFn, method = "get", header = {}) {
function ajax(query) {
    if (!DEBUG) {
        //执行微信的请求
        _wxRequst(query)
    } else {
        // 模拟数据
        // let data = route(pathname)
        let path = query.url.includes('?') ? query.url.split('?')[0] : query.url
        var res = Mock.mock(MOCK_DATA[path])
        // 输出结果
        query.success(res);
    }
}
module.exports = {
    ajax: ajax
}