// featured-courses.js - Display featured courses only

async function loadFeaturedCourses() {
    try {
        const response = await fetch('/data/courses.json');
        const data = await response.json();
        const courses = data.courses || data;
        const container = document.getElementById('featuredGrid');
        
        if (!container) return;
        
        // Filter only featured courses
        const featuredCourses = courses.filter(course => course.featured === true);
        
        // Take only first 3 featured courses
        const topFeatured = featuredCourses.slice(0, 3);
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        container.innerHTML = '';
        
        if (topFeatured.length === 0) {
            container.innerHTML = '<div class="no-data" style="text-align:center; grid-column:1/-1; padding:50px;">No featured courses yet. Add some from admin panel.</div>';
            return;
        }
        
        topFeatured.forEach(course => {
            const title = isArabic ? (course.title_ar || course.title_en) : course.title_en;
            const description = isArabic ? (course.description_ar || course.description_en) : course.description_en;
            const level = isArabic ? (course.level_ar || 'مبتدئ') : (course.level_en || 'Beginner');
            const weeks = course.weeks || 20;
            const lectures = weeks * 2;
            const price = course.price || 0;
            const imageUrl = course.image || `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(title)}`;
            
            const card = document.createElement('div');
            card.className = 'featured-card';
            card.innerHTML = `
                <div class="featured-badge">
                    <i class="fas fa-fire"></i> ${isArabic ? 'عرض خاص' : 'Special Offer'}
                </div>
                <div class="featured-img-wrapper">
                    <img class="featured-image" src="${imageUrl}" alt="${title}">
                </div>
                <div class="featured-content">
                    <h3 class="featured-title">${title}</h3>
                    <p class="featured-description">${description}</p>
                    <div class="featured-meta">
                        <span><i class="fas fa-clock"></i> ${weeks} ${isArabic ? 'أسبوع' : 'Weeks'}</span>
                        <span><i class="fas fa-video"></i> ${lectures} ${isArabic ? 'محاضرة' : 'Lectures'}</span>
                        <span><i class="fas fa-chart-line"></i> ${level}</span>
                    </div>
                    <div class="featured-price">
                        <span class="price">$${price} <small>/ ${isArabic ? 'شامل' : 'All included'}</small></span>
                        <a href="course-details.html?id=${course.id}" class="featured-btn">
                            ${isArabic ? 'اشترك الان': 'Enroll Now'} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading featured courses:', error);
        loadStaticFeaturedCourses();
    }
}

function loadStaticFeaturedCourses() {
    const container = document.getElementById('featuredGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticFeatured = [
        {
            id: 1,
            title_en: "Business Management Mastery",
            title_ar: "إدارة الأعمال المتقدمة",
            description_en: "Learn the essential skills to become a successful business manager and leader.",
            description_ar: "تعلم المهارات الأساسية لتصبح مدير أعمال وقائد ناجح.",
            price: 299,
            level_en: "Advanced",
            level_ar: "متقدم",
            weeks: 24,
            image: "https://placehold.co/600x400/667eea/white?text=Business"
        },
        {
            id: 2,
            title_en: "Digital Marketing Pro",
            title_ar: "احتراف التسويق الرقمي",
            description_en: "Master SEO, social media, and content marketing strategies.",
            description_ar: "أتقن استراتيجيات تحسين محركات البحث والسوشيال ميديا والتسويق بالمحتوى.",
            price: 249,
            level_en: "Intermediate",
            level_ar: "متوسط",
            weeks: 20,
            image: "https://placehold.co/600x400/667eea/white?text=Marketing"
        },
        {
            id: 3,
            title_en: "Leadership & HR",
            title_ar: "القيادة وإدارة الموارد البشرية",
            description_en: "Develop leadership skills and learn modern HR practices.",
            description_ar: "طور مهاراتك القيادية وتعلم ممارسات الموارد البشرية الحديثة.",
            price: 279,
            level_en: "Advanced",
            level_ar: "متقدم",
            weeks: 22,
            image: "https://placehold.co/600x400/667eea/white?text=Leadership"
        }
    ];
    
    container.innerHTML = '';
    
    staticFeatured.forEach(course => {
        const title = isArabic ? course.title_ar : course.title_en;
        const description = isArabic ? course.description_ar : course.description_en;
        const level = isArabic ? course.level_ar : course.level_en;
        
        const card = document.createElement('div');
        card.className = 'featured-card';
        card.innerHTML = `
            <div class="featured-badge">
                <i class="fas fa-fire"></i> ${isArabic ? 'عرض خاص' : 'Special Offer'}
            </div>
            <div class="featured-img-wrapper">
                <img class="featured-image" src="${course.image}" alt="${title}">
            </div>
            <div class="featured-content">
                <h3 class="featured-title">${title}</h3>
                <p class="featured-description">${description}</p>
                <div class="featured-meta">
                    <span><i class="fas fa-clock"></i> ${course.weeks} ${isArabic ? 'أسبوع' : 'Weeks'}</span>
                    <span><i class="fas fa-video"></i> ${course.weeks * 2} ${isArabic ? 'محاضرة' : 'Lectures'}</span>
                    <span><i class="fas fa-chart-line"></i> ${level}</span>
                </div>
                <div class="featured-price">
                    <span class="price">$${course.price} <small>/ ${isArabic ? 'شامل' : 'All included'}</small></span>
                    <a href="course-details.html?id=${course.id}" class="featured-btn">
                        ${isArabic ? 'اشترك الان': 'Enroll Now'} <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Refresh when language changes
window.refreshFeaturedCourses = function() {
    loadFeaturedCourses();
};

loadFeaturedCourses();