document.getElementById('lose-weight').addEventListener('click', function() {
    localStorage.setItem('goal', 'lose');
    console.log("Hedef: Kilo Vermek seçildi.");
    window.location.href = 'index.html'; 
});

document.getElementById('maintain-weight').addEventListener('click', function() {
    localStorage.setItem('goal', 'maintain');
    window.location.href = 'index.html'; // Ana sayfaya yönlendir
});

document.getElementById('gain-weight').addEventListener('click', function() {
    localStorage.setItem('goal', 'gain');
    window.location.href = 'index.html'; // Ana sayfaya yönlendir
});
