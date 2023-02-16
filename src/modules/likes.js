const baseUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/r3EIwD61vFRCzfoyQRqc/likes';

const getLikes = async id => {
  const req = await fetch(baseUrl);
  const processing = await req.json();
  const data = await processing;
  const myLike = await data.filter(el => el.item_id === id);
  return myLike?.[0]?.likes ?? 0;
};

const postLike = async id => {
  let liked = 0;
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  }).then(async data => {
    if (data.status === 201) {
      liked = await getLikes(id);
    }
  });
  document.getElementById(id).textContent = liked;
  return liked;
};

export default postLike;
export { getLikes };
