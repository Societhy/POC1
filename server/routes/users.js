var express = require('express');
var router = express.Router();
var user = require('../database/newUser')

/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.send('Homepage des users , a voir si on mets qq chose. Ou alors on fait la page my prcfile ici');
});

router.get('/:addr', function(req, res, next)
{
    var addr = req.params.addr;

    user.getUser(addr, function(ret) {
        if (!ret.status)
        {
            console.log(ret);
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        else
            res.render('user', ret.object);
    });
});
module.exports = router;
