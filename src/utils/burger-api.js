const api = 'https://norma.nomoreparties.space/api'

function checkError(res) {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Ошибка: ${res.status}`);
  }

export default function getIngredients() {
    return fetch(`${api}/ingredients`)
      .then((res) => checkError(res))
      .catch((e) => console.log(e))
  }