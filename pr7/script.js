const resources = {
    en: {
      translation: {
        "greeting": "Hello",
        "hometown": "Hometown",
        "formed": "Formed",
        "secretIdentity": "Secret identity",
        "age": "Age",
        "superpowers": "Superpowers"
      }
    },
    uk: {
      translation: {
        "greeting": "Привіт",
        "hometown": "Рідне місто",
        "formed": "Засновано",
        "secretIdentity": "Таємна особа",
        "age": "Вік",
        "superpowers": "Суперсили"
      }
    }
  };

  const localizedHeroes = {
    squadName: "Загін супергероїв",
    homeTown: "Місто Метро",
    formed: 2022,
    members: [
      {
        name: "Людина-Молекула",
        age: 29,
        secretIdentity: "Ден Джукс",
        powers: ["Стійкість до радіації", "Зменшення розмірів", "Радіаційний удар"]
      },
      {
        name: "Мадам Аперкот",
        age: 39,
        secretIdentity: "Джейн Вілсон",
        powers: ["Мільйон-тонний удар", "Стійкість до пошкоджень", "Надлюдські рефлекси"]
      },
      {
        name: "Вічне Полум’я",
        age: 1000000,
        secretIdentity: "Невідомо",
        powers: ["Безсмертя", "Імунітет до високих температур", "Пекельне полум’я", "Телепортація"]
      }
    ]
  };

  let superHeroes = [];

  i18next.init(
    { lng: "en", 
      debug: true, 
      resources },
    (err, t) => {
      if (err) return console.error(err);
      updateContent("en");
    }
  );

  document.getElementById("language-selector").addEventListener("change", function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, () => {
      updateContent(selectedLanguage);
    });
  });

  function updateContent(language) {
    document.getElementById("greeting").textContent = i18next.t("greeting");

    if (language === "uk") {
      populateHeader(localizedHeroes);
      showHeroes(localizedHeroes.members);
    } else {
      fetchSuperHeroes();
    }
  }

  function fetchSuperHeroes() {
    const requestURL = "https://semegenkep.github.io/json/example.json";
    const request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.onload = () => {
      superHeroes = request.response;
      populateHeader(superHeroes);
      showHeroes(superHeroes.members);
    };
    request.send();
  }

  function populateHeader(data) {
    const header = document.querySelector("header");
    header.innerHTML = `
      <h1>${data.squadName}</h1>
      <p>${i18next.t("hometown")}: ${data.homeTown} // ${i18next.t("formed")}: ${data.formed}</p>
    `;
  }

  function showHeroes(members) {
    const section = document.querySelector("#heroes");
    section.innerHTML = "";

    members.forEach(hero => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${hero.name}</h2>
        <p>${i18next.t("secretIdentity")}: ${hero.secretIdentity}</p>
        <p>${i18next.t("age")}: ${hero.age}</p>
        <p>${i18next.t("superpowers")}:</p>
      `;

      const powersList = document.createElement("ul");
      hero.powers.forEach(power => {
        const listItem = document.createElement("li");
        listItem.textContent = power;
        powersList.appendChild(listItem);
      });

      article.appendChild(powersList);
      section.appendChild(article);
    });
  }