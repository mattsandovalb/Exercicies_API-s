const APIURL = 'https://api.github.com/users/'; //Enlace de la API

const form = document.getElementById('form'); 
const search = document.getElementById('search');
const main = document.getElementById("main");

//Creacion de la Card de User de Github
const createUserCard = (user) =>{ 
    const cardHTML = `<div class="card">
    <div>
          <img src="${user.avatar_url}"class="avatar"alt="${user.name}">
    </div>
    <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>
          <ul>
               <li>${user.followers}<strong>Followers</strong></li>
               <li>${user.following}<strong>Following</strong></li>
               <li>${user.public_repos}<strong>Repositories</strong></li>
          </ul>
          <div id="repos"></div>
    </div>
    </div>`;
    main.innerHTML = cardHTML;
};

// Funcion CardError al introducir un Usuario no existente
const createErrorCard = (message) => {
    const cardHTML = `<div class="card"><h1>${message}</h1></div>`;
    main.innerHTML = cardHTML;
};

//Funcion que añade los repositorios a la Card de Usuario
const addReposToCard = (repos) =>{
    const reposElement = document.getElementById("repos");
    repos.slice(0, 5).forEach((repo) =>{
        const repoElement = document.createElement("a");
        repoElement.classList.add("repo");
        repoElement.href = repo.html_url;
        repoElement.target = "_blank";
        repoElement.innerText = repo.name;
        reposElement.appendChild(repoElement);
    });
};

// Funcion que obten los repositorios de la API
const getRepos = async (username) => {
    try{
        const { data } = await axios(APIURL + username + "/repos?sort=created");
        addReposToCard(data);
    }catch (error) {
         createErrorCard("Problem Fetching Repos");
    }
};

//Funcion que obten los usuarios de la API
const getUser = async (username) => {
    try{
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    }catch (error){
        if(error.response.status == 404);
        createErrorCard('No Profile with this Username');
    }
};

//Funcion evento de Busqueda en el form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});


