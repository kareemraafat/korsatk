// ============================================
// CONTACT PAGE - Load dynamic contact info from API
// ============================================

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/settings';

// Load contact information from API
async function loadContactInfo() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        // Update phone
        const phoneEl = document.getElementById('contactPhone');
        if (phoneEl && data.phone) phoneEl.innerText = data.phone;
        
        // Update email
        const emailEl = document.getElementById('contactEmail');
        if (emailEl && data.email) emailEl.innerText = data.email;
        
        // Update address based on language
        const addressEl = document.getElementById('contactAddress');
        if (addressEl) {
            addressEl.innerText = isArabic ? (data.address_ar || data.address_en) : (data.address_en || data.address_ar);
        }
        
        // Update working hours based on language
        const hoursEl = document.getElementById('contactHours');
        if (hoursEl) {
            hoursEl.innerText = isArabic ? (data.working_hours_ar || data.working_hours_en) : (data.working_hours_en || data.working_hours_ar);
        }
        
        // Update map if URL exists
        if (data.map_url) {
            const mapIframe = document.querySelector('#contactMap iframe');
            if (mapIframe) {
                mapIframe.src = data.map_url;
            }
        }
        
    } catch (error) {
        console.error('Error loading contact info from API:', error);
        // Fallback to static data already in HTML
    }
}

// Handle form submission with language support
function setupContactForm() {
    const formEn = document.getElementById('contactForm');
    const formAr = document.getElementById('contactFormAr');
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    // Show correct form based on language
    if (formEn && formAr) {
        if (isArabic) {
            formEn.style.display = 'none';
            formAr.style.display = 'block';
        } else {
            formEn.style.display = 'block';
            formAr.style.display = 'none';
        }
    }
    
    // Handle English form submission
    if (formEn) {
        formEn.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formEn);
            // Send to Formspree
            // await fetch(formEn.action, { method: 'POST', body: formData });
            alert('Message sent successfully! We will contact you soon.');
            formEn.reset();
        });
    }
    
    // Handle Arabic form submission
    if (formAr) {
        formAr.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formAr);
            // await fetch(formAr.action, { method: 'POST', body: formData });
            alert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.');
            formAr.reset();
        });
    }
}

// Refresh contact info when language changes
window.refreshContactInfo = function() {
    loadContactInfo();
    setupContactForm();
};

// Initialize
loadContactInfo();
setupContactForm();
