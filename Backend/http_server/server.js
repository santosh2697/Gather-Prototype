var http = require('http'); // Import Node.js core module
const fs = require('fs');
const port = 5000
var office = {}
var server = http.createServer(function (req, res) {   //create web server

    if (req.method == 'POST') {
        console.log('POST')
        var body = ''
        req.on('data', function(data) {
          body += data
        //   console.log('Partial body: ' + body)
        })
        req.on('end', function() {
          console.log('Body: ' + body)
        var avatar =JSON.parse(body)
        console.log(typeof avatar["name"])
          office[avatar["name"]]={  "x":avatar["x"],
          "y":avatar["y"],
          "url":avatar["url"]}

          console.log(office)
        var sendingCoordinates =JSON.stringify(office)
          res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(sendingCoordinates)
        // res.end("post recieved")
        })
      } else {
        console.log('GET')
        console.log(req.url)
        // set response header
         
        fs.readFile("."+req.url,function(error,data){
            if(error){
                res.writeHead(404)
                res.write('Error: File not found')
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



server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')

