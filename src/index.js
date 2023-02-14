import './style.css';

// eslint-disable-next-line no-unused-vars
const homeContainer = document.querySelector('.homepage');
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c';

const displayMeals = (meals) => {
  const borderDiv = document.createElement('div');
  borderDiv.className = 'mainCont';
  // eslint-disable-next-line array-callback-return
  meals.map((meal) => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML += `<div class="meal-photo"><img src=${meal.strMealThumb} alt=${meal.strMeal}></div>
      <div class="meal-desc">
        <h2>${meal.strMeal}</h2>
        <span><i class="fa-solid fa-heart"></i></span>
        <span class="meal-likes"></span>
        <button class="comment-btn">Comments</button>
        <button class="reserve-btn">Reservation</button>
      </div>`;
    borderDiv.appendChild(cardDiv);
  });
  homeContainer.append(borderDiv);
};

const fetchMeals = async () => {
  const req = await fetch(baseUrl);
  const data = await req.json();
  displayMeals(await data.meals);
};

window.onpageshow = fetchMeals();
