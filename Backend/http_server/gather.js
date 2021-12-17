var client;

function createAvatar(){
    
    var name = document.getElementById("floatingInput").value //name
    for(let i=1;i<9;i++){
        if(document.getElementById(i).checked){   //radio checked option
            var url ="./"+i+".png"
        }
    }
    
    document.getElementById("card").style.display="none"; //hide card

    let x= Math.floor(Math.random()*1000);
    let y= Math.floor(Math.random()*700);
    
    client = { "name": name, "x":x, "y":y, "url":url}
    // console.log(client)

    updateAvatar(name, x, y, url); 
}

function updateAvatar(name, x, y, url){
    const xhttp = new XMLHttpRequest();

    var data = JSON.stringify({ "name": name, "x":x, "y":y, "url":url});
    xhttp.open("POST", "server.js",true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);

    // location.href="index.html";
    // Create a state change callback
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Print received data from server

            // console.log(this.responseText);

            var data = JSON.parse(this.responseText)
            var c = document.getElementById("myCanvas");
            c.style.display="flex";
            var ctx = c.getContext("2d");
            c.width=c.width
        //To display all avatars on the canvas
            for(let avatar in data){
                var X = data[avatar]["x"]
                var Y = data[avatar]["y"]
                var URL = data[avatar]["url"]
                var img1 = new Image();
                img1.src=URL
                ctx.drawImage(img1, X, Y);
            }

            //enabling videos when 2 avatars are nearby 
            nearby(data);
        }
    };
}
function move(e){

    
    if(e.keyCode==39){
        client["x"]+=5;
    }
    if(e.keyCode==37){
        client["x"]-=5;
    }
    if(e.keyCode==38){
        client["y"]-=5;
    }
    if(e.keyCode==40){
        client["y"]+=5;
    }
    // console.log("after", client)
    updateAvatar(client["name"], client["x"], client['y'], client['url']);
    nearby()
}

function nearby(data){
    for(let avatar in data){
        if(avatar!== client["name"]){
            var X = data[avatar]["x"]
            var Y = data[avatar]["y"]
            var distance = Math.floor(Math.sqrt(Math.pow((client["x"] - X),2) + Math.pow((client["y"]- Y),2) ))
            if(distance<=200){
                console.log(client["name"],"is nearby",avatar,"please turn on your video")
            }

        }
       
    }
}
//On key down event i.e left, right, up ,and down arrows
document.onkeydown=move;

