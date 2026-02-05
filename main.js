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

function injectBackgroundBlobs() {
    const blobsContainer = document.createElement('div');
    blobsContainer.className = 'bg-blobs';
    blobsContainer.innerHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="blob blob-4"></div>
    `;
    document.body.appendChild(blobsContainer);
}

function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle home page highlighting for index.html or root
        if ((currentPath.includes('index.html') || currentPath === '/' || currentPath === '') && (href === 'index.html' || href === 'index2.html')) {
            // For the home dropdown, we might want to highlight the parent if it's a dropdown
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('a').classList.add('active');
            } else {
                link.classList.add('active');
            }
        } else if (href && href !== '#' && currentPath.includes(href)) {
            link.classList.add('active');
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('a').classList.add('active');
            }
        }
    });
}

function initTechStackParticles() {
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        const particleField = item.querySelector('.particles-field');
        if (!particleField) return;

        // Create 30 particles per card
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position and movement
            const x = Math.random() * 100 - 50; // -50 to 50
            const y = Math.random() * 100 - 50; // -50 to 50

            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            particle.style.animation = `particleFloat ${1.5 + Math.random() * 2}s infinite`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            particleField.appendChild(particle);
        }
    });
}

function initPreloader() {
    // Preloader is now hardcoded in HTML for immediate display
    // We only need to handle the removal on load
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Ensure minimum display time of 1.5s (optional, can be reduced now)
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.remove();
                }, 800);
            }, 1000);
        }
    });
}

function initParallax() {
    const parallaxBg = document.querySelector('.hero-parallax-bg');
    if (!parallaxBg) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                // Move bg at 30% of scroll speed
                parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initLightning() {
    const canvas = document.getElementById('lightning-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        const parent = canvas.parentElement;
        width = canvas.width = parent.clientWidth || window.innerWidth;
        height = canvas.height = parent.clientHeight || window.innerHeight;

        // If height is still suspiciously zero, use window height
        if (height < 10) height = canvas.height = window.innerHeight;

        // Re-initialize any particles if they were forked with 0 height
        if (typeof bolts !== 'undefined') {
            bolts.forEach(b => { if (b.y === 0 && height > 0) b.reset(); });
        }
    }

    window.addEventListener('resize', resize);
    resize();
    // Re-check after a brief moment to catch late layout updates
    setTimeout(resize, 500);
    setTimeout(resize, 2000); // Second fallback for slow loaders

    const mouse = { x: -1000, y: -1000 };
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    class Ring {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.life = 0;
            this.maxLife = 60;
            this.alpha = 1;
        }

        update() {
            this.life++;
            this.radius += 4;
            this.alpha = 1 - (this.life / this.maxLife);
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(249, 115, 22, ${this.alpha * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    class Snow {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = 1 + Math.random() * 3;
            this.size = 1 + Math.random() * 4;
            this.alpha = 0.4 + Math.random() * 0.6;
            this.spin = Math.random() * Math.PI * 2;
            this.spinSpeed = (Math.random() - 0.5) * 0.1;
        }

        update() {
            // Wind effect based on time
            const wind = Math.sin(Date.now() * 0.001) * 0.5;
            this.vx += wind * 0.05;

            // Mouse Interaction
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.vx += (dx / dist) * force * 2;
                this.vy += (dy / dist) * force * 2;
            }

            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98; // Friction
            this.vy *= 0.99;
            if (this.vy < 1) this.vy = 1;

            if (this.y > height || this.x < -50 || this.x > width + 50) {
                this.reset();
                this.y = -10;
            }
            this.spin += this.spinSpeed;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 160, 50, ${this.alpha})`; // Slightly warmer orange
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = '#f97316';
            ctx.fill();
        }
    }

    class Lightning {
        constructor(isBranch = false) {
            this.isBranch = isBranch;
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = 0;
            this.segments = [];
            this.branches = [];
            this.life = 0;
            this.maxLife = 10 + Math.random() * 20;
            this.alpha = 1;
            this.createSegments(this.x, this.y, height / (this.isBranch ? 4 : 1), 12);

            if (!this.isBranch) {
                if (rings.length < 10) {
                    const lastSeg = this.segments[this.segments.length - 1];
                    rings.push(new Ring(lastSeg.x2, lastSeg.y2));
                }
            }
        }

        createSegments(startX, startY, totalHeight, count) {
            let curX = startX;
            let curY = startY;
            const segStep = totalHeight / count;

            for (let i = 0; i < count; i++) {
                const nx = curX + (Math.random() * 100 - 50);
                const ny = curY + segStep * (0.8 + Math.random() * 0.4);
                this.segments.push({ x1: curX, y1: curY, x2: nx, y2: ny });

                // Potential branching
                if (!this.isBranch && Math.random() > 0.8 && i < count - 2) {
                    const branch = new Lightning(true);
                    branch.segments = [];
                    branch.createSegments(nx, ny, totalHeight / 2, 5);
                    this.branches.push(branch);
                }

                curX = nx;
                curY = ny;
            }
        }

        draw() {
            if (this.life > this.maxLife) return;

            // Intense orange glow
            ctx.shadowBlur = this.isBranch ? 15 : 40;
            ctx.shadowColor = '#f97316';
            ctx.lineWidth = this.isBranch ? 2 : 5 + Math.random() * 3;
            ctx.strokeStyle = `rgba(255, 140, 50, ${this.alpha * 1})`;

            ctx.beginPath();
            this.segments.forEach(seg => {
                ctx.moveTo(seg.x1, seg.y1);
                ctx.lineTo(seg.x2, seg.y2);
            });
            ctx.stroke();

            // Super bright white core
            if (!this.isBranch) {
                ctx.lineWidth = 2;
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 1.8})`;
                ctx.stroke();
            }

            this.branches.forEach(b => {
                b.alpha = this.alpha;
                b.draw();
            });

            // Flash effect (More visible)
            if (this.life < 3 && !this.isBranch) { // Extended flash duration
                ctx.fillStyle = `rgba(249, 115, 22, ${0.2 * Math.random()})`;
                ctx.fillRect(0, 0, width, height);
            }
        }

        update() {
            this.life++;
            this.alpha = 1 - (this.life / this.maxLife);
            if (this.life > this.maxLife && Math.random() > 0.9) {
                this.reset();
            }
        }
    }

    const bolts = Array.from({ length: 4 }, () => new Lightning());
    const snowParticles = Array.from({ length: 500 }, () => new Snow());
    let rings = [];

    function animate() {
        if (!ctx) return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // Use a very light darkening to allow the background to show through better
        ctx.fillStyle = 'rgba(5, 8, 17, 0.15)';
        ctx.fillRect(0, 0, width, height);

        snowParticles.forEach(p => {
            p.update();
            p.draw();
        });

        rings = rings.filter(ring => {
            ring.update();
            ring.draw();
            return ring.life < ring.maxLife;
        });

        bolts.forEach(bolt => {
            bolt.update();
            bolt.draw();
        });

        requestAnimationFrame(animate);
    }

    console.log('Orange Thunder Initialized');
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initReveals();
    initPageLoad();
    injectBackgroundBlobs();
    highlightActiveNav();
    initTechStackParticles();
    initParallax();
    initLightning();
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

document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = dropdownToggle.parentElement;

        // Close other open dropdowns
        document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
            if (openDropdown !== parent) {
                openDropdown.classList.remove('open');
            }
        });

        parent.classList.toggle('open');
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
        item.classList.toggle('faq-open');
        const icon = question.querySelector('i');
        if (icon) {
            icon.className = item.classList.contains('faq-open') ? 'fas fa-minus' : 'fas fa-plus';
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
let isDashboardInitialized = false;
function initDashboard() {
    if (isDashboardInitialized) return;
    isDashboardInitialized = true;

    // Use hash links now
    const sidebarLinks = document.querySelectorAll('.sidebar li a[href^="#"]');
    const sections = document.querySelectorAll('.dashboard-section');
    const sectionTitle = document.getElementById('section-title');

    // 1. Smooth Scroll on Click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate header offset
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Manually set active class immediately for responsiveness
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // 2. Intersection Observer for Scroll Highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Active when element is in the upper middle of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleSectionId = entry.target.id;

                // Update Active Link
                sidebarLinks.forEach(link => {
                    const linkTarget = link.getAttribute('href').substring(1);
                    if (linkTarget === visibleSectionId) {
                        // Remove active from all
                        sidebarLinks.forEach(l => l.classList.remove('active'));
                        // Add to current
                        link.classList.add('active');

                        // Update Title safely
                        if (sectionTitle) {
                            // Map IDs to friendly titles if needed, or just use link text
                            sectionTitle.innerText = link.innerText.trim();
                        }
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Dashboard Specific Toggles
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

// Removed redundant initDashboard() call to prevent double event binding

