const title = document.getElementById("title");
const epsWatched = document.getElementById("eps-watched");
const epsTotal = document.getElementById("eps-total");
const animeType = document.getElementById("type");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const totalAnime = document.getElementById("total-anime");
const totalWatched = document.getElementById("total-watched");

let episodesWatched = 0;

form.addEventListener("submit", (e) => {
    let messages = [];
    if (title.value === "" || title.value == null) {
        messages.push("Please enter a title");
    }

    if (epsWatched.value === "" || epsWatched.value == null) {
        messages.push("Please enter a number");
    }

    if (epsTotal.value === "" || epsTotal.value == null) {
        messages.push("Please enter a number");
    }

    if (Number(epsWatched.value) > Number(epsTotal.value)) {
        messages.push("Make sure total episodes in not greater than the amount you've watched");
    }

    if (animeType.value === "" || animeType.value == null) {
        messages.push("Please enter a type");
    }

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(", ");
    } else {
        e.preventDefault();
        addAnimeToCollection(title.value, epsWatched.value, epsTotal.value, type.value);
    }
})

const table = document.querySelector("table");

const myCollection = [];

function Anime(name, episodes, completedEpisodes, type, id) {
    this.name = name;
    this.episodes = episodes;
    this.completedEpisodes = completedEpisodes;
    this.type = type;

    this.id = id;

    this.info = function() {
        return this.name
    }
}

function addAnimeToCollection(name, episodes, completedEpisodes, type, id) {

    for (let i = 0; i < myCollection.length; i++) {
        if (myCollection[i].name === name) {
            const item = myCollection[i];
            updateAnime(i, episodes);
            return;
        }
    }

    if (id === "" || id == null) {
        id = crypto.randomUUID();
        const animeToAdd = new Anime(name, episodes, completedEpisodes, type, id);

        myCollection.push(animeToAdd);
        addToTable(animeToAdd.id);
    } else {
        const animeToAdd = new Anime(name, episodes, completedEpisodes, type, id);
        myCollection.push(animeToAdd);
        addToTable(animeToAdd.id);
    }
}

function updateAnime(item, episodes) {
    const section = document.getElementById(item.id);
    const totalEpisodes = document.querySelector(".total-eps");

    totalEpisodes.innerHTML = episodes.toString() + "/" + myCollection[item].completedEpisodes.toString();

    myCollection[item].episodes = episodes;

    const jsonArray = JSON.stringify(myCollection);
    localStorage.setItem('array', jsonArray);
    const str = localStorage.getItem('array');
    const parsedArray = JSON.parse(str);

    episodesWatched = 0;
    for (let i = 0; i < myCollection.length; i++) {
        episodesWatched += Number(myCollection[i].episodes);
    }
    console.log(episodesWatched);
    totalAnime.innerHTML = "Total Anime: " + myCollection.length;
    totalWatched.innerHTML = "Episodes Watched: " + episodesWatched;

}

function addToTable(id) {
    for (let i = 0; i < myCollection.length; i++) {
        if (myCollection[i].id === id) {
            const section = document.createElement("tr");
            section.setAttribute("id", id);
            table.appendChild(section);

            const title = document.createElement("td");
            title.innerHTML = myCollection[i].name;
            title.classList.add("title");
            section.append(title);

            const totalEpisodes = document.createElement("td")
            totalEpisodes.innerHTML = myCollection[i].episodes.toString() + "/" + myCollection[i].completedEpisodes.toString();
            totalEpisodes.classList.add("center");
            totalEpisodes.classList.add("total-eps");
            section.appendChild(totalEpisodes);

            const animeType = document.createElement("td");
            animeType.innerHTML = myCollection[i].type;
            animeType.classList.add("center");
            animeType.classList.add("type");
            section.appendChild(animeType);
        }
    }

    episodesWatched = 0;
    for (let i = 0; i < myCollection.length; i++) {
        episodesWatched += Number(myCollection[i].episodes);
    }
    console.log(episodesWatched);
    totalAnime.innerHTML = "Total Anime: " + myCollection.length;
    totalWatched.innerHTML = "Episodes Watched: " + episodesWatched;


    const jsonArray = JSON.stringify(myCollection);
    localStorage.setItem('array', jsonArray);
    const str = localStorage.getItem('array');
    const parsedArray = JSON.parse(str);

}

const str = localStorage.getItem('array');
const parsedArray = JSON.parse(str);

for (let i = 0; i < parsedArray.length; i++) {
     addAnimeToCollection(parsedArray[i].name, parsedArray[i].episodes, parsedArray[i].completedEpisodes, parsedArray[i].type, parsedArray[i].id); 
}

// localStorage.clear();
