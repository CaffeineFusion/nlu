/*
  Initialised with Boilerplate code
*/

const express       = require('express');
const router        = express.Router();
const NLU           = require(__dirname + '/../internal_modules/watson/nlu/NLU');
const CONFIG        = require(__dirname + '/../config.json');

var nlu = new NLU(CONFIG.WATSON.NLU.CREDS);

router.use(function(req, res, next){
    console.log(req.sessionID);
    next();
});

router.post('/nlu', function(req, res) {
    let text = req.body.text;
    //let id = req.params.id;
    //let sessionID = req.sessionID;
    nlu.analyse(text)
        .then((result) => { console.log(result); return result; })
        .then({success:true, input:text, data:res.json})
        .catch(console.log);

});

/*router.get('/:id/example', function(req, res) {
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
});*/

module.exports = router;
