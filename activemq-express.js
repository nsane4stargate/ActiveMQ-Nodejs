/******** Express application variables ********/

const express = require('express');

const xml2js = require('xml2js');

const port = process.env.PORT || 5000;

const laddr = '127.0.0.1';

const app = express();

/******** ActiveMQ variables and connectivity *******/

const Stomp = require('stomp-client');

const stompClientPort = 61613;

const stompClient = new Stomp(laddr, stompClientPort);

var xmlData = '';
var manageSystemStatus_message='';
var entity_message='';
var manageNavigationReport_message='';
var managePositionReport_message='';

stompClient.connect(function(sessionId){

    console.log('Consumer Connected');

    stompClient.subscribe('/topic/ManageSystemStatus',function (body, headers){

        console.log(body);

        console.log(headers);

        xmlData = body;

        /********Deserialization*******/
        xml2js.parseString(xmlData, function(err, results) {
            manageSystemStatus_message = JSON.stringify(results);
            console.log(manageSystemStatus_message);
        });
    });

    stompClient.subscribe('/topic/Entity',function (body, headers){

        console.log(body);

        console.log(headers);

        xmlData = body;

        /********Deserialization*******/
        xml2js.parseString(xmlData, function(err, results) {
            entity_message = JSON.stringify(results);
            console.log(entity_message);
        });
    }); 

    stompClient.subscribe('/topic/ManageNavigationReport',function (body, headers){

        console.log(body);

        console.log(headers);

        xmlData = body;

        /********Deserialization*******/
        xml2js.parseString(xmlData, function(err, results) {
            manageNavigationReport_message = JSON.stringify(results);
            console.log(manageNavigationReport_message);
        });
    });

    stompClient.subscribe('/topic/ManagePositionReport',function (body, headers){

        console.log(body);

        console.log(headers);

        xmlData = body;

        /********Deserialization*******/
        xml2js.parseString(xmlData, function(err, results) {
            managePositionReport_message = JSON.stringify(results);
            console.log(managePositionReport_message);
        });
    });
});

/********* ManageSystemStatus data route ********/

app.get('/system-status', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(manageSystemStatus_message);
});

app.get('/entity', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(entity_message);
    
});

app.get('/nav-report', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(manageNavigationReport_message);
});

app.get('/position-report', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(managePositionReport_message);
});

app.listen(port, laddr, () => {
    console.log('Server listening at http://' + laddr + ':' + port + '/');
}); 
