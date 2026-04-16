// ============================================
// BLOG PAGE - Dynamic Blog with Categories & Search
// Reads data from API instead of JSON file
// ============================================

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/blog';

let allPosts = [];
let allCategories = [];

// Category name mappings for display
const categoryNames = {
    'business': { en: 'Business', ar: 'أعمال' },
    'education': { en: 'Education', ar: 'تعليم' },
    'career': { en: 'Career', ar: 'مهنة' },
    'tips': { en: 'Tips', ar: 'نصائح' },
    'news': { en: 'News', ar: 'أخبار' },
    'tutorials': { en: 'Tutorials', ar: 'دروس' }
};

// ============================================
// LOAD BLOG DATA FROM API
// ============================================
async function loadBlogData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allPosts = data.posts || data;
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allPosts.map(p => p.category))];
        allCategories = uniqueCategories.filter(c => c);
        
        displayCategories();
        displayPosts(allPosts);
        
        // Setup search listener
        setupSearch();
        
    } catch (error) {
        console.error('Error loading blog data from API:', error);
        loadStaticBlogData();
    }
}

// ============================================
// DISPLAY CATEGORIES IN SIDEBAR
// ============================================
function displayCategories() {
    const container = document.getElementById('blogCategoriesList');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    let html = `<li><a href="#" data-category="all" class="active-cat">${isArabic ? 'الكل' : 'All'} <span id="allCount">${allPosts.length}</span></a></li>`;
    
    allCategories.forEach(cat => {
        const catName = isArabic ? (categoryNames[cat]?.ar || cat) : (categoryNames[cat]?.en || cat);
        const count = allPosts.filter(p => p.category === cat).length;
        html += `<li><a href="#" data-category="${cat}">${catName} <span>${count}</span></a></li>`;
    });
    
    container.innerHTML = html;
    
    // Add click event to category links
    document.querySelectorAll('#blogCategoriesList a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            
            // Update active class
            document.querySelectorAll('#blogCategoriesList a').forEach(a => a.classList.remove('active-cat'));
            link.classList.add('active-cat');
            
            // Filter posts
            if (category === 'all') {
                displayPosts(allPosts);
            } else {
                const filtered = allPosts.filter(p => p.category === category);
                displayPosts(filtered);
            }
        });
    });
}

// ============================================
// DISPLAY BLOG POSTS
// ============================================
function displayPosts(posts) {
    const container = document.getElementById('blogGridPage');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    if (posts.length === 0) {
        container.innerHTML = `<div class="no-results">${isArabic ? 'لا توجد مقالات' : 'No posts found'}</div>`;
        return;
    }
    
    let html = '';
    
    posts.forEach(post => {
        const title = isArabic ? (post.title_ar || post.title_en) : post.title_en;
        const excerpt = isArabic ? (post.excerpt_ar || post.excerpt_en || (post.content_ar?.substring(0, 100) + '...')) : (post.excerpt_en || post.content_en?.substring(0, 100) + '...');
        const category = isArabic ? (categoryNames[post.category]?.ar || post.category) : (categoryNames[post.category]?.en || post.category);
        const imageUrl = post.image || `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(title)}`;
        
        html += `
            <div class="blog-card-page">
                <div class="blog-img-wrapper">
                    <img class="blog-img-page" src="${imageUrl}" alt="${title}">
                    <span class="blog-category-badge">${category}</span>
                </div>
                <div class="blog-content-page">
                    <div class="blog-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${post.date}</span>
                    </div>
                    <h3 class="blog-title-page">${title}</h3>
                    <p class="blog-excerpt">${excerpt}</p>
                    <a href="blog-post.html?id=${post.id}" class="blog-read-more">
                        ${isArabic ? 'اقرأ المزيد' : 'Read More'} <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            displayPosts(allPosts);
            return;
        }
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        const filtered = allPosts.filter(post => {
            const title = isArabic ? (post.title_ar || post.title_en) : post.title_en;
            const excerpt = isArabic ? (post.excerpt_ar || post.excerpt_en || post.content_ar) : (post.excerpt_en || post.content_en);
            return title.toLowerCase().includes(query) || (excerpt && excerpt.toLowerCase().includes(query));
        });
        
        displayPosts(filtered);
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// ============================================
// FALLBACK STATIC DATA (if API fails)
// ============================================
function loadStaticBlogData() {
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
            category: "business",
            image: "https://placehold.co/600x400/667eea/white?text=Business"
        },
        {
            id: 2,
            title_en: "The Future of Online Learning",
            title_ar: "مستقبل التعلم عبر الإنترنت",
            excerpt_en: "Discover how online education is transforming the way we learn...",
            excerpt_ar: "اكتشف كيف يحول التعليم عبر الإنترنت طريقة تعلمنا...",
            date: "2025-04-10",
            category: "education",
            image: "https://placehold.co/600x400/667eea/white?text=Online+Learning"
        },
        {
            id: 3,
            title_en: "Top 10 Career Tips for 2025",
            title_ar: "أفضل 10 نصائح مهنية لعام 2025",
            excerpt_en: "Stay ahead of the competition with these career advancement tips...",
            excerpt_ar: "ابق متقدماً على المنافسة مع نصائح التقدم الوظيفي هذه...",
            date: "2025-04-05",
            category: "career",
            image: "https://placehold.co/600x400/667eea/white?text=Career+Tips"
        }
    ];
    
    allPosts = staticPosts;
    const uniqueCategories = [...new Set(staticPosts.map(p => p.category))];
    allCategories = uniqueCategories;
    
    displayCategories();
    displayPosts(staticPosts);
    setupSearch();
}

// ============================================
// REFRESH ON LANGUAGE CHANGE
// ============================================
window.refreshBlogPage = function() {
    if (allPosts.length > 0) {
        displayCategories();
        displayPosts(allPosts);
    } else {
        loadBlogData();
    }
};

// ============================================
// INITIALIZE
// ============================================
loadBlogData();
