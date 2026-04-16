// ============================================
// ADMIN PANEL - Real API Version with Debugging
// ============================================

const API_BASE = 'https://korsatk-admin.kareemraafat2017.workers.dev/api';
let currentTab = 'dashboard';
let currentEditId = null;

// Field definitions for each section
const fieldDefinitions = {
    courses: [
        { name: 'title_en', label: 'Title (English)', type: 'text', required: true },
        { name: 'title_ar', label: 'Title (Arabic)', type: 'text', required: true },
        { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
        { name: 'description_ar', label: 'Description (Arabic)', type: 'textarea', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'weeks', label: 'Duration (weeks)', type: 'number', required: true },
        { name: 'level_en', label: 'Level (English)', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] },
        { name: 'level_ar', label: 'Level (Arabic)', type: 'select', options: ['مبتدئ', 'متوسط', 'متقدم'] },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'video', label: 'Video URL', type: 'text' },
        { name: 'featured', label: 'Featured', type: 'checkbox' }
    ],
    instructors: [
        { name: 'name_en', label: 'Name (English)', type: 'text', required: true },
        { name: 'name_ar', label: 'Name (Arabic)', type: 'text', required: true },
        { name: 'title_en', label: 'Title (English)', type: 'text', required: true },
        { name: 'title_ar', label: 'Title (Arabic)', type: 'text', required: true },
        { name: 'bio_en', label: 'Bio (English)', type: 'textarea', required: true },
        { name: 'bio_ar', label: 'Bio (Arabic)', type: 'textarea', required: true },
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'facebook', label: 'Facebook URL', type: 'text' },
        { name: 'instagram', label: 'Instagram URL', type: 'text' },
        { name: 'tiktok', label: 'TikTok URL', type: 'text' }
    ],
    testimonials: [
        { name: 'name_en', label: 'Name (English)', type: 'text', required: true },
        { name: 'name_ar', label: 'Name (Arabic)', type: 'text', required: true },
        { name: 'title_en', label: 'Title (English)', type: 'text', required: true },
        { name: 'title_ar', label: 'Title (Arabic)', type: 'text', required: true },
        { name: 'text_en', label: 'Testimonial (English)', type: 'textarea', required: true },
        { name: 'text_ar', label: 'Testimonial (Arabic)', type: 'textarea', required: true },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
        { name: 'image', label: 'Image URL', type: 'text' }
    ],
    branches: [
        { name: 'name_en', label: 'Name (English)', type: 'text', required: true },
        { name: 'name_ar', label: 'Name (Arabic)', type: 'text', required: true },
        { name: 'address_en', label: 'Address (English)', type: 'textarea', required: true },
        { name: 'address_ar', label: 'Address (Arabic)', type: 'textarea', required: true },
        { name: 'phone', label: 'Phone Number', type: 'text', required: true },
        { name: 'whatsapp', label: 'WhatsApp Number', type: 'text', required: true }
    ],
    events: [
        { name: 'title_en', label: 'Title (English)', type: 'text', required: true },
        { name: 'title_ar', label: 'Title (Arabic)', type: 'text', required: true },
        { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
        { name: 'description_ar', label: 'Description (Arabic)', type: 'textarea', required: true },
        { name: 'date', label: 'Date (YYYY-MM-DD)', type: 'date', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['upcoming', 'past'] },
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'facebook_url', label: 'Facebook URL', type: 'text' },
        { name: 'instagram_url', label: 'Instagram URL', type: 'text' },
        { name: 'tiktok_url', label: 'TikTok URL', type: 'text' }
    ],
    blog: [
        { name: 'title_en', label: 'Title (English)', type: 'text', required: true },
        { name: 'title_ar', label: 'Title (Arabic)', type: 'text', required: true },
        { name: 'excerpt_en', label: 'Excerpt (English)', type: 'textarea', required: true },
        { name: 'excerpt_ar', label: 'Excerpt (Arabic)', type: 'textarea', required: true },
        { name: 'content_en', label: 'Content (English)', type: 'textarea', required: true },
        { name: 'content_ar', label: 'Content (Arabic)', type: 'textarea', required: true },
        { name: 'date', label: 'Date (YYYY-MM-DD)', type: 'date', required: true },
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'author', label: 'Author', type: 'text', required: true }
    ],
    settings: [
        { name: 'phone', label: 'Phone Number', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'address_en', label: 'Address (English)', type: 'textarea', required: true },
        { name: 'address_ar', label: 'Address (Arabic)', type: 'textarea', required: true },
        { name: 'working_hours_en', label: 'Working Hours (English)', type: 'text', required: true },
        { name: 'working_hours_ar', label: 'Working Hours (Arabic)', type: 'text', required: true },
        { name: 'map_url', label: 'Google Maps URL', type: 'text' }
    ]
};

// Tab switching
document.querySelectorAll('.admin-menu li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.admin-menu li').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentTab = item.getAttribute('data-tab');
        document.getElementById('pageTitle').innerText = item.innerText.trim();
        loadTabContent();
    });
});

