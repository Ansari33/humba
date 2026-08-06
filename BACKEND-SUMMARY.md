# ✅ Backend KemenagNews - SETUP COMPLETED!

Saya telah membuat backend API lengkap untuk mengelola semua data website Anda. Berikut adalah ringkasan lengkapnya:

---

## 📦 STRUKTUR PROJECT BACKEND

```
backend/
├── config/
│   └── db.js                    # Konfigurasi koneksi MongoDB
├── models/
│   ├── News.js                 # Skema model untuk artikel berita
│   └── Category.js             # Skema model untuk kategori
├── controllers/
│   ├── newsController.js       # Logic untuk operasi berita (CRUD)
│   └── categoryController.js   # Logic untuk operasi kategori (CRUD)
├── routes/
│   ├── newsRoutes.js          # Endpoint API untuk berita
│   └── categoryRoutes.js      # Endpoint API untuk kategori
├── middleware/
│   ├── auth.js                # Middleware autentikasi
│   └── errorHandler.js        # Middleware error handling
├── utils/
│   └── seed.js                # Script untuk populate sample data
├── server.js                   # File utama server
├── package.json               # Dependencies project
├── .env.example               # Template environment variables
├── .gitignore                 # Git ignore rules
├── README.md                  # Dokumentasi API lengkap
└── seed.js                    # Executable untuk seed database
```

---

## 🚀 FITUR UTAMA BACKEND

### ✅ News Management (Manajemen Berita)
- ✓ Get all news dengan pagination
- ✓ Get single news by ID atau slug
- ✓ Create, update, delete berita
- ✓ Featured & trending news
- ✓ Search functionality
- ✓ View counter otomatis
- ✓ Status management (draft, published, archived)

### ✅ Category Management (Manajemen Kategori)
- ✓ Get all categories
- ✓ Get category by ID atau slug
- ✓ Create, update, delete kategori
- ✓ Slug auto-generation
- ✓ Color & icon customization

### ✅ Additional Features
- ✓ REST API design yang clean
- ✓ Error handling yang comprehensive
- ✓ CORS enabled
- ✓ Secure headers (Helmet)
- ✓ Input validation
- ✓ Database seeding dengan sample data
- ✓ Statistics endpoint

---

## 🔧 CARA SETUP

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env jika perlu mengubah PORT, MONGODB_URI, dll
```

### 3. Pastikan MongoDB Berjalan
```bash
# Windows: MongoDB biasanya auto-start
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### 4. Jalankan Server
```bash
# Development (dengan auto-reload)
npm run dev

# Production
npm start
```

Server akan berjalan di: **http://localhost:5000**

### 5. (Opsional) Load Sample Data
```bash
node seed.js
```

---

## 📚 API ENDPOINTS YANG TERSEDIA

### News Endpoints
```
GET    /api/news                      # Get all news
GET    /api/news/:id                  # Get news by ID
GET    /api/news/slug/:slug           # Get news by slug
GET    /api/news/featured             # Get featured news
GET    /api/news/trending             # Get trending news
GET    /api/news/search/:query        # Search news
POST   /api/news                      # Create news (Admin)
PUT    /api/news/:id                  # Update news (Admin)
DELETE /api/news/:id                  # Delete news (Admin)
GET    /api/news/stats/overview       # Get statistics (Admin)
```

### Category Endpoints
```
GET    /api/categories                # Get all categories
GET    /api/categories/:id            # Get category by ID
GET    /api/categories/slug/:slug     # Get category by slug
POST   /api/categories                # Create category (Admin)
PUT    /api/categories/:id            # Update category (Admin)
DELETE /api/categories/:id            # Delete category (Admin)
```

### Health Check
```
GET    /api/health                    # Server health check
GET    /api                           # API info
```

---

## 🔗 MENGHUBUNGKAN DENGAN FRONTEND

File **`api.js`** sudah tersedia di root project dengan fungsi-fungsi siap pakai:

### Fungsi Tersedia:
```javascript
// Categories
fetchCategories()
fetchCategoryById(id)
fetchCategoryBySlug(slug)
createCategory(data)
updateCategory(id, data)
deleteCategory(id)

// News
fetchNews(options)
fetchNewsById(id)
fetchNewsBySlug(slug)
fetchFeaturedNews()
fetchTrendingNews(limit)
searchNews(query)
createNews(data)
updateNews(id, data)
deleteNews(id)
getNewsStatistics()

// Helpers
formatDate(dateString)
formatTimeAgo(dateString)
truncateText(text, maxLength)
```

