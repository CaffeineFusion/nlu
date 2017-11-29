/*
  Initialised with Boilerplate code
*/

var express = require('express');
var router = express.Router();
const CONFIG = require(__dirname + '/../config.json');

router.use(function(req, res, next){
    console.log(req.sessionID);
    next();
});

router.get('/:id/example', function(req, res) {
    let id = req.params.id;
    let sessionID = req.sessionID;
    let resp = {success:true, msg:'get route ' + id + '/example successful'};
    res.json(resp);

});

router.post('/:id/example', function(req, res) {
    //let text = req.body.text;
    let id = req.params.id;
    let sessionID = req.sessionID;
    let resp = {success:true, msg:'post route ' + id + '/example successful', data:req.body};
    res.json(resp);
});

router.get('/', function(req, res) {
    let resp = {success:true, msg:"Congratulations, Owen's api boilerplate is up"};
    res.json(resp);
});

module.exports = router;
