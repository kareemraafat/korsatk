// branches.js - Load branches from API

//const BRANCHES_API_URL = typeof BRANCHES_API_URL !== 'undefined' ? BRANCHES_API_URL : 'https://korsatk-admin.kareemraafat2017.workers.dev/api/branches';
async function loadBranches() {
    try {
        const response = await fetch(window.BRANCHES_API_URL);
        
        if (!response.ok) {
            console.log('Branches API returned', response.status, '- using static data');
            loadStaticBranches();
            return;
        }
        
        const branches = await response.json();
        const container = document.getElementById('branchesGrid');
        
        if (!container) return;
        
        if (!Array.isArray(branches) || branches.length === 0) {
            console.log('No branches data available - using static data');
            loadStaticBranches();
            return;
        }
        
        const isArabic = document.body.classList.contains('rtl') || 
                        document.documentElement.dir === 'rtl';
        
        container.innerHTML = '';
        
        branches.forEach(branch => {
            const name = isArabic ? branch.name_ar : branch.name_en;
            const address = isArabic ? branch.address_ar : branch.address_en;
            
            const card = document.createElement('div');
            card.className = 'branch-card';
            card.innerHTML = `
                <div class="branch-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3 class="branch-name">${name}</h3>
                <p class="branch-address">${address}</p>
                <div class="branch-buttons">
                    <div class="branch-buttons-row">
                        <a href="tel:${branch.phone}" class="btn-phone">
                            <i class="fas fa-phone-alt"></i> ${isArabic ? 'اتصل' : 'Call'}
                        </a>
                        <a href="https://wa.me/${branch.whatsapp}" target="_blank" class="btn-whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                    <button class="btn-contact-form open-modal">
                        <i class="fas fa-envelope"></i> ${isArabic ? 'نموذج تواصل' : 'Contact Form'}
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading branches from API:', error);
        loadStaticBranches();
    }
}

function loadStaticBranches() {
    const container = document.getElementById('branchesGrid');
    if (!container) return;
    
    const isArabic = document.body.classList.contains('rtl') || 
                    document.documentElement.dir === 'rtl';
    
    const staticBranches = [
        {
            name_en: "Cairo Branch",
            name_ar: "فرع القاهرة",
            address_en: "123 Tahrir Street, Downtown, Cairo, Egypt",
            address_ar: "123 شارع التحرير، وسط البلد، القاهرة، مصر",
            phone: "+201234567890",
            whatsapp: "201234567890"
        },
        {
            name_en: "Alexandria Branch",
            name_ar: "فرع الإسكندرية",
            address_en: "456 Corniche Road, Alexandria, Egypt",
            address_ar: "456 طريق الكورنيش، الإسكندرية، مصر",
            phone: "+201234567891",
            whatsapp: "201234567891"
        }
    ];
    
    container.innerHTML = '';
    
    staticBranches.forEach(branch => {
        const name = isArabic ? branch.name_ar : branch.name_en;
        const address = isArabic ? branch.address_ar : branch.address_en;
        
        const card = document.createElement('div');
        card.className = 'branch-card';
        card.innerHTML = `
            <div class="branch-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <h3 class="branch-name">${name}</h3>
            <p class="branch-address">${address}</p>
            <div class="branch-buttons">
                <div class="branch-buttons-row">
                    <a href="tel:${branch.phone}" class="btn-phone">
                        <i class="fas fa-phone-alt"></i> ${isArabic ? 'اتصل' : 'Call'}
                    </a>
                    <a href="https://wa.me/${branch.whatsapp}" target="_blank" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
                <button class="btn-contact-form open-modal">
                    <i class="fas fa-envelope"></i> ${isArabic ? 'نموذج تواصل' : 'Contact Form'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

window.refreshBranches = function() {
    loadBranches();
};

loadBranches();
