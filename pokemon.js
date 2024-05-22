	function getGif() {	
		var searchbox = $(".gif-search .search");
		gifCache = {};

		var xhr = $.get("http://api.giphy.com/v1/stickers/search?q=pokemon&api_key=xyy2YYLfbLrwBGMgRtQKRJ2VhapPr6N2&limit=30");
		xhr.done(function(data) { 
			var gifs = data.data
			for (i in gifs) {
				$('.gif-search .gif-container').append("<img src='"+gifs[i].images.original.url+"' style='height: 100px; width: 100px;'/>");
			}
		});

		searchbox.on('keyup', function () {
			var input = this.value
			$('.gif-search .gif-container').empty();
			var xhr = $.get("http://api.giphy.com/v1/stickers/search?q=pokemon+'"+input.split(" ").join("+")+"'&api_key=xyy2YYLfbLrwBGMgRtQKRJ2VhapPr6N2&limit=30");
			xhr.done(function(data) { 
				var gifs = data.data
				for (i in gifs) {
					$('.gif-search .gif-container').append("<img src='"+gifs[i].images.original.url+"' style='height: 100px; width: 100px;'/>");
				}
			});
		})
	}

	const poke_container = document.getElementById('poke_container');
	const pokeCache = {};
	const pokeDescCache = {};
	const pokeGenderCache = {};
	const pokeEggCache = {};
	const pokeCycleCache = {};
	const moveCache = {};
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

	const hex2rgba = (hex, alpha = 1) => {
	  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
	  return `rgba(${r},${g},${b},${alpha})`;
	};

	function toFeet(meter) {
		inches = (meter*0.393700787).toFixed(0);
		feet = Math.floor(inches / 12);
		inches %= 12;
		return `${feet}' ${inches.toString().padStart(2, '0')}"`;
	};

	function capitalizeStr(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const fetchPokemons = async () => {
		for (let i = 1; i <= pokemons_number; i++) {
			await getPokemon(i);
		}
	};

	const getPokemon = async (id) => {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		createPokemonCard(data);
		instantiateListener();
	};

	function createPokemonCard(pokemon) {
		const pokemonEl = document.createElement('div');
		pokemonEl.classList.add('pokemon');
		pokemonEl.setAttribute(`onclick`, `selectPokemon(${pokemon.id})`);

		const types = pokemon.types.map(type => type.type.name);
		const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
		
		if (types[1]) {
			pokemonEl.style.background =
			`linear-gradient(to bottom right, ${colors[types[0]]}, ${colors[types[1]]})`;
			pokemonEl.style.setProperty('--color1', colors[types[0]]);
			pokemonEl.style.setProperty('--color2', colors[types[1]]);
		} else {
			pokemonEl.style.background = `linear-gradient(to bottom right, ${hex2rgba(colors[types[0]])}, ${hex2rgba(colors[types[0]], 0)})`;
			pokemonEl.style.setProperty('--color1', colors[types[0]]);
			pokemonEl.style.setProperty('--color2', "white");
		}

		const pokeInnerHTML = `
			<div class="pokeball"></div>
	        <div class="img-container">
	            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
	            <p class="name">${name}</p>
	            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
	        </div>
	        <div class="info">
	            <small class="type">${types.join(" / ")}</small>
	        </div>
	    `;

		pokemonEl.innerHTML = pokeInnerHTML;

		poke_container.appendChild(pokemonEl);
	};

	const selectPokemon = async (id) => {
		if (!pokeCache[id]) {
			const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
			const res = await fetch(url);
			const pokemon = await res.json();
			pokeCache[id] = pokemon;
			return displayPopup(pokemon), getDesc(id);
		}
		return displayPopup(pokeCache[id]), showDesc(pokeDescCache[id]), showGender(pokeGenderCache[id]), showEgg(pokeEggCache[id]),  showCycle(pokeCycleCache[id]);
	};

	const displayPopup = (pokemon) => {
		const types = pokemon.types.map( type => type.type.name);
		const abilities = pokemon.abilities.map( ability => capitalizeStr(ability.ability.name) );
		const overlay = document.querySelector('.overlay');	
		const moves = pokemon.moves.map( move => move.move.name);
		console.log(pokemon);

		if (types[1]) {
			typeString = `
				<small class="type1">${types[0]}</small>
				<small class="type2">${types[1]}</small>
			`;
		} else {
			typeString = `
				<small class="type1">${types[0]}</small>
			`;
		}

		const htmlString = `
			<div class="popup">
				<button id="closeBtn" onclick="closePopup()"><span class="material-icons-outlined" style="font-size: 38px">expand_more</span></button>
				<div class="img-container">
		            <div class="center"><img src="http://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif" alt="${pokemon.name}" /></div>
		            <h3 class="name">${pokemon.name}</h3>
		            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
		        </div>
		        <div class="info">
		            ${typeString}
		        </div>	
		        <div class="details">
		        	<div class="tabs">
		        		<input type="radio" name="tabs" id="tab1" checked>
		        		<label for="tab1">About</label>
		        		<input type="radio" name="tabs" id="tab2">
		        		<label for="tab2">Base Stats</label>
		        		<input type="radio" name="tabs" id="tab3">
		        		<label for="tab3">Moves</label>
		        		<div class="tab-indicator"></div>
		        		<div id="tab-content1" class="tab-content">
		        			<section id="description">
	        					<p class="description"></p>
	        				</section>
	        				<section id="physique">
	        					<div class="physique">
	        						<p class="height">Height<br>${toFeet(pokemon.height*10)}</br></p>
	        						<p class="weight">Weight<br>${(pokemon.weight/10*2.2046).toFixed(1)} lbs</br></p>
	        					</div>
	        				</section>
	        				<section id="breed">
	        					<h3 class="breed-h">Breeding</h3>
	        					<div class="breed">
	        						<p class="gender"></p>
	        						<p class="egg-group"></p>
	        						<p class="egg-cycle"></p>
	        						<p class="ability">Abilities &emsp;&emsp;&emsp;&emsp;${abilities.join(", ")}</p>
	        					</div>
	        				</section>
	    				</div>
	    				<div id="tab-content2" class="tab-content">
	        				<div class="poke-stats-name">HP: &emsp;&nbsp;&emsp;&nbsp;&emsp; ${pokemon.stats[0].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[0].base_stat*100/255}%, grey ${pokemon.stats[0].base_stat*100/255}%, grey ${(1-(pokemon.stats[0].base_stat/255))*100}%"></div>
	          				</div>
	          				<div class="poke-stats-name">Attack: &emsp;&emsp;${pokemon.stats[1].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[1].base_stat*100/190}%, grey ${pokemon.stats[1].base_stat*100/190}%, grey ${(1-(pokemon.stats[1].base_stat/190))*100}%"></div>
	          				</div>
	          				<div class="poke-stats-name">Defense: &emsp; ${pokemon.stats[2].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[2].base_stat*100/230}%, grey ${pokemon.stats[2].base_stat*100/230}%, grey ${(1-(pokemon.stats[2].base_stat/230))*100}%"></div>
	          				</div>
	          				<div class="poke-stats-name">Sp. Atk:&emsp;&emsp;${pokemon.stats[3].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[3].base_stat*100/194}%, grey ${pokemon.stats[3].base_stat*100/194}%, grey ${(1-(pokemon.stats[3].base_stat/194))*100}%"></div>
	      					</div>			
	          				<div class="poke-stats-name">Sp. Def:&emsp;&emsp;${pokemon.stats[4].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[4].base_stat*100/230}%, grey ${pokemon.stats[4].base_stat*100/230}%, grey ${(1-(pokemon.stats[4].base_stat/230))*100}%"></div>
	          				</div>
	          				<div class="poke-stats-name">Speed: &emsp;&emsp; ${pokemon.stats[5].base_stat}
	          				<div class="poke-stats-bar" style="background: linear-gradient(to right, 
	          					var(--color1) ${pokemon.stats[5].base_stat*100/180}%, grey ${pokemon.stats[5].base_stat*100/180}%, grey ${(1-(pokemon.stats[5].base_stat/180))*100}%"></div>
	          				</div>
	    				</div>
	    				<div id="tab-content3" class="tab-content">
	        				<div class="move-container"></div>
	        				<div class="move-info"></div>
	    				</div>
		        	</div>
		        </div>
			</div>
		`;
		poke_container.innerHTML = htmlString + poke_container.innerHTML; 

		overlay.style.display = "flex";

		const pokemonEl = document.querySelector('.popup .img-container');
		if (types[1]) {
		pokemonEl.style.background =
			`linear-gradient(to bottom right, ${colors[pokemon.types[0].type.name]}, ${colors[pokemon.types[1].type.name]})`;
			pokemonEl.parentElement.style.setProperty('--color1', hex2rgba(colors[types[0]], 0.6));
			pokemonEl.parentElement.style.setProperty('--color2', hex2rgba(colors[types[1]], 0.6));
		} else {
			pokemonEl.style.background = 
			`linear-gradient(to bottom right, ${hex2rgba(colors[types[0]])}, white)`;
			pokemonEl.parentElement.style.setProperty('--color1', hex2rgba(colors[types[0]], 0.8));
		}

		const container = document.querySelector(".popup .move-container");
		pokemonEl.classList.add('move');
		for (let i=0; i <= moves.length-1; i++) {
			moveName = moves[i].slice(0);
			num = (i+1).toString().split("");
			space = Array(15 - 3*num.length).fill('&nbsp;');
			const moveEl = moves[i].split("-").map(move => capitalizeStr(move)).join(" ");
			const moveInnerHtml = `<div class="move" onclick="selectMove('${moveName}')">${i+1}. ${space.join("")}${moveEl}</div>`
			container.innerHTML = container.innerHTML + moveInnerHtml;
		}
	};

	const closePopup = () => {
		const popup = document.querySelector('.popup');
		const overlay = document.querySelector('.overlay');	
		popup.classList.toggle("out");
		setTimeout(function() {
			popup.parentElement.removeChild(popup);
			overlay.style.display = "none";
		}, 800);
		instantiateListener();
		
	};

	const selectMove = async (name) => {
		if (!moveCache[name]) {
			const url = `http://pokeapi.co/api/v2/move/${name}`;
			const res = await fetch(url);
			const move = await res.json();
			moveCache[name] = move;
			console.log(moveCache[name]);
			return displayMove(move);
		}
		return displayMove(moveCache[name]);
	};

	const displayMove = (move) => {
		if (move.accuracy == null) {
			accur = "-";
		} else{
			accur = move.accuracy;
		}
		if (move.power == null) {
			pow = "-";
		} else {
			pow = move.power;
		}
		pp = move.pp;
		type = capitalizeStr(move.type.name);
		const info = document.querySelector(".popup .move-info");
		info.style.display = "block";
		moveHtml = `
			<div class="box">
				<div class="move-stat">Power &emsp;&emsp;&nbsp;${pow}
					<div class="stat-bar" style="background: linear-gradient(to right, 
					var(--color1) ${pow*100/250}%, grey ${pow*100/250}%, grey ${(1-(pow/180))*100}%"></div>
				</div>
				<div class="move-stat">Accuracy &emsp;${accur}
					<div class="stat-bar" style="background: linear-gradient(to right, 
					var(--color1) ${accur}%, grey ${accur}%, grey ${100-accur}%"></div>
				</div>
				<div class="move-stat">PP&emsp;&emsp;&emsp;&emsp;${pp}</div>
				<div class="move-stat">Type &emsp;&emsp;&emsp;${type}</div>
			</div>
		`;
		info.innerHTML = moveHtml;
	};

	const getDesc = async (id) => {
		const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
		const res = await fetch(url);
		const pokemon = await res.json();
		let tempDescription = [];
	    tempDescription = pokemon.flavor_text_entries.filter(flavor => flavor.language.name === 'en').map(item => item.flavor_text);
	    desc = tempDescription[5].replace(/\n/g, " ");
	    gend = pokemon.gender_rate;
	    eggGroup = pokemon.egg_groups.map(group => capitalizeStr(group.name)).join(", ");
	    eggCycle = pokemon.hatch_counter;
	    pokeDescCache[id] = desc;
	    pokeGenderCache[id] = gend;
		pokeEggCache[id] = eggGroup;
		pokeCycleCache[id] = eggCycle;
	    
	    const description = document.querySelector(".popup .description");
	    description.innerHTML = desc;

	    const gender = document.querySelector(".popup .gender");
	    if (gend > 0) {
		    gender.innerHTML = `Gender &emsp;&emsp;&emsp;&emsp;
			    <span class="material-icons-outlined">male</span>&emsp;&nbsp;${(1- (gend * (1/8)))*100}% 
			    <span class="material-icons-outlined">female</span>&emsp;${(gend * (1/8))*100}%
		    `;
		} else {
			gender.innerHTML = `Gender &emsp;&emsp;&emsp;&nbsp;&nbsp;
				<span class="material-icons-outlined">male</span>-
				<span class="material-icons-outlined">female</span>-
			`
		}

		const group = document.querySelector(".popup .egg-group");
		group.innerHTML = `Egg Groups &emsp;&nbsp;&emsp;&nbsp;
			${eggGroup}
		`;

		const hatch = document.querySelector(".popup .egg-cycle");
		hatch.innerHTML = `Egg Cycle &emsp;&emsp;&emsp;&nbsp;
			${eggCycle}
		`;

	};

	function showDesc(description) {
		const html_desc = document.querySelector(".popup .description");
	    html_desc.innerHTML = description;
	};

	function showGender(gender) {
		const html_gend = document.querySelector(".popup .gender");
		if (gender > 0) {
		    html_gend.innerHTML = `Gender &emsp;&emsp;&emsp;&emsp;
			    <span class="material-icons-outlined">male</span>&emsp;&nbsp;${(1- (gender * (1/8)))*100}% 
			    <span class="material-icons-outlined">female</span>&emsp;${(gender * (1/8))*100}%
		    `;
		} else {
			html_gend.innerHTML = `Gender &emsp;&emsp;&emsp;&nbsp;&nbsp;
				<span class="material-icons-outlined">male</span>-
				<span class="material-icons-outlined">female</span>-
			`;
		}
	};

	function showEgg(egg) {
		const html_egg = document.querySelector(".popup .egg-group");
		html_egg.innerHTML = `Egg Groups &emsp;&emsp;&nbsp;&nbsp;
			${egg}
		`;
	};

	function showCycle(hatch) {
		const cycle = document.querySelector(".popup .egg-cycle");
		cycle.innerHTML = `Egg Cycle &emsp;&emsp;&emsp;&nbsp;
			${eggCycle}
		`;
	};


	function instantiateListener() {
		const pokeName = document.querySelectorAll(".pokemon .name");
		const searchBox = document.querySelector(".search");

		searchBox.addEventListener("keyup", (e) => {
			const input = searchBox.value.toLowerCase();
			pokeName.forEach((pokemon) => {
				const name = pokemon.textContent.toLowerCase();
				if (name.indexOf(input) !== -1) {
					pokemon.parentElement.parentElement.style.display = "flex";
				} else {
					pokemon.parentElement.parentElement.style.display = "none";
				}
			});
		});
	};

	function openGifSearch() {
		const openTab = document.querySelector(".gif-searchbox");
		const searchTab = document.querySelector(".gif-search");
		const leftArr = document.getElementById("arrow-left");
		const rightArr = document.getElementById("arrow-right");
		const overlay = document.querySelector('.overlay');	

		overlay.style.display = "flex";
		overlay.style.zIndex = "11";
		leftArr.style.display = "none";
		rightArr.style.display = "block";
		openTab.setAttribute("onclick", "closeGifSearch()");
		openTab.style.right = "400px";
		searchTab.style.right = "0";
		getGif();
	};

	function closeGifSearch() {
		const openTab = document.querySelector(".gif-searchbox");
		const searchTab = document.querySelector(".gif-search");
		const leftArr = document.getElementById("arrow-left");
		const rightArr = document.getElementById("arrow-right");
		const overlay = document.querySelector('.overlay');	

		overlay.style.zIndex = "13";

		setTimeout(function() {
			overlay.style.display = "none";
		}, 600);

		rightArr.style.display = "none";
		leftArr.style.display = "block";
		openTab.setAttribute("onclick", "openGifSearch()");
		openTab.style.right = "0px";
		searchTab.style.right = "-400px";
	}

	fetchPokemons();