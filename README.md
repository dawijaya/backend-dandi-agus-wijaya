Alasan Saya memilih NodeJs: 
Saat ini saya hanya  mengusai 2 framework backend yaitu CodeIgniter 4 dan NodeJs. Jika ingin aplikasi yang lebih responsif dan scalable dengan potensi banyak transaksi, Node.js mungkin lebih unggul. Tetapi, jika yang dicari adalah kemudahan dan kecepatan pengembangan awal, terutama jika sudah terbiasa dengan PHP, CodeIgniter 4 bisa jadi pilihan yang baik.    

# Marketplace API

API untuk Marketplace yang menghubungkan merchant dan customer dengan fitur pembuatan produk, pembelian, dan diskon.

## Daftar Isi
- [Fitur](#fitur)
- [Persyaratan](#persyaratan)
- [Pengaturan](#pengaturan)
- [Penggunaan API](#penggunaan-api)
  - [Autentikasi](#autentikasi)
  - [Endpoints](#endpoints)
- [Contoh Permintaan](#contoh-permintaan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Fitur
- Register dan login untuk pengguna (merchant dan customer)
- Merchant dapat membuat, mengupdate, dan menghapus produk
- Customer dapat membeli produk dengan fitur diskon dan bebas ongkir
- Sistem autentikasi menggunakan JWT

## Persyaratan
- Node.js (versi terbaru)
- MySQL (sebagai database)
- Postman (untuk menguji API)

## Pengaturan
1. **Clone repository ini:**
   ```bash
   git clone https://github.com/dawijaya/backend-dandi-agus-wijaya.git
   cd backend-dandi-agus-wijaya

2. Instalasi dependensi:
bash
npm install

3. Buat file .env: Salin file .env.example menjadi .env dan sesuaikan dengan informasi database Anda:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=marketplace_db
JWT_SECRET=your_jwt_secret

4. import database yang sudah saya sediakan:
marketplace_db.sql

5. Inisialisasi Sequelize:
npx sequelize-cli init

6. Migrasi database:
npx sequelize-cli db:migrate

7. Jalankan server:
npx nodemon server.js


######################################################################################################


Penggunaan API

1. Autentikasi
a. Register:
Endpoint: POST /api/auth/register
Body: {
    "username": "your_username",
    "password": "your_password",
    "role": "merchant" // atau "customer"
}

b. Login:
Endpoint: POST /api/auth/login
Body: {
    "username": "your_username",
    "password": "your_password"
}

Menambahkan Token ke Header:
Pilih tab Headers dan tambahkan header baru dengan:
Key: Authorization
Value: Bearer <token> (gantilah <token> dengan token yang Anda dapatkan saat login).
Contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Im1lcmNoYW50IiwiaWF0IjoxNzMwNDM1MDM2LCJleHAiOjE3MzA0Mzg2MzZ9.aUX9HyEj6rbETrm2llnI-7y5XoD4J5oZe2mYSQ3flsk


2. Endpoints Merchant

a. Buat Produk:
POST /api/merchant/products
Body: {
    "name": "Example Product",
    "price": 50000
}

Menambahkan Token ke Header:
Pilih tab Headers dan tambahkan header baru dengan:
Key: Authorization
Value: Bearer <token> (gantilah <token> dengan token yang Anda dapatkan saat login).
Contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Im1lcmNoYW50IiwiaWF0IjoxNzMwNDM1MDM2LCJleHAiOjE3MzA0Mzg2MzZ9.aUX9HyEj6rbETrm2llnI-7y5XoD4J5oZe2mYSQ3flsk


b. Update Produk:
PUT /api/merchant/products/:id
Body: {
    "name": "Updated Product",
    "price": 60000
}
Menambahkan Token ke Header:
Pilih tab Headers dan tambahkan header baru dengan:
Key: Authorization
Value: Bearer <token> (gantilah <token> dengan token yang Anda dapatkan saat login).
Contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Im1lcmNoYW50IiwiaWF0IjoxNzMwNDM1MDM2LCJleHAiOjE3MzA0Mzg2MzZ9.aUX9HyEj6rbETrm2llnI-7y5XoD4J5oZe2mYSQ3flsk

c. Hapus Produk:
-DELETE /api/merchant/products/:id

d. Lihat Pesanan:
-GET /api/merchant/orders



3. Endpoint Customer
A. Lihat Produk:
 -GET /api/customer/products


B. Beli Produk:
 -POST /api/customer/purchase
Body:{
    "productId": 1,
    "quantity": 3
}


######################################################################################################

Contoh Permintaan

Register Pengguna:
POST /api/auth/register
Content-Type: application/json

{
    "username": "new_merchant",
    "password": "password123",
    "role": "merchant"
}


Login Pengguna:
POST /api/auth/login
Content-Type: application/json

{
    "username": "new_merchant",
    "password": "password123"
}

Buat Produk:
POST /api/merchant/products
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "New Product",
    "price": 75000
}


Pembelian Produk:
POST /api/customer/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
    "productId": 1,
    "quantity": 2
}

######################################################################################################
Kontribusi
Silakan lakukan fork repository ini dan kirim pull request jika ada perbaikan atau fitur baru.

Lisensi
Proyek ini dilisensikan di bawah MIT License.



Link Postman
[https://web.postman.co/workspace/Marketplace-API~05291854-9794-4e12-8bdd-0ce3a3fdabc2/overview](https://www.postman.com/aerospace-explorer-33382596/workspace/marketplace-api)

Jika ada yang ingin Anda tambahkan atau ubah, silakan beri tahu saya!
# backend-dandi-agus-wijaya
