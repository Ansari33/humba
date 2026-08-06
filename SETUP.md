## 🚀 PANDUAN INSTALASI DAN MENJALANKAN BACKEND

### Prasyarat
- Node.js v14 atau lebih tinggi (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)
- Git (opsional)

---

## 📋 LANGKAH-LANGKAH INSTALASI

### 1. Install MongoDB

**Windows:**
- Download dari: https://www.mongodb.com/try/download/community
- Jalankan installer dan ikuti instruksi
- MongoDB akan berjalan sebagai service otomatis

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. Install Node.js

Download dari https://nodejs.org/ dan jalankan installer

Verifikasi instalasi:
```bash
node --version
npm --version
```

### 3. Setup Backend Project

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy file .env.example ke .env
cp .env.example .env
# (Windows PowerShell: Copy-Item .env.example .env)

# Edit file .env sesuai konfigurasi Anda (opsional)
# - MONGODB_URI
# - PORT
# - JWT_SECRET
```

### 4. (Opsional) Populate Database dengan Sample Data

```bash
# Dari folder backend, jalankan seed script
node seed.js
```

Output yang diharapkan:
```
Connected to MongoDB
✅ Database seeding completed successfully!
✓ Created 5 categories
✓ Created 5 news articles
```

### 5. Jalankan Backend Server

**Development Mode (dengan auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Output yang diharapkan:
```
✅ Server running on http://localhost:5000
📚 API Documentation: http://localhost:5000/api
🏥 Health Check: http://localhost:5000/api/health
```

---

## 🧪 TESTING API

### Test Health Check
Buka browser atau gunakan curl:
```bash
curl http://localhost:5000/api/health
```

### Test Get All News
```bash
curl http://localhost:5000/api/news
```

### Test Get All Categories
```bash
curl http://localhost:5000/api/categories
```

### Test Create News (Requires Admin Token)
```bash
curl -X POST http://localhost:5000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer admin_token_default_change_this" \
  -d '{
    "title": "Berita Test",
    "content": "Konten berita test",
    "description": "Deskripsi test",
    "category": "CATEGORY_ID_DARI_DATABASE",
    "status": "published"
  }'
```

---

## 🔗 MENGHUBUNGKAN FRONTEND DENGAN BACKEND

Sudah tersedia file `api.js` di folder root project untuk komunikasi dengan backend.

### Contoh Penggunaan:

**1. Load Trending News:**
```html
<script src="api.js"></script>
<script>
async function loadTrendingNews() {
    const news = await fetchTrendingNews(5);
    console.log('Trending News:', news);
    // Render ke halaman...
}

loadTrendingNews();
</script>
```

**2. Load Featured News:**
```javascript
async function loadFeatured() {
    const featured = await fetchFeaturedNews();
    if (featured) {
        console.log('Featured Article:', featured);
        // Update featured section
    }
}

loadFeatured();
```

**3. Search News:**
```javascript
async function searchAndDisplay() {
    const query = document.querySelector('.search-input').value;
    const results = await searchNews(query);
    console.log('Search Results:', results);
    // Display results...
}
```

**4. Admin: Create News:**
```javascript
async function createNewArticle() {
    try {
        const newsData = {
            title: "Judul Berita Baru",
            content: "Konten lengkap...",
            description: "Deskripsi singkat...",
            category: "CATEGORY_ID",
            status: "published",
            tags: ["tag1", "tag2"]
        };
        
        const result = await createNews(newsData);
        console.log('News Created:', result);
        alert('Berita berhasil dibuat!');
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal membuat berita!');
    }
}
```

---

## 📊 STRUKTUR DATABASE

Database akan otomatis dibuat saat server pertama kali jalan.

### Collections:

**1. Categories** - Menyimpan kategori berita
- name, description, icon, color, isActive, slug

**2. News** - Menyimpan artikel berita
- title, content, description, category, image, author, status, tags, viewCount, featured, trending

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot GET /api/news"
- Pastikan server backend sedang berjalan
- Periksa PORT di .env (default: 5000)
- Pastikan MongoDB sudah berjalan

### Error: "MongoError: connect ECONNREFUSED"
- MongoDB belum berjalan
- Jalankan: `mongod` (atau `brew services start mongodb-community` di macOS)
- Atau gunakan MongoDB Atlas (cloud)

### Error: "CORS policy"
- Frontend dan Backend harus di domain/port yang berbeda
- Backend sudah menggunakan CORS middleware
- Pastikan CORS_ORIGIN di .env sesuai dengan URL frontend

### Error: "Module not found"
- Jalankan `npm install` di folder backend
- Pastikan file package.json ada

### Port 5000 sudah terpakai
- Ubah PORT di file .env
- Atau hentikan proses yang menggunakan port 5000

---

## 📚 DOKUMENTASI LENGKAP

Lihat file [README.md](backend/README.md) di folder backend untuk dokumentasi API yang lengkap.

---

## 🔐 SECURITY NOTES

⚠️ **IMPORTANT - Untuk Production:**
1. Ubah `ADMIN_TOKEN` di .env
2. Ubah `JWT_SECRET` di .env
3. Setup proper authentication (bukan token sederhana)
4. Gunakan HTTPS
5. Setup firewall rules
6. Implementasikan rate limiting
7. Regular database backup

---

## 📞 SUPPORT

Jika ada pertanyaan atau masalah, periksa:
1. Dokumentasi API di `backend/README.md`
2. Pastikan semua service sudah berjalan (Node, MongoDB)
3. Check console log untuk error details
4. Pastikan dependencies ter-install dengan baik

---

## ✅ CHECKLIST

- [ ] Node.js ter-install
- [ ] MongoDB ter-install dan berjalan
- [ ] Backend dependencies ter-install (`npm install`)
- [ ] .env file sudah di-setup
- [ ] Backend server berjalan (`npm run dev`)
- [ ] API health check responsif
- [ ] Frontend bisa fetch data dari backend
- [ ] Sample data sudah ter-load (opsional)
