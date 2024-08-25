// BMI Hesaplama
function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Kalori Hesaplama
function calculateCalories(gender, weight, height, age, activityLevel) {
    let bmr;
    if (gender === 'male') {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
    const activityMultipliers = {
        sedentary: 1.2,
        lightlyActive: 1.375,
        moderatelyActive: 1.55,
        veryActive: 1.725,
        superActive: 1.9
    };
    return (bmr * activityMultipliers[activityLevel]).toFixed(0);
}

// İdeal Kilo Hesaplama
function calculateIdealWeightRange(height) {
    const heightInMeters = height / 100;
    const minBMI = 18.5;
    const maxBMI = 24.9;
    const minWeight = (minBMI * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (maxBMI * heightInMeters * heightInMeters).toFixed(1);
    return { minWeight, maxWeight };
}

// Sonuçları Ekrana Yazdırma
function displayResults(bmi, dailyCalories, idealWeightRange) {
    document.getElementById('results').innerHTML = `
        <h3>Sonuçlarınız</h3>
        <p>BMI: ${bmi}</p>
        <p>Günlük Kalori İhtiyacınız: ${dailyCalories} kcal</p>
        <p>İdeal Kilo Aralığınız: ${idealWeightRange.minWeight} kg - ${idealWeightRange.maxWeight} kg</p>
        <button id="go-to-main">Ana Sayfaya Git</button>
    `;

    // Ana sayfaya yönlendirme butonu
    document.getElementById('go-to-main').addEventListener('click', function () {
        window.location.href = 'index.html';  // Ana sayfaya yönlendir
    });
}

// Butona Tıklanınca Hesaplama
document.getElementById('calculate-button').addEventListener('click', function () {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = document.querySelector('input[name="activity"]:checked').value;
    const gender = localStorage.getItem('gender');

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Lütfen tüm bilgileri eksiksiz giriniz.');
        return;
    }

    const bmi = calculateBMI(weight, height);
    const dailyCalories = calculateCalories(gender, weight, height, age, activityLevel);
    const idealWeightRange = calculateIdealWeightRange(height);

    displayResults(bmi, dailyCalories, idealWeightRange);
});
