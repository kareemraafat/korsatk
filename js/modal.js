// ========== MODAL FUNCTIONALITY WITH EVENT DELEGATION ==========
// This works for dynamically added buttons (like branches loaded via JS)

const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close-modal');

// Open modal using Event Delegation (works for buttons added after page load)
document.body.addEventListener('click', function(e) {
    const modalButton = e.target.closest('.open-modal');
    if (modalButton && modal) {
        modal.style.display = 'flex';
    }
});

// Close modal when clicking X
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission (English)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Send to Formspree or your API
        // await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: formData });
        alert('Message sent successfully! We will contact you soon.');
        if (modal) modal.style.display = 'none';
        contactForm.reset();
    });
}

// Handle form submission (Arabic)
const contactFormAr = document.getElementById('contactFormAr');
if (contactFormAr) {
    contactFormAr.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactFormAr);
        // await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: formData });
        alert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.');
        if (modal) modal.style.display = 'none';
        contactFormAr.reset();
    });
}