const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = () => {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
};

function populateHeader({ squadName, homeTown, formed }) {
    const header = document.querySelector("header");
    header.innerHTML = `
        <h1>${squadName}</h1>
        <p>Hometown: ${homeTown} // Formed: ${formed}</p>
    `;
}

function showHeroes({ members }) {
    const section = document.querySelector("section");

    members.forEach(hero => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h2>${hero.name}</h2>
            <p>Secret identity: ${hero.secretIdentity}</p>
            <p>Age: ${hero.age}</p>
            <p>Superpowers:</p>
        `;

        const myList = document.createElement("ul");
        hero.powers.forEach(power => {
            const listItem = document.createElement("li");
            listItem.textContent = power;
            myList.appendChild(listItem);
        });

        article.appendChild(myList);
        section.appendChild(article);
    });
}