async function loadTabContent() {
    const container = document.getElementById('adminContent');
    
    if (currentTab === 'dashboard') {
        await loadDashboard();
        return;
    }
    
    try {
        const url = `${API_BASE}/${currentTab}`;
        console.log('🔍 Fetching URL:', url);
        
        const response = await fetch(url);
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📦 Data received:', data);
        
        const items = Array.isArray(data) ? data : (data[currentTab] || []);
        console.log('📋 Items array:', items);
        
        let html = `
            <button class="add-btn" onclick="openAddModal()">+ Add New</button>
            <div class="data-table">
                <table>
                    <thead>
                        <tr><th>ID</th><th>Title</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
        `;
        
        if (items.length === 0) {
            html += `<tr><td colspan="3" style="text-align: center;">No data found. Click "Add New" to create your first item.</td></tr>`;
        } else {
            items.forEach(item => {
                const title = item.title_en || item.name_en || item.title || `Item ${item.id}`;
                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${escapeHtml(title)}</td>
                        <td class="actions">
                            <button class="edit-btn" onclick="editItem(${item.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }
        
        html += `</tbody>赶t</div>`;
        container.innerHTML = html;
        
    } catch (error) {
        console.error('❌ Error loading tab content:', error);
        container.innerHTML = `<p class="error">Error loading data: ${error.message}</p>`;
    }
}

async function loadDashboard() {
    const sections = ['courses', 'instructors', 'testimonials', 'branches', 'events', 'blog'];
    const container = document.getElementById('adminContent');
    
    let html = `<div class="dashboard-stats">`;
    
    for (const section of sections) {
        try {
            console.log(`🔍 Fetching dashboard stats for: ${section}`);
            const response = await fetch(`${API_BASE}/${section}`);
            const data = await response.json();
            const items = Array.isArray(data) ? data : (data[section] || []);
            const count = items.length;
            html += `
                <div class="stat-card">
                    <h3>${section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                    <p>${count}</p>
                </div>
            `;
        } catch (error) {
            console.error(`Error fetching ${section}:`, error);
            html += `
                <div class="stat-card">
                    <h3>${section.charAt(0).toUpperCase() + section.slice(1)}</h3>
                    <p>0</p>
                </div>
            `;
        }
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

function openAddModal() {
    currentEditId = null;
    const sectionName = currentTab.slice(0, -1).charAt(0).toUpperCase() + currentTab.slice(0, -1).slice(1);
    document.getElementById('modalTitle').innerText = `Add New ${sectionName}`;
    buildFormFields(null);
    document.getElementById('itemModal').style.display = 'flex';
}

async function editItem(id) {
    currentEditId = id;
    const response = await fetch(`${API_BASE}/${currentTab}`);
    const data = await response.json();
    const items = Array.isArray(data) ? data : (data[currentTab] || []);
    const item = items.find(i => i.id === id);
    
    if (item) {
        const sectionName = currentTab.slice(0, -1).charAt(0).toUpperCase() + currentTab.slice(0, -1).slice(1);
        document.getElementById('modalTitle').innerText = `Edit ${sectionName}`;
        buildFormFields(item);
        document.getElementById('itemModal').style.display = 'flex';
    }
}

function buildFormFields(item) {
    const fields = fieldDefinitions[currentTab];
    if (!fields) return;
    
    let html = '';
    fields.forEach(field => {
        const value = item ? (item[field.name] || '') : '';
        
        if (field.type === 'textarea') {
            html += `<div class="form-group"><label>${field.label}</label><textarea name="${field.name}" ${field.required ? 'required' : ''}>${escapeHtml(value)}</textarea></div>`;
        } else if (field.type === 'select') {
            html += `<div class="form-group"><label>${field.label}</label><select name="${field.name}" ${field.required ? 'required' : ''}>${field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select></div>`;
        } else if (field.type === 'checkbox') {
            html += `<div class="form-group"><label style="display:flex;align-items:center;gap:10px;"><input type="checkbox" name="${field.name}" ${value ? 'checked' : ''}> ${field.label}</label></div>`;
        } else {
            html += `<div class="form-group"><label>${field.label}</label><input type="${field.type}" name="${field.name}" value="${escapeHtml(value)}" ${field.required ? 'required' : ''}></div>`;
        }
    });
    document.getElementById('formFields').innerHTML = html;
}

async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            console.log(`🗑️ Deleting item ${id} from ${currentTab}`);
            await fetch(`${API_BASE}/${currentTab}/${id}`, { method: 'DELETE' });
            loadTabContent();
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
    }
}

// Form submission
document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        if (key === 'featured') {
            data[key] = value === 'on';
        } else if (key === 'rating' || key === 'price' || key === 'weeks') {
            data[key] = parseInt(value);
        } else {
            data[key] = value;
        }
    });
    
    try {
        if (currentEditId) {
            console.log(`✏️ Updating item ${currentEditId} in ${currentTab}`);
            data.id = currentEditId;
            await fetch(`${API_BASE}/${currentTab}/${currentEditId}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            console.log(`➕ Adding new item to ${currentTab}`);
            await fetch(`${API_BASE}/${currentTab}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
        }
        closeModal();
        loadTabContent();
    } catch (error) {
        console.error('Error saving item:', error);
        alert('Error saving item');
    }
});

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
    document.getElementById('itemForm').reset();
    currentEditId = null;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Event listeners
document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('itemModal')) closeModal();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'login.html';
    }
});

// Check login
if (window.location.pathname.includes('admin.html')) {
    if (!localStorage.getItem('adminLoggedIn')) {
        const password = prompt('Enter admin password:');
        if (password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
        } else {
            window.location.href = '../index.html';
        }
    }
}

// Load initial dashboard
console.log('🚀 Admin Panel starting...');
console.log('📡 API_BASE:', API_BASE);
loadDashboard();
