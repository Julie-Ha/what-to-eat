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
rerollBtn.addEventListener("click", getRandomDish);

//Functions
function getRandomDish() {
  // localStorage.clear();
  let dishes;
  if (localStorage.getItem("dishes") === null) {
    dishes = [];
  } else {
    dishes = JSON.parse(localStorage.getItem("dishes"));
  }

  if (dishes.length > 0) {
    let randomIndex = Math.floor(Math.random() * Math.floor(dishes.length));
    let randomDish = dishes[randomIndex];
    randomDishDiv.innerHTML = randomDish;
  } else {
    randomDishDiv.innerHTML = "";
  }
}

function addDish(e) {
  //Prevent natural behaviour
  e.preventDefault();

  //Create list
  const newDish = document.createElement("li");
  newDish.classList.add("dish");
  newDish.classList.add("flex");

  //Create dish div
  const dishDiv = document.createElement("div");
  dishDiv.classList.add("dish-item");
  dishDiv.classList.add("m-2");
  dishDiv.innerText = dishInput.value;

  //Save to local - do this last
  //Save to local
  saveLocalDishes(dishInput.value);

  newDish.appendChild(dishDiv);
  dishInput.value = "";

  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
  trashButton.classList.add("trash-btn");
  trashButton.classList.add("focus:outline-none");
  trashButton.classList.add("ml-auto");
  trashButton.addEventListener("click", deleteDish);
  newDish.appendChild(trashButton);

  //attach final dish
  dishList.appendChild(newDish);
}

function deleteDish(e) {
  let item = e.target;

  while (item.classList[0] !== "trash-btn") {
    item = item.parentElement;
  }

  const dish = item.parentElement;
  //at the end
  removeLocalDishes(dish);
  dish.remove();
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
  dishes.forEach(function (dish) {
    //Create list
    const newDish = document.createElement("li");
    newDish.classList.add("dish");
    newDish.classList.add("flex");

    //Create dish div
    const dishDiv = document.createElement("div");
    dishDiv.classList.add("dish-item");
    dishDiv.classList.add("m-2");
    dishDiv.innerText = dish;
    newDish.appendChild(dishDiv);

    dishInput.value = "";

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
    trashButton.classList.add("trash-btn");
    trashButton.classList.add("focus:outline-none");
    trashButton.classList.add("ml-auto");
    trashButton.addEventListener("click", deleteDish);
    newDish.appendChild(trashButton);

    //attach final dish
    dishList.appendChild(newDish);
  });
}
