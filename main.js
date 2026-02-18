const generateBtn = document.getElementById('generate');
const toggleThemeBtn = document.getElementById('toggle-theme');
const numberContainers = document.querySelectorAll('.number');

// Theme Toggle Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

toggleThemeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Lotto Logic
function getBallClass(number) {
    if (number <= 10) return 'ball-1';
    if (number <= 20) return 'ball-2';
    if (number <= 30) return 'ball-3';
    if (number <= 40) return 'ball-4';
    return 'ball-5';
}

function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    
    numbers.sort((a, b) => a - b);
    
    numberContainers.forEach((container, index) => {
        const num = numbers[index];
        container.textContent = num;
        container.className = 'number';
        container.classList.add(getBallClass(num));
    });
}

generateBtn.addEventListener('click', generateLottoNumbers);

// Initialize
initTheme();
generateLottoNumbers();
