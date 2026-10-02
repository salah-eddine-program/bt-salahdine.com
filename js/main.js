// Homepage behaviour: navigation, reveal animations, skill meters and contact form.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Navbar background once the page is scrolled
const navbar = document.getElementById('navbar');
const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('nav-menu');

const setMenu = (open) => {
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
};

hamburger.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

// Highlight the nav link of the section in view
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

// Reveal elements and fill skill meters when they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(entry.target.classList.contains('languages') ? 'in-view' : 'visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .languages').forEach((el) => revealObserver.observe(el));

// Typing effect for the hero subtitle (text stays in the HTML for SEO and no-JS visitors)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle && !prefersReducedMotion) {
    const text = heroSubtitle.textContent.trim();
    heroSubtitle.textContent = '';
    heroSubtitle.classList.add('typing');
    let i = 0;
    const type = () => {
        heroSubtitle.textContent = text.slice(0, ++i);
        if (i < text.length) {
            setTimeout(type, 55);
        } else {
            setTimeout(() => heroSubtitle.classList.remove('typing'), 1500);
        }
    };
    setTimeout(type, 500);
}

// Contact form — submitted to Netlify Forms without leaving the page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    const button = contactForm.querySelector('button[type="submit"]');
    const label = button.querySelector('.btn-label');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        label.textContent = 'جاري الإرسال...';
        status.className = 'form-status';
        status.textContent = '';

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(contactForm)).toString(),
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            contactForm.reset();
            status.classList.add('success');
            status.textContent = 'تم إرسال رسالتك بنجاح، شكراً لتواصلك! سأرد عليك في أقرب وقت.';
        } catch (error) {
            status.classList.add('error');
            status.textContent = 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة عبر البريد الإلكتروني.';
        } finally {
            button.disabled = false;
            label.textContent = 'إرسال الرسالة';
        }
    });
}

// Keep the copyright year current
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
