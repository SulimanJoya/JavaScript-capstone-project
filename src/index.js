import itemsCount from './modules/itemsCount.js';
import postLike, { getLikes } from './modules/likes.js';
import './style.css';

const homeContainer = document.querySelector('.homepage');
const itemsCountSpan = document.querySelector('.recipe-count');
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const displayMeals = (meals) => {
  const borderDiv = document.createElement('div');
  borderDiv.className = 'mainCont';

  meals.forEach((meal) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-div';
    const imgDiv = document.createElement('div');
    imgDiv.className = 'photo-div';
    imgDiv.innerHTML += `<img class="meal-photo" src=${meal.strMealThumb} alt=${meal.strMeal}>`;
    const descDiv = document.createElement('div');
    descDiv.className = 'meal-desc d-flex';
    const mealName = document.createElement('h2');
    mealName.textContent = meal.strMeal;
    const likesSpan = document.createElement('span');
    likesSpan.className = 'like-span';
    likesSpan.addEventListener('click', () => postLike(meal.idMeal));
    likesSpan.innerHTML += '<i class="fa-solid fa-heart"></i>';
    const nameLike = document.createElement('div');
    nameLike.append(mealName, likesSpan);
    nameLike.className = 'name-like d-flex';
    const likesCount = document.createElement('span');
    likesCount.className = 'likes-count';
    borderDiv.addEventListener('click', async () => {
      const hhh = await getLikes(meal.idMeal);
      likesCount.textContent = hhh;
    });
    likesCount.id = meal.idMeal;
    const nameLikesDiv = document.createElement('div');
    nameLikesDiv.append(nameLike, likesCount);
    const commentBtn = document.createElement('button');
    commentBtn.className = 'comment-btn';
    commentBtn.textContent = 'Comment';
    const reserveBtn = document.createElement('button');
    reserveBtn.textContent = 'Reserve';
    reserveBtn.className = 'reserve-btn';
    const btnDiv = document.createElement('div');
    btnDiv.className = 'btn-div d-flex';
    btnDiv.append(commentBtn, reserveBtn);
    descDiv.append(nameLikesDiv, btnDiv);
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
