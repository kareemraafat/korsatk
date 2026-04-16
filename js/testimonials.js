// testimonials.js - Load testimonials from JSON with language support

let currentTestimonialsData = [];

async function loadTestimonialsData() {
    try {
        const response = await fetch('/data/testimonials.json');
        currentTestimonialsData = await response.json();
        displayTestimonials();
    } catch (error) {
        console.error('Error loading testimonials:', error);
        // Fallback static data
        currentTestimonialsData = [
            {
                id: 1,
                name_en: "John Doe",
                name_ar: "جون دو",
                title_en: "Software Engineer",
                title_ar: "مهندس برمجيات",
                text_en: "The English course was amazing! My speaking skills improved dramatically. The instructors are very professional and supportive.",
                text_ar: "دورة الإنجليزية كانت رائعة! مهاراتي في التحدث تحسنت بشكل كبير. المعلمون محترفون جداً وداعمون.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/men/1.jpg"
            },
            {
                id: 2,
                name_en: "Jane Smith",
                name_ar: "جين سميث",
                title_en: "Marketing Specialist",
                title_ar: "أخصائية تسويق",
                text_en: "I got my ICDL certificate thanks to MBA Academy. The materials were clear and the support was excellent.",
                text_ar: "حصلت على شهادة ICDL بفضل أكاديمية MBA. المواد كانت واضحة والدعم كان ممتازاً.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/women/1.jpg"
            },
            {
                id: 3,
                name_en: "Mike Wilson",
                name_ar: "مايك ويلسون",
                title_en: "Freelancer",
                title_ar: "مستقل",
                text_en: "The Digital Marketing course gave me real-world skills. I started my own freelancing business.",
                text_ar: "دورة التسويق الرقمي أعطتني مهارات عملية. بدأت مشروعي الخاص في العمل الحر.",
                rating: 4,
                image: "https://randomuser.me/api/portraits/men/2.jpg"
            }
        ];
        displayTestimonials();
    }
}

function displayTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    container.innerHTML = '';
    
    currentTestimonialsData.forEach(testimonial => {
        const name = isArabic ? testimonial.name_ar : testimonial.name_en;
        const title = isArabic ? testimonial.title_ar : testimonial.title_en;
        const text = isArabic ? testimonial.text_ar : testimonial.text_en;
        
        // Generate stars
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= testimonial.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="quote-icon">
                <i class="fas fa-quote-right"></i>
            </div>
            <div class="rating">${stars}</div>
            <p class="testimonial-text">"${text}"</p>
            <div class="student-info">
                <img class="student-avatar" src="${testimonial.image}" alt="${name}">
                <div class="student-details">
                    <h4>${name}</h4>
                    <span>${title}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Export function for language.js to call
window.refreshTestimonials = function() {
    if (currentTestimonialsData.length > 0) {
        displayTestimonials();
    } else {
        loadTestimonialsData();
    }
};

// Load on page load
loadTestimonialsData();