let caloriesIn = 0;
let caloriesOut = 0;
const dailyGoal = 2000;

document.getElementById('add-food').addEventListener('click', () => {
    const foodCalories = parseInt(document.getElementById('food-calories').value);
    if (!isNaN(foodCalories)) {
        caloriesIn += foodCalories;
        updateCalories();
    }
});

document.getElementById('add-exercise').addEventListener('click', () => {
    const exerciseCalories = parseInt(document.getElementById('exercise-calories').value);
    if (!isNaN(exerciseCalories)) {
        caloriesOut += exerciseCalories;
        updateCalories();
    }
});

function updateCalories() {
    document.getElementById('calories-in').textContent = caloriesIn;
    document.getElementById('calories-out').textContent = caloriesOut;
    const netCalories = caloriesIn - caloriesOut;
    document.getElementById('net-calories').textContent = netCalories;
}
