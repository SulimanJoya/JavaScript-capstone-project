import itemsCount from './modules/itemsCount.js';
import postLike from './modules/likes.js';
import './style.css';

// eslint-disable-next-line no-unused-vars
const homeContainer = document.querySelector('.homepage');
const itemsCountSpan = document.querySelector('.recipe-count');
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const displayMeals = (meals) => {
  const borderDiv = document.createElement('div');
  borderDiv.className = 'mainCont';
  // eslint-disable-next-line array-callback-return
  meals.map((meal) => {
    const cardDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    imgDiv.className = 'meal-photo';
    imgDiv.innerHTML += `<img src=${meal.strMealThumb} alt=${meal.strMeal}>`;
    const descDiv = document.createElement('div');
    descDiv.className = 'meal-desc';
    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;
    const likesSpan = document.createElement('span');
    likesSpan.addEventListener('click', () => postLike(meal.idMeal));
    likesSpan.innerHTML += '<i class="fa-solid fa-heart"></i>';
    const likesCount = document.createElement('span');
    likesCount.innerHTML = 0;
    const commentBtn = document.createElement('button');
    commentBtn.className = 'comment-btn';
    commentBtn.textContent = 'Comment';
    const reserveBtn = document.createElement('button');
    reserveBtn.textContent = 'Reserve';
    reserveBtn.className = 'reserve-btn';
    descDiv.append(mealName, likesSpan, likesCount, commentBtn, reserveBtn);
    cardDiv.append(imgDiv, descDiv);
    borderDiv.appendChild(cardDiv);
  });
  homeContainer.append(borderDiv);
};

const fetchMeals = async () => {
  const req = await fetch(baseUrl);
  const data = await req.json();
  itemsCountSpan.innerHTML = `Recipes (${itemsCount(data.meals)})`;
  displayMeals(await data.meals);
};

window.onpageshow = fetchMeals();
