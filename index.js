let rows = 4;
let colums = 4;

let currTile;
let otherTile; //blank tile

let turns = 0

let imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

function shuffle(imgOrder) {
    let currentIndex = imgOrder.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [imgOrder[currentIndex], imgOrder[randomIndex]] = [
            imgOrder[randomIndex], imgOrder[currentIndex]
        ];
    }

    return imgOrder;
}
shuffle(imgOrder)


console.log(imgOrder)
window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {

            //<img>
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";


            //Drag Functionality
            tile.addEventListener("dragstart", dragStart); //click to start dragging image
            tile.addEventListener("dragover", dragOver); //moving image
            tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave); //dragged image leaving another one
            tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd); // after dragend swap the two tiles
            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; //refers to the current tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //refers to the img tile being dropped
}

function dragEnd() {
    if (!otherTile.src.includes("1.png")) {
        return;
    }
    let currCoords = currTile.id.split("-"); // "0-0 -> ["0,0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;
        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

}