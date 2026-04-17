// testimonials.js - Load testimonials from API with language support

//const TESTIMONIALS_API_URL = typeof TESTIMONIALS_API_URL !== 'undefined' ? TESTIMONIALS_API_URL : 'https://korsatk-admin.kareemraafat2017.workers.dev/api/testimonials';

let currentTestimonialsData = [];

async function loadTestimonialsData() {
    try {
        const response = await fetch(window.TESTIMONIALS_API_URL);
        const data = await response.json();
        currentTestimonialsData = data.testimonials || data;
        displayTestimonials();
    } catch (error) {
        console.error('Error loading testimonials from API:', error);
        loadStaticTestimonials();
    }
}

function displayTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    container.innerHTML = '';
    
    if (!currentTestimonialsData || currentTestimonialsData.length === 0) {
        container.innerHTML = '<div class="no-data">No testimonials yet</div>';
        return;
    }
    
    currentTestimonialsData.forEach(testimonial => {
        const name = isArabic ? (testimonial.name_ar || testimonial.name_en) : testimonial.name_en;
        const title = isArabic ? (testimonial.title_ar || testimonial.title_en) : testimonial.title_en;
        const text = isArabic ? (testimonial.text_ar || testimonial.text_en) : testimonial.text_en;
        
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= testimonial.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="quote-icon"><i class="fas fa-quote-right"></i></div>
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

function loadStaticTestimonials() {
    currentTestimonialsData = [
        {
            id: 1,
            name_en: "John Doe",
            name_ar: "جون دو",
            title_en: "Software Engineer",
            title_ar: "مهندس برمجيات",
            text_en: "The English course was amazing! My speaking skills improved dramatically.",
            text_ar: "دورة الإنجليزية كانت رائعة! مهاراتي في التحدث تحسنت بشكل كبير.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 2,
            name_en: "Jane Smith",
            name_ar: "جين سميث",
            title_en: "Marketing Specialist",
            title_ar: "أخصائية تسويق",
            text_en: "I got my ICDL certificate thanks to MBA Academy.",
            text_ar: "حصلت على شهادة ICDL بفضل أكاديمية MBA.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            id: 3,
            name_en: "Mike Wilson",
            name_ar: "مايك ويلسون",
            title_en: "Freelancer",
            title_ar: "مستقل",
            text_en: "The Digital Marketing course gave me real-world skills.",
            text_ar: "دورة التسويق الرقمي أعطتني مهارات عملية.",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        }
    ];
    displayTestimonials();
}

window.refreshTestimonials = function() {
    if (currentTestimonialsData.length > 0) {
        displayTestimonials();
    } else {
        loadTestimonialsData();
    }
};

loadTestimonialsData();
