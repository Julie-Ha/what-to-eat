//Select DOM
const dishInput = document.querySelector(".dish-input");
const dishButton = document.querySelector(".dish-button");
const dishList = document.querySelector(".dish-list");
const randomDishDiv = document.querySelector(".random-dish");
const rerollBtn = document.querySelector(".reroll-btn");

//Event Listeners
document.addEventListener("DOMContentLoaded", getDishes);
document.addEventListener("DOMContentLoaded", getRandomDish);
dishButton.addEventListener("click", addDish);
dishList.addEventListener("click", deleteDish);
rerollBtn.addEventListener("click", getRandomDish);

//Functions

function getRandomDish() {
  let dishes;
  if (localStorage.getItem("dishes") === null) {
    dishes = [];
  } else {
    dishes = JSON.parse(localStorage.getItem("dishes"));
  }

  let randomIndex = Math.floor(Math.random() * Math.floor(dishes.length));
  let randomDish = dishes[randomIndex];

  randomDishDiv.innerHTML = randomDish;
}

function addDish(e) {
  //Prevent natural behaviour
  e.preventDefault();

  //Create dish div
  const dishDiv = document.createElement("div");
  dishDiv.classList.add("dish");

  //Create list
  const newDish = document.createElement("li");
  newDish.innerText = dishInput.value;

  //Save to local - do this last
  //Save to local
  saveLocalDishes(dishInput.value);

  newDish.classList.add("dish-item");
  dishDiv.appendChild(newDish);
  dishInput.value = "";

  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  dishDiv.appendChild(trashButton);

  //attach final dish
  dishList.appendChild(dishDiv);
}

function deleteDish(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const dish = item.parentElement;
    dish.classList.add("fall");

    //at the end
    removeLocalDishes(dish);
    dish.addEventListener("transitionend", e => {
      dish.remove();
    });
  }
}

function saveLocalDishes(dish) {
  let dishes;
  if (localStorage.getItem("dishes") === null) {
    dishes = [];
  } else {
    dishes = JSON.parse(localStorage.getItem("dishes"));
  }
  dishes.push(dish);
  localStorage.setItem("dishes", JSON.stringify(dishes));
}
function removeLocalDishes(dish) {
  let dishes;
  if (localStorage.getItem("dishes") === null) {
    dishes = [];
  } else {
    dishes = JSON.parse(localStorage.getItem("dishes"));
  }
  const dishIndex = dish.children[0].innerText;
  dishes.splice(dishes.indexOf(dishIndex), 1);
  localStorage.setItem("dishes", JSON.stringify(dishes));
}

function getDishes() {
  let dishes;
  if (localStorage.getItem("dishes") === null) {
    dishes = [];
  } else {
    dishes = JSON.parse(localStorage.getItem("dishes"));
  }
  dishes.forEach(function(dish) {
    //Create dish div
    const dishDiv = document.createElement("div");
    dishDiv.classList.add("dish");

    //Create list
    const newDish = document.createElement("li");
    newDish.innerText = dish;
    newDish.classList.add("dish-item");
    dishDiv.appendChild(newDish);
    dishInput.value = "";

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    dishDiv.appendChild(trashButton);
    
    //attach final dish
    dishList.appendChild(dishDiv);
  });
}
