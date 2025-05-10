const title = document.getElementById("title");
const epsWatched = document.getElementById("eps-watched");
const epsTotal = document.getElementById("eps-total");
const animeType = document.getElementById("type");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const totalAnime = document.getElementById("total-anime");
const totalWatched = document.getElementById("total-watched");
const resetBtn = document.querySelector(".resetBtn");

class Anime {
    constructor(name, episodes, maxEpisodes, type) {
        this.name = name;
        this.episodes = episodes;
        this.maxEpisodes = maxEpisodes;
        this.type = type;

        this.id = crypto.randomUUID();;
    }

    info() {
        return this.name;
    }
}

function checkAnime(name, episodes, maxEpisodes, type) {
    const board = Display.getCollection();

    for (let i = 0; i < board.length; i++) {
        if (board[i].name == name) {
            Display.updateAnime(i, episodes, maxEpisodes); 
            return;
        }
    }
    const anime = new Anime(name, episodes, maxEpisodes, type);
    Display.addAnime(anime);    
}

const Display = (() => {
    let collection = [];

    let episodesWatched = 0;

    const updateStats = () => {
        episodesWatched = 0;
        for (let i = 0; i < collection.length; i++) {
            episodesWatched += Number(collection[i].episodes);
        }
        totalAnime.innerHTML = "Total Anime: " + collection.length;
        totalWatched.innerHTML = "Episodes Watched: " + episodesWatched;
    }

    const render = () => {
        clear();
        sortList();
        collection.forEach((anime, index) => {
            let tableType = "";

            if (anime.episodes == anime.maxEpisodes) {
                tableType = ".table-completed";
            } else { tableType = ".table-watching"; }

            const table = document.querySelector("" + tableType.toString());
            // Append section
            const section = document.createElement("tr");
            section.setAttribute("id", anime.id);
            section.classList.add("section");
            table.appendChild(section);

            const title = document.createElement("td");
            title.innerHTML = anime.name;
            title.classList.add("title");
            section.append(title);

            const totalEpisodes = document.createElement("td")
            totalEpisodes.innerHTML = anime.episodes.toString() + "/" + anime.maxEpisodes.toString();
            totalEpisodes.classList.add("center");
            totalEpisodes.classList.add("total-eps");
            section.appendChild(totalEpisodes);

            const animeType = document.createElement("td");
            animeType.innerHTML = anime.type;
            animeType.classList.add("center");
            animeType.classList.add("type");
            section.appendChild(animeType);
        })

        updateStats();
    }

    const getCollection = () => collection;

    const updateAnime = (index, episodes, maxEpisodes) => {
        const section = document.getElementById("" + collection[index].id.toString());
        const totalEpisodes = section.querySelector(".total-eps");

        collection[index].episodes = episodes;
        collection[index].maxEpisodes = maxEpisodes;

        totalEpisodes.innerHTML = episodes.toString() + "/" + maxEpisodes.toString();
        render();
        DataManager.save();
    }

    const addAnime = (anime) => {
        collection.push(anime);
        render();
        DataManager.save();
    }

    const clear = () => {
        const elements = document.getElementsByClassName("section");
        while(elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    const resetCollection = () => {
        collection = [];
    }

    const sortList = () => {
        collection.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
        addAnime,
        getCollection,
        clear,
        updateAnime,
        render, 
        resetCollection,
    }
})();

const DataManager = (() => {
    const save = () => {
        collection = Display.getCollection();
        const jsonArray = JSON.stringify(collection);
        localStorage.setItem('array', jsonArray);
        const str = localStorage.getItem('array');
        const parsedArray = JSON.parse(str);
    }

    const load = () => {
        const str = localStorage.getItem('array');
        const parsedArray = JSON.parse(str);
        
        if (parsedArray) {
            for (let i = 0; i < parsedArray.length; i++) {
                checkAnime(parsedArray[i].name, parsedArray[i].episodes, parsedArray[i].maxEpisodes, parsedArray[i].type, parsedArray[i].id); 
            }
        }
    }

    const clearData = () => {
        localStorage.clear();
        Display.resetCollection();
        Display.render();
    }

    return {
        save,
        load,
        clearData,
    }
})();

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
        checkAnime(title.value, epsWatched.value, epsTotal.value, type.value);
    }
})

resetBtn.addEventListener("click", DataManager.clearData);

DataManager.load();
