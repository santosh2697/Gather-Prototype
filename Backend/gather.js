

function createAvatar(){
    var name = document.getElementById("floatingInput").value
    for(let i=1;i<9;i++){
        if(document.getElementById(i).checked){
            var url ="./"+i+".png"
        }
    }
    let x= Math.floor(Math.random()*1000);
    let y= Math.floor(Math.random()*700);

    const xhttp = new XMLHttpRequest();

    var data = JSON.stringify({ "name": name, "x":x, "y":y, "url":url});
    xhttp.open("POST", "server.js",true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);

    // Create a state change callback
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            // Print received data from server
            console.log(this.responseText);

        }
    };

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img1 = new Image();
    img1.src=url
    ctx.drawImage(img1, x, y);        


}
