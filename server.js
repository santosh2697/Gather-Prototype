'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/login.html';
var office = {};
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  var client;
  ws.onmessage = function (event) {
    console.log(event.data);
    var data = JSON.parse(event.data);
    var action = data["action"];
    client = data["client"];

    if (action === "update") {
        office[data["client"]] = data["payload"];

        wss.clients.forEach(client => client.send(JSON.stringify(office)));

        console.log("updated data", office);
        }
    };

    ws.onclose = function () {
        delete office[client];
            wss.clients.forEach(client => client.send(JSON.stringify(office)));

            console.log("deleted one client", office);
    };  
});





// const WebSocket = require("ws");
// var http = require('http');
// const fs = require('fs');
// var port = process.env.PORT || 5000;

// var office = {};

// //http server
// var server = http.createServer(function (req, res) {  
    
//     if (req.method == 'GET'){
//         console.log('GET');
//         console.log(req.url);
        
//         fs.readFile("login.html",function(error,data){
//             if(error){
//                 res.writeHead(400);
//                 res.write('Error: File not found');
//             }
//             else{
//                 res.writeHead(200);
//                 res.write(data);
//             }
//             res.end();
//         })
//     }   else if (req.method == 'POST') {
//         console.log('POST')
//         var body = ''
//         req.on('data', function(data) {
//           body += data
//         //   console.log('Partial body: ' + body)
//         })

//         req.on('end', function() {
//             console.log(body)
//             res.writeHead(200, {'Content-Type': 'text/html'})
//             res.end(port.toString());
//         })
//       }
// }
// );

// //Websocket 
// const wss = new WebSocket.Server( {server});

wss.on("connection", function (ws) {
    var client;
    console.log("Client connection");
    ws.onmessage = function (event) {
        console.log(event.data);
        var data = JSON.parse(event.data);
        var action = data["action"];
        client = data["client"];

        if (action === "update") {
            office[data["client"]] = data["payload"];
    
            wss.clients.forEach(client => client.send(JSON.stringify(office)));
    
            console.log("updated data", office);
        }
    };

    ws.onclose = function () {
        delete office[client];
            wss.clients.forEach(client => client.send(JSON.stringify(office)));
    
            console.log("deleted one client", office);
    };
});

// server.listen(port, () => console.log('Node.js web server at port 5000 is running..'));
