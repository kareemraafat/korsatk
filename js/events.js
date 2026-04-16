// ============================================
// EVENTS PAGE - Background Image Cards + Load More
// Social Media Icons (Facebook, Instagram, TikTok)
// Upcoming Events Badge
// ============================================

let allEvents = [];
let visibleCount = 4; // Start with 4 events (2 rows of 2)
let isLoading = false;

// ============================================
// LOAD EVENTS FROM JSON
// ============================================
async function loadEvents() {
    try {
        const response = await fetch('/data/events.json');
        const data = await response.json();
        allEvents = data.events || data;
        
        if (!Array.isArray(allEvents)) {
            console.error('Events data is not an array:', allEvents);
            loadStaticEvents();
            return;
        }
        
        // Sort by date (newest first)
        allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        displayEvents();
        
    } catch (error) {
        console.error('Error loading events:', error);
        loadStaticEvents();
    }
}

// ============================================
// DISPLAY EVENTS (with Load More)
// ============================================
function displayEvents() {
    const container = document.getElementById('eventsGrid');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    // Get events to display
    const eventsToShow = allEvents.slice(0, visibleCount);
    
    if (eventsToShow.length === 0) {
        container.innerHTML = `<div class="no-events">${isArabic ? 'لا توجد فعاليات حالياً' : 'No events available'}</div>`;
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        return;
    }
    
    let html = '';
    
    eventsToShow.forEach(event => {
        const title = isArabic ? (event.title_ar || event.title_en) : event.title_en;
        const description = isArabic ? (event.description_ar || event.description_en || '') : (event.description_en || '');
        const date = event.date;
        const imageUrl = event.image || 'https://placehold.co/800x600/667eea/white?text=Event';
        
        // Add upcoming class if status is 'upcoming'
        const upcomingClass = event.status === 'upcoming' ? 'upcoming' : '';
        
        // Build social media icons only if URLs exist
        let socialIcons = '';
        
        if (event.facebook_url) {
            socialIcons += `<a href="${event.facebook_url}" target="_blank" class="facebook" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>`;
        }
        if (event.instagram_url) {
            socialIcons += `<a href="${event.instagram_url}" target="_blank" class="instagram" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>`;
        }
        if (event.tiktok_url) {
            socialIcons += `<a href="${event.tiktok_url}" target="_blank" class="tiktok" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>`;
        }
        
        html += `
            <div class="event-card ${upcomingClass}" style="background-image: url('${imageUrl}');">
                <div class="event-content">
                    <div class="event-date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${date}</span>
                    </div>
                    <h3 class="event-title">${title}</h3>
                    <p class="event-description">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
                    ${socialIcons ? `<div class="event-social">${socialIcons}</div>` : ''}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Show/hide load more button
    if (loadMoreContainer) {
        if (visibleCount < allEvents.length) {
            loadMoreContainer.style.display = 'block';
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
}

// ============================================
// LOAD MORE FUNCTIONALITY
// ============================================
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
        if (isLoading) return;
        isLoading = true;
        
        // Add 2 more events (1 more row of 2)
        visibleCount += 2;
        
        displayEvents();
        
        isLoading = false;
    });
}

// ============================================
// FALLBACK STATIC EVENTS
// ============================================
function loadStaticEvents() {
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticEvents = [
        {
            id: 1,
            title_en: "Annual Business Conference 2025",
            title_ar: "المؤتمر السنوي للأعمال 2025",
            description_en: "Join industry leaders for a day of insights, networking, and innovation.",
            description_ar: "انضم إلى قادة الصناعة ليوم من الرؤى والتواصل والابتكار.",
            date: "2025-05-15",
            status: "upcoming",
            facebook_url: "#",
            instagram_url: "#",
            tiktok_url: "#",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
        },
        {
            id: 2,
            title_en: "Digital Marketing Workshop",
            title_ar: "ورشة عمل التسويق الرقمي",
            description_en: "Learn the latest SEO, social media, and content marketing strategies.",
            description_ar: "تعلم أحدث استراتيجيات تحسين محركات البحث والتسويق عبر وسائل التواصل الاجتماعي.",
            date: "2025-06-10",
            status: "upcoming",
            facebook_url: "#",
            instagram_url: "#",
            tiktok_url: "#",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
        },
        {
            id: 3,
            title_en: "Leadership Summit",
            title_ar: "قمة القيادة",
            description_en: "Develop your leadership skills with interactive sessions.",
            description_ar: "طور مهاراتك القيادية من خلال جلسات تفاعلية.",
            date: "2025-07-20",
            status: "upcoming",
            facebook_url: "#",
            instagram_url: "#",
            tiktok_url: "#",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
        },
        {
            id: 4,
            title_en: "Graduation Ceremony 2025",
            title_ar: "حفل التخرج 2025",
            description_en: "Celebrate the achievements of our graduates.",
            description_ar: "احتفل بإنجازات خريجينا.",
            date: "2025-08-05",
            status: "upcoming",
            facebook_url: "#",
            instagram_url: "#",
            tiktok_url: "#",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
        }
    ];
    
    allEvents = staticEvents;
    displayEvents();
    setupLoadMore();
}

// ============================================
// REFRESH ON LANGUAGE CHANGE
// ============================================
window.refreshEvents = function() {
    displayEvents();
};

// ============================================
// INITIALIZE
// ============================================
loadEvents();
setupLoadMore();