# 🪟 Teknik Sliding Window

> **Teknik sliding window** adalah pendekatan algoritmik yang powerful untuk menyelesaikan berbagai permasalahan terkait array atau string secara efisien. Teknik ini melibatkan pemeliharaan sebuah "window" yang bergeser melalui array atau string, memungkinkan kita melacak dan memproses sebagian elemen **tanpa memerlukan nested loop**.

Teknik ini dapat digunakan untuk **memaksimalkan kompleksitas waktu** dari algoritma kita. Pada pembahasan sebelumnya, kita membuat algoritma sub array sum menggunakan nested for loop dengan kompleksitas waktu dan ruang O(n²), yang tidak terlalu efisien. Selanjutnya, kita akan me-refactor solusi tersebut menjadi linear O(n) menggunakan teknik sliding window ini. Tujuan diperkenalkannya teknik ini adalah untuk memberikan contoh nyata dalam meningkatkan efisiensi dan kompleksitas algoritma.

---

## ⚙️ Cara Kerjanya

Berikut penjelasan singkat tentang cara kerja teknik ini:

1. **Inisialisasi Variabel:** Siapkan dua pointer, biasanya dinamai `left` dan `right`, untuk mendefinisikan batas-batas sliding window. Selain itu, kamu mungkin membutuhkan variabel untuk menyimpan kondisi saat ini, seperti jumlah atau frekuensi. Untuk contoh kita, kita akan membutuhkan `currentSum` dan `maxSum`.

2. **Window Awal:** Kita mulai dengan memposisikan window di awal array atau string dan menghitung kondisi atau nilai awal berdasarkan elemen-elemen di dalam window. Karena kita menghitung jumlah `k` elemen, kita mulai dengan window berisi `k` elemen. Pada contoh ini, `k` atau ukuran window adalah `3`.

3. **Geser Window:** Kita akan memindahkan pointer `right` ke kanan, memperluas window sebesar satu elemen. Perbarui kondisi atau nilai berdasarkan elemen yang baru ditambahkan. Dalam kasus kita, kita menghitung jumlah baru dengan elemen baru tersebut.

4. **Sesuaikan Window:** Tergantung pada kondisi atau batasan tertentu, kamu mungkin perlu memperkecil atau menyesuaikan window dengan memindahkan pointer `left` ke kanan, sehingga mengecualikan satu elemen dari window. Perbarui kondisi kembali sesuai perubahan tersebut.

5. **Ulangi:** Terus geser dan sesuaikan window hingga pointer `right` mencapai akhir array atau string. Selama proses ini, lacak informasi yang diinginkan (maksimum/minimum, frekuensi, substring, dll.).

---

## ✅ Keunggulan

- **🚀 Kompleksitas Waktu yang Optimal:** Sliding window mengurangi kompleksitas waktu dengan menghindari kalkulasi yang redundan. Ini sangat bermanfaat untuk situasi di mana solusi brute-force memerlukan nested loop.

- **💾 Efisiensi Ruang:** Teknik ini tidak memerlukan penyimpanan semua subarray atau substring secara individual, sehingga **mengurangi penggunaan memori**.

- **🧩 Kesederhanaan:** Setelah dipahami, permasalahan sliding window seringkali menjadi lebih mudah diselesaikan dibandingkan pendekatan naif-nya.

---

## 📝 Catatan

- Sliding window **paling cocok** untuk permasalahan yang melibatkan subarray atau substring yang **kontinu**.
- Teknik ini dapat memiliki variasi seperti **dynamic window size** atau **two-pointer sliding**.
- Perhatikan **edge case** di mana ukuran window menjadi penting untuk efisiensi maupun kebenaran hasil.