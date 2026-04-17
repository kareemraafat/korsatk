// ============================================
// PARTNERS SLIDER - Auto Slider + Draggable + Links
// Fixed: No more duplicate partners
// ============================================

//const PARTNERS_API_URL = typeof PARTNERS_API_URL !== 'undefined' ? PARTNERS_API_URL : 'https://korsatk-admin.kareemraafat2017.workers.dev/api/partners';

let partnersSlider;
let partnersIsDown = false;
let partnersStartX;
let partnersScrollLeft;
let partnersAutoScrollInterval;
let partnersIsDragging = false;

// Initialize drag scroll functionality
function initPartnersDragScroll() {
    partnersSlider = document.getElementById('partnersSlider');
    if (!partnersSlider) return;
    
    partnersSlider.addEventListener('mousedown', (e) => {
        partnersIsDown = true;
        partnersIsDragging = false;
        partnersSlider.style.cursor = 'grabbing';
        partnersStartX = e.pageX - partnersSlider.offsetLeft;
        partnersScrollLeft = partnersSlider.scrollLeft;
        stopPartnersAutoScroll();
    });
    
    partnersSlider.addEventListener('mouseleave', () => {
        partnersIsDown = false;
        partnersSlider.style.cursor = 'grab';
        startPartnersAutoScroll();
    });
    
    partnersSlider.addEventListener('mouseup', () => {
        partnersIsDown = false;
        partnersSlider.style.cursor = 'grab';
        startPartnersAutoScroll();
    });
    
    partnersSlider.addEventListener('mousemove', (e) => {
        if (!partnersIsDown) return;
        partnersIsDragging = true;
        e.preventDefault();
        const x = e.pageX - partnersSlider.offsetLeft;
        const walk = (x - partnersStartX) * 1.5;
        partnersSlider.scrollLeft = partnersScrollLeft - walk;
    });
    
    partnersSlider.addEventListener('touchstart', (e) => {
        partnersIsDown = true;
        partnersIsDragging = false;
        partnersStartX = e.touches[0].pageX - partnersSlider.offsetLeft;
        partnersScrollLeft = partnersSlider.scrollLeft;
        stopPartnersAutoScroll();
    });
    
    partnersSlider.addEventListener('touchmove', (e) => {
        if (!partnersIsDown) return;
        partnersIsDragging = true;
        e.preventDefault();
        const x = e.touches[0].pageX - partnersSlider.offsetLeft;
        const walk = (x - partnersStartX) * 1.5;
        partnersSlider.scrollLeft = partnersScrollLeft - walk;
    });
    
    partnersSlider.addEventListener('touchend', () => {
        partnersIsDown = false;
        startPartnersAutoScroll();
    });
}

function startPartnersAutoScroll() {
    if (partnersAutoScrollInterval) clearInterval(partnersAutoScrollInterval);
    
    partnersAutoScrollInterval = setInterval(() => {
        if (partnersSlider && !partnersIsDown && !partnersIsDragging) {
            if (partnersSlider.scrollLeft + partnersSlider.clientWidth >= partnersSlider.scrollWidth - 10) {
                partnersSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                partnersSlider.scrollBy({ left: 250, behavior: 'smooth' });
            }
        }
        partnersIsDragging = false;
    }, 3000);
}

function stopPartnersAutoScroll() {
    if (partnersAutoScrollInterval) {
        clearInterval(partnersAutoScrollInterval);
        partnersAutoScrollInterval = null;
    }
}

async function loadPartners() {
    try {
        const response = await fetch(window.PARTNERS_API_URL);
        
        if (!response.ok) {
            console.log('Partners API returned', response.status, '- using static data');
            loadStaticPartners();
            return;
        }
        
        const partners = await response.json();
        const container = document.getElementById('partnersSlider');
        
        if (!container) return;
        
        if (!Array.isArray(partners) || partners.length === 0) {
            console.log('No partners data available - using static data');
            loadStaticPartners();
            return;
        }
        
        container.innerHTML = '';
        
        // Add each partner ONCE only - no duplication
        partners.forEach(partner => {
            const item = document.createElement('div');
            item.className = 'partner-item';
            item.innerHTML = `
                <a href="${partner.url || '#'}" target="_blank" class="partner-link" rel="noopener noreferrer">
                    <img class="partner-logo" src="${partner.logo}" alt="${partner.name || 'Partner'}">
                </a>
            `;
            container.appendChild(item);
        });
        
        initPartnersDragScroll();
        startPartnersAutoScroll();
        
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
    
    // Add each static partner ONCE only
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
    
    initPartnersDragScroll();
    startPartnersAutoScroll();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPartners);
} else {
    loadPartners();
}
