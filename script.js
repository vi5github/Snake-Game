let gameContainer = document.querySelector(".game-container")
let scoreContainer = document.querySelector(".score-container")

let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let snakeBody = []


function generateFood(){
    foodX = Math.floor(Math.random()*25 + 1)
    foodY = Math.floor(Math.random()*25 + 1)
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeBody[i][1] == foodY && snakeBody[i][0] == foodY){
            generateFood();
        }
    }

}

document.addEventListener("keydown", function(e){
    console.log(e.key)
    let key = e.key;
    if(key == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(key == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(key == "ArrowLeft" && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }else if(key == "ArrowRight" && velocityX!=1){
        velocityX = 1;
        velocityY = 0;
    }
})


function GameOver(){
    velocityX = 0;
    velocityY = 0;
    headX = 12;
    headY = 12;
    snakeBody=[];
    generateFood();
    score = 0;
    scoreContainer.innerHTML = "Press any(left or right)key to Start";
    alert("Game Over");
}

let score = 0;
function renderGame(){
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`

    if(headX==foodX && headY==foodY){
        snakeBody.push([headX, headY])
        generateFood();
        score += 10;
        scoreContainer.innerHTML = "Score :" + score;
    }

    snakeBody.pop();
    headX += velocityX;
    headY += velocityY;
    snakeBody.unshift([headX, headY]);
    if(headX==0 || headY==0 || headX==26 || headY==26){
        GameOver();
    }

    for(let i = 1; i < snakeBody.length; i++){
        if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            GameOver();
        }
    }

    for(let i = 0; i < snakeBody.length; i++){
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
    }
    
    
    gameContainer.innerHTML = updatedGame
}

generateFood()
setInterval(renderGame, 150)
















