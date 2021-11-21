var character = document.getElementById("character");
var game = document.getElementById("game");

var overText = document.getElementById("over");
var scoreText = document.getElementById("score")
var otherText = document.getElementById("other")

var interval;
var both = 0;
var counter = 0;

var speed = 1;
var spawnSpeed = 0.4;

var currentBlocks = [];

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - speed + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + speed + "px";
    }
}

document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
        if (event.key === "a") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "d") {
            interval = setInterval(moveRight, 1);
        }
        if (event.key === "r") {
            location.reload()
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});


setInterval(function () {
    spawnSpeed += 0.01
}, 1000);

var blocks = setInterval(function () {
    speed = 1

    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));

    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if (blockLastTop < 520 || counter == 0) {

        var block = document.createElement("div");
        var hole = document.createElement("div");

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");

        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);

        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        var rand1 = Math.floor(Math.random() * 360);

        hole.style.left = rand1 + "px";

        game.appendChild(block);
        game.appendChild(hole);

        currentBlocks.push(counter);

        counter++;
    }

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));

    var drop = 0;

    if (characterTop <= 0) {
        overText.innerHTML = "GAME OVER!";
        scoreText.innerHTML = "Score: " + counter;
        otherText.innerHTML = "Press R or Reload to RESTART"
        game.remove()
        clearInterval(blocks);
    }

    if (characterTop >= 550) {
        character.style.top = 340 + "px";
    }
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];

        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        iblock.style.top = iblockTop - spawnSpeed + "px";
        ihole.style.top = iblockTop - spawnSpeed + "px";

        if (iblockTop < 5) {
            currentBlocks.shift();

            iblock.remove();
            ihole.remove();
        }
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }

    if (drop == 0) {
        if (characterTop < 615) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);