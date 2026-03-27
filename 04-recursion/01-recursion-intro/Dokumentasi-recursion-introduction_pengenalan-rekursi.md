# 🔄 Rekursi — Pengenalan & `countDown`

> 📝 *Dokumentasi pribadi dari video tutorial JS — untuk pemula, ditulis santai biar gampang diingat.*

---

## 📚 Daftar Isi

- 🔍 [Apa itu Rekursi?](#apa-itu-rekursi)
- 🪆 [Analogi: Boneka Rusia](#analogi-boneka-rusia)
- ⚖️ [Rekursi vs Iterasi](#rekursi-vs-iterasi)
- 🧩 [Kapan Pakai yang Mana?](#kapan-pakai-yang-mana)
- 💻 [Contoh Kode: countDown](#contoh-kode-countdown)
- ⚠️ [Bahaya: Stack Overflow](#bahaya-stack-overflow)
- 🔮 [Yang Akan Dibahas Selanjutnya](#yang-akan-dibahas-selanjutnya)

---

<a name="apa-itu-rekursi"></a>
## 🔍 Apa itu Rekursi?

Rekursi adalah **fungsi yang memanggil dirinya sendiri** — sampai suatu kondisi tertentu terpenuhi. Kondisi itulah yang disebut **base case** (kondisi dasar).

Di kebanyakan fungsi rekursif, kita memecah masalah besar menjadi **versi yang lebih kecil** dari masalah yang sama, lalu pakai solusi kecil itu untuk menyelesaikan masalah aslinya.

> 💡 Rekursi sering banget muncul di interview kerja — jadi penting banget untuk ngerti minimal konsep dasarnya!

---

<a name="analogi-boneka-rusia"></a>
## 🪆 Analogi: Boneka Rusia

Bayangin **boneka Rusia** (*Matryoshka*) — itu loh, boneka kayu yang makin ke dalam makin kecil, satu di dalam yang lain.

Buat nemuin boneka terkecil (yang ada hadiahnya), kamu harus:
1. Buka boneka pertama (yang paling besar)
2. Buka boneka di dalamnya
3. Terus begitu... sampai ketemu boneka yang paling kecil — itu **base case**-nya!

Proses ini **rekursif** karena kamu melakukan hal yang sama berulang kali, tapi dengan versi yang makin kecil.

> 🔁 Kalau kamu tahu jumlah bonekanya, bisa pakai `for` loop biasa. Tapi kalau **jumlahnya nggak diketahui** — rekursi bisa jadi pilihan yang lebih pas!

---

<a name="rekursi-vs-iterasi"></a>
## ⚖️ Rekursi vs Iterasi

Sekilas, rekursi dan iterasi (loop) kelihatannya mirip. Dan memang, keduanya bisa dipakai untuk menyelesaikan banyak masalah yang sama. Tapi ada perbedaannya:

| | 🔄 Rekursi | 🔁 Iterasi |
|---|---|---|
| **Cara kerja** | Fungsi memanggil dirinya sendiri sampai base case terpenuhi | Blok kode dieksekusi sejumlah tertentu sampai kondisi terpenuhi |
| **Memory** | ⚠️ Menambah fungsi ke *call stack* → bisa memengaruhi performa | ✅ Tidak menambah ke *call stack* |
| **Panjang kode** | ✅ Bisa lebih singkat dan elegan | Biasanya lebih panjang untuk masalah kompleks |
| **Keterbacaan** | ✅ Lebih mudah dibaca *kalau* kamu sudah paham rekursi | ✅ Umumnya lebih mudah dipahami pemula |

> **Kesimpulan:** Dua-duanya punya kelebihan dan kekurangan. Pilihan tergantung masalahnya, preferensi kamu sebagai developer, dan keterbacaan serta efisiensi kode yang kamu mau capai.

---

<a name="kapan-pakai-yang-mana"></a>
## 🧩 Kapan Pakai yang Mana?

**Pakai rekursi kalau:**
- Masalahnya bisa dipecah jadi versi yang lebih kecil dari masalah yang sama
- Ada **base case yang jelas**
- Masalahnya punya struktur rekursif alami, misalnya: *traversing* pohon (tree), mencari kombinasi, dll.

**Pakai iterasi kalau:**
- Kamu cuma perlu mengulang blok kode sejumlah tertentu
- Masalahnya lebih sederhana dan straightforward

---

<a name="contoh-kode-countdown"></a>
## 💻 Contoh Kode: `countDown`

Oke, sekarang langsung ke contoh! Ini adalah contoh paling sederhana dari rekursi.

Kita punya fungsi `countDown` yang menerima sebuah angka, lalu menghitung mundur dari angka itu sampai ke nol.

```js
function countDown(num) {
  // 🛑 Base case — kalau num sudah <= 0, berhenti!
  if (num <= 0) {
    console.log('All done!');
    return; // ← PENTING! Tanpa ini, fungsi terus jalan → stack overflow
  }

  // 🔁 Recursive case — cetak angka, kurangi 1, panggil lagi
  console.log(num);
  num--;
  countDown(num); // ← memanggil dirinya sendiri dengan angka yang lebih kecil
}

countDown(10);
```

**Alur eksekusinya:**
1. `countDown(10)` → cetak `10`, lalu panggil `countDown(9)`
2. `countDown(9)` → cetak `9`, lalu panggil `countDown(8)`
3. ... terus begitu ...
4. `countDown(1)` → cetak `1`, lalu panggil `countDown(0)`
5. `countDown(0)` → `num <= 0` ✅ → cetak `"All done!"` → **berhenti!**

> 🎯 Setiap kali fungsi dipanggil ulang, nilai `num` yang dilempar **semakin kecil**. Inilah yang dimaksud "memecah masalah jadi versi yang lebih kecil".

---

<a name="bahaya-stack-overflow"></a>
## ⚠️ Bahaya: Stack Overflow

Coba bayangin kalau kita **lupa nulis base case** (atau lupa nulis `return`):

```js
function countDown(num) {
  // Tanpa base case...
  console.log(num);
  num--;
  countDown(num); // terus dipanggil selamanya!
}
```

Hasilnya? Error:

```
RangeError: Maximum call stack size exceeded
```

Ini namanya **stack overflow** — fungsi terus menumpuk di *call stack* tanpa pernah berhenti, sampai memori habis.

> 🚨 **Jadi ingat:** base case + `return` itu wajib ada di fungsi rekursif!

---

<a name="yang-akan-dibahas-selanjutnya"></a>
## 🔮 Yang Akan Dibahas Selanjutnya

Ada dua konsep penting terkait rekursi yang akan dibahas di video berikutnya:

- 📚 **Call Stack** — apa itu dan bagaimana hubungannya dengan rekursi
- 🌀 **Unwinding** — konsep saat fungsi rekursif mulai mengembalikan nilai

> Sabar dulu, jangan dijejalin sekaligus! 😄

---

*✍️ Catatan pribadi — dibuat dari subtitle & kode praktik video tutorial JavaScript.*