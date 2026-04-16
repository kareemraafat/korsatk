// ============================================
// BLOG POST PAGE - Single Post with Share Buttons
// Reads data from API instead of JSON file
// ============================================

const API_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/blog';

let allPosts = [];

// Category name mappings
const categoryNames = {
    'business': { en: 'Business', ar: 'أعمال' },
    'education': { en: 'Education', ar: 'تعليم' },
    'career': { en: 'Career', ar: 'مهنة' },
    'tips': { en: 'Tips', ar: 'نصائح' },
    'news': { en: 'News', ar: 'أخبار' },
    'tutorials': { en: 'Tutorials', ar: 'دروس' }
};

// ============================================
// LOAD SINGLE POST FROM API
// ============================================
async function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        document.getElementById('blogPostContainer').innerHTML = '<div class="error-message">No post selected</div>';
        return;
    }
    
    try {
        // First, get all posts from API
        const response = await fetch(API_URL);
        const data = await response.json();
        allPosts = data.posts || data;
        
        // Find the specific post by ID
        const post = allPosts.find(p => Number(p.id) === Number(postId));
        
        if (!post) {
            document.getElementById('blogPostContainer').innerHTML = '<div class="error-message">Post not found</div>';
            return;
        }
        
        displayBlogPost(post);
        
    } catch (error) {
        console.error('Error loading post from API:', error);
        loadStaticBlogPost(postId);
    }
}

// ============================================
// DISPLAY BLOG POST
// ============================================
function displayBlogPost(post) {
    const container = document.getElementById('blogPostContainer');
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const title = isArabic ? (post.title_ar || post.title_en) : post.title_en;
    const content = isArabic ? (post.content_ar || post.content_en || '<p>Content coming soon...</p>') : (post.content_en || '<p>Content coming soon...</p>');
    const category = isArabic ? (categoryNames[post.category]?.ar || post.category) : (categoryNames[post.category]?.en || post.category);
    const author = post.author || (isArabic ? 'مدير' : 'Admin');
    const imageUrl = post.image || `https://placehold.co/900x400/667eea/white?text=${encodeURIComponent(title)}`;
    
    // Current page URL for sharing
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(title);
    
    const html = `
        <div class="post-container">
            <div class="post-header">
                <span class="post-category">${category}</span>
                <h1 class="post-title">${title}</h1>
                <div class="post-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                    <span><i class="fas fa-user"></i> ${author}</span>
                    <span><i class="fas fa-clock"></i> 5 min read</span>
                </div>
            </div>
            
            <img class="post-image" src="${imageUrl}" alt="${title}">
            
            <div class="post-content">
                ${content}
            </div>
            
            <div class="share-section">
                <h4>${isArabic ? 'شارك المقال' : 'Share this article'}</h4>
                <div class="share-buttons">
                    <a href="https://wa.me/?text=${currentTitle}%20-%20${currentUrl}" target="_blank" class="share-btn whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" class="share-btn facebook">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?text=${currentTitle}&url=${currentUrl}" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${currentTitle}" target="_blank" class="share-btn linkedin">
                        <i class="fab fa-linkedin-in"></i> LinkedIn
                    </a>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="blog.html" class="back-button">
                    <i class="fas fa-arrow-left"></i> ${isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
                </a>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// FALLBACK STATIC POST (if API fails)
// ============================================
function loadStaticBlogPost(postId) {
    const staticPosts = {
        1: {
            id: 1,
            title_en: "How to Master Business Management",
            title_ar: "كيف تتقن إدارة الأعمال",
            content_en: "<p>Learn the essential skills needed to become a successful business manager. This comprehensive guide covers strategic planning, leadership, and operations management.</p><h2>Key Skills You'll Learn</h2><p>Strategic thinking, decision making, team leadership, and financial acumen are just a few of the skills you'll develop.</p>",
            content_ar: "<p>تعلم المهارات الأساسية اللازمة لتصبح مدير أعمال ناجح. يغطي هذا الدليل الشامل التخطيط الاستراتيجي والقيادة وإدارة العمليات.</p><h2>المهارات الرئيسية التي ستتعلمها</h2><p>التفكير الاستراتيجي، اتخاذ القرارات، قيادة الفريق، والفطنة المالية هي مجرد بعض المهارات التي ستطورها.</p>",
            date: "2025-04-15",
            category: "business",
            image: "https://placehold.co/900x400/667eea/white?text=Business",
            author: "Dr. Sarah Johnson"
        },
        2: {
            id: 2,
            title_en: "The Future of Online Learning",
            title_ar: "مستقبل التعلم عبر الإنترنت",
            content_en: "<p>Discover how online education is transforming the way we learn. Explore emerging trends and technologies shaping the future of education.</p>",
            content_ar: "<p>اكتشف كيف يحول التعليم عبر الإنترنت طريقة تعلمنا. استكشف الاتجاهات والتقنيات الناشئة التي تشكل مستقبل التعليم.</p>",
            date: "2025-04-10",
            category: "education",
            image: "https://placehold.co/900x400/667eea/white?text=Online+Learning",
            author: "Prof. Michael Chen"
        },
        3: {
            id: 3,
            title_en: "Top 10 Career Tips for 2025",
            title_ar: "أفضل 10 نصائح مهنية لعام 2025",
            content_en: "<p>Stay ahead of the competition with these career advancement tips. Learn how to network effectively and build your personal brand.</p>",
            content_ar: "<p>ابق متقدماً على المنافسة مع نصائح التقدم الوظيفي هذه. تعلم كيفية التواصل بفعالية وبناء علامتك التجارية الشخصية.</p>",
            date: "2025-04-05",
            category: "career",
            image: "https://placehold.co/900x400/667eea/white?text=Career+Tips",
            author: "Sarah Lee"
        }
    };
    
    const post = staticPosts[postId];
    
    if (post) {
        displayBlogPost(post);
    } else {
        document.getElementById('blogPostContainer').innerHTML = '<div class="error-message">Post not found</div>';
    }
}

// ============================================
// REFRESH ON LANGUAGE CHANGE
// ============================================
window.refreshBlogPost = function() {
    loadBlogPost();
};

// ============================================
// INITIALIZE
// ============================================
loadBlogPost();
