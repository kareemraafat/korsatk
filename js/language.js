// language.js - Arabic/English Toggle

const langFloat = document.getElementById('lang-toggle-float');
let isArabic = false;

// ============================================
// REFRESH ALL DYNAMIC CONTENT ON LANGUAGE CHANGE
// ============================================
function refreshAllDynamicContent() {
    // Refresh Blog (latest posts on homepage)
    if (typeof window.refreshLatestBlog === 'function') window.refreshLatestBlog();
    
    // Refresh Blog Page (all posts)
    if (typeof window.refreshBlogPage === 'function') window.refreshBlogPage();
    
    // Refresh Blog Post (single post)
    if (typeof window.refreshBlogPost === 'function') window.refreshBlogPost();
    
    // Refresh Events Page
    if (typeof window.refreshEvents === 'function') window.refreshEvents();
    
    // Refresh Courses Page
    if (typeof window.refreshCoursesPage === 'function') window.refreshCoursesPage();
    
    // Refresh Course Details
    if (typeof window.refreshCourseDetails === 'function') window.refreshCourseDetails();
    
    // Refresh Instructors
    if (typeof window.refreshInstructors === 'function') window.refreshInstructors();
    
    // Refresh Partners
    if (typeof window.refreshPartners === 'function') window.refreshPartners();
    
    // Refresh Testimonials
    if (typeof window.refreshTestimonials === 'function') window.refreshTestimonials();
    
    // Refresh Branches
    if (typeof window.refreshBranches === 'function') window.refreshBranches();
    
    // Refresh Featured Courses
    if (typeof window.refreshFeaturedCourses === 'function') window.refreshFeaturedCourses();
    
    // Refresh Contact Info
    if (typeof window.refreshContactInfo === 'function') window.refreshContactInfo();
}

// ============================================
// SWITCH TO ENGLISH
// ============================================
function switchToEnglish() {
    // Show English content, hide Arabic content
    document.querySelectorAll('.english-content').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.arabic-content').forEach(el => el.style.display = 'none');
    
    // Change page direction
    document.documentElement.dir = 'ltr';
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    
    // Change button text
    if (langFloat) langFloat.innerHTML = 'AR';
    
    isArabic = false;
    
    // Refresh all dynamic content
    refreshAllDynamicContent();
}

// ============================================
// SWITCH TO ARABIC
// ============================================
function switchToArabic() {
    // Show Arabic content, hide English content
    document.querySelectorAll('.english-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.arabic-content').forEach(el => el.style.display = 'block');
    
    // Change page direction
    document.documentElement.dir = 'rtl';
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
    
    // Change button text
    if (langFloat) langFloat.innerHTML = 'E';
    
    isArabic = true;
    
    // Refresh all dynamic content
    refreshAllDynamicContent();
}

// ============================================
// EVENT LISTENER FOR LANGUAGE BUTTON
// ============================================
if (langFloat) {
    langFloat.addEventListener('click', () => {
        if (isArabic) {
            switchToEnglish();
        } else {
            switchToArabic();
        }
    });
}

// ============================================
// INITIALIZE WITH ENGLISH AS DEFAULT
// ============================================
switchToEnglish();
