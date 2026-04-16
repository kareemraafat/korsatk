// partners.js - Auto Slider + Draggable + Links
// Reads data from API instead of JSON file

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/partners';

let slider;
let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;
let isDragging = false;

function initDragScroll() {
    slider = document.getElementById('partnersSlider');
    if (!slider) return;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        stopAutoScroll();
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        startAutoScroll();
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
        startAutoScroll();
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        isDragging = true;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        stopAutoScroll();
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        isDragging = true;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    slider.addEventListener('touchend', () => {
        isDown = false;
        startAutoScroll();
    });
}

function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
        if (slider && !isDown && !isDragging) {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 250, behavior: 'smooth' });
            }
        }
        isDragging = false;
    }, 3000);
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

async function loadPartners() {
    try {
        const response = await fetch(API_URL);
        const partners = await response.json();
        const container = document.getElementById('partnersSlider');
        
        if (!container) return;
        
        container.innerHTML = '';
        
        partners.forEach(partner => {
            const item = document.createElement('div');
            item.className = 'partner-item';
            item.innerHTML = `
                <a href="${partner.url}" target="_blank" class="partner-link" rel="noopener noreferrer">
                    <img class="partner-logo" src="${partner.logo}" alt="${partner.name}">
                </a>
            `;
            container.appendChild(item);
        });
        
        // Duplicate for seamless scroll
        partners.forEach(partner => {
            const item = document.createElement('div');
            item.className = 'partner-item';
            item.innerHTML = `
                <a href="${partner.url}" target="_blank" class="partner-link" rel="noopener noreferrer">
                    <img class="partner-logo" src="${partner.logo}" alt="${partner.name}">
                </a>
            `;
            container.appendChild(item);
        });
        
        initDragScroll();
        startAutoScroll();
        
    } catch (error) {
        console.error('Error loading partners from API:', error);
        loadStaticPartners();
    }
}

function loadStaticPartners() {
    const container = document.getElementById('partnersSlider');
    if (!container) return;
    
    container.innerHTML = '';
    
    const staticPartners = [
        { logo: "https://placehold.co/110x70/667eea/white?text=Tech+Corp", name: "Tech Corp", url: "#" },
        { logo: "https://placehold.co/110x70/667eea/white?text=Global+Sol", name: "Global Solutions", url: "#" },
        { logo: "https://placehold.co/110x70/667eea/white?text=Smart+Edu", name: "Smart Education", url: "#" },
        { logo: "https://placehold.co/110x70/667eea/white?text=Diamond", name: "Diamond Products", url: "#" },
        { logo: "https://placehold.co/110x70/667eea/white?text=Reload", name: "Reload Caring", url: "#" },
        { logo: "https://placehold.co/110x70/667eea/white?text=Rixdot", name: "Rixdot", url: "#" }
    ];
    
    staticPartners.forEach(partner => {
        const item = document.createElement('div');
        item.className = 'partner-item';
        item.innerHTML = `
            <a href="${partner.url}" target="_blank" class="partner-link" rel="noopener noreferrer">
                <img class="partner-logo" src="${partner.logo}" alt="${partner.name}">
            </a>
        `;
        container.appendChild(item);
    });
    
    staticPartners.forEach(partner => {
        const item = document.createElement('div');
        item.className = 'partner-item';
        item.innerHTML = `
            <a href="${partner.url}" target="_blank" class="partner-link" rel="noopener noreferrer">
                <img class="partner-logo" src="${partner.logo}" alt="${partner.name}">
            </a>
        `;
        container.appendChild(item);
    });
    
    initDragScroll();
    startAutoScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartners();
});
