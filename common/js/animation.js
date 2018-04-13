
//translateY动画偏移量
let _translateY = function (translateYvalue) {
    let animation = wx.createAnimation({
        duration: 300,
        delay: 0,
        timingFunction: 'ease-out',
    })
    animation.translateY(translateYvalue).step()
    return animation
}

//top opacity动画显隐
let _topAndOpacity = function (topValue, opacityValue, duration=100) {
    let animation = wx.createAnimation({
        duration,
        delay: 0,
        timingFunction: 'ease-out',
    })
    animation.top(topValue).opacity(opacityValue).step()
    console.log(animation)
    return animation
}

//top 
let _top = function (topValue, duration = 300) {
    let animation = wx.createAnimation({
        duration,
        delay: 0,
        timingFunction: 'ease-out',
    })
    animation.top(topValue).step()
    console.log(animation)
    return animation
}

//height动画偏移量
let _height = function (heightValue) {
    let animation = wx.createAnimation({
        duration: 500,
        delay: 0,
        timingFunction: 'ease-out',
    })
    animation.height(heightValue).step()
    return animation
}

module.exports = {
    _translateY: _translateY,
    _topAndOpacity: _topAndOpacity,
    _height: _height,
    _top: _top
}