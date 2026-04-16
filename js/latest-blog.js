// ============================================
// LATEST BLOG - Display latest 3 posts on homepage
// Reads data from API instead of JSON file
// ============================================

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/blog';

// Load latest blog posts from API
async function loadLatestBlog() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Handle both formats: { posts: [] } or direct array []
        const posts = data.posts || data;
        
        // Validate that posts is an array
        if (!Array.isArray(posts)) {
            console.error('Posts data is not an array:', posts);
            loadStaticBlogPosts();
            return;
        }
        
        const container = document.getElementById('latestBlogGrid');
        if (!container) return;
        
        // Sort by date (newest first) and get latest 3
        const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestPosts = sortedPosts.slice(0, 3);
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        container.innerHTML = '';
        
        latestPosts.forEach(post => {
            const title = isArabic ? (post.title_ar || post.title_en) : post.title_en;
            const excerpt = isArabic ? (post.excerpt_ar || post.content_ar?.substring(0, 100) || '') : (post.excerpt_en || post.content_en?.substring(0, 100) || '');
            const category = isArabic ? (post.category_ar || post.category || 'عام') : (post.category_en || post.category || 'General');
            const imageUrl = post.image || `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(title)}`;
            
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-img-wrapper">
                    <img class="blog-image" src="${imageUrl}" alt="${title}">
                    <span class="blog-category">${category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${post.date}</span>
                    </div>
                    <h3 class="blog-title">${title}</h3>
                    <p class="blog-excerpt">${excerpt.substring(0, 100)}...</p>
                    <a href="blog-post.html?id=${post.id}" class="blog-read-more">
                        ${isArabic ? 'اقرأ المزيد' : 'Read More'} <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading latest blog posts from API:', error);
        loadStaticBlogPosts();
    }
}

// ============================================
// FALLBACK STATIC DATA (if API fails)
// ============================================
function loadStaticBlogPosts() {
    const container = document.getElementById('latestBlogGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticPosts = [
        {
            id: 1,
            title_en: "How to Master Business Management",
            title_ar: "كيف تتقن إدارة الأعمال",
            excerpt_en: "Learn the essential skills needed to become a successful business manager...",
            excerpt_ar: "تعلم المهارات الأساسية اللازمة لتصبح مدير أعمال ناجح...",
            date: "2025-04-15",
            category_en: "Business",
            category_ar: "أعمال",
            image: "https://placehold.co/600x400/667eea/white?text=Business"
        },
        {
            id: 2,
            title_en: "The Future of Online Learning",
            title_ar: "مستقبل التعلم عبر الإنترنت",
            excerpt_en: "Discover how online education is transforming the way we learn...",
            excerpt_ar: "اكتشف كيف يحول التعليم عبر الإنترنت طريقة تعلمنا...",
            date: "2025-04-10",
            category_en: "Education",
            category_ar: "تعليم",
            image: "https://placehold.co/600x400/667eea/white?text=Online+Learning"
        },
        {
            id: 3,
            title_en: "Top 10 Career Tips for 2025",
            title_ar: "أفضل 10 نصائح مهنية لعام 2025",
            excerpt_en: "Stay ahead of the competition with these career advancement tips...",
            excerpt_ar: "ابق متقدماً على المنافسة مع نصائح التقدم الوظيفي هذه...",
            date: "2025-04-05",
            category_en: "Career",
            category_ar: "مهنة",
            image: "https://placehold.co/600x400/667eea/white?text=Career+Tips"
        }
    ];
    
    container.innerHTML = '';
    
    staticPosts.forEach(post => {
        const title = isArabic ? post.title_ar : post.title_en;
        const excerpt = isArabic ? post.excerpt_ar : post.excerpt_en;
        const category = isArabic ? post.category_ar : post.category_en;
        
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-img-wrapper">
                <img class="blog-image" src="${post.image}" alt="${title}">
                <span class="blog-category">${category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-date">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${post.date}</span>
                </div>
                <h3 class="blog-title">${title}</h3>
                <p class="blog-excerpt">${excerpt}</p>
                <a href="blog-post.html?id=${post.id}" class="blog-read-more">
                    ${isArabic ? 'اقرأ المزيد' : 'Read More'} <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// REFRESH ON LANGUAGE CHANGE
// ============================================
window.refreshLatestBlog = function() {
    loadLatestBlog();
};

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
loadLatestBlog();