### Contoh Penggunaan:
```html
<script src="api.js"></script>
<script>
// Load trending news
async function loadTrending() {
    const news = await fetchTrendingNews(5);
    console.log(news);
}

// Search
async function search() {
    const results = await searchNews('moderasi');
    console.log(results);
}

loadTrending();
</script>
```

---

## 🗄️ DATABASE MODELS

### News Schema
```javascript
{
  title: String (required, max 200),
  slug: String (auto-generated),
  content: String (required),
  description: String (max 500),
  category: ObjectId (ref: Category),
  image: String,
  author: {
    name: String,
    email: String
  },
  featured: Boolean,
  trending: Boolean,
  viewCount: Number,
  status: String (draft, published, archived),
  tags: [String],
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```javascript
{
  name: String (required, unique),
  slug: String (auto-generated),
  description: String (max 500),
  icon: String,
  color: String (hex format),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Admin Token

Untuk endpoint yang memerlukan autentikasi (admin), gunakan header:
```
Authorization: Bearer admin_token_default_change_this
```

⚠️ **PENTING:** Ubah token ini di `.env` sebelum production!

---

## 🧪 TESTING API (Quick Start)

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```

### Test 2: Get All News
```bash
curl http://localhost:5000/api/news
```

### Test 3: Get Trending News
```bash
curl http://localhost:5000/api/news/trending
```

### Test 4: Create News (Admin)
```bash
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_default_change_this" \
  -d '{
    "title": "Berita Baru",
    "content": "Konten berita...",
    "description": "Deskripsi",
    "category": "CATEGORY_ID",
    "status": "published"
  }'
```

---

## 📖 DOKUMENTASI LENGKAP

Untuk dokumentasi API yang sangat lengkap dan detail, baca file:
- **backend/README.md** - Dokumentasi API komprehensif
- **SETUP.md** - Panduan setup dan instalasi

---

## 📁 FILES REFERENCE

| File | Keterangan |
|------|-----------|
| `server.js` | Main server file, express configuration |
| `package.json` | Dependencies dan npm scripts |
| `.env.example` | Template environment variables |
| `config/db.js` | MongoDB connection setup |
| `models/News.js` | News database model |
| `models/Category.js` | Category database model |
| `controllers/newsController.js` | Business logic untuk news |
| `controllers/categoryController.js` | Business logic untuk category |
| `routes/newsRoutes.js` | API routes untuk news |
| `routes/categoryRoutes.js` | API routes untuk category |
| `middleware/auth.js` | Authentication middleware |
| `middleware/errorHandler.js` | Error handling middleware |
| `utils/seed.js` | Database seeding script |
| `seed.js` | Executable seed runner |
| `api.js` | Frontend API utility functions (root) |
| `SETUP.md` | Panduan setup lengkap |

---

## ⚡ NEXT STEPS

1. ✅ **Setup Environment**: Copy `.env.example` ke `.env` dan customize
2. ✅ **Install Dependencies**: Jalankan `npm install`
3. ✅ **Start MongoDB**: Pastikan MongoDB service berjalan
4. ✅ **Run Server**: `npm run dev` untuk development
5. ✅ **Load Sample Data** (optional): `node seed.js`
6. ✅ **Test API**: Buka `http://localhost:5000/api`
7. ✅ **Connect Frontend**: Gunakan fungsi di `api.js`

---

## 📞 QUICK REFERENCE

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Production server
npm start

# Seed database with sample data
node seed.js

# Test health
curl http://localhost:5000/api/health
```

---

## 🎯 FITUR YANG SUDAH SIAP

✅ Berita Management (CRUD)
✅ Kategori Management (CRUD)
✅ Search & Filter
✅ Trending & Featured
✅ Pagination
✅ View Counter
✅ Status Management
✅ Admin Authentication
✅ Error Handling
✅ Database Seeding
✅ Sample Data dengan 5 categories & 5 articles
✅ Frontend API Helper Functions
✅ Comprehensive Documentation

---

## 🚀 READY TO GO!

Backend Anda sudah siap untuk digunakan. Ikuti langkah-langkah di atas dan Anda sudah bisa mengelola semua data website dengan mudah!

Untuk pertanyaan dan dokumentasi lebih detail, lihat:
- 📘 **backend/README.md** - API Documentation
- 📗 **SETUP.md** - Setup Guide
- 📙 **api.js** - Frontend Integration

Happy coding! 🎉
