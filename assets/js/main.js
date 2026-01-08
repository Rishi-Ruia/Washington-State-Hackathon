document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });

    initNavbar();
    initSmoothScroll();
    initMobileMenu();
    initFAQ();
    closeMobileMenuOnClick();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') { e.preventDefault(); return; }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Check if navbar exists for offset
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('svg');
            if (icon) icon.classList.toggle('rotate-90');
        });
    }
}

function closeMobileMenuOnClick() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.icon') || this.querySelector('svg');

            const allAnswers = document.querySelectorAll('.faq-answer');
            const allIcons = document.querySelectorAll('.faq-question .icon, .faq-question svg');
            const allQuestions = document.querySelectorAll('.faq-question');

            allAnswers.forEach(a => {
                if (a !== answer) a.classList.add('hidden');
            });

            allIcons.forEach(i => {
                if (i !== icon) i.classList.remove('rotate-180');
            });

            allQuestions.forEach(q => {
                if (q !== this) q.classList.remove('active');
            });

            answer.classList.toggle('hidden');
            if (icon) icon.classList.toggle('rotate-180');
            this.classList.toggle('active');
        });
    });
}

console.log('%c🚀 The Washington State Hackathon', 'color: #6366F1; font-size: 20px; font-weight: bold;');
