"use strict";
var util = require("util");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    atms: atms
};

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function atms(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    const url = process.env.URL || "http://nightmare:9999/atms?address=";
    var address = req.swagger.params.address.value;
    const response = httpGet(url + address);
    // this sends back a JSON response which is a single string
    res.send(JSON.parse(response));
}