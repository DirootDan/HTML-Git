// script.js

// 1. Logika Efek Spotlight
const spotlight = document.getElementById('spotlight');

// Mengubah properti CSS pointer-events agar overlay tidak menghalangi klik pada elemen di bawahnya
spotlight.style.pointerEvents = 'none';
spotlight.style.position = 'fixed';
spotlight.style.inset = '0';
spotlight.style.zIndex = '30';

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Injeksi koordinat dinamis ke dalam properti background CSS
    spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.10), transparent 80%)`;
});

// 2. Logika Navigasi Berbasis Gulir (Intersection Observer)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

const observerOptions = {
    root: null, // Viewport browser
    rootMargin: '0px',
    threshold: 0.5 // Memicu observer ketika 50% tinggi section terlihat di layar
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hapus status aktif dari semua tautan
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Tambahkan status aktif pada tautan yang ID-nya cocok dengan section
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});