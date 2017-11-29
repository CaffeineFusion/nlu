'use strict';
// server.js
const express           = require('express');
const helmet            = require('helmet');
const app               = express();
const path              = require('path');
const bodyParser        = require('body-parser');

// load environmant configuration
require('dotenv').config({silent:true});

// Import route Modules
let watson              = require(__dirname + '/routes/watson');

app.use(helmet());

// Specify explicit content sources. Only permit scripts from this host and our jQuery provider.
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"//, 'ajax.googleapis.com',
        //'app://com.google.android.apps.chromecast.app',
        //'com.google.android.apps.chromecast.app'],
        //reportURI: [''],                                      //Specify server for external logging
        //connectSrc: [CONFIG.OAUTH_DOMAIN,
        //    'oauth-redirect.googleusercontent.com',
        //    'app://com.google.android.apps.chromecast.app',
        //    'com.google.android.apps.chromecast.app'          //Redirect for Android Close Button
        ]
    }
}));

// Force HTTPS - includes Subdomains by default
/*
app.use(helmet.hsts({
    maxAge: 86400
}));
*/

const DEFAULT_PORT            = 8080;
const PORT                    = process.env.PORT || DEFAULT_PORT;

// Initialise routing
//app.use(express.static(__dirname + '/public'));
app.use('/api/v1/watson', watson);

app.get('*', function(req, res) {
    res.sendStatus(404);
});

// Launch Server
if(require.main === module) {
    app.listen(PORT, function() {
       console.log('App listening on port ' + PORT);
   });
}
else exports.app = app;
