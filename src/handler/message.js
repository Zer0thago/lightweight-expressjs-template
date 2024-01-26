const conf = require("../config.json");

function unescape(str) {
    return str.replace(/\\x1b/g, '\x1b');
}

const config = {
    RED: unescape(conf.colors.RED),
    GREEN: unescape(conf.colors.GREEN),
    YELLOW: unescape(conf.colors.YELLOW),
    RESET: unescape(conf.colors.RESET),
};

function currentTime() {
    return new Date().toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

function err(message) {
    console.log(`${config.RED}[${currentTime()}] ${message}${config.RESET}`);
}

function notify(message) {
    console.log(`${config.YELLOW}[${currentTime()}] ${message}${config.RESET}`);
}

function success(message) {
    console.log(`${config.GREEN}[${currentTime()}] ${message}${config.RESET}`);
}

function critical(message) {
    console.log(`${config.RED}[${currentTime()}] ${message}${config.RESET}`);
    process.exit(1);
}

module.exports = { err, notify, success, critical };
