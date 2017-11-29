'use strict';

var Watson = require('watson-developer-cloud/natural-language-understanding/v1');

const GET_TEMPLATE = () => { return {
        "text": "",
        "features": {
            "entities": {
                "emotion": true,
                "sentiment": true,
                "limit": 2
            },
            "keywords": {
                "emotion": true,
                "sentiment": true,
                "limit": 2
            }
        }
    };
};

// Internal Helper Functions
function sendPayload(Connection, input) {
    return new Promise(function(resolve, reject) {
        var payload = input;

        Connection.analyse(payload, function(err, res) {
            if(err) {
                console.log(err);
                reject(err);
                return;
            }
            else {
                console.log("Watson Response:" + JSON.stringify(res));
                resolve(res);
            }
        });
    });
}


function transformResponse(response) {
    return new Promise(function(resolve, reject) {
        console.log(response);
        resolve(response);
    });
}


module.exports = class NLU {
    constructor(config) {
        this.Connection = new Watson(config);
        this.transform = transformResponse;
    }

    setCustomTransformation(transformer) {
        this.transform = transformer;
    }

    //curl -X POST -H "Content-Type: application/json" -u "{username}":"{password}" -d @parameters.json "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27"
    analyse(text, sessionID) {
        var self = this;
        return new Promise(function(resolve, reject) {
            // Create Payload
            var input = GET_TEMPLATE();
            input.text = text;

            console.log('=== Input :', input, ' ===');

            sendPayload(self.Connection, input)
                .then(response => self.transformation(response))
                //.then(resolve)
                .then(function(result) {
                    console.log("=== Result : ", JSON.stringify(result), " ===");
                    resolve(result);
                })
                .catch(err => { console.log(err, input, context); reject(err); });

        });

    }
};
