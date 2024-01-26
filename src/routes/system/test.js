const express = require('express')
const router = express.Router()

router.includeDirInRoute = true;
router.get('/test', function (req, res) {
    res.send('Welcome!')
});

module.exports = router