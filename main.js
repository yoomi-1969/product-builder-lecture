const generateBtn = document.getElementById('generate');
const toggleThemeBtn = document.getElementById('toggle-theme');
const numberContainers = document.querySelectorAll('.number');
const contactForm = document.getElementById('contact-form');

// Theme Toggle Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    
        // Disqus Theme Reset
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true
            });
        }
    });
    
}

// Lotto Logic
function getBallClass(number) {
    if (number <= 10) return 'ball-1';
    if (number <= 20) return 'ball-2';
    if (number <= 30) return 'ball-3';
    if (number <= 40) return 'ball-4';
    return 'ball-5';
}

function generateLottoNumbers() {
    if (!generateBtn) return;
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

if (generateBtn && !contactForm) {
    generateBtn.addEventListener('click', generateLottoNumbers);
}

// Formspree AJAX Submission
if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const status = document.getElementById("status");
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                status.innerHTML = "문의가 성공적으로 전달되었습니다!";
                status.className = "success";
                contactForm.reset();
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    status.innerHTML = result["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "문제가 발생했습니다. 다시 시도해 주세요.";
                }
                status.className = "error";
            }
        } catch (error) {
            status.innerHTML = "서버와 통신 중 오류가 발생했습니다.";
            status.className = "error";
        }
    });
}

// Initialize
initTheme();
if (document.querySelector('.numbers')) {
    generateLottoNumbers();
}
