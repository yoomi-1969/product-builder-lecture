// Saju-i Main Application Logic

// Theme Toggle
const toggleThemeBtn = document.getElementById('toggle-theme');
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Reset Disqus to pick up theme changes
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({ reload: true });
        }
    });
}

// Saju Reading Data (Simplified logic for the prototype)
const SAJU_READINGS = {
    wood: {
        title: "푸르른 나무의 기운 (목, 木)",
        traits: "아이의 성향이 곧고 올바르며, 창의력이 뛰어납니다. 새로운 것을 배우는 데 흥미를 느끼고 호기심이 많네요.",
        tips: "창의적인 활동(미술, 만들기)을 장려해주세요. 아이가 자신의 생각을 표현할 수 있는 기회를 많이 주면 좋습니다.",
        advice: "가끔은 고집이 세질 수 있으니, 아이의 의견을 먼저 들어주며 유연한 태도를 길러주세요."
    },
    fire: {
        title: "따뜻한 태양의 기운 (화, 火)",
        traits: "밝고 명랑하며 에너지가 넘치는 아이입니다. 사교성이 좋아 친구들과 어울리는 것을 좋아하고 어디서든 주목받는 매력이 있네요.",
        tips: "활동적인 신체 활동이나 공연, 발표 같은 기회를 만들어주세요. 아이의 열정을 발산할 곳이 필요합니다.",
        advice: "감정 표현이 솔직하지만 쉽게 뜨거워질 수 있으니 차분하게 마음을 가라앉히는 연습을 함께 해주세요."
    },
    earth: {
        title: "넉넉한 대지의 기운 (토, 土)",
        traits: "마음이 넓고 믿음직스러운 아이입니다. 참을성이 많고 한번 시작한 일은 끝까지 해내려는 끈기가 돋보이네요.",
        tips: "규칙적인 생활 습관을 만들어주면 정서적 안정감을 느낍니다. 꾸준함이 필요한 취미를 추천해요.",
        advice: "속마음을 잘 드러내지 않을 수 있으니, 아이가 편안하게 이야기할 수 있는 분위기를 자주 만들어주세요."
    },
    metal: {
        title: "단단한 바위의 기운 (금, 金)",
        traits: "판단력이 명확하고 의지가 강한 아이입니다. 정의감이 넘치며 자기 주관이 뚜렷해 리더십을 발휘할 잠재력이 큽니다.",
        tips: "논리적인 사고를 요하는 게임이나 책 읽기를 권장합니다. 아이의 성과에 대해 구체적으로 칭찬해주세요.",
        advice: "융통성이 부족해 보일 수 있으니 타인의 감정을 이해하고 공감하는 능력을 키워주는 것이 중요합니다."
    },
    water: {
        title: "맑은 샘물의 기운 (수, 水)",
        traits: "지혜롭고 생각이 깊은 아이입니다. 유연한 사고방식을 가졌으며 타인의 마음을 잘 헤아리는 배려심이 깊네요.",
        tips: "독서나 명상, 조용한 음악 감상 등이 정서 발달에 큰 도움이 됩니다. 물과 관련된 활동도 좋습니다.",
        advice: "때로는 소심해지거나 생각이 너무 많아질 수 있으니, 아이가 자신감을 가질 수 있도록 격려를 아끼지 마세요."
    }
};

// Simple Seeding for consistency based on birth date
function getSajuElement(birthDate) {
    const date = new Date(birthDate);
    const day = date.getDate();
    const elements = ['wood', 'fire', 'earth', 'metal', 'water'];
    return elements[day % 5];
}

// Form Submission Handling
const sajuForm = document.getElementById('saju-form');
const resultsSection = document.getElementById('results');
const readingContent = document.getElementById('reading-content');

if (sajuForm) {
    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const birthDate = document.getElementById('birth-date').value;
        const gender = document.getElementById('gender').value;
        const genderText = gender === 'male' ? '남자아이' : '여자아이';
        
        const elementKey = getSajuElement(birthDate);
        const reading = SAJU_READINGS[elementKey];
        
        // Build the result HTML
        readingContent.innerHTML = `
            <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.4rem;">${name} 님의 타고난 운세: <br> ${reading.title}</h3>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>🌟 타고난 성향:</strong> ${reading.traits}</p>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>💡 육아 꿀팁:</strong> ${reading.tips}</p>
            </div>
            <div style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 1rem; font-style: italic;">
                <p><strong>⚠️ 주의할 점:</strong> ${reading.advice}</p>
            </div>
            <p style="margin-top: 2rem; font-size: 0.8rem; opacity: 0.6; text-align: center;">
                * 본 풀이는 재미로 보는 사주아이 서비스이며, 정식 사주 감정과는 차이가 있을 수 있습니다.
            </p>
        `;
        
        // Show results
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Initialize
initTheme();
