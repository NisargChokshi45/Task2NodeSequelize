const checkCountry = (country) => {
    if (country === "" || country === undefined) return "India";
    else return country;
};

module.exports = checkCountry;
