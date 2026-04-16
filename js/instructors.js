// instructors.js - Load instructors from API

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/instructors';

async function displayInstructors() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const instructors = data.instructors || data;
        const container = document.getElementById('instructorsGrid');
        
        if (!container) return;
        container.innerHTML = '';
        
        // Detect current language
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        instructors.forEach(instructor => {
            const name = isArabic ? instructor.name_ar : instructor.name_en;
            const title = isArabic ? instructor.title_ar : instructor.title_en;
            
            const card = document.createElement('div');
            card.className = 'instructor-card';
            card.innerHTML = `
                <div class="img-wrapper">
                    <img class="instructor-img" src="${instructor.image}" alt="${name}">
                </div>
                <h3>${name}</h3>
                <div class="instructor-title">${title}</div>
                <div class="instructor-stats">
                    <span><i class="fas fa-book"></i> ${instructor.courses} ${isArabic ? 'كورسات' : 'Courses'}</span>
                    <span><i class="fas fa-users"></i> ${instructor.students} ${isArabic ? 'طلاب' : 'Students'}</span>
                </div>
                <div class="instructor-social">
                    <a href="${instructor.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="${instructor.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="${instructor.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading instructors from API:', error);
        loadStaticInstructors();
    }
}

function loadStaticInstructors() {
    const container = document.getElementById('instructorsGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticInstructors = [
        {
            name_en: "Dr. Sarah Johnson",
            name_ar: "د. سارة جونسون",
            title_en: "Senior English Instructor",
            title_ar: "كبير معلمي اللغة الإنجليزية",
            image: "https://placehold.co/400x400/667eea/white?text=Sarah",
            courses: 12,
            students: 850,
            whatsapp: "#",
            facebook: "#",
            instagram: "#"
        },
        {
            name_en: "Prof. Michael Chen",
            name_ar: "أ. مايكل تشين",
            title_en: "Digital Marketing Expert",
            title_ar: "خبير التسويق الرقمي",
            image: "https://placehold.co/400x400/667eea/white?text=Michael",
            courses: 8,
            students: 620,
            whatsapp: "#",
            facebook: "#",
            instagram: "#"
        },
        {
            name_en: "Dr. Emily Williams",
            name_ar: "د. إيميلي ويليامز",
            title_en: "HR & Leadership Coach",
            title_ar: "مدربة موارد بشرية وقيادة",
            image: "https://placehold.co/400x400/667eea/white?text=Emily",
            courses: 15,
            students: 1200,
            whatsapp: "#",
            facebook: "#",
            instagram: "#"
        }
    ];
    
    container.innerHTML = '';
    
    staticInstructors.forEach(instructor => {
        const name = isArabic ? instructor.name_ar : instructor.name_en;
        const title = isArabic ? instructor.title_ar : instructor.title_en;
        
        const card = document.createElement('div');
        card.className = 'instructor-card';
        card.innerHTML = `
            <div class="img-wrapper">
                <img class="instructor-img" src="${instructor.image}" alt="${name}">
            </div>
            <h3>${name}</h3>
            <div class="instructor-title">${title}</div>
            <div class="instructor-stats">
                <span><i class="fas fa-book"></i> ${instructor.courses} ${isArabic ? 'كورسات' : 'Courses'}</span>
                <span><i class="fas fa-users"></i> ${instructor.students} ${isArabic ? 'طلاب' : 'Students'}</span>
            </div>
            <div class="instructor-social">
                <a href="${instructor.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                <a href="${instructor.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="${instructor.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
        `;
        container.appendChild(card);
    });
}

window.refreshInstructors = function() {
    displayInstructors();
};

displayInstructors();
