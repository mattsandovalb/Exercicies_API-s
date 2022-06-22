const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}
const mainTypes = Object.keys(colors);

//Funcion que valida el numero de pokemons que le hemos dado en la variable pokemon_count.
const fetchPokemons = async ()=> {
	for(let i=1; i<=pokemon_count; i++){
		await getPokemon(i);
	}
}

//Funcion que llama a la API
const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
}

fetchPokemons();
//Funcion que añade el pokemon al HTML
function createPokemonCard(pokemon){
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	const pokeTypes = pokemon.types.map(el => el.type.name);
	const type = mainTypes.find(type => pokeTypes.indexOf(type)> -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokemonEl);
}



