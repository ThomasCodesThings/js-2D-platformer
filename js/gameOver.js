function GameOver(victory){
    canvasContex.clearRect(0, 0, canvas.width, canvas.height)
    canvasContex.fillStyle = "black";
    canvasContex.fillRect(0,0,canvas.width, canvas.height);
    if(victory == true){
        if(playOnce < 1){
            playOnce++;
            //sleep(250); //nemusi to tu byt
            if(musicOff == false){
            youWon.play();
            }
            //youWon.loop = true;
        }
        canvasContex.font = "100px Arial";
        canvasContex.fillStyle = "white";
        canvasContex.textAlign = "center";
        canvasContex.fillText("You won!", canvas.width/2, 126);
    }else{
        if(playOnce < 1){
            playOnce++;
            if(musicOff == false){
                gameOver.play();
                gameOver.loop = true;
            }
        }
        canvasContex.font = "100px Arial";
        canvasContex.fillStyle = "white";
        canvasContex.textAlign = "center";
        canvasContex.fillText("Game Over", canvas.width/2, 126);
    }
    canvasContex.font = "50px Arial";
    canvasContex.fillStyle = "red";
    canvasContex.fillText("Level", 350, 200);
    canvasContex.fillText("Time", 600, 200);
    canvasContex.fillText("Score", 850, 200);
    var totalTime = 0;
    var totalScore = 0;
    var multiply_y = 50;
    for(var i = 1; i <= level;i++){
        totalTime += playerTime[i-1];
        totalScore += playerScore[i-1];
        canvasContex.fillStyle = "white";
        canvasContex.font = "30px Arial";
        canvasContex.textAlign = "center";
        canvasContex.fillText(i, 350, 200+(i * multiply_y));
        canvasContex.fillText(Math.floor(playerTime[i-1]/60)+":"+('0'+(playerTime[i-1] % 60)).slice(-2), 600, 200+(i * multiply_y));
        canvasContex.fillText(playerScore[i-1], 850, 200+(i * multiply_y));
    }
    canvasContex.fillStyle = "red";
    canvasContex.font = "40px Arial"; //50px
    canvasContex.fillText("Total", 200, 250+(level * multiply_y));
    canvasContex.fillText(Math.floor(totalTime/60)+":"+('0'+(totalTime % 60)).slice(-2), 600, 250+(level * multiply_y));
    canvasContex.fillText(totalScore, 850, 250+(level * multiply_y)); 
    canvasContex.drawImage(mainMenuButton, canvas.width/2 - mainMenuButton.naturalWidth/2, 475);
    canvas.addEventListener("mouseup", mousePosition);
    var mouseX, mouseY;
    
    function mousePosition(MouseEvent){
        mouseX = MouseEvent.clientX - canvas.offsetLeft;
        mouseY = MouseEvent.clientY - canvas.offsetTop;
        if(mouseX >= ((canvas.width/2)-(mainMenuButton.naturalWidth/2)) && mouseX <= (((canvas.width/2)-(mainMenuButton.naturalWidth/2))+mainMenuButton.naturalWidth)){
            if((mouseY >= 475 && mouseY <= 475 + mainMenuButton.naturalHeight) && MouseEvent.button == 0){
                if(playerDeath < 1){
                    playerDeath++;
                    //canvasContex.clearRect(0, 0, canvas.width, canvas.height);
                    window.location.replace("game.html"); //http://net-informations.com/js/iq/load.htm
                    canvas.removeEventListener("mouseup", mousePosition);
                }
            }
        }
    }
    canvasContex.fillStyle = "yellow"; //#00ccff
    canvasContex.font = "15px Arial";
    canvasContex.fillText("Tomas Cernacek", 55, 605);
    canvasContex.fillText("@FIIT STU 2020", 55, 625);
}

function sleep(milliseconds){ 
     let timeStart = new Date().getTime(); 
     while (true){ 
        let elapsedTime = new Date().getTime() - timeStart; 
        if(elapsedTime > milliseconds){ 
        break; 
        } 
    } 
} 