import itemsCount from './modules/itemsCount.js';
import postLike, { getLikes } from './modules/likes.js';
import './style.css';

// eslint-disable-next-line no-unused-vars
const homeContainer = document.querySelector('.homepage');
const itemsCountSpan = document.querySelector('.recipe-count');
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const displayMeals = (meals) => {
  const borderDiv = document.createElement('div');
  borderDiv.className = 'mainCont';
  // borderDiv.style.backgroundColor = 'red';
  // eslint-disable-next-line array-callback-return
  meals.map((meal) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'imgCont';
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
    const nameLike = document.createElement('div');
    nameLike.append(mealName, likesSpan);
    nameLike.className = 'name-like';
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
    btnDiv.className = 'btn-div';
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
