/**
 * Created by Roman on 26/02/2016.
 */

var express = require('express');
var router = express.Router();
var project = require('../database/project');
var fundraise = require('../database/fundraise');
var handlebars = require('handlebars')
var path = require("path");

router.get('/:id', function (req, res, next)
{
    project.getProject(req.params.id, function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        //if (ret.object.fundraiseList.length > 0)
        //{
        //    console.log(ret.object);
        //    ret.object.fundraiseList.forEach(function (item) {
        //        fundraise.getFundraise(item, function (fund) {
        //            if (!fund.status) {
        //                var err = new Error(fund.message);
        //                err.status = 404;
        //                next(err);
        //                return;
        //
        //            }
        //            ret.object.fundDetail = [];
        //            fund.object.id = i;
        //            ret.object.fundDetail.push(fund.object);
        //            console.log(ret.object);
        //            res.render('project_profile', {project: ret.object});
        //        });
        //        i++;
        //    });
        //}
        //else
            res.render('project_profile', {project: ret.object});
    });
});

router.get('/', function(req, res, next) {
    project.getAllProjects(function (ret) {
        if (!ret.status) {
            var err = new Error(ret.message);
            err.status = 404;
            next(err);
            return;
        }
        console.log(ret.object);
        res.render('project_homepage', {project: ret.object});
    });
});


module.exports = router;