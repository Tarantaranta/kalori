// Yiyecek verilerini çeker
async function fetchFoodData() {
    try {
        const response = await fetch('data/foodLibraryData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const foodData = await response.json();
        return foodData;
    } catch (error) {
        console.error('Yiyecek verilerini çekerken hata oluştu:', error);
        return []; // Hata durumunda boş bir dizi döndürüyoruz
    }
}

// Yiyecek arama işlevi
function searchFood(foodName, foodData) {
    return foodData.filter(food => food.name.toLowerCase().includes(foodName.toLowerCase()));
}

// Yiyecek detaylarını gösterir
function displayFoodDetails(food) {
    const foodDetails = `
        <h2>${food.name}</h2>
        <p>Kalori: ${food.calories} kcal</p>
        <p>Protein: ${food.protein} g</p>
        <p>Karbonhidrat: ${food.carbohydrates} g</p>
        <p>Yağ: ${food.fat} g</p>
        <p>Vitaminler: ${food.vitamins.join(', ')}</p>
        <p>Mineraller: ${food.minerals.join(', ')}</p>
        <p>İlgili Organlar: ${food.chineseMedicine.organs.join(', ')}</p>
        <p>İlgili Meridyenler: ${food.chineseMedicine.meridians.join(', ')}</p>
        <p>Yin-Yang Tipi: ${food.chineseMedicine.yinYang}</p>
    `;
    document.getElementById('food-details').innerHTML = foodDetails;
}

// Arama fonksiyonunu tetikler
document.getElementById('food-search-input').addEventListener('input', async () => {
    const foodName = document.getElementById('food-search-input').value.trim();

    // Boş aramaları önlemek için kontrol et
    if (foodName === '') {
        document.getElementById('food-search-results').innerHTML = '';
        return;
    }

    const foodData = await fetchFoodData();
    
    // foodData doğru bir şekilde çekilmiş mi diye kontrol et
    if (!foodData.length) {
        document.getElementById('food-search-results').innerHTML = '<li>Yiyecek verileri yüklenemedi.</li>';
        return;
    }

    const results = searchFood(foodName, foodData);

    // Sonuçları göster
    if (results.length > 0) {
        const searchResultsHTML = results.map(food => `
            <li data-name="${food.name}" data-calories="${food.calories}">
                ${food.name} - ${food.calories} kcal
            </li>
        `).join('');

        document.getElementById('food-search-results').innerHTML = searchResultsHTML;
    } else {
        document.getElementById('food-search-results').innerHTML = '<li>Yiyecek bulunamadı.</li>';
    }
});

// Arama sonuçlarında yiyecek seçildiğinde işlem yap
document.getElementById('food-search-results').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        const selectedFoodName = event.target.getAttribute('data-name');
        const selectedCalories = event.target.getAttribute('data-calories');

        // Seçilen yiyeceğin bilgilerini ilgili öğüne ekleyelim
        const mealElement = document.getElementById('calories-' + currentMeal);
        mealElement.textContent = parseInt(mealElement.textContent) + parseInt(selectedCalories);

        // Kalorileri güncelle
        updateCalories();

        // Arama ekranını kapat
        closeFoodSearch();
    }
});
