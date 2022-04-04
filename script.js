const input = document.querySelector(".search");
const form = document.querySelector(".form");
const container = document.querySelector(".container");

async function getFood(val) {
  const food = await (
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
  ).json();
  let foods = food.meals;
  foods.forEach((element) => {
    renderHtml(element);
  });
}

function renderHtml(obj) {
  let html = `
<div class="cart">
  <div class="card__front">
    <img class="img" src="${obj.strMealThumb}" alt="" />
    <div class="content">
      <h1 class="food__name">name:  ${obj.strMeal}</h1>
      <h1 class="food__catecory">category:  ${obj.strCategory}</h1>
      <h1 class="food__country">country: ${obj.strArea}</h1>
    </div>
    <button class="btn">see resept</button>
  </div>
  <div class="card__back">
    <h1 class="resept__name">${obj.strMeal}</h1>
    <h2 class="resept__title">resept</h2>
    <p class="resept">${obj.strInstructions}</p>
    <p class="closeBtn">X</p>
  </div>
</div>`;
  container.insertAdjacentHTML("afterbegin", html);
}

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    e.target.closest(".card__front").style.transform = "rotateY(180deg)";
    e.target.closest(".card__front").nextElementSibling.style.transform =
      "rotateY(0)";
  }
  if (e.target.classList.contains("closeBtn")) {
    console.log(e.target.closest(".card__back"));
    e.target.closest(".card__back").style.transform = "rotateY(-180deg)";
    e.target.closest(".card__back").previousElementSibling.style.transform =
      "rotateY(0)";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  container.innerHTML = "";
  getFood(input.value);
  input.value = "";
});
