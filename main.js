// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Intersection Observer for Scroll Reveals
const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            revealOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px -50px 0px'
});

function initReveals() {
    document.querySelectorAll('.reveal').forEach((el) => {
        revealOnScroll.observe(el);
        // Force immediate check for elements already in viewport
        if (el.getBoundingClientRect().top < window.innerHeight) {
            const delay = el.getAttribute('data-delay') || 0;
            setTimeout(() => {
                el.classList.add('active');
            }, delay);
        }
    });
}

// Page Load Animation
function initPageLoad() {
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        main.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initPageLoad();
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        menuBtn.classList.toggle('open');
    });
}

// Dropdown Click Handler
document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth > 900) { // Only for desktop
            e.preventDefault();
            const parent = dropdownToggle.parentElement;

            // Close other open dropdowns
            document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
                if (openDropdown !== parent) {
                    openDropdown.classList.remove('open');
                }
            });

            parent.classList.toggle('open');
        }
    });
});

// Close dropdowns on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.counter');
    stats.forEach(stat => {
        const target = parseFloat(stat.innerText);
        if (isNaN(target)) return;

        let count = 0;
        const speed = 200;
        const inc = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += inc;
                stat.innerText = count.toFixed(stat.innerText.includes('.') ? 1 : 0);
                setTimeout(updateCount, 1);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });
}

// Intersection Observer for Stats
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.unobserve(statsGrid);
        }
    }, { threshold: 0.5 });
    observer.observe(statsGrid);
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        const icon = question.querySelector('i');
        if (icon) {
            icon.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
        }
    });
});

// Form Validation (Contact Page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add animation to button
        const btn = contactForm.querySelector('button');
        btn.innerText = 'Sending...';

        setTimeout(() => {
            btn.innerText = 'Sent Successfully!';
            contactForm.reset();
        }, 2000);
    });
}
// Dashboard Scroll & Highlight logic
function initDashboard() {
    const sidebarLinks = document.querySelectorAll('.sidebar li a[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');
    const sectionTitle = document.getElementById('section-title');

    if (sidebarLinks.length > 0) {
        // 1. Smooth Scroll on Click
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Account for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 2. Intersection Observer for Scroll Highlighting
        const options = {
            root: null,
            rootMargin: '-150px 0px -60% 0px', // Adjust trigger point
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetSection = entry.target.id;

                    // Update Active Link
                    sidebarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === targetSection) {
                            link.classList.add('active');

                            // Update Title
                            if (sectionTitle) {
                                const linkText = link.innerText.trim();
                                sectionTitle.innerText = (linkText === 'Dashboard' || linkText === 'Analytics')
                                    ? (targetSection === 'analytics' ? 'System Overview' : 'Welcome, Sarah')
                                    : linkText;
                            }
                        }
                    });
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    // Dashboard Specific Toggles (rest unchanged)
    const dashThemeToggle = document.getElementById('dashboard-theme-toggle');
    const dashRtlToggle = document.getElementById('dashboard-rtl-toggle');

    if (dashThemeToggle) {
        dashThemeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            const icon = dashThemeToggle.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }

    if (dashRtlToggle) {
        dashRtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
        });
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initDashboard);

// Call it immediately as well in case script is deferred/async
initDashboard();
