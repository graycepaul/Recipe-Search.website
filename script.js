const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search");
const resultsList = document.querySelector("#results");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchRecipes();
});

function searchRecipes() {
  const searchValue = searchInput.value.trim();
  fetch(
    `https://api.edamam.com/search?q=${searchValue}&app_id=d7ee9e91&app_key=ec83ab5b48b3235e205f1deb042ab522&from=3&to=6`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayRecipes(data.hits);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  console.log(data);
}

function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe) => {
    html += `
    <div class="recipe-container">
      <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}"> 
      <div class="recipe-content">
        <h3>${recipe.recipe.label}</h3>
        <ul>${recipe.recipe.ingredientLines
          .map((ingredient) => `<li class="list-item">${ingredient}</li>`)
          .join("")}
        </ul> 
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
      </div>
    </div>`;
  });
  resultsList.innerHTML = html;
}
