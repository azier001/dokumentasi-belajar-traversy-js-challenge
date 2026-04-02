# 🚀 Big O Notation & Kompleksitas Array

> 📌 *Dokumentasi belajar JavaScript untuk pemula — materi dari video tutorial*

---

## 📑 Daftar Isi

- 🧠 [Apa Itu Big O Notation?](#apa-itu-big-o-notation)
- 📊 [Jenis-Jenis Time Complexity](#jenis-jenis-time-complexity)
- 🗂️ [Operasi Array & Kompleksitasnya](#operasi-array--kompleksitasnya)

---

<a name="apa-itu-big-o-notation"></a>
## 🧠 Apa Itu Big O Notation?

Sebelumnya kita udah bahas **time complexity** — yaitu bagaimana *runtime* sebuah fungsi berubah seiring input yang makin besar.

Nah, **Big O Notation** adalah cara kita *mendeskripsikan* time complexity itu. Lebih spesifiknya, Big O menggambarkan **upper bound** atau **skenario terburuk** dari seberapa cepat runtime (atau kebutuhan memori) suatu algoritma tumbuh seiring bertambahnya ukuran input.

Big O menggunakan ekspresi matematika untuk merepresentasikan hubungan antara:
- **Ukuran input** → biasanya ditulis sebagai `n`
- **Performa algoritma** → seberapa lama/banyak sumber daya yang dibutuhkan

> 💡 **Huruf "O"** dalam Big O singkatan dari **"order of"** — menunjukkan *laju pertumbuhan* performa algoritma relatif terhadap ukuran input.

Kita nggak perlu terlalu dalam ke matematikanya. Yang penting, kamu bisa **mengenali** jenis-jenis time complexity dan cara menulisnya dalam notasi Big O.

---

<a name="jenis-jenis-time-complexity"></a>
## 📊 Jenis-Jenis Time Complexity

### ⚡ Constant — `O(1)`

> Runtime **selalu sama**, tidak peduli seberapa besar inputnya.

Dibaca: **"O of 1"** atau **"Big O of 1"**

---

### 📈 Linear — `O(n)`

> Runtime **bertumbuh sebanding** dengan ukuran input.

Dibaca: **"O of n"** atau **"Big O of n"**

---

### 📉 Quadratic — `O(n²)`

> Runtime **bertumbuh secara kuadrat** — kalau input dobel, runtime jadi 4x lipat.

Dibaca: **"O of n squared"** atau **"Big O of n squared"**

---

### 🪵 Logarithmic — `O(log n)`

> Runtime **tumbuh sangat lambat** meski input membesar — ini sangat efisien!

Dibaca: **"O of log n"** atau **"Big O of log n"**

---

### 💥 Exponential — `O(2ⁿ)`

> Runtime **meledak secara eksponensial** seiring input bertambah.

Dibaca: **"O of 2 to the n"**

---

### 😱 Factorial — `O(n!)`

> Runtime tumbuh dengan cara **faktorial** — ini yang paling lambat dan paling berat.

Dibaca: **"O of n factorial"**

---

> 🎯 Kita akan fokus pada **4 yang paling umum**: O(1), O(n), O(n²), dan O(log n). Yang lainnya jarang ditemui di kebanyakan kasus.

---

<a name="operasi-array--kompleksitasnya"></a>
## 🗂️ Operasi Array & Kompleksitasnya

Hampir **setiap operasi dalam kode** punya time complexity-nya sendiri — bukan cuma fungsi secara keseluruhan. Ini berlaku juga untuk operasi-operasi yang kamu lakukan pada **struktur data seperti array**.

Berikut ringkasannya:

| Operasi | Big O | Kenapa? |
|---|---|---|
| 🔍 Akses elemen by index | `O(1)` | Array pakai blok memori yang berurutan, jadi akses langsung ke index manapun butuh waktu sama. |
| ➕ Insert / delete **di akhir** | `O(1)` | Nggak perlu menggeser elemen lain sama sekali. |
| ⬅️ Insert / delete **di awal** | `O(n)` | Semua elemen harus digeser untuk memberi ruang — makin besar array, makin lama. |
| 🔀 Insert / delete **di tengah** | `O(n)` | Sama seperti di awal, perlu menggeser elemen-elemen setelah posisi target. |
| 🔎 Mencari elemen (unsorted) | `O(n)` | Harus memeriksa elemen satu per satu dari awal sampai ketemu. |
| ⚡ Binary search (sorted array) | `O(log n)` | Array dibagi dua terus-menerus sampai elemen ditemukan — sangat efisien! |

---

### 🔎 Sedikit tentang Binary Search

Binary search hanya bisa dipakai di **array yang sudah terurut (sorted)**. Cara kerjanya:

1. Bagi array jadi dua bagian
2. Eliminasi bagian yang jelas nggak mengandung elemen yang dicari
3. Ulangi sampai elemen ketemu

Ini jauh lebih efisien dibanding mencari satu per satu. Kita akan bahas lebih dalam tentang binary search di lesson berikutnya!

---

> ✅ **Intinya:** Sekarang kamu udah tahu cara mengekspresikan setiap time complexity menggunakan Big O Notation. Di lesson berikutnya, kita akan lihat contoh nyata dari **constant time O(1)**.