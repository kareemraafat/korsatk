// courses-page.js - Load and filter courses

let allCourses = [];
let allCategories = [];

// Categories mapping for display
const categoryNames = {
    'business': { en: 'Business', ar: 'الأعمال' },
    'marketing': { en: 'Marketing', ar: 'التسويق' },
    'hr': { en: 'Human Resources', ar: 'الموارد البشرية' },
    'leadership': { en: 'Leadership', ar: 'القيادة' },
    'design': { en: 'Design', ar: 'التصميم' },
    'development': { en: 'Development', ar: 'التطوير' },
    'finance': { en: 'Finance', ar: 'المالية' },
    'it': { en: 'IT', ar: 'تقنية المعلومات' }
};

async function loadCoursesData() {
    try {
        const response = await fetch('/data/courses.json');
        const data = await response.json();
        allCourses = data.courses || data;
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allCourses.map(c => c.category))];
        allCategories = uniqueCategories.filter(c => c);
        
        displayCategories();
        displayCourses(allCourses);
        
    } catch (error) {
        console.error('Error loading courses:', error);
        loadStaticCourses();
    }
}

function displayCategories() {
    const container = document.getElementById('categoriesList');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    let html = `<li><a href="#" data-category="all" class="active-cat">${isArabic ? 'الكل' : 'All'} <span>${allCourses.length}</span></a></li>`;
    
    allCategories.forEach(cat => {
        const catName = isArabic ? (categoryNames[cat]?.ar || cat) : (categoryNames[cat]?.en || cat);
        const count = allCourses.filter(c => c.category === cat).length;
        html += `<li><a href="#" data-category="${cat}">${catName} <span>${count}</span></a></li>`;
    });
    
    container.innerHTML = html;
    
    // Add click event to category links
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Update active class
            document.querySelectorAll('.categories-list a').forEach(a => a.classList.remove('active-cat'));
            link.classList.add('active-cat');
            
            // Filter courses
            if (category === 'all') {
                displayCourses(allCourses);
            } else {
                const filtered = allCourses.filter(c => c.category === category);
                displayCourses(filtered);
            }
        });
    });
}

function displayCourses(courses) {
    const container = document.getElementById('coursesGridPage');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    if (courses.length === 0) {
        container.innerHTML = `<div class="no-results">${isArabic ? 'لا توجد كورسات في هذا التصنيف' : 'No courses in this category'}</div>`;
        return;
    }
    
    let html = '';
    
    courses.forEach(course => {
        const title = isArabic ? (course.title_ar || course.title_en) : course.title_en;
        const description = isArabic ? (course.description_ar || course.description_en) : course.description_en;
        const level = isArabic ? (course.level_ar || 'مبتدئ') : (course.level_en || 'Beginner');
        const category = isArabic ? (categoryNames[course.category]?.ar || course.category) : (categoryNames[course.category]?.en || course.category);
        const weeks = course.weeks || 20;
        const lectures = weeks * 2;
        const price = course.price || 0;
        const imageUrl = course.image || `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(title)}`;
        
        // Add featured class and badge if course is featured
        const featuredClass = course.featured === true ? 'featured-card-page' : '';
        const featuredBadge = course.featured === true ? `<div class="featured-badge-page"><i class="fas fa-fire"></i> ${isArabic ? 'عرض خاص' : 'Special Offer'}</div>` : '';
        
        html += `
            <div class="course-card-page ${featuredClass}">
                <div class="course-img-wrapper">
                    <img class="course-img-page" src="${imageUrl}" alt="${title}">
                    <span class="course-category-badge">${category}</span>
                    ${featuredBadge}
                </div>
                <div class="course-content-page">
                    <h3 class="course-title-page">${title}</h3>
                    <p class="course-description-page">${description.substring(0, 80)}...</p>
                    <div class="course-meta-page">
                        <span><i class="fas fa-clock"></i> ${weeks} ${isArabic ? 'أسبوع' : 'Weeks'}</span>
                        <span><i class="fas fa-video"></i> ${lectures} ${isArabic ? 'محاضرة' : 'Lectures'}</span>
                        <span><i class="fas fa-chart-line"></i> ${level}</span>
                    </div>
                    <div class="course-price-page">
                        <span class="price-page">$${price} <small>/${isArabic ? 'شامل' : 'All included'}</small></span>
                        <a href="course-details.html?id=${course.id}" class="btn-details">${isArabic ? 'تفاصيل' : 'Details'} <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadStaticCourses() {
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticCourses = [
        { id: 1, title_en: "Business Management", title_ar: "إدارة الأعمال", description_en: "Learn essential business management skills", description_ar: "تعلم مهارات إدارة الأعمال الأساسية", category: "business", featured: true, price: 299, weeks: 24, level_en: "Advanced", level_ar: "متقدم", image: "https://placehold.co/600x400/667eea/white?text=Business" },
        { id: 2, title_en: "Digital Marketing", title_ar: "التسويق الرقمي", description_en: "Master SEO, social media and content marketing", description_ar: "أتقن التسويق الرقمي ومحركات البحث", category: "marketing", featured: false, price: 249, weeks: 20, level_en: "Intermediate", level_ar: "متوسط", image: "https://placehold.co/600x400/667eea/white?text=Marketing" },
        { id: 3, title_en: "HR Management", title_ar: "إدارة الموارد البشرية", description_en: "Learn modern HR practices and strategies", description_ar: "تعلم ممارسات واستراتيجيات الموارد البشرية الحديثة", category: "hr", featured: false, price: 279, weeks: 22, level_en: "Advanced", level_ar: "متقدم", image: "https://placehold.co/600x400/667eea/white?text=HR" },
        { id: 4, title_en: "Leadership Skills", title_ar: "مهارات القيادة", description_en: "Develop effective leadership and management skills", description_ar: "طور مهارات القيادة والإدارة الفعالة", category: "leadership", featured: true, price: 259, weeks: 18, level_en: "Intermediate", level_ar: "متوسط", image: "https://placehold.co/600x400/667eea/white?text=Leadership" }
    ];
    
    allCourses = staticCourses;
    const uniqueCategories = [...new Set(staticCourses.map(c => c.category))];
    allCategories = uniqueCategories;
    
    displayCategories();
    displayCourses(staticCourses);
}

// Refresh when language changes
window.refreshCoursesPage = function() {
    if (allCourses.length > 0) {
        displayCategories();
        displayCourses(allCourses);
    } else {
        loadCoursesData();
    }
};

// Load on page load
loadCoursesData();