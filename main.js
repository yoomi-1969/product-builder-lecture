const generateBtn = document.getElementById('generate');
const numberContainers = document.querySelectorAll('.number');

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
    
    // Sort numbers numerically
    numbers.sort((a, b) => a - b);
    
    // Display numbers
    numberContainers.forEach((container, index) => {
        const num = numbers[index];
        container.textContent = num;
        
        // Remove existing ball classes and add new one
        container.className = 'number';
        container.classList.add(getBallClass(num));
    });
}

generateBtn.addEventListener('click', generateLottoNumbers);

// Generate initial set on load
generateLottoNumbers();
