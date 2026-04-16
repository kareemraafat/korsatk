// ============================================
// MODAL FUNCTIONALITY WITH EVENT DELEGATION
// This works for dynamically added buttons (like branches loaded via JS)
// ============================================

const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close-modal');

// ============================================
// OPEN MODAL - Event Delegation
// Works for buttons added after page load (dynamic content)
// ============================================
document.body.addEventListener('click', function(e) {
    const modalButton = e.target.closest('.open-modal');
    if (modalButton && modal) {
        modal.style.display = 'flex';
    }
});

// ============================================
// CLOSE MODAL - Click on X button
// ============================================
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

// ============================================
// CLOSE MODAL - Click outside the modal
// ============================================
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ============================================
// HANDLE FORM SUBMISSION - ENGLISH
// ============================================
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

// ============================================
// HANDLE FORM SUBMISSION - ARABIC
// ============================================
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
