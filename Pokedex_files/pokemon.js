const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colors = {
	normal: '#A8A77A',
	fire: '#ff6666',
	water: '#749bf1',
	electric: '#F7D02C',
	grass: '#00cc99',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const types = pokemon.types.map(type => type.type.name);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	
	if (types[1]) {
		pokemonEl.style.background =
			"linear-gradient(150deg," +
			colors[pokemon.types[0].type.name] +
			" 50%," +
			colors[pokemon.types[1].type.name] +
			" 50%)";
	} else {
		pokemonEl.style.background = colors[types[0]];
	}

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
            <h3 class="name">${name}</h3>
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        <div class="info">
            <small class="type">${types.join(" / ")}</small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
	instantiateListener();
}

function instantiateListener() {
	console.log(instantiateListener);
	const pokemons = document.querySelectorAll(".pokemon .name");
	const searchBox = document.querySelector(".search");

	searchBox.addEventListener("keyup", (e) => {
		console.log(e.target.value.toLowerCase());
		const input = e.target.value.toLowerCase();
		pokemons.forEach((pokemon) => {
			const name = pokemon.textContent.toLowerCase();
			if (name.indexOf(input) !== -1) {
				pokemon.parentElement.parentElement.parentElement.style.display = "flex";
			} else {
				pokemon.parentElement.parentElement.parentElement.style.display = "none";
			}
		});
	});
}

fetchPokemons();