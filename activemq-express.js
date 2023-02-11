/******** Express application variables ********/

const express = require('express');


const xml2js = require('xml2js');

=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
const port = process.env.PORT || 5000;

const laddr = '127.0.0.1';

const app = express();


=======

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
/******** ActiveMQ variables and connectivity *******/

const Stomp = require('stomp-client');

const stompClientPort = 61613;

const stompClient = new Stomp(laddr, stompClientPort);


var xmlData = '';
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
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
=======
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
            console.log(body);

            console.log(headers);

            manageSystemStatus_message+=body;

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
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
=======
        entity_message+=body;
    });
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
        entity_message+=body;
    });
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d

    stompClient.subscribe('/topic/ManageNavigationReport',function (body, headers){

        console.log(body);

        console.log(headers);

        xmlData = body;

        /********Deserialization*******/
        xml2js.parseString(xmlData, function(err, results) {
            manageNavigationReport_message = JSON.stringify(results);
            console.log(manageNavigationReport_message);
        });
=======
        manageNavigationReport_message+=body;
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
        manageNavigationReport_message+=body;
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
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
=======
        managePositionReport_message+=body;
    });

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
        managePositionReport_message+=body;
    });

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
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
=======
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
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

>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
});

app.listen(port, laddr, () => {
    console.log('Server listening at http://' + laddr + ':' + port + '/');

}); 
=======
});
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
=======
});
>>>>>>> 3bc1878f6fd4e18a4897f9995e9b66cb76ca1c5d
