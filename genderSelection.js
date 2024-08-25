document.getElementById('male-button').addEventListener('click', function() {
    localStorage.setItem('gender', 'male');
    console.log("Cinsiyet: Erkek kaydedildi.");
    window.location.href = 'measurements.html'; // Boy-Kilo-Yaş sayfasına yönlendir
});

document.getElementById('female-button').addEventListener('click', function() {
    localStorage.setItem('gender', 'female');
    console.log("Cinsiyet: Kadın kaydedildi.");
    window.location.href = 'measurements.html'; // Boy-Kilo-Yaş sayfasına yönlendir
});
