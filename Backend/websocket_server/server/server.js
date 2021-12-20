const WebSocket = require("ws");
var http = require('http');
const fs = require('fs');
const port = 5000;

var office = {};

//http server
var server = http.createServer(function (req, res) {  
    
    if (req.method == 'GET'){
        console.log('GET');
        console.log(req.url);
        
        fs.readFile(".."+req.url,function(error,data){
            if(error){
                res.writeHead(404);
                res.write('Error: File not found');
            }
            else{
                res.writeHead(200);
                res.write(data);
            }
            res.end();
        })
    }
}
);

//Websocket 
const wss = new WebSocket.Server( {server});

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

server.listen(port, () => console.log('Node.js web server at port 5000 is running..'));
