function Game(){
    var startTime = new Date();
    var keyTaken = false;
    var mouseX;
    var mouseY; 
    var clickCount2 = 0;
    var victory = false;
    var loadOnce = 0;
    var playerData = {
        playerX: 100, //100
        playerY: 40 * 10,
        x_velocity: 0,
        y_velocity: 0,
        jump: true
    }

    var scene;

    function Move(scene){
        if(keys['w'] && playerData.jump == false){
            if(musicOff == false){jump.play();}
            playerData.y_velocity -= 37.5; // 35
            playerData.jump = true;
        }else if(keys['a']){
            playerData.x_velocity -= 0.5;
        }else if(keys['d']){
            playerData.x_velocity += 0.5;
        }

        playerData.y_velocity += 1.5;//gravitacia
        playerData.playerX += playerData.x_velocity;
        playerData.playerY += playerData.y_velocity;
        playerData.x_velocity *= 0.9;//trenie
        playerData.y_velocity *= 0.9;

      //REMOVE IF LAGGING
        playerData.playerX = Math.round(playerData.playerX);
        playerData.playerY = Math.round(playerData.playerY);

        if(playerData.playerY > 40 * 12 && level == 1){
            playerData.jump = false;
            playerData.playerY = 40 * 12;
            playerData.y_velocity = 0;
        }else if(playerData.playerY > 40 * 14 && level == 2){
            playerData.jump = false;
            playerData.playerY = 40 * 14;
            playerData.y_velocity = 0;
        }else if(level == 3){
            if(playerData.playerX >= 11 * 40 && playerData.playerX + 30 <= 20 * 40){
        }else{
            if(playerData.playerY > 40 * 11){
                playerData.jump = false;
                playerData.playerY = 40 * 11;
                playerData.y_velocity = 0;
            }
        }
        }
        if(playerData.playerX+30 > canvas.width){
            if(musicOff == false){error.play();}
            playerData.playerX = canvas.width-30;
        }
        if(playerData.playerX < 0){
            if(musicOff == false){error.play();}
            playerData.playerX = 0;
        }

        for(var i in scene){
            var obj = scene[i];
            if(obj.type == "block"){
            //kolizia bloku zprava
                if(playerData.playerX + 30 > obj.x && playerData.playerX < obj.x + 20){ //40
                    if(playerData.playerY == obj.y){
                        playerData.playerX = obj.x - 30; //40
                    }
                }
            //kolizia bloku zlava
                else if(playerData.playerX < obj.x + 40 && playerData.playerX > obj.x + 20){
                    if(playerData.playerY == obj.y){
                        playerData.playerX = obj.x + 40;
                    }
                }
            //kolizia bloku zo spodu
                if(playerData.playerX + 30 > obj.x && playerData.playerX < obj.x + 40){
                    if(playerData.playerY < obj.y + 40 && playerData.playerY > obj.y - 20){
                        playerData.playerY = obj.y + 40; //- 1
                    }
            //kolizia bloku zhora
                    else if(playerData.playerY < obj.y && playerData.playerY > obj.y - 40){
                        playerData.jump = false;
                        playerData.y_velocity = 0;
                        playerData.playerY = obj.y - 40; //-48 - 1
                    }
                }
            }
        }
    }

    function Draw(scene){
        canvasContex.clearRect(0,0, canvas.width, canvas.height);
        for(var i in scene){
            scene[i].draw();
        }
        if(keys['w']){canvasContex.drawImage(player, 90, 0, 30, 40, playerData.playerX, playerData.playerY, 30, 40);}
        else if(keys['a']){canvasContex.drawImage(player, 60, 0, 30, 40, playerData.playerX, playerData.playerY, 30, 40);}
        else if(keys['d']){canvasContex.drawImage(player, 30, 0, 30, 40, playerData.playerX, playerData.playerY, 30, 40);}
        else{canvasContex.drawImage(player, 0, 0, 30, 40, playerData.playerX, playerData.playerY, 30, 40);}

        canvasContex.fillStyle = "white";
        canvasContex.font = "40px Arial"; //50px
        canvasContex.fillText("Time"+"\xa0\xa0\xa0\xa0\xa0"+Math.floor(playerTime[level-1]/60)+":"+('0'+(playerTime[level-1] % 60)).slice(-2), 115, 36);
        canvasContex.fillText("Level"+"\xa0\xa0\xa0\xa0\xa0"+level, canvas.width / 2, 36);
        canvasContex.fillText("Score"+"\xa0\xa0\xa0\xa0\xa0"+playerScore[level-1], 1005, 36);
    }

    function Logic(scene){
        endTime = new Date();
        if(level == 1){
            playerTime[0] = Math.round((endTime - startTime)/1000);
        }else if (level == 2){
            playerTime[1] = Math.round((endTime - startTime)/1000) - playerTime[0];
        }else if(level == 3){
            playerTime[2] = Math.round((endTime - startTime)/1000) - (playerTime[0] + playerTime[1]);
        }
        var pc = characterCenter(player, playerData.playerX, playerData.playerY);
        for(var i in scene){
            var obj = scene[i];
            if(obj.type == "spike"){
                var sc = findCenter(spikes, obj.x, obj.y);
                var sc_range = Math.round(Math.sqrt(Math.pow(sc.x - pc.x, 2) + Math.pow(sc.y - pc.y, 2)));
                if(sc_range <= 28){if(musicOff == false){touchSpike.play()}; drawing = true;} // 30/  
            }else if(obj.type == "coin"){
                var cc = findCenter(coin, obj.x, obj.y);
                var range = Math.round(Math.sqrt(Math.pow(cc.x - pc.x, 2) + Math.pow(cc.y - pc.y, 2)));
                if(range <= 15){
                    playerScore[level-1]++;
                if(musicOff == false){coinGrab.play();}
                    var index = scene.indexOf(obj);
                    scene.splice(index, 1);
                    return obj;
            }
            }else if(obj.type == "button"){
                var bc = findCenter(levelButtonRed, obj.x, obj.y);
                var bc_range = Math.round(Math.sqrt(Math.pow(bc.x - pc.x, 2) + Math.pow(bc.y - pc.y, 2)));
                if(bc_range <= 25 && keys['Enter'] && keyTaken == true){
                    if(musicOff == false){buttonSound.play();}
                    if(level == 1){
                        keyTaken = false;
                        playerData.playerX = 100;
                        playerData.playerY = 40 * 14;
                        obj.buttonState = true;
                    }else if(level == 2){
                        keyTaken = false;
                        obj.buttonState = true;
                        playerData.playerX = canvas.width - 100;
                    }else if(level == 3){     
                        obj.buttonState = true;
                        drawing = true;
                        victory = true;
                        GameOver(victory);
                        //return obj;
                    }
                }
                if(obj.buttonState == true && level == 1){
                    playerData.playerX = 200;
                    loadOnce = 0;
                    level = 2;
                    return obj;
                }else if(obj.buttonState == true && level == 2){
                    playerData.playerX = 26 * 40;
                    loadOnce = 0;
                    level = 3;
                    return obj;
                }
            }else if(obj.type == "key"){
                var kc = findCenter(key, obj.x, obj.y);
                var kc_range = Math.round(Math.sqrt(Math.pow(kc.x - pc.x, 2) + Math.pow(kc.y - pc.y, 2)));
                if(kc_range <= 15){
                    if(musicOff == false){grabKey.play();}
                    keyTaken = true;
                    obj.keyTaken = true;
                    scene.splice(scene.indexOf(obj), 1);
                    return obj;
                }    
            }else if(obj.type == "teleportCoin"){
                var tc = findCenter(teleportCoin, obj.x, obj.y);
                var tc_range = Math.round(Math.sqrt(Math.pow(tc.x - pc.x, 2) + Math.pow(tc.y - pc.y, 2)));
                if(tc_range <= 15){
                    var teleportedX = Math.floor(Math.random() * canvas.width);
                    var teleportedY = Math.floor(Math.random() * canvas.height - 40); // - (40 * 14) + 1) ) + (40 * 14);
                    if(musicOff == false){teleportSound.play();}
                    playerData.playerX = teleportedX;
                    playerData.playerY = teleportedY;
                    var index = scene.indexOf(obj);
                    scene.splice(index, 1);
                    return obj;
                }
            }else if(obj.type == "bonus"){
                var bonusc = findCenter(apple, obj.x, obj.y);
                var bonus_range = Math.round(Math.sqrt(Math.pow(bonusc.x - pc.x, 2) + Math.pow(bonusc.y - pc.y, 2)));
                if(bonus_range <= 15){
                    var chance = Math.floor(Math.random() * 2);
                    if(musicOff == false){appleBite.play();}
                    if(chance == 0){
                        playerScore[level-1] += Math.floor(Math.random() * 20);
                    }else{
                        drawing = true;
                    }
                    var index = scene.indexOf(obj);
                    scene.splice(index, 1);
                    return obj;
                }
            }
        }
    }
    function Engine(){
        if(drawing == false){
        if(loadOnce < 1){
        scene = eval("level"+level+"();");
        loadOnce++;
        }

        Draw(scene);
        Move(scene);
        Logic(scene);
        musicSettings();
        }else{
            canvas.removeEventListener("mouseup", mousePosition);
            canvasContex.clearRect(0, 0, canvas.width, canvas.height);
            GameOver(victory);
        }
        window.requestAnimationFrame(Engine);
    }
    canvas.addEventListener("mouseup", mousePosition);
    window.requestAnimationFrame(Engine);

    function characterCenter(){
        var posX = playerData.playerX + (30/2);
        var posY = playerData.playerY + (40/2);
        return {
            x: posX,
            y: posY
        }
    } 

    function findCenter(img, x, y){
        var posX = x + (img.naturalWidth/2);
        var posY = y + (img.naturalHeight/2);
        return {
            x: posX,
            y: posY
        }
    }

    function mousePosition(MouseEvent){
            mouseX = MouseEvent.clientX - canvas.offsetLeft;
            mouseY = MouseEvent.clientY - canvas.offsetTop;
            if(mouseX > 0 && mouseX < 40){
                if((mouseY > canvas.height - 40 && mouseY < canvas.height) &&  MouseEvent.button == 0){
                    clickCount2++;
                if(clickCount2 % 2 == 1){
                    musicOff = true;         
                }else{
                    musicOff = false;
                }
                musicSettings();
            }
        }
    }

    function musicSettings(){
        if(musicOff == false){
            soundButton.src = 'textures/buttons/soundOff.png';         
        }else{
            soundButton.src = 'textures/buttons/soundOn.png';
        }
        canvasContex.fillStyle = "#fe2929";
        canvasContex.strokeRect(0, canvas.height - 40, 40, 40);
        canvasContex.drawImage(soundButton, 1, canvas.height - 40 + 1, 38, 38);
    }
    
}
