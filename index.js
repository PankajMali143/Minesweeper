//count for result
let count = 0;
//array for store bom in anywhere
var mineArray = [];

//container for adding new created cell
var mainContainer = document.getElementsByClassName("mainContainer");

//creating new div(cell) in maincontainer using createGrid() function
createGrid();

//random position for mine place  using createRandomNumber() function
createRandomNumber();



function createGrid() {
  for (let i = 1; i < 82; i++) {
    var box = document.createElement('div');
    box.id = ('cell_' + i);
    box.className = "grid";
    //adding event listener per click
    box.addEventListener('click', box_Click_Handle);
    mainContainer[0].appendChild(box);
  }
}



function createRandomNumber() {

  for (var i = 0; i < 10; i++) {

    var temp = Math.floor(Math.random() * 81) + 1;

    while (mineArray.includes(temp)) {
      temp = Math.floor(Math.random() * 81) + 1;
    }
    mineArray.push(temp);
  }
}

//checking bom is there or not
function onclickCheckRandomNumber(temp) {
  //remove event listener per click on cell

  document.getElementById("cell_"+temp).removeEventListener("click",box_Click_Handle);

  if (mineArray.includes(temp)) {
    
    return true;
  } else {
    return false;
  }

}

//changing bakground color of cell after click 
function colorChangeFunction(temp) {
  document.getElementById("cell_" + temp).style.backgroundColor = "green";
  document.getElementById("cell_" + temp).style.cursor="not-allowed";
}

function removeEventListener() {

  for (var i = 1; i <= 81; i++) {
    document.getElementById("cell_" + i).removeEventListener("click", box_Click_Handle);
  }

}


function showBombs() {

  for (var i = 0; i < 10; i++) {
   
    document.getElementById("cell_" + mineArray[i]).style.cursor="not-allowed"
    document.getElementById("cell_" + mineArray[i]).style.backgroundImage = "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
    document.getElementById("cell_" + mineArray[i]).style.backgroundRepeat ="no-repeat";
    document.getElementById("cell_" + mineArray[i]).style.backgroundColor = "red";
    document.getElementById("cell_" + mineArray[i]).style.backgroundPosition="center";
    
  }

}

function bomclicked() {

  document.getElementById("resultDisplay").innerHTML = "game over"
  removeEventListener();
  showBombs();

}

//cell click handle function
function box_Click_Handle(e) {

  var cellNumber = Number(e.target.id.slice(5));
  var result = onclickCheckRandomNumber(cellNumber);
  
  if (result) {
    bomclicked(); 
  } else {
    count = count + 1;
    colorChangeFunction(cellNumber); 
    document.getElementById("gameScore").innerHTML = count;
    if (count === 71) {
      gameWon();
    }
  }
}

//game win function
function gameWon() {
  document.getElementById("resultDisplay").innerHTML = "win";
  removeEventListener();
  showBombs();

}

//making mineArray empty after reset game click button
function popOutRandomNumbers() {
  mineArray=[];
}


//adding  event listener after reset click button
function addingEventListener() {
  for (var i = 1; i <= 81; i++) {
    document.getElementById("cell_" + i).addEventListener("click", box_Click_Handle);
  }

}

function removeBomb()
{
  console.log("i am in remove bomb")
  for(var i=1;i<=81;i++){
    document.getElementById("cell_"+i).style.backgroundImage="";
    document.getElementById("cell_"+i).removeAttribute("style");
  }
}

function resetAll() {
  //remove bomb 
  removeBomb();
  //making mineArray empty after reset game click button
  popOutRandomNumbers();
  //making mineArray  after reset game click button
  createRandomNumber();
  //adding event listener to all cell
  addingEventListener();
  //making game score zero
  count=0;
  //result disply null
  document.getElementById("resultDisplay").innerText = "";
  //making game score zero
  document.getElementById("gameScore").innerText = 0;

}


