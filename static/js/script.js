// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 네비게이션 스크롤 효과
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
const animateElements = document.querySelectorAll(
    '.system-card, .schedule-card, .result-card, .director-profile, .talktalk-card, .contact-methods'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// 숫자 카운팅 애니메이션 (성과 사례)
const animateNumbers = (element, target, duration = 1000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// 성과 카드가 보일 때 숫자 애니메이션
const resultObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const afterScore = entry.target.querySelector('.score-item.after .score-number');
            if (afterScore && !afterScore.classList.contains('animated')) {
                const targetNumber = parseInt(afterScore.textContent);
                afterScore.textContent = '0';
                animateNumbers(afterScore, targetNumber, 1500);
                afterScore.classList.add('animated');
            }
            resultObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.result-card').forEach(card => {
    resultObserver.observe(card);
});

// 공지사항 모달
function closeModal() {
  const modal = document.getElementById('noticeModal');
  const checked = document.getElementById('todayCheck').checked;
  if (checked) {
    localStorage.setItem('hideNotice', new Date().toDateString());
  }
  modal.classList.remove('active');
}

window.addEventListener('DOMContentLoaded', () => {
  const hidden = localStorage.getItem('hideNotice');
  if (hidden !== new Date().toDateString()) {
    document.getElementById('noticeModal').classList.add('active');
  }
});