const mobileRegEx = RegExp(/^[0]?[789]\d{9}$/);

const checkMobile = (mobile) => {
    if (
        mobile === "" ||
        mobile === undefined ||
        mobile.length !== 10 ||
        mobileRegEx.test(mobile) === false
    )
        return 0;
    else return 1;
};

module.exports = checkMobile;
