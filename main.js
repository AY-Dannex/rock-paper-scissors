let rockBtn = document.querySelector(".rock")
let paperBtn = document.querySelector(".paper")
let scissorsBtn = document.querySelector(".scissors")
let resetBtn = document.querySelector(".reset")

const winResult = document.querySelector(".win-result")
const lossesResult = document.querySelector(".losses-result")
const tieResult = document.querySelector(".tie-result")
const display = document.querySelector(".display")
const autoPlayBtn = document.querySelector(".auto-play")

let score = JSON.parse(localStorage.getItem("score")) || {Win: 0, Losses: 0, Tie: 0}

function getRandomNo (){
    const randomNo = Math.random();
    return randomNo
}

function computerChoice(){
    const newRandomNo = getRandomNo()
    let computerMove = ""
        if(newRandomNo >= 0 && newRandomNo < 1 / 3){
            computerMove = "✊"
        }else if(newRandomNo >= 1 / 3 && newRandomNo < 2 / 3){
            computerMove = "👋"
        }else{
            computerMove = "✌️"
        }   
        return computerMove
}

function playGame(playerMove){
    let result = ""
    const updatedComputerMove = computerChoice()
    if(playerMove === "✊"){
        if(updatedComputerMove === "✊"){
            result = "Its a Tie"
            score.Tie += 1
        }else if(updatedComputerMove === "👋"){
            result = "You Lost"
            score.Losses += 1
        }else if(updatedComputerMove === "✌️"){
            result = "You Win"
            score.Win += 1
        }
    }
    
    else if (playerMove === "👋"){
        if (updatedComputerMove === "✊"){
            result = "You Win"
            score.Win += 1
        }else if(updatedComputerMove === "👋"){
            result = "Its a Tie"
            score.Tie += 1
        }else if(updatedComputerMove === "✌️"){
            result = "You Lost"
            score.Losses += 1
        }
    }
    
    else{
        if (updatedComputerMove === "✊"){
            result = "You Lost"
            score.Losses += 1
        }else if(updatedComputerMove === "👋"){
            result = "You Win"
            score.Win += 1
        }else if(updatedComputerMove === "✌️"){
            result = "Its a Tie"
            score.Tie += 1
        }
    }

    localStorage.setItem("score", JSON.stringify(score))
    winResult.textContent = score.Win
    lossesResult.textContent = score.Losses
    tieResult.textContent = score.Tie
    display.textContent = `You chose ${playerMove}. Computer choose ${updatedComputerMove}. ${result}`
}

function textDisplay(){
    setTimeout(() => {
        display.textContent = ""
    }, 4000)
}

function reset(){
    winResult.textContent = ""
    lossesResult.textContent = ""
    tieResult.textContent = ""
    display.textContent = ""
    score.Win = 0
    score.Losses = 0
    score.Tie = 0
    localStorage.removeItem('score')
    alert(`The Score Board has be reset Successfully`)
}

let setIntervalID;
function autoPlay(){
    if(autoPlayBtn.textContent === "Auto Play"){
        autoPlayBtn.textContent = "Stop"
        setIntervalID = setInterval(() => {
            const playerMove = computerChoice()
            playGame(playerMove)
        }, 1000)
    }else{
        autoPlayBtn.textContent = "Auto Play"  
        clearInterval(setIntervalID)
        textDisplay()
    }
}

rockBtn.addEventListener("click", () => {
    playGame("✊")
    textDisplay()
})

paperBtn.addEventListener("click", () => {
    playGame("👋")
    textDisplay()
})
            
scissorsBtn.addEventListener("click", () => {
    playGame("✌️")
    textDisplay()
})

resetBtn.addEventListener('click', () => {
    reset()
})

autoPlayBtn.addEventListener("click", () => {
    autoPlay()
})