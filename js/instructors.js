// instructors.js
async function displayInstructors() {
    try {
        const response = await fetch('/data/instructors.json');
        const data = await response.json();
        const instructors = data.instructors;
        const container = document.getElementById('instructorsGrid');
        
        if (!container) return;
        container.innerHTML = '';
        
        // تحديد اللغة الحالية
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
        console.error('Error loading instructors:', error);
    }
}

displayInstructors();