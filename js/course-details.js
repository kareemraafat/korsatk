// ============================================
// COURSE DETAILS PAGE - DYNAMIC VERSION
// Reads data from API instead of JSON files
// Handles: Course display, Related courses, Register modal with branches
// ============================================

const COURSES_API = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/courses';
const BRANCHES_API = 'https://korsatk-admin.kareemraafat2017.workers.dev/api/branches';

let allCourses = [];
let allBranches = [];

// ============================================
// LOAD COURSE DATA FROM API
// ============================================
async function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (!courseId) {
        document.getElementById('courseDetailsContainer').innerHTML = '<div class="error-message">No course selected</div>';
        return;
    }
    
    try {
        // Fetch courses data from API
        const response = await fetch(COURSES_API);
        const data = await response.json();
        allCourses = data.courses || data;
        
        // Find the specific course
        const course = allCourses.find(c => Number(c.id) === Number(courseId));
        
        if (!course) {
            document.getElementById('courseDetailsContainer').innerHTML = '<div class="error-message">Course not found</div>';
            return;
        }
        
        // Load branches data for register modal
        await loadBranches();
        
        // Display all sections
        displayCourseDetails(course);
        displayRelatedCourses(course);
        initRegisterModal(course);
        
    } catch (error) {
        console.error('Error loading course from API:', error);
        document.getElementById('courseDetailsContainer').innerHTML = '<div class="error-message">Error loading course data</div>';
    }
}

// ============================================
// LOAD BRANCHES FROM API
// ============================================
async function loadBranches() {
    try {
        const response = await fetch(BRANCHES_API);
        allBranches = await response.json();
    } catch (error) {
        console.error('Error loading branches from API:', error);
        // Fallback branches if API fails
        allBranches = [
            { id: 1, name_en: "Cairo Branch", name_ar: "فرع القاهرة" },
            { id: 2, name_en: "Alexandria Branch", name_ar: "فرع الإسكندرية" }
        ];
    }
}

// ============================================
// DISPLAY COURSE DETAILS (Left Column + Sidebar)
// ============================================
function displayCourseDetails(course) {
    const container = document.getElementById('courseDetailsContainer');
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const title = isArabic ? (course.title_ar || course.title_en) : course.title_en;
    const description = isArabic ? (course.description_ar || course.description_en) : course.description_en;
    const level = isArabic ? (course.level_ar || 'مبتدئ') : (course.level_en || 'Beginner');
    const weeks = course.weeks || 20;
    const lectures = weeks * 2;
    const price = course.price_online || course.price || 0;
    const imageUrl = course.image || `https://placehold.co/800x500/667eea/white?text=${encodeURIComponent(title)}`;
    const videoUrl = course.video || 'https://www.youtube.com/embed/UGyNzAI--qQ';
    
    const html = `
        <div class="course-details-wrapper">
            <!-- Left Column: Image, Title, Meta, Description, Video -->
            <div class="course-details-left">
                <img class="course-image-main" src="${imageUrl}" alt="${title}">
                <h1 class="course-title-main">${title}</h1>
                
                <div class="course-meta-bar">
                    <span><i class="fas fa-clock"></i> ${weeks} ${isArabic ? 'أسبوع' : 'Weeks'}</span>
                    <span><i class="fas fa-video"></i> ${lectures} ${isArabic ? 'محاضرات' : 'Lectures'}</span>
                    <span><i class="fas fa-certificate"></i> ${isArabic ? 'معتمدة' : 'Certified'}</span>
                </div>
                
                <div class="course-description">
                    <h3>${isArabic ? 'عن الكورس' : 'About This Course'}</h3>
                    <p>${description}</p>
                </div>
                
                <div class="course-video">
                    <h3>${isArabic ? 'مقدمة الكورس' : 'Course Introduction'}</h3>
                    <div class="video-wrapper">
                        <iframe src="${videoUrl}" title="Course Introduction" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Sidebar with Features, Price, Register Button -->
            <div class="course-details-right">
                <div class="course-sidebar">
                    <h3 class="sidebar-title">${isArabic ? 'مميزات الكورس' : 'Course Features'}</h3>
                    <ul class="features-list">
                        <li><span class="feature-label">${isArabic ? 'المدة' : 'Duration'}</span><span class="feature-value">${weeks} ${isArabic ? 'أسبوع' : 'Weeks'}</span></li>
                        <li><span class="feature-label">${isArabic ? 'عدد المحاضرات' : 'Total Lectures'}</span><span class="feature-value">${lectures}</span></li>
                        <li><span class="feature-label">${isArabic ? 'عدد الطلاب' : 'Total Students'}</span><span class="feature-value">1,234</span></li>
                        <li><span class="feature-label">${isArabic ? 'شهادة' : 'Certification'}</span><span class="feature-value">${isArabic ? 'معتمدة' : 'Certified'}</span></li>
                        <li><span class="feature-label">${isArabic ? 'المستوى' : 'Level'}</span><span class="feature-value">${level}</span></li>
                    </ul>
                    
                    <div class="course-price-sidebar">
                        <span class="price-amount">$${price} <small>/${isArabic ? 'شامل' : 'All included'}</small></span>
                    </div>
                    
                    <a href="${course.registration_link || '#'}" class="register-btn" target="_blank"> ${isArabic ? 'سجل الآن' : 'Register Today'} <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
        
        <!-- Related Courses Section (will be filled by JavaScript) -->
        <div class="related-courses" id="relatedCoursesContainer"></div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// DISPLAY RELATED COURSES (Same category, exclude current)
// ============================================
function displayRelatedCourses(currentCourse) {
    const container = document.getElementById('relatedCoursesContainer');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    // Filter courses from same category, excluding current course
    const related = allCourses.filter(c => c.category === currentCourse.category && Number(c.id) !== Number(currentCourse.id)).slice(0, 3);
    
    if (related.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    let html = `
        <h3 class="related-title">${isArabic ? 'كورسات ذات صلة' : 'Related Courses'}</h3>
        <div class="related-grid">
    `;
    
    related.forEach(course => {
        const title = isArabic ? (course.title_ar || course.title_en) : course.title_en;
        const price = course.price_online || course.price || 0;
        const imageUrl = course.image || `https://placehold.co/300x150/667eea/white?text=${encodeURIComponent(title)}`;
        
        html += `
            <a href="course-details.html?id=${course.id}" class="related-card" style="text-decoration: none;">
                <img class="related-img" src="${imageUrl}" alt="${title}">
                <div class="related-content">
                    <h4>${title}</h4>
                    <p>${isArabic ? 'كورس احترافي في' : 'Professional course in'} ${course.category}</p>
                    <span class="related-price">$${price}</span>
                </div>
            </a>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ============================================
// UPDATE BRANCH DROPDOWNS DYNAMICALLY
// ============================================
function updateBranchDropdowns() {
    const branchSelect = document.querySelector('#registerForm select[name="branch"]');
    const branchSelectAr = document.querySelector('#registerFormAr select[name="branch"]');
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    // Build options HTML from allBranches array
    let options = '<option value="" disabled selected>' + (isArabic ? 'اختر الفرع' : 'Select Branch') + '</option>';
    let optionsAr = '<option value="" disabled selected>' + (isArabic ? 'اختر الفرع' : 'Select Branch') + '</option>';
    
    allBranches.forEach(branch => {
        options += `<option value="${branch.id}">${branch.name_en}</option>`;
        optionsAr += `<option value="${branch.id}">${branch.name_ar}</option>`;
    });
    
    if (branchSelect) branchSelect.innerHTML = options;
    if (branchSelectAr) branchSelectAr.innerHTML = optionsAr;
}

// ============================================
// REGISTER MODAL FUNCTIONALITY (Dynamic Prices + Branches)
// ============================================
let selectedCoursePrice = 0;
let selectedCourseName = '';

function initRegisterModal(course) {
    // Get prices from course object (online/offline)
    const onlinePriceValue = course.price_online || course.price || 0;
    const offlinePriceValue = course.price_offline || (course.price + 100);
    
    selectedCoursePrice = onlinePriceValue;
    selectedCourseName = course.title_en;
    
    const registerBtn = document.querySelector('.register-btn');
    const registerModal = document.getElementById('registerModal');
    const registerFormModal = document.getElementById('registerFormModal');
    const closeBtns = document.querySelectorAll('.close-modal, .register-close, .form-close');
    
    if (!registerBtn) return;
    
    // Update prices in the first modal
    const onlinePriceSpan = document.querySelectorAll('.option-price');
    if (onlinePriceSpan[0]) onlinePriceSpan[0].innerHTML = '$' + onlinePriceValue;
    if (onlinePriceSpan[1]) onlinePriceSpan[1].innerHTML = '$' + offlinePriceValue;
    
    // Update option titles and descriptions based on language
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    const optionTitles = document.querySelectorAll('.register-option h4');
    const optionDescs = document.querySelectorAll('.register-option p');
    
    if (isArabic) {
        if (optionTitles[0]) optionTitles[0].innerText = 'كورس أونلاين';
        if (optionTitles[1]) optionTitles[1].innerText = 'كورس حضوري';
        if (optionDescs[0]) optionDescs[0].innerText = 'ادرس من أي مكان وفي أي وقت';
        if (optionDescs[1]) optionDescs[1].innerText = 'احضر شخصياً في فروعنا';
    } else {
        if (optionTitles[0]) optionTitles[0].innerText = 'Online Course';
        if (optionTitles[1]) optionTitles[1].innerText = 'Offline Course';
        if (optionDescs[0]) optionDescs[0].innerText = 'Study from anywhere, anytime';
        if (optionDescs[1]) optionDescs[1].innerText = 'Attend in-person at our branches';
    }
    
    // Open first modal when clicking Register button
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'flex';
    });
    
    // Handle selection of Online/Offline option
    document.querySelectorAll('.register-option').forEach(option => {
        const selectBtn = option.querySelector('.select-option');
        if (selectBtn) {
            selectBtn.addEventListener('click', () => {
                const type = option.getAttribute('data-type');
                registerModal.style.display = 'none';
                
                // Show/hide branch selection based on type
                const branchGroup = document.getElementById('branchSelectGroup');
                const branchGroupAr = document.getElementById('branchSelectGroupAr');
                
                if (type === 'offline') {
                    if (branchGroup) branchGroup.style.display = 'block';
                    if (branchGroupAr) branchGroupAr.style.display = 'block';
                    // Dynamically populate branch dropdowns
                    updateBranchDropdowns();
                } else {
                    if (branchGroup) branchGroup.style.display = 'none';
                    if (branchGroupAr) branchGroupAr.style.display = 'none';
                }
                
                registerFormModal.style.display = 'flex';
            });
        }
    });
    
    // Close modals when clicking X or outside
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            registerModal.style.display = 'none';
            registerFormModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === registerModal) registerModal.style.display = 'none';
        if (e.target === registerFormModal) registerFormModal.style.display = 'none';
    });
    
    // Handle English form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData);
            console.log('Registration Data:', { ...data, course: selectedCourseName, price: selectedCoursePrice });
            alert('Registration submitted successfully! We will contact you soon.');
            registerFormModal.style.display = 'none';
            registerForm.reset();
        });
    }
    
    // Handle Arabic form submission
    const registerFormAr = document.getElementById('registerFormAr');
    if (registerFormAr) {
        registerFormAr.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerFormAr);
            const data = Object.fromEntries(formData);
            console.log('Registration Data:', { ...data, course: selectedCourseName, price: selectedCoursePrice });
            alert('تم إرسال طلب التسجيل بنجاح! سنتواصل معك قريباً.');
            registerFormModal.style.display = 'none';
            registerFormAr.reset();
        });
    }
}

// ============================================
// REFRESH WHEN LANGUAGE CHANGES
// ============================================
window.refreshCourseDetails = function() {
    loadCourseDetails();
};

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
loadCourseDetails();
