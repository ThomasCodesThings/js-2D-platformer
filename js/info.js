function showInformations(audio, game){
    //audio.play();
    canvasContex.clearRect(0, 0, canvas.width, canvas.height);
    canvasContex.fillStyle = "black";
    canvasContex.fillRect(0,0,canvas.width, canvas.height);
    canvasContex.font = "50px Arial";
    canvasContex.fillStyle = "red";
    canvasContex.fillText("Informations", 200, 76);
    canvasContex.fillStyle = "yellow";
    canvasContex.fillText("Author", 800, 76);
    canvasContex.font = "30px Arial";
    canvasContex.fillStyle = "white";
    canvasContex.fillText("Press", 100, 130);
    canvasContex.fillText("W -> to jump", 150, 186);
    canvasContex.fillText("A -> to move left", 170, 226);
    canvasContex.fillText("D -> to move right", 180, 266);
    canvasContex.fillText("Enter -> to press buttons", 225, 306);
    canvasContex.font = "30px Arial";
    canvasContex.fillStyle = "red";
    canvasContex.fillText("Game description:", 180, 360);
    canvasContex.font = "20px Arial";
    canvasContex.fillStyle = "white";
    canvasContex.fillText("Collect coins while jumping over dangerous spikes.", 280, 400);
    canvasContex.fillText("Find a key and press button at the end to finish each level.", 314, 420);
    canvasContex.font = "50px Arial";
    canvasContex.fillStyle = "Orange";
    canvasContex.fillText("Good luck & have fun!", 305, 487);
    var back = new Image();
    back.src = 'textures/buttons/mainMenu.png';
    back.onload = function(){
    canvasContex.drawImage(back, 55, 520, 328, 70); 
    }
    var author = new Image();
    author.src = "textures/me.png";
    author.onload = function(){
        canvasContex.drawImage(author, 725, 100);
    }
    var mouseX, mouseY;
    canvas.addEventListener("mouseup", mousePosition);
    
    function mousePosition(MouseEvent){
        mouseX = MouseEvent.clientX - canvas.offsetLeft;
        mouseY = MouseEvent.clientY - canvas.offsetTop;
        if(mouseX >= 55 && mouseX <= 55 + 328){
            if((mouseY >= 520 && mouseY <= 520 + 70) && MouseEvent.button == 0){
                mainMenu();
                canvas.removeEventListener("mouseup", mousePosition);
            }
        }
    }
}