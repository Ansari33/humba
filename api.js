// API Configuration dan Utility Functions
// File ini digunakan untuk komunikasi dengan Backend API

const API_BASE_URL = 'http://localhost:5000/api';
const ADMIN_TOKEN = 'admin_token_default_change_this'; // Ubah sesuai dengan token di .env backend

// ==================== CATEGORY API ====================

/**
 * Get semua kategori
 */
async function fetchCategories(isActive = true) {
    try {
        const query = isActive ? '?isActive=true' : '';
        const response = await fetch(`${API_BASE_URL}/categories${query}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * Get kategori berdasarkan ID
 */
async function fetchCategoryById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        return null;
    }
}

/**
 * Get kategori berdasarkan slug
 */
async function fetchCategoryBySlug(slug) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching category slug ${slug}:`, error);
        return null;
    }
}

/**
 * Create kategori baru (Admin)
 */
async function createCategory(categoryData) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            },
            body: JSON.stringify(categoryData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
}

/**
 * Update kategori (Admin)
 */
async function updateCategory(id, categoryData) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            },
            body: JSON.stringify(categoryData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

/**
 * Delete kategori (Admin)
 */
async function deleteCategory(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

// ==================== NEWS API ====================

/**
 * Get semua berita dengan pagination
 */
async function fetchNews(options = {}) {
    try {
        const {
            page = 1,
            limit = 10,
            status = 'published',
            category = null,
            sort = '-publishedAt',
            adminAccess = false
        } = options;
        
        let url = `${API_BASE_URL}/news?page=${page}&limit=${limit}&sort=${sort}`;
        
        if (!adminAccess) {
            url += '&status=published';
        } else if (status) {
            url += `&status=${status}`;
        }
        
        if (category) {
            url += `&category=${category}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            articles: data.data || [],
            pagination: {
                total: data.total,
                pages: data.pages,
                currentPage: data.currentPage
            }
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [], pagination: { total: 0, pages: 0, currentPage: 1 } };
    }
}

/**
 * Get berita berdasarkan ID
 */
async function fetchNewsById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching news ${id}:`, error);
        return null;
    }
}

/**
 * Get berita berdasarkan slug
 */
async function fetchNewsBySlug(slug) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/slug/${slug}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Error fetching news slug ${slug}:`, error);
        return null;
    }
}

/**
 * Get featured news
 */
async function fetchFeaturedNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/news/featured`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching featured news:', error);
        return null;
    }
}

/**
 * Get trending news
 */
async function fetchTrendingNews(limit = 5) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/trending?limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching trending news:', error);
        return [];
    }
}

/**
 * Search berita
 */
async function searchNews(query, limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/search/${encodeURIComponent(query)}?limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error(`Error searching news for "${query}":`, error);
        return [];
    }
}

/**
 * Create berita baru (Admin)
 */
async function createNews(newsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/news`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            },
            body: JSON.stringify(newsData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating news:', error);
        throw error;
    }
}

/**
 * Update berita (Admin)
 */
async function updateNews(id, newsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            },
            body: JSON.stringify(newsData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating news:', error);
        throw error;
    }
}

/**
 * Delete berita (Admin)
 */
async function deleteNews(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error deleting news:', error);
        throw error;
    }
}

/**
 * Get statistik berita (Admin)
 */
async function getNewsStatistics() {
    try {
        const response = await fetch(`${API_BASE_URL}/news/stats/overview`, {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        return null;
    }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Format tanggal ke format yang lebih readable
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

/**
 * Format waktu ke "X jam yang lalu" format
 */
function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' tahun lalu';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' bulan lalu';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' hari lalu';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' jam lalu';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' menit lalu';
    
    return 'Baru saja';
}

/**
 * Truncate teks ke jumlah karakter tertentu
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
