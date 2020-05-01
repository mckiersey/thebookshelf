//  SEND DATA TO DB VIA POST AND REQUESTS

const request = require('request');

const json = {
    'name': 'test one',
    'email': 'test_one@gmail.com',

};

request.post({
    url: 'http://localhost:5555/users',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);

});