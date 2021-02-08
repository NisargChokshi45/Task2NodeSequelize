const fNameRegEx = RegExp(/^[a-zA-Z]+$/);

const checkName = (name) => {
    if (name === "" || name === undefined || fNameRegEx.test(name) === false)
        return 0;
    else return 1;
};

module.exports = checkName;
