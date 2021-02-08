const emailRegEx = RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const checkEmail = (email) => {
    if (email === "" || email === undefined || emailRegEx.test(email) === false)
        return 0;
    else return 1;
};

module.exports = checkEmail;
