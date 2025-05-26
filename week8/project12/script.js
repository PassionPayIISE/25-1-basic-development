// 📌 DOM Elements 가져오기
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-b");
const errorContainer = document.getElementById("error-container");
const resultHeading = document.getElementById("result-heading");
const mealsContainer = document.getElementById("meals");
const mealDetails = document.getElementById("meal-details");
const backBtn = document.getElementById("back-bt");
const mealDetailsContent = document.querySelector(".meal-details-content");

// 📌 API Endpoint 설정
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

// 📌 이벤트 리스너 등록
searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeals();
});
backBtn.addEventListener("click", () => mealDetails.classList.add("hidden"));
mealsContainer.addEventListener("click", handleMealClick);

// 📌 검색 함수
async function searchMeals() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    errorContainer.textContent = "Please enter a search term";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    resultHeading.textContent = `Searching for '${searchTerm}'...`;
    mealsContainer.innerHTML = "";
    errorContainer.classList.add("hidden");

    const res = await fetch(`${SEARCH_URL}${searchTerm}`);
    const data = await res.json();

    if (data.meals === null) {
      resultHeading.textContent = "";
      mealsContainer.innerHTML = "";
      errorContainer.textContent = `No recipes found for '${searchTerm}'. Try another search term.`;
      errorContainer.classList.remove("hidden");
    } else {
      resultHeading.textContent = `Search results for '${searchTerm}'`;
      displayMeals(data.meals);
    }
    searchInput.value = "";
  } catch (error) {
    errorContainer.textContent = "Something went wrong. Try again.";
    errorContainer.classList.remove("hidden");
  }
}

// 📌 검색 결과 카드 생성
function displayMeals(meals) {
  mealsContainer.innerHTML = "";
  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
      <div class="meal" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="meal-info">
          <h3 class="meal-title">${meal.strMeal}</h3>
          <span class="meal-category">${meal.strCategory || "Uncategorized"}</span>
        </div>
      </div>`;
  });
}

// 📌 상세정보 보기 기능
async function handleMealClick(e) {
  const mealEl = e.target.closest(".meal");
  if (!mealEl) return;

  const mealId = mealEl.getAttribute("data-meal-id");
  try {
    const res = await fetch(`${LOOKUP_URL}${mealId}`);
    const data = await res.json();
    if (data.meals && data.meals[0]) {
      const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${measure || ""} ${ingredient}`);
        }
      }

      mealDetailsContent.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h2>${meal.strMeal}</h2>
        <p class="meal-category">${meal.strCategory || "Uncategorized"}</p>
        <h3>Instructions</h3>
        <p class="meal-instructions">${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul class="meal-ingredients">
          ${ingredients.map((item) => `<li><i class="fas fa-check"></i> ${item}</li>`).join("")}
        </ul>
        ${meal.strYoutube ? `<a class="youtube-link" href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i> Watch Video</a>` : ""}
      `;
      mealDetails.classList.remove("hidden");
      mealDetails.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    errorContainer.textContent = "Could not load recipe details. Try again.";
    errorContainer.classList.remove("hidden");
  }
}
