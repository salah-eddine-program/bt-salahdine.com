// Smooth scrolling for navigation links
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

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:benettouati.salah.eddin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nالرسالة:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('سيتم فتح برنامج البريد الإلكتروني الخاص بك لإرسال الرسالة');
        
        // Reset form
        this.reset();
    });
}

// Typing animation for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }, 1000);
}

// Progress bars animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Trigger progress bars animation when about section is visible
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Add scroll indicator
const createScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.appendChild(scrollIndicator);
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
};

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', createScrollIndicator);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS animations via JavaScript
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .skill-card, .experience-card, .project-card, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-card.animate, .experience-card.animate, .project-card.animate, .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--secondary-color);
            font-size: 1.5rem;
            cursor: pointer;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
        
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-dark);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid var(--secondary-color);
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .loaded::before,
        .loaded::after {
            display: none;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-15px);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize animation styles
document.addEventListener('DOMContentLoaded', addAnimationStyles);

// Add particle effect to hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--secondary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
};

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Project Pages Functions
// Control Pump Functions
let pumpStates = {
    pump1: false,
    pump2: false,
    pump3: false
};

function togglePump(pumpId) {
    if (typeof pumpStates === 'undefined') return;
    
    const pump = document.getElementById(pumpId);
    if (!pump) return;
    
    const status = pump.querySelector('.pump-status');
    const statusText = pump.querySelector('.status-text');
    const button = pump.querySelector('.control-btn');
    
    if (!status || !statusText || !button) return;
    
    pumpStates[pumpId] = !pumpStates[pumpId];
    
    if (pumpStates[pumpId]) {
        status.classList.remove('off');
        status.classList.add('on');
        pump.classList.add('active');
        statusText.textContent = 'يعمل';
        button.textContent = 'إيقاف';
        
        // تحديث الإحصائيات
        updateStats();
    } else {
        status.classList.remove('on');
        status.classList.add('off');
        pump.classList.remove('active');
        statusText.textContent = 'متوقفة';
        button.textContent = 'تشغيل';
    }
}

function updateStats() {
    // محاكاة تحديث البيانات
    const pressure = document.getElementById('pressure');
    const tankLevel = document.getElementById('tank-level');
    const powerConsumption = document.getElementById('power-consumption');
    const temperature = document.getElementById('temperature');
    
    if (pressure) pressure.textContent = (2.5 + Math.random() * 0.5).toFixed(1) + ' بار';
    if (tankLevel) tankLevel.textContent = Math.floor(70 + Math.random() * 20) + '%';
    if (powerConsumption) powerConsumption.textContent = (1.2 + Math.random() * 0.8).toFixed(1) + ' كيلوواط';
    if (temperature) temperature.textContent = Math.floor(25 + Math.random() * 8) + '°م';
}

// تحديث الإحصائيات كل 5 ثوان
setInterval(() => {
    if (document.getElementById('pressure')) {
        updateStats();
    }
}, 5000);

// Solar System Functions
let systemActive = false;
let systemInterval;

function toggleSolarSystem() {
    const button = document.getElementById('system-toggle');
    if (!button) return;
    
    systemActive = !systemActive;
    
    if (systemActive) {
        button.textContent = 'إيقاف النظام';
        button.style.background = '#ef4444';
        startSystemSimulation();
    } else {
        button.textContent = 'تشغيل النظام';
        button.style.background = 'var(--primary-color)';
        stopSystemSimulation();
    }
}

function startSystemSimulation() {
    if (systemInterval) clearInterval(systemInterval);
    
    systemInterval = setInterval(() => {
        if (!systemActive) {
            clearInterval(systemInterval);
            return;
        }
        
        // محاكاة تغيير القيم
        const panel1Power = document.getElementById('panel1-power');
        const panel2Power = document.getElementById('panel2-power');
        const panel3Power = document.getElementById('panel3-power');
        const panel1Efficiency = document.getElementById('panel1-efficiency');
        const panel2Efficiency = document.getElementById('panel2-efficiency');
        const panel3Efficiency = document.getElementById('panel3-efficiency');
        const solarInput = document.getElementById('solar-input');
        const batteryLevel = document.getElementById('battery-level');
        const pumpFlow = document.getElementById('pump-flow');
        
        if (panel1Power) panel1Power.textContent = (240 + Math.random() * 20).toFixed(0) + 'W';
        if (panel2Power) panel2Power.textContent = (235 + Math.random() * 15).toFixed(0) + 'W';
        if (panel3Power) panel3Power.textContent = (248 + Math.random() * 18).toFixed(0) + 'W';
        
        if (panel1Efficiency) panel1Efficiency.textContent = (83 + Math.random() * 6).toFixed(0) + '%';
        if (panel2Efficiency) panel2Efficiency.textContent = (80 + Math.random() * 8).toFixed(0) + '%';
        if (panel3Efficiency) panel3Efficiency.textContent = (85 + Math.random() * 5).toFixed(0) + '%';
        
        if (solarInput) solarInput.textContent = (700 + Math.random() * 80).toFixed(0) + 'W';
        if (batteryLevel) batteryLevel.textContent = (75 + Math.random() * 10).toFixed(0) + '%';
        if (pumpFlow) pumpFlow.textContent = (10 + Math.random() * 5).toFixed(1) + ' ل/دق';
    }, 2000);
}

function stopSystemSimulation() {
    if (systemInterval) {
        clearInterval(systemInterval);
        systemInterval = null;
    }
    
    // إعادة القيم الأساسية
    const panel1Power = document.getElementById('panel1-power');
    const panel2Power = document.getElementById('panel2-power');
    const panel3Power = document.getElementById('panel3-power');
    const solarInput = document.getElementById('solar-input');
    const batteryLevel = document.getElementById('battery-level');
    const pumpFlow = document.getElementById('pump-flow');
    
    if (panel1Power) panel1Power.textContent = '245W';
    if (panel2Power) panel2Power.textContent = '238W';
    if (panel3Power) panel3Power.textContent = '251W';
    if (solarInput) solarInput.textContent = '734W';
    if (batteryLevel) batteryLevel.textContent = '78%';
    if (pumpFlow) pumpFlow.textContent = '12 ل/دق';
}

function optimizeSystem() {
    alert('تم تحسين النظام! الكفاءة زادت بنسبة 12%');
    // يمكن إضافة المزيد من المحاكاة هنا
}

// Initialize project page functions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize pump controls if on control-pump page
    if (document.getElementById('pump1')) {
        updateStats();
    }
    
    // Initialize solar system if on solar-pump page
    if (document.getElementById('system-toggle')) {
        // Set initial state
        systemActive = false;
    }
});

// Clean up intervals on page unload
window.addEventListener('beforeunload', () => {
    if (systemInterval) {
        clearInterval(systemInterval);
    }
});

// Ensure all functions are available globally
window.togglePump = togglePump;
window.updateStats = updateStats;
window.toggleSolarSystem = toggleSolarSystem;
window.optimizeSystem = optimizeSystem;




























































































































































































































// إضافة هذا الكود في script.js

// تأثير تحميل السيرة الذاتية
document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.querySelector('.btn-cv');
    
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            // تأثير التحميل
            this.classList.add('downloading');
            const originalText = this.querySelector('.btn-text').textContent;
            this.querySelector('.btn-text').textContent = 'جاري التحميل...';
            
            // إزالة تأثير التحميل بعد ثانيتين
            setTimeout(() => {
                this.classList.remove('downloading');
                this.querySelector('.btn-text').textContent = originalText;
                
                // رسالة نجاح
                showDownloadSuccess();
            }, 2000);
        });
        
        // تأثير الماوس المتابع
        cvButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    }
});

// دالة إظهار رسالة نجاح التحميل
function showDownloadSuccess() {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تم بدء تحميل السيرة الذاتية بنجاح!</span>
    `;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}







































