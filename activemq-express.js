/******** Express application variables ********/

const express = require('express');

const port = process.env.PORT || 5000;

const laddr = '127.0.0.1';

const app = express();


/******** ActiveMQ variables and connectivity *******/

const Stomp = require('stomp-client');

const stompClientPort = 61613;

const stompClient = new Stomp(laddr, stompClientPort);

var manageSystemStatus_message='';
var entity_message='';
var manageNavigationReport_message='';
var managePositionReport_message='';

stompClient.connect(function(sessionId){

    console.log('Consumer Connected');

    stompClient.subscribe('/topic/ManageSystemStatus',function (body, headers){

            console.log(body);

            console.log(headers);

            manageSystemStatus_message+=body;
    });

    stompClient.subscribe('/topic/Entity',function (body, headers){

        console.log(body);

        console.log(headers);

        entity_message+=body;
    });

    stompClient.subscribe('/topic/ManageNavigationReport',function (body, headers){

        console.log(body);

        console.log(headers);

        manageNavigationReport_message+=body;
    });

    stompClient.subscribe('/topic/ManagePositionReport',function (body, headers){

        console.log(body);

        console.log(headers);

        managePositionReport_message+=body;
    });

});

/********* ManageSystemStatus data route ********/

app.get('/system-status', (request, response) => {
    response.send('ManageSystemStatus: ' +  manageSystemStatus_message);
});

app.get('/entity', (request, response) => {
    response.send('Entity: ' +  entity_message);
});

app.get('/nav-report', (request, response) => {
    response.send('NavigationReport: ' +  manageNavigationReport_message);
});

app.get('/position-report', (request, response) => {
    response.send('PositionReport: ' +  managePositionReport_message);
});

app.listen(port, laddr, () => {
    console.log('Server listening at http://' + laddr + ':' + port + '/');
});
