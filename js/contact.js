// ============================================
// CONTACT PAGE - Load dynamic contact info from settings.json
// ============================================

async function loadContactInfo() {
    try {
        const response = await fetch('/data/settings.json');
        const data = await response.json();
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        const phoneEl = document.getElementById('contactPhone');
        if (phoneEl && data.phone) phoneEl.innerText = data.phone;
        
        const emailEl = document.getElementById('contactEmail');
        if (emailEl && data.email) emailEl.innerText = data.email;
        
        const addressEl = document.getElementById('contactAddress');
        if (addressEl) {
            addressEl.innerText = isArabic ? (data.address_ar || data.address_en) : (data.address_en || data.address_ar);
        }
        
        const hoursEl = document.getElementById('contactHours');
        if (hoursEl) {
            hoursEl.innerText = isArabic ? (data.working_hours_ar || data.working_hours_en) : (data.working_hours_en || data.working_hours_ar);
        }
        
        if (data.map_url) {
            const mapIframe = document.querySelector('#contactMap iframe');
            if (mapIframe) mapIframe.src = data.map_url;
        }
        
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

function setupContactForm() {
    const formEn = document.getElementById('contactForm');
    const formAr = document.getElementById('contactFormAr');
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    if (formEn && formAr) {
        if (isArabic) {
            formEn.style.display = 'none';
            formAr.style.display = 'block';
        } else {
            formEn.style.display = 'block';
            formAr.style.display = 'none';
        }
    }
    
    if (formEn) {
        formEn.addEventListener('submit', async (e) => {
            e.preventDefault();
            alert('Message sent successfully! We will contact you soon.');
            formEn.reset();
            if (modal) modal.style.display = 'none';
        });
    }
    
    if (formAr) {
        formAr.addEventListener('submit', async (e) => {
            e.preventDefault();
            alert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.');
            formAr.reset();
            if (modal) modal.style.display = 'none';
        });
    }
}

window.refreshContactInfo = function() {
    loadContactInfo();
    setupContactForm();
};

loadContactInfo();
setupContactForm();
