const message = require("../handler/message")
const config = require("../config.json").error

process.on('uncaughtException', function (error) {
    message.err(config.uncaughtException+" "+ error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    message.err(config.unhandledRejection+" "+ reason.stack || reason);
});

module.exports = process