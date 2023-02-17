import itemsCount from '../modules/itemsCount.js';

describe('Number of Items', () => {
  const myItems = [
    {
      idMeal: 52622,
      mealName: 'Pap',
      mealImg: 'https://google.com.png',
    },
    {
      idMeal: 52622,
      mealName: 'Pap',
      mealImg: 'https://google.com.png',
    },
    {
      idMeal: 52622,
      mealName: 'Pap',
      mealImg: 'https://google.com.png',
    },
  ];
  const arrItems = [2, 'two', 'too', 'ii'];
  const emptyItem = {};

  it('count', () => {
    expect(itemsCount(myItems)).toBe(3);
  });

  it('count', () => {
    expect(itemsCount(arrItems)).toBe(4);
  });

  it('count', () => {
    expect(itemsCount(emptyItem)).toBe(0);
  });
});
