const http = require('http');
const port = 8000;
const laddr = '127.0.0.1';

/*********************************
 *       ActiveMQ Variables      *
 *********************************/

const Stomp = require('stomp-client');
const stompClientPort = 61613;
const stompClient = new Stomp(laddr, stompClientPort);
var message = '';

stompClient.connect(function(sessionId){

    console.log('Consumer Connected');
    stompClient.subscribe('/topic/ManageSystemStatus',function (body, headers){

            console.log(body);

            console.log(headers);

            message+=body;
    });

});

http.createServer(function (request,response) {

    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end('Hello, Red Hat Developer Program World from ' +

            process.version + ' !\n'
            + 'MESSAGE: ' + message + ' !\n');

    console.log('Processed Request for '+ request.url);

}).listen(port, laddr);

console.log('Server running at http://' + laddr + ':' + port + '/');



