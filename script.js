// ----- data -----
const BASE_URL = "https://pokeapi.co/api/v2";

// ----- elements ------
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const statusEl = document.getElementById("status");
const cardEl = document.getElementById("pokemon-card");

// ----- functions -----
//this was a new way we learned to write a function
// const showPokemon = (pokemon) => {
//     document.getElementById("poke-sprites").src = pokemon.sprites.front_default;
//     document.getElementById("poke-sprites").alt = `Image of ${pokemon.name}`;
//     document.getElementById("poke-name").textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
//     document.getElementById("poke-id").textContent = `ID# ${pokemon.id}`;
//     document.getElementById("poke-height").textContent = `Height: ${pokemon.height / 10} m`;
//     document.getElementById("poke-weight").textContent = `Weight: ${pokemon.weight / 10} kg`;
//     document.getElementById("poke-types").textContent = `Types: ` + pokemon.types.map((item) => item.type.name).join(", ");
//     document.getElementById("poke-abilities").textContent = `Abilities: ` + pokemon.abilities.map((item) => item.ability.name).join(", ");
//     document.getElementById("poke-stats").textContent = `Stats: ` + pokemon.stats.map((item) => `${item.stat.name}: ${item.base_stat}`).join(", ");
//     cardEl.hidden = false;
// };

function showPokemon(pokemon) {

    cardEl.textContent = "";

    const pokeSprites = document.createElement("img");
    pokeSprites.src = pokemon.sprites.front_default;
    pokeSprites.alt = `Image of ${pokemon.name}`;
    pokeSprites.classList.add("image");

    const pokeName = document.createElement("h2");
    pokeName.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
    pokeName.classList.add("name");

    const pokeId = document.createElement("p");
    pokeId.textContent = `ID# ${pokemon.id}`;

    const pokeHeight = document.createElement("p");
    pokeHeight.textContent = `Height: ${pokemon.height / 10} m`;

    const pokeWeight = document.createElement("p");
    pokeWeight.textContent = `Weight: ${pokemon.weight / 10} kg`;

    const pokeType = document.createElement("p");
    pokeType.textContent = `Types: ` + pokemon.types.map((item) => item.type.name).join(", ");

    const pokeAbilities = document.createElement("p");
    pokeAbilities.textContent = `Abilities: ` + pokemon.abilities.map((item) => item.ability.name).join(", ");

    const pokeStats = document.createElement("p");
    pokeStats.textContent = `Stats: ` + pokemon.stats.map((item) => `${item.stat.name}: ${item.base_stat}`).join(", ");


    cardEl.appendChild(pokeSprites);
    cardEl.appendChild(pokeName);
    cardEl.appendChild(pokeId);
    cardEl.appendChild(pokeHeight);
    cardEl.appendChild(pokeWeight);
    cardEl.appendChild(pokeType);
    cardEl.appendChild(pokeAbilities);
    cardEl.appendChild(pokeStats);

    cardEl.hidden = false;
}

async function search(event) {
    event.preventDefault();

    //stores user input
    const pokeName = input.value.toLowerCase().trim();


    //validation
    if (pokeName === "") {
        return;
    }

    //fetching from the api link
    const response = await fetch(`${BASE_URL}/pokemon/${pokeName}`)

    //return 404 if pokemon isn't found
    if (!response.ok) {
        statusEl.textContent = "No pokemon found with that name or ID.";
        cardEl.hidden = true;
        return;
    }

    const pokemon = await response.json();


    showPokemon(pokemon);

    input.value = "";
    statusEl.textContent = "";
};


// ----- listeners ------
form.addEventListener("submit", search);

// ----- run on load -----