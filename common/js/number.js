function checkPhone(phoneNumber) {
    let regex = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9])|(17[0,3,5,6,7,8]))\d{8}$/;
    return (regex.test(phoneNumber));
}

module.exports = {
    checkPhone
}  