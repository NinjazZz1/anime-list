const table = document.querySelector(".table");

const myCollection = [];

function Anime(name, episodes, completedEpisodes, type) {
    this.name = name;
    this.episodes = episodes;
    this.completedEpisodes = completedEpisodes;
    this.type = type;
    this.id = crypto.randomUUID();

    this.info = function() {
        return this.name
    }
}

function addAnimeToCollection(name, episodes, completedEpisodes, type) {
    const animeToAdd = new Anime(name, episodes, completedEpisodes, type);
    myCollection.push(animeToAdd);
}

addAnimeToCollection("日常", 26, 26, "TV");
addAnimeToCollection("空の境界 俯瞰風景", 1, 1, "Movie");
addAnimeToCollection("アマガミSS", 25, 25, "TV");

addToTable();

function addToTable() {
    for (let i = 0; i < myCollection.length; i++) {
        const section = document.createElement("tr");
        table.appendChild(section);

        const title = document.createElement("td");
        title.innerHTML = myCollection[i].name;
        section.append(title);

        const totalEpisodes = document.createElement("td")
        totalEpisodes.innerHTML = myCollection[i].episodes.toString() + "/" + myCollection[i].completedEpisodes.toString();
        totalEpisodes.classList.add("center");
        section.appendChild(totalEpisodes);

        const animeType = document.createElement("td")
        animeType.innerHTML = myCollection[i].type;
        animeType.classList.add("center");
        section.appendChild(animeType);
    }
}