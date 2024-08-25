// Egzersiz verilerini çeker
async function fetchExerciseData() {
    const response = await fetch('data/exerciseLibraryData.json');
    const exerciseData = await response.json();
    return exerciseData;
}

// Egzersiz arama işlevi
function searchExercise(exerciseName, exerciseData) {
    return exerciseData.filter(exercise => exercise.name.toLowerCase().includes(exerciseName.toLowerCase()));
}

// Egzersiz detaylarını gösterir
function displayExerciseDetails(exercise) {
    const exerciseDetails = `
        <h2>${exercise.name}</h2>
        <p>Kalori (30 dakika için): ${exercise.caloriesPer30Min} kcal</p>
        <p>Yoğunluk: ${exercise.intensity}</p>
    `;
    document.getElementById('exercise-details').innerHTML = exerciseDetails;
}

// Arama fonksiyonunu tetikler
document.getElementById('search-button').addEventListener('click', async () => {
    const exerciseName = document.getElementById('search-input').value;
    const exerciseData = await fetchExerciseData();
    const results = searchExercise(exerciseName, exerciseData);

    if (results.length > 0) {
        displayExerciseDetails(results[0]);
    } else {
        document.getElementById('exercise-details').innerHTML = 'Egzersiz bulunamadı.';
    }
});
