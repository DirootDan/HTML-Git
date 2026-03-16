/**
 * Advanced Portfolio Engine
 * Inspired by Brittany Chiang's Portfolio
 */

const PortfolioEngine = (() => {
    // Selectors
    const spotlight = document.getElementById('spotlight');
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('main section');

    /**
     * 1. High Performance Spotlight Effect
     * Menggunakan requestAnimationFrame agar pergerakan halus (60fps)
     */
    const initSpotlight = () => {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            // Efek lerp (Linear Interpolation) agar ada sedikit delay/smoothness
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;
            
            spotlight.style.background = `radial-gradient(600px at ${currentX}px ${currentY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            requestAnimationFrame(animate);
        };
        animate();
    };

    /**
     * 2. Intersection Observer for Scroll Spy
     * Jauh lebih efisien daripada window.onscroll
     */
    const initScrollSpy = () => {
        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger saat elemen ada di tengah layar
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    updateNav(id);
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    };

    const updateNav = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Menangani href yang berupa fragmen (#about) atau path (/about)
            if (link.getAttribute('href').toLowerCase().includes(id)) {
                link.classList.add('active');
            }
        });
    };

    /**
     * 3. Reveal on Scroll (Staggered Effect)
     * Memberikan efek elemen muncul saat discroll
     */
    const initReveal = () => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('v-visible');
                    // Berhenti mengobservasi setelah elemen muncul (sekali jalan)
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Targetkan card proyek dan list hobi
        document.querySelectorAll('.project-card, section ul li, .d-flex a').forEach(el => {
            el.classList.add('v-hidden'); // State awal tersembunyi
            revealObserver.observe(el);
        });
    };

    return {
        init: () => {
            initSpotlight();
            initScrollSpy();
            initReveal();
        }
    };
})();

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', PortfolioEngine.init);

document.addEventListener('DOMContentLoaded', () => {
    const spotlight = document.getElementById('spotlight');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    // 1. Mouse Move Spotlight Effect
    window.addEventListener('mousemove', e => {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
    });

    // 2. Active Navigation on Scroll
    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link href matches current section ID
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});