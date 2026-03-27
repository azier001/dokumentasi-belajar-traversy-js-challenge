# 🔁 Pengantar Rekursi (`countDown`)

> **Rekursi** adalah salah satu konsep terpenting dalam ilmu komputer — sebuah fungsi yang memanggil dirinya sendiri hingga kondisi dasar terpenuhi. Pelajari konsep ini dari nol dengan contoh yang sederhana dan mudah dipahami.

---

## 🧩 Apa Itu Rekursi?

Dalam istilah pemrograman, **`recursion`** adalah sebuah fungsi yang memanggil dirinya sendiri hingga suatu **"base case"** atau **"base condition"** bernilai `true`. Pada sebagian besar fungsi rekursif, kita **memecah masalah menjadi instansi-instansi yang lebih kecil**, lalu menggunakan solusi tersebut untuk menyelesaikan masalah aslinya.

Ketika kita memanggil sebuah fungsi, fungsi tersebut ditambahkan ke apa yang kita sebut **call stack**, dan ketika tiba saatnya mengembalikan nilai, ada konsep yang disebut **`unwinding`**. Konsep-konsep tersebut akan dibahas di pelajaran berikutnya.

---

## 🪆 Analogi: Boneka Rusia

Salah satu analogi yang bagus adalah **boneka Rusia** (*Russian doll*). Boneka Rusia adalah sekumpulan boneka kayu berukuran semakin kecil yang diletakkan satu di dalam yang lain. Untuk mencapai boneka terkecil, kamu harus membuka setiap boneka satu per satu hingga menemukan isi terkecilnya. **Inilah proses rekursif.**

Dengan contoh boneka Rusia, kamu bisa menggunakan `for loop` jika tahu berapa banyak bonekanya — tetapi jika kamu **tidak tahu jumlah iterasinya** (yang sering terjadi dalam pemrograman), **rekursi bisa menjadi pilihan yang lebih baik**.

---

## ⚔️ Rekursi vs Iterasi

Sekilas, **recursion** dan **iteration** (loop) tampak sangat mirip. Keduanya bisa digunakan untuk menyelesaikan masalah yang sama, namun ada beberapa perbedaan beserta kelebihan dan kekurangannya masing-masing.

| | **Recursion** | **Iteration** |
|---|---|---|
| **Cara kerja** | Fungsi memanggil dirinya sendiri hingga base case terpenuhi | Blok kode dieksekusi sejumlah iterasi tertentu |
| **Penggunaan memori** | ❌ Menambahkan pemanggilan fungsi ke call stack | ✅ Tidak menambahkan instansi fungsi |
| **Jumlah kode** | ✅ Dapat meminimalkan jumlah kode secara signifikan | ❌ Bisa lebih panjang untuk masalah kompleks |
| **Keterbacaan** | ✅ Solusi yang elegan untuk masalah tertentu | ✅ Lebih mudah dipahami untuk tugas sederhana |

---

## 🤔 Kapan Menggunakan Masing-Masing?

Pilihan ini sangat bergantung pada masalah, pengembang, dan banyak faktor lainnya, namun secara umum:

- **Gunakan `recursion`** ketika masalah dapat dipecah menjadi instansi-instansi yang lebih kecil dari masalah yang sama dan kamu memiliki **base case** yang jelas. Rekursi sering digunakan untuk masalah yang memiliki struktur rekursif alami, seperti **traversing trees** atau menemukan **combinations**.

- **Gunakan `iteration`** ketika kamu perlu mengulang sebuah blok kode sejumlah tertentu atau hingga kondisi tertentu terpenuhi. Iterasi umumnya **lebih mudah diimplementasikan dan dipahami** untuk tugas-tugas berulang yang sederhana.

---

## 💻 Contoh Kode

Mari kita lihat contoh sederhana dari rekursi:

```js
function countDown(num) {
  // Base case
  if (num <= 0) {
    console.log('All done!');
    return;
  }

  // Recursive case
  console.log(num);
  num--;
  countDown(num);
}

countDown(3);
```

### 🔍 Penjelasan

Dalam contoh ini, kita memiliki sebuah fungsi bernama `countDown` yang menerima sebuah angka. Terdapat apa yang kita sebut **`base case`**, yaitu ketika angkanya kurang dari atau sama dengan `0`. Jika ini benar, kita mencetak `"All done!"` dan melakukan `return`.

Jika tidak benar, kita menjalankan **`recursive case`**, yang akan mencetak angkanya, menguranginya dengan `1`, lalu memanggil fungsi kembali dengan angka baru. Proses ini akan **terus berlanjut hingga angkanya kurang dari atau sama dengan `0`**.

> 💡 Kita memanggil fungsi yang sama dengan angka yang lebih kecil setiap kali. **Inilah yang disebut rekursi.**

---

## ✅ Ringkasan

- **`Recursion`** = fungsi yang memanggil dirinya sendiri
- **`Base case`** = kondisi yang menghentikan rekursi
- **`Recursive case`** = bagian yang memanggil fungsi kembali
- Rekursi menggunakan **call stack** dan memori lebih banyak dari iterasi
- Rekursi sangat cocok untuk masalah dengan **struktur bertingkat** (seperti pohon, kombinasi, dll.)

---

*Pada tantangan-tantangan berikutnya, kita akan menggunakan **recursion** untuk menyelesaikan berbagai masalah.* 🚀