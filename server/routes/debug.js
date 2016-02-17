/**
 * Created by grout_r on 17/02/16.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next)
{
    res.render('debug')
})

module.exports = router;
