const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/r3EIwD61vFRCzfoyQRqc/likes';

const getLikes = async () => {
  const req = await fetch(baseUrl);
  const data = await req.json();
  const ssss = await data;
  console.log(ssss);
};

const postLike = async (id) => {
  const req = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
  if (req.status === 201) {
    getLikes();
  }

  console.log(id);
};

export default postLike;
