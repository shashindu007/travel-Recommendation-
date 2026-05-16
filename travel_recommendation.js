const searchBtn = document.getElementById("btn-search");
const clearBtn = document.getElementById("btn-clear");
const resultDiv = document.getElementById("resultDiv");

function clearInput() {
  document.getElementById("destinationSearch").value = "";
  resultDiv.innerHTML = "";
}

function showResults(results) {
  resultDiv.innerHTML = "";

  results.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${item.imageUrl}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    resultDiv.appendChild(card);
  });
}

function handleSearch() {
  const keyword = document
    .getElementById("destinationSearch")
    .value.trim()
    .toLowerCase();

  if (keyword === "") {
    alert("Please enter a keyword like Beach, Temple, or Country.");
    return;
  }

  const isBeach = keyword === "beach" || keyword === "beaches";
  const isTemple = keyword === "temple" || keyword === "temples";
  const isCountry = keyword === "country" || keyword === "countries";

  if (!isBeach && !isTemple && !isCountry) {
    alert("No results found! Try Beach, Temple, or Country.");
    clearInput();
    return;
  }

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let results = [];

      if (isBeach) {
        results = data.beaches;
      } else if (isTemple) {
        results = data.temples;
      } else if (isCountry) {
        data.countries.forEach((country) => {
          country.cities.forEach((city) => {
            results.push({
              name: city.name,
              imageUrl: city.imageUrl,
              description: city.description,
            });
          });
        });
      }

      showResults(results);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Could not load data. Please open the site with a local server (e.g., Live Server) and try again.");
    });
}

searchBtn.addEventListener("click", handleSearch);
clearBtn.addEventListener("click", clearInput);