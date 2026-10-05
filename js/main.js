// Homepage behaviour: navigation, reveal animations, skill meters and contact form.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isEnglish = document.documentElement.lang === 'en';

const languageToggle = document.querySelector('.language-toggle');
if (languageToggle && window.location.hash) {
    languageToggle.href += window.location.hash;
}

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
    hamburger.setAttribute('aria-label', open
        ? (isEnglish ? 'Close menu' : 'إغلاق القائمة')
        : (isEnglish ? 'Open menu' : 'فتح القائمة'));
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

// Contact form — GitHub Pages is static, so prepare a message in the visitor's email app.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const senderName = String(formData.get('name') || '').trim();
        const senderEmail = String(formData.get('email') || '').trim();
        const subject = String(formData.get('subject') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const recipient = 'benettouati.salah.eddin@gmail.com';
        const body = isEnglish
            ? `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`
            : `الاسم: ${senderName}\nالبريد الإلكتروني: ${senderEmail}\n\n${message}`;
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        status.className = 'form-status notice';
        status.replaceChildren();
        status.append(document.createTextNode(isEnglish
            ? 'Your message is ready. Send it from your email app. If no app opened, email me at '
            : 'تم تجهيز رسالتك. أرسلها من تطبيق البريد. إذا لم يفتح التطبيق، راسلني على '));
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${recipient}`;
        emailLink.textContent = recipient;
        status.append(emailLink, document.createTextNode('.'));
        window.location.href = mailto;
    });
}

// Keep the copyright year current
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
