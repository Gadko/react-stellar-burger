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

export function postInfoOrder(id) {
  return fetch(`https://norma.nomoreparties.space/api/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "ingredients": id
  } )
  })
    .then((res) => checkError(res))
    .catch((e) => console.log(e))
}