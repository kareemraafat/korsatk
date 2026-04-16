// language.js - Arabic/English Toggle

const langFloat = document.getElementById('lang-toggle-float');
let isArabic = false;

function switchToEnglish() {
    document.querySelectorAll('.english-content').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.arabic-content').forEach(el => el.style.display = 'none');
    document.documentElement.dir = 'ltr';
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    if (langFloat) langFloat.innerHTML = 'AR';
    isArabic = false;
    
    // ============================================
// REFRESH ALL DYNAMIC CONTENT ON LANGUAGE CHANGE
// ============================================

// داخل switchToEnglish() و switchToArabic()، أضف:

// Refresh Blog (latest posts on homepage)
if (typeof window.refreshLatestBlog === 'function') window.refreshLatestBlog();

// Refresh Blog Page (all posts)
if (typeof window.refreshBlogPage === 'function') window.refreshBlogPage();

// Refresh Blog Post (single post)
if (typeof window.refreshBlogPost === 'function') window.refreshBlogPost();

// Refresh Events Page
if (typeof window.refreshEvents === 'function') window.refreshEvents();

// Refresh Courses Page (if exists)
if (typeof window.refreshCoursesPage === 'function') window.refreshCoursesPage();

// Refresh Course Details (if exists)
if (typeof window.refreshCourseDetails === 'function') window.refreshCourseDetails();

// Refresh Instructors (if exists on homepage)
if (typeof window.refreshInstructors === 'function') window.refreshInstructors();

// Refresh Partners (if exists on homepage)
if (typeof window.refreshPartners === 'function') window.refreshPartners();

// Refresh Testimonials (if exists)
if (typeof window.refreshTestimonials === 'function') window.refreshTestimonials();

// Refresh Branches (if exists)
if (typeof window.refreshBranches === 'function') window.refreshBranches();

// Refresh Featured Courses (if exists)
if (typeof window.refreshFeaturedCourses === 'function') window.refreshFeaturedCourses();

// Refresh Contact Info
if (typeof window.refreshContactInfo === 'function') window.refreshContactInfo();
    
}   

function switchToArabic() {
    document.querySelectorAll('.english-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.arabic-content').forEach(el => el.style.display = 'block');
    document.documentElement.dir = 'rtl';
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
    if (langFloat) langFloat.innerHTML = 'EN';
    isArabic = true;
    
    // ============================================
// REFRESH ALL DYNAMIC CONTENT ON LANGUAGE CHANGE
// ============================================

// داخل switchToEnglish() و switchToArabic()، أضف:

// Refresh Blog (latest posts on homepage)
if (typeof window.refreshLatestBlog === 'function') window.refreshLatestBlog();

// Refresh Blog Page (all posts)
if (typeof window.refreshBlogPage === 'function') window.refreshBlogPage();

// Refresh Blog Post (single post)
if (typeof window.refreshBlogPost === 'function') window.refreshBlogPost();

// Refresh Events Page
if (typeof window.refreshEvents === 'function') window.refreshEvents();

// Refresh Courses Page (if exists)
if (typeof window.refreshCoursesPage === 'function') window.refreshCoursesPage();

// Refresh Course Details (if exists)
if (typeof window.refreshCourseDetails === 'function') window.refreshCourseDetails();

// Refresh Instructors (if exists on homepage)
if (typeof window.refreshInstructors === 'function') window.refreshInstructors();

// Refresh Partners (if exists on homepage)
if (typeof window.refreshPartners === 'function') window.refreshPartners();

// Refresh Testimonials (if exists)
if (typeof window.refreshTestimonials === 'function') window.refreshTestimonials();

// Refresh Branches (if exists)
if (typeof window.refreshBranches === 'function') window.refreshBranches();

// Refresh Featured Courses (if exists)
if (typeof window.refreshFeaturedCourses === 'function') window.refreshFeaturedCourses();
// Refresh Contact Info
if (typeof window.refreshContactInfo === 'function') window.refreshContactInfo();
}

if (langFloat) {
    langFloat.addEventListener('click', () => {
        if (isArabic) switchToEnglish();
        else switchToArabic();
    });
}

switchToEnglish();