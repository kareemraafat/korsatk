// instructors.js - Load instructors from API

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/instructors';

async function displayInstructors() {
    try {
        const response = await fetch(API_URL);
        
        // Check if API response is ok
        if (!response.ok) {
            console.log('Instructors API returned', response.status, '- using static data');
            loadStaticInstructors();
            return;
        }
        
        const data = await response.json();
        let instructors = data.instructors || data;
        
        // Validate data
        if (!Array.isArray(instructors) || instructors.length === 0) {
            console.log('No instructors data available - using static data');
            loadStaticInstructors();
            return;
        }
        
        const container = document.getElementById('instructorsGrid');
        if (!container) return;
        container.innerHTML = '';
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        instructors.forEach(instructor => {
            const name = isArabic ? (instructor.name_ar || instructor.name_en) : instructor.name_en;
            const title = isArabic ? (instructor.title_ar || instructor.title_en) : instructor.title_en;
            const bio = isArabic ? (instructor.bio_ar || instructor.bio_en || '') : (instructor.bio_en || instructor.bio_ar || '');
            const coursesCount = instructor.courses || 0;
            const studentsCount = instructor.students || 0;
            
            const card = document.createElement('div');
            card.className = 'instructor-card';
            card.innerHTML = `
                <div class="img-wrapper">
                    <img class="instructor-img" src="${instructor.image}" alt="${name}">
                </div>
                <h3>${name}</h3>
                <div class="instructor-title">${title}</div>
                <p class="instructor-bio">${bio}</p>
                <div class="instructor-stats">
                    <span><i class="fas fa-book"></i> ${coursesCount} ${isArabic ? 'كورسات' : 'Courses'}</span>
                    <span><i class="fas fa-users"></i> ${studentsCount} ${isArabic ? 'طلاب' : 'Students'}</span>
                </div>
                <div class="instructor-social">
                    <a href="${instructor.whatsapp || '#'}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="${instructor.facebook || '#'}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="${instructor.instagram || '#'}" target="_blank"><i class="fab fa-instagram"></i></a>
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
            bio_en: "Expert in English literature with 15+ years of teaching experience. TEFL certified.",
            bio_ar: "خبيرة في الأدب الإنجليزي مع أكثر من 15 سنة خبرة في التدريس. حاصلة على شهادة TEFL.",
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
            bio_en: "Former Google marketing lead with 10+ years in SEO and social media.",
            bio_ar: "قائد تسويق سابق في جوجل مع أكثر من 10 سنوات في تحسين محركات البحث.",
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
            bio_en: "HR consultant with 20+ years of experience. Certified coach for executives.",
            bio_ar: "استشارية موارد بشرية بخبرة تزيد عن 20 سنة. مدربة معتمدة للقادة.",
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
        const bio = isArabic ? (instructor.bio_ar || instructor.bio_en) : (instructor.bio_en || instructor.bio_ar);
        
        const card = document.createElement('div');
        card.className = 'instructor-card';
        card.innerHTML = `
            <div class="img-wrapper">
                <img class="instructor-img" src="${instructor.image}" alt="${name}">
            </div>
            <h3>${name}</h3>
            <div class="instructor-title">${title}</div>
            <p class="instructor-bio">${bio}</p>
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
