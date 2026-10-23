const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("p");

let playerTurn = true; // player O = 1 and player X = 2

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerHTML = "";
        box.classList.remove("winner");
    })
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

const resetGame = () => {
    playerTurn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const showWinner = (winner, pattern) => {
    const playerNumber = winner === "O" ? 1 : 2;
    msg.innerText = `Congratulations ! Player ${playerNumber} has won the game!  🎉`;
    msgContainer.classList.remove("hide");

    // Highlight the winning boxes
    pattern.forEach((index) => {
        boxes[index].classList.add("winner");
    })

    disableBoxes();
}

const checkWinner = () => {
    for(const pattern of winPatterns) {
        const [a, b, c] = pattern;

        const pos1Val = boxes[a].innerText; // boxes[pattern[0]].innerText;
        const pos2Val = boxes[b].innerText; // boxes[pattern[1]].innerText;
        const pos3Val = boxes[c].innerText; // boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return;
            } 
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if(playerTurn) {
            box.innerText = "O"; // player 0
            box.style.color = "#991d19";
            playerTurn = false;
        }
        else {
            box.innerText = "X"; // player X
            box.style.color = "#545454";
            playerTurn = true;
        }
        box.disabled = true;

        checkWinner();
    })
})

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);