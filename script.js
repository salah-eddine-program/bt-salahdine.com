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
