const jokeEl = document.querySelector('.joke');
const jokeBtn = document.querySelector('.btn');
document.addEventListener('DOMContentLoaded', generateJoke);

jokeBtn.addEventListener('click', generateJoke)



// USING ASYNC/AWAIT
async function generateJoke() {
  const config = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json'
    },
  });

  const res = await ('', config)

  const data = await res.json();

  jokeEl.innerHTML = data.joke
}

//   HINTS
// USING .then()
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   }

//   >>fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke
//     })
// }