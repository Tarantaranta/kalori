function openFoodSearch(meal) {
    currentMeal = meal;
    foodSearchOverlay.style.display = "block";
    foodSearchInput.value = "";
    foodSearchResults.innerHTML = ""; // Sonuçları sıfırla
}

// Sayfa tamamen yüklendiğinde çalışacak fonksiyonlar
document.addEventListener("DOMContentLoaded", function () {
    const caloriesTaken = document.getElementById("calories-taken");
    const caloriesBurned = document.getElementById("calories-burned");
    const caloriesLeft = document.getElementById("calories-left");

    const mealCalories = {
        breakfast: document.getElementById("calories-breakfast"),
        lunch: document.getElementById("calories-lunch"),
        snacks: document.getElementById("calories-snacks"),
        dinner: document.getElementById("calories-dinner"),
    };

    const foodSearchOverlay = document.getElementById("food-search-overlay");
    const foodSearchInput = document.getElementById("food-search-input");
    const foodSearchResults = document.getElementById("food-search-results");
    const closeSearchButton = document.getElementById("close-search-button");

    let currentMeal = ''; // Hangi öğünün seçildiğini takip eder

    // Water Tracker
    const addWater = (amount) => {
        const consumedWaterElem = document.getElementById('consumed-water');
        let currentWater = parseInt(consumedWaterElem.textContent);
        currentWater += amount;
        consumedWaterElem.textContent = currentWater + ' ml';
    };

    // Update Calories
    const updateCalories = () => {
        const totalCalories = Object.values(mealCalories).reduce((sum, elem) => sum + parseInt(elem.textContent), 0);
        caloriesTaken.textContent = totalCalories;

        const remainingCalories = 2500 - totalCalories; // Example daily calorie limit
        caloriesLeft.textContent = remainingCalories;
    };

    // Close Food Search
    const closeFoodSearch = () => {
        foodSearchOverlay.style.display = "none";
    };

    // Handle food search input
    foodSearchInput.addEventListener("input", function () {
        const query = foodSearchInput.value.toLowerCase();
        const foods = [
            { name: "Elma", calories: 100 },
            { name: "Ekmek", calories: 150 },
            // Daha fazla yiyecek ekleyin
        ];

        const results = foods
            .filter(food => food.name.toLowerCase().includes(query))
            .map(food => `<li>${food.name} - ${food.calories} kcal</li>`)
            .join("");

        foodSearchResults.innerHTML = results;
    });

    // Select a food item from search results
    foodSearchResults.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            const [foodName, foodCalories] = e.target.textContent.split(" - ");
            mealCalories[currentMeal].textContent = parseInt(mealCalories[currentMeal].textContent) + parseInt(foodCalories);
            updateCalories();
            closeFoodSearch();
        }
    });

    // Close food search when the close button is clicked
    closeSearchButton.addEventListener("click", closeFoodSearch);

    // Initialize the calorie counts
    updateCalories();
});
