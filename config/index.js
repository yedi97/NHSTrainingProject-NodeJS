var configValues = require("./config");

module.exports = {
    getDbConectionsString: function () {
        return `mongodb://${configValues.username}:${configValues.password}@ds013559.mlab.com:13559/cinemabox`;
    }
}