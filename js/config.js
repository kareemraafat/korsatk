// ============================================
// MASTER CONFIGURATION FILE
// ============================================

// Worker URLs
const ADMIN_WORKER_URL = 'https://korsatk-admin.kareemraafat2017.workers.dev';
const BLOG_WORKER_URL = 'https://korsatk-blog.kareemraafat2017.workers.dev';  // 👈 الـ Worker اللي لسة شغاله

// API Endpoints
const ADMIN_API_URL = `${ADMIN_WORKER_URL}/api`;
const BLOG_API_URL = `${BLOG_WORKER_URL}/api/blog`;  // 👈 صح

// Specific API URLs
const COURSES_API_URL = `${ADMIN_API_URL}/courses`;
const INSTRUCTORS_API_URL = `${ADMIN_API_URL}/instructors`;
const TESTIMONIALS_API_URL = `${ADMIN_API_URL}/testimonials`;
const BRANCHES_API_URL = `${ADMIN_API_URL}/branches`;
const EVENTS_API_URL = `${ADMIN_API_URL}/events`;
const PARTNERS_API_URL = `${ADMIN_API_URL}/partners`;
const SETTINGS_API_URL = `${ADMIN_API_URL}/settings`;

// Make global
if (typeof window !== 'undefined') {
    window.ADMIN_API_URL = ADMIN_API_URL;
    window.BLOG_API_URL = BLOG_API_URL;
    window.COURSES_API_URL = COURSES_API_URL;
    window.INSTRUCTORS_API_URL = INSTRUCTORS_API_URL;
    window.TESTIMONIALS_API_URL = TESTIMONIALS_API_URL;
    window.BRANCHES_API_URL = BRANCHES_API_URL;
    window.EVENTS_API_URL = EVENTS_API_URL;
    window.PARTNERS_API_URL = PARTNERS_API_URL;
    window.SETTINGS_API_URL = SETTINGS_API_URL;
}
