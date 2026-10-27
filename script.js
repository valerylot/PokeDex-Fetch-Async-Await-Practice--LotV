// ----- data -----
const BASE_URL = "https://pokeapi.co/api/v2";

// ----- elements ------
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const statusEl = document.getElementById("status");
const cardEl = document.getElementById("pokemon-card");
const teamEl = document.getElementById("team");

// ----- functions -----

const showPokemon = (pokemon) => {
    document.getElementById("poke-sprites").src = pokemon.sprites.front_default;
    document.getElementById("poke-name").textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
    document.getElementById("poke-id").textContent = `ID# ${pokemon.id}`;
    document.getElementById("poke-height").textContent = `Height: ${pokemon.height / 10} m`;
    document.getElementById("poke-weight").textContent = `Weight: ${pokemon.weight / 10} kg`;
    document.getElementById("poke-types").textContent = `Types: ` + pokemon.types.map((item) => item.type.name).join(", ");
    document.getElementById("poke-abilities").textContent = `Abilities: ` + pokemon.abilities.map((item) => item.ability.name).join(", ");
    document.getElementById("poke-stats").textContent = `Stats: ` + pokemon.stats.map((item) => `${item.stat.name}: ${item.base_stat}`).join(", ");
    cardEl.hidden = false;
};

async function search(event) {
    event.preventDefault();

    //stores user input
    const pokeName = input.value.toLowerCase().trim();

    //validation
    if (pokeName === "") {
        return;
    }



    const response = await fetch(`${BASE_URL}/pokemon/${pokeName}`)

    const pokemon = await response.json();

    showPokemon(pokemon);

    input.value = "";

};


// ----- listeners ------
form.addEventListener("submit", search);

// ----- run on load -----