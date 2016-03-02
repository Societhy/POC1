/**                                                                                                
 * Created by Giudici on 02/03/2016.                                                          
 */

var express = require('express');
var router = express.Router();
var fundraise = require('../database/fundraise');
var handlebars = require('handlebars');
var path = require("path");

router.get('/:addr', function (req, res, next)
	   {
	       fundraise.getfundraises(req.params.id, function (ret) {
		       if (!ret.status) {
			   var err = new Error(ret.message);
			   err.status = 404;
			   next(err);
			   return;
		       }
		       res.render('fundraise_fundraise', {fundraise: ret.object});
		   });
	   });

module.exports = router;