// ============================================
// Washington State Hackathon - Main JavaScript
// ============================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 0
    });

    // Navbar scroll effect
    initNavbar();

    // Smooth scrolling for navigation links
    initSmoothScroll();

    // Mobile menu toggle
    initMobileMenu();

    // FAQ accordion
    initFAQ();

    // Close mobile menu when clicking links
    closeMobileMenuOnClick();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Smooth Scrolling =====
function initSmoothScroll() {
    // Get all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # only (for disabled buttons)
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Get navbar height for offset
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Animate the menu icon
            const icon = this.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-90');
            }
        });
    }
}

// ===== Close Mobile Menu When Clicking Links =====
function closeMobileMenuOnClick() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.icon');

            // Close other open FAQs (optional - remove if you want multiple open)
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allIcons = document.querySelectorAll('.faq-question .icon');
            const allQuestions = document.querySelectorAll('.faq-question');

            allAnswers.forEach(a => {
                if (a !== answer) {
                    a.classList.add('hidden');
                }
            });

            allIcons.forEach(i => {
                if (i !== icon) {
                    i.classList.remove('rotate-180');
                }
            });

            allQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                }
            });

            // Toggle current FAQ
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
            this.classList.toggle('active');
        });
    });
}

// ===== Scroll to Top Button (Optional Enhancement) =====
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top hidden';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Add Active State to Navigation =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== Parallax Effect for Hero (Optional) =====
function initParallax() {
    const hero = document.getElementById('hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== Form Validation (if forms are added later) =====
function validateForm(formId) {
    const form = document.getElementById(formId);

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form inputs
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (isValid) {
                // Submit form
                form.submit();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

// ===== Add Loading State to Buttons =====
function addButtonLoader(buttonSelector) {
    const buttons = document.querySelectorAll(buttonSelector);

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.innerHTML = '<span class="spinner"></span> Loading...';
            }
        });
    });
}

// ===== Console Message =====
console.log('%c🚀 The Washington State Hackathon', 'color: #6366F1; font-size: 20px; font-weight: bold;');
console.log('%cBuild. Impact. Inspire.', 'color: #EC4899; font-size: 16px;');
console.log('%cJanuary 24-25, 2026', 'color: #14B8A6; font-size: 14px;');
console.log('%cInterested in how this site was built? Check out the code on GitHub!', 'color: #64748B; font-size: 12px;');

// ===== Easter Egg: Konami Code =====
(function() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiPosition = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiPosition]) {
            konamiPosition++;

            if (konamiPosition === konamiCode.length) {
                activateEasterEgg();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'colorShift 2s linear infinite';

        setTimeout(() => {
            alert('🎉 You found the secret! You\'re already thinking like a true hacker!');
            document.body.style.animation = '';
        }, 100);
    }
})();

// ===== Performance Optimization: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Accessibility: Skip to Content Link =====
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== Dark Mode Toggle (Optional - commented out) =====
/*
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (darkModeToggle) {
        // Check for saved preference
        const darkMode = localStorage.getItem('darkMode');

        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', null);
            }
        });
    }
}
*/
