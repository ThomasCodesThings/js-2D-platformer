class Background{
    constructor(level){
        this.level = level;
        this.background = new Image();
        this.background.src = 'textures/background/background_level'+this.level+'.png';
    }
    draw(){
        canvasContex.drawImage(this.background, 0, 0);
    }
}

class Player{
    constructor(x, y, keys){
        this.x = x;
        this.y = y;
        this.keys = keys;
        this.player = new Image();
        this.player.src = 'textures/player/playerModel.png';
    }
    draw(){
        if(this.keys['w']){canvasContex.drawImage(this.player, 90, 0, 30, 40, this.x, this.y, 30, 40);}
        else if(this.keys['a']){canvasContex.drawImage(this.player, 60, 0, 30, 40, this.x, this.y, 30, 40);}
        else if(this.keys['d']){canvasContex.drawImage(this.player, 30, 0, 30, 40, this.x, this.y, 30, 40);}
        else{canvasContex.drawImage(this.player, 0, 0, 30, 40, this.x, this.y, 30, 40);}
    }

    move(){

        }
}

class Block{
    constructor(y, x, type){
        this.x = (x -1) * 40;
        this.y = (y -1) * 40;
        this.type = type;
        this.block = new Image();
        this.block.src = 'textures/brick.png';
    }
    draw(){
        canvasContex.drawImage(this.block, this.x, this.y);
    }

}

class Spike{
    constructor(y, x, type){
        this.x = (x) * 40;
        this.y = (y) * 40 + 20;
        this.type = type;
        this.spike = new Image();
        this.spike.src = 'textures/spikes.png';
    }
    draw(){
        canvasContex.drawImage(this.spike, this.x, this.y);
    }
}

class Coin{
    constructor(y, x, type){
        this.x = (x) * 40;
        this.y = (y) * 40 + 10;
        this.type = type;
        this.coin = new Image();
        this.coin.src = 'textures/coin.png';
    }
    draw(){
        canvasContex.drawImage(this.coin, this.x, this.y);
    }
}

class Button{
    constructor(y, x, type, buttonState){
        this.x = x * 40;
        this.y = y * 40;
        this.type = type;
        this.buttonState = buttonState;
        this.levelButtonRed = new Image();
        this.levelButtonRed.src = 'textures/levelButtonRed.png';
        this.levelButtonGreen= new Image();
        this.levelButtonGreen.src = 'textures/levelButtonGreen.png';
    }
    draw(){
        if(this.buttonState == false){canvasContex.drawImage(this.levelButtonRed, this.x, this.y);}else{
            canvasContex.drawImage(this.levelButtonGreen, this.x, this.y);}
    }
}

class Key{
    constructor(y, x, type, keyTaken){
        this.x = x * 40;
        this.y = y * 40;
        this.type = type;
        this.keyTaken = keyTaken;
        this.key = new Image();
        this.key.src = 'textures/key.png';
    }
    draw(){
        if(this.keyTaken == false){
            canvasContex.drawImage(this.key, this.x, this.y);
        }
    }
}

class TeleportCoin{
    constructor(y, x, type){
        this.x = x * 40;
        this.y = y * 40;
        this.type = type;
        this.teleportCoin = new Image();
        this.teleportCoin.src = 'textures/teleportCoin.png';
    }
    draw(){
        canvasContex.drawImage(this.teleportCoin, this.x, this.y);
    }      
}

class Bonus{
    constructor(y, x, type){
        this.x = x * 40 + 5;
        this.y = y * 40 + 10;
        this.type = type;
        this.bonus = new Image();
        this.bonus.src = 'textures/apple.png';
    }
    draw(){
        canvasContex.drawImage(this.bonus, this.x, this.y);
    }      
}