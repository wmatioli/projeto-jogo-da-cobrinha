let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d");
let box = 32;
let cobrinha = [];
cobrinha[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarCobrinha (){
    for(i = 0; i < cobrinha.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(cobrinha[0].x > 15*box && direction == "right") cobrinha[0].x = 0;
    if(cobrinha[0].x < 0 && direction == 'left') cobrinha[0].x = 16 * box;
    if(cobrinha[0].y > 15*box && direction == "down") cobrinha[0].y = 0;
    if(cobrinha[0].y < 0 && direction == 'up') cobrinha[0].y = 16 * box;
    
    for(i = 1; i < cobrinha.length; i++){
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if(direction == "right") cobrinhaX += box;
    if(direction == "left") cobrinhaX -= box;
    if (direction == "up") cobrinhaY -= box;
    if(direction == "down") cobrinhaY += box;

    if(cobrinhaX != food.x || cobrinhaY != food.y){
        cobrinha.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);