// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// فتح وقفل القائمة مع تغيير شكل الأيقونة
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// قفل القائمة عند الضغط على أي رابط (وتغيير شكل الأيقونة)
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// قفل القائمة عند الضغط خارجها
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// تغيير الكلاس actived عند الضغط على رابط
const menuLinks = document.querySelectorAll('.nav-menu li a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        // إزالة الكلاس actived من كل الروابط
        menuLinks.forEach(l => l.classList.remove('actived'));
        // إضافة الكلاس actived للرابط الحالي
        this.classList.add('actived');
    });
});

// تعيين الكلاس actived بناءً على الصفحة الحالية
const currentPage = window.location.pathname.split('/').pop();
menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('actived');
    }
});