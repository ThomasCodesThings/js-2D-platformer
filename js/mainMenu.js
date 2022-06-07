function mainMenu(){
    var mouseX;
    var mouseY; 
    var clickCount1 = 0;
    let soundSwitch = false;
    var newGameButton = new Image();
    newGameButton.src = 'textures/buttons/newGame.png';
    var infoButton = new Image();
    infoButton.src = 'textures/buttons/info.png';
    audio.autoplay = true;
    newGameButton.onload = function(){
        canvasContex.drawImage(newGameButton, ((canvas.width/2)-(newGameButton.naturalWidth/2)), ((canvas.height/2)-(newGameButton.naturalHeight/2)));
    }

    infoButton.onload = function(){
        canvasContex.drawImage(infoButton, 1025, 550);
    }
    canvasContex.clearRect(0, 0, canvas.width, canvas.height);
    canvasContex.fillStyle = "black";
    canvasContex.fillRect(0,0,canvas.width, canvas.height);
    canvasContex.font = "80px Arial";
    canvasContex.fillStyle = "#FE2929";
    canvasContex.textAlign = "center";
    canvasContex.fillText("SUPER MARIO RIPOFF", canvas.width/2, 200);
    canvasContex.strokeStyle = "red";
    canvasContex.lineWidth = "1.5";
    canvasContex.strokeRect(120, 130, 880, 82);

    canvasContex.font = "20px Arial";
    canvasContex.fillStyle = "white";
    canvasContex.fillText("Super Mario Ripoff\xa0\xa0\xa0\xa0\xa0Alpha 1.1.0", 160, canvas.height - 15);

    canvas.addEventListener("mouseup", mousePosition);

    function mousePosition(MouseEvent){
        mouseX = MouseEvent.clientX - canvas.offsetLeft;
        mouseY = MouseEvent.clientY - canvas.offsetTop;
        if(mouseX >= ((canvas.width/2)-(newGameButton.naturalWidth/2)) && mouseX <= (((canvas.width/2)-(newGameButton.naturalWidth/2))+newGameButton.naturalWidth)){
            if((mouseY >= ((canvas.height/2)-(newGameButton.naturalHeight/2)) && mouseY <= ((canvas.height/2)-(newGameButton.naturalHeight/2))+newGameButton.naturalHeight) && MouseEvent.button == 0){
                Game();
                audio.pause();
                audio.currentTime = 0;
                canvas.removeEventListener("mouseup", mousePosition);
            }
        }
        //sound settings
        if(mouseX >= 935 && mouseX <= 1010){
        if((mouseY >= 550 && mouseY <= 625) && MouseEvent.button == 0){
            clickCount1 = clickCount1 + 1;
                if(clickCount1 % 2 == 1){
                    musicOff = true;
                    soundSwitch = true;    
                }else{
                    musicOff = false;
                    soundSwitch = false;
                }
                musicSettings(soundSwitch);
            }
        }
        if(mouseX >= 1025 && mouseX <= 1100){
            if((mouseY >= 550 && mouseY <= 625) && MouseEvent.button == 0){
                audio.pause();
                audio.currentTime = 0;
                showInformations(audio, newGameButton);
                canvas.removeEventListener("mouseup", mousePosition);
                }
            }
    }
    
    musicSettings(soundSwitch);

    function musicSettings(soundSwitch){
        if(soundSwitch == false){
            soundButton.src = 'textures/buttons/soundOff.png';
            audio.play();
            audio.loop = true;            
        }else{
            soundButton.src = 'textures/buttons/soundOn.png';
            audio.pause();
        }
        soundButton.onload = function(){
        canvasContex.clearRect(935, 550, 75, 75);
        canvasContex.fillStyle = "black";
        canvasContex.fillRect(935, 550, 75, 75);
        canvasContex.drawImage(soundButton, 935, 550);
        }
    }    
}