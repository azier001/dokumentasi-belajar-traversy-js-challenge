# 🔄 Rekursi: Menghitung Faktorial

> 📝 **Catatan pribadi** dari video tutorial rekursi — topik: menghitung faktorial menggunakan rekursi di JavaScript.

---

## 📚 Daftar Isi

- 🔍 [Apa itu Faktorial?](#apa-itu-faktorial)
- 🔄 [Apa itu Rekursi?](#apa-itu-rekursi)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🏗️ [Struktur Fungsi Rekursif](#struktur-fungsi-rekursif)
- 💻 [Kode Solusi](#kode-solusi)
- 🧩 [Cara Kerja Step-by-Step](#cara-kerja-step-by-step)
- 🎯 [Proses Unwinding](#proses-unwinding)
- ✅ [Testing](#testing)

---

<a name="apa-itu-faktorial"></a>
## 🔍 Apa itu Faktorial?

Faktorial adalah **perkalian suatu bilangan dengan semua bilangan di bawahnya** sampai ke angka 1. Dilambangkan dengan tanda seru `!`.

Misalnya: `5!` artinya "faktorial dari 5".

| Notasi | Perhitungan | Hasil |
|--------|-------------|-------|
| `0!` | — (spesial) | **1** |
| `1!` | — (spesial) | **1** |
| `2!` | `2 × 1` | **2** |
| `3!` | `3 × 2 × 1` | **6** |
| `4!` | `4 × 3 × 2 × 1` | **24** |
| `5!` | `5 × 4 × 3 × 2 × 1` | **120** |

> 💡 Faktorial 0 dan 1 adalah kasus spesial — hasilnya selalu **1**. Ini yang nanti akan jadi **base case** di rekursi.

Nilainya tumbuh sangat cepat — misalnya `10!` sudah menghasilkan `3.628.800`!

---

<a name="apa-itu-rekursi"></a>
## 🔄 Apa itu Rekursi?

Rekursi adalah teknik di mana **sebuah fungsi memanggil dirinya sendiri** untuk memecahkan masalah yang lebih besar menjadi sub-masalah yang lebih kecil, sampai mencapai kondisi berhenti.

Konsepnya:
- **Masalah besar** → dipecah jadi masalah lebih kecil
- Terus dipecah sampai mencapai **base case** (kondisi berhenti)
- Lalu hasilnya "menggelembung naik" kembali (**unwinding**)

> ⚠️ Bagian yang bikin bingung bukan kodenya — tapi **memahami bagaimana prosesnya berjalan**, terutama bagian unwinding dan nilai return dari setiap pemanggilan.

Faktorial adalah contoh klasik yang sering muncul di **interview coding**, jadi ini penting untuk dipahami!

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke Faktorial:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | Index yang di-pass ke fungsi (`num`) |
| ➡️ Bergerak ke mana? | Ke bawah — `num - 1` setiap langkah |
| 🛑 Berhenti kapan? | Saat `num === 0` atau `num === 1` (base case tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:

- **Mulai dari `num`** → parameter fungsi kita adalah `num`
- **Bergerak ke `num - 1`** → recursive call-nya adalah `factorial(num - 1)`
- **Berhenti saat `num <= 1`** → base case-nya adalah `if (num === 0 || num === 1) return 1`

---

<a name="struktur-fungsi-rekursif"></a>
## 🏗️ Struktur Fungsi Rekursif

Setiap fungsi rekursif punya dua bagian wajib:

### 1. 🛑 Base Case (Kondisi Berhenti)
Kondisi di mana fungsi **berhenti memanggil dirinya sendiri** dan langsung return nilai. Tanpa ini, fungsi akan looping selamanya!

Untuk faktorial, base case-nya adalah: jika input `0` atau `1`, langsung return `1`.

### 2. 🔁 Recursive Case (Kasus Rekursif)
Kondisi di mana fungsi **memanggil dirinya sendiri** dengan input yang lebih kecil, mendekati base case.

Untuk faktorial, rumusnya: `n! = n × (n-1)!`

Artinya: kalikan angka sekarang dengan faktorial dari angka sebelumnya.

---

<a name="kode-solusi"></a>
## 💻 Kode Solusi

### `factorial.js`

Versi lengkap dengan komentar:

```javascript
function factorial(num) {
  // 🛑 Base case: faktorial dari 0 dan 1 selalu 1
  if (num === 0 || num === 1) {
    return 1;
  }

  // 🔁 Recursive case: num × faktorial(num - 1)
  return num * factorial(num - 1);
}

module.exports = factorial;
```

Versi ringkas pakai arrow function (hasil yang sama):

```javascript
// Versi pendek — tapi logikanya identik
const factorial = (num) =>
  num === 0 || num === 1 ? 1 : num * factorial(num - 1);

module.exports = factorial;
```

### `factorial-run.js` — Coba jalankan hasilnya

```javascript
const factorial = require('./factorial');

const result = factorial(5);

console.log(result); // Output: 120
```

---

<a name="cara-kerja-step-by-step"></a>
## 🧩 Cara Kerja Step-by-Step

Mari kita lihat apa yang terjadi saat kita panggil `factorial(5)`. Prosesnya terbagi jadi **dua fase**: fase turun dan fase naik.

---

### 📉 Fase 1 — Turun (Pemanggilan Rekursif)

Fungsi terus memanggil dirinya sendiri dengan `num` yang makin kecil, sampai mentok di base case. Di fase ini, **belum ada nilai yang dihitung** — semuanya masih "menunggu".

```
factorial(5) → memanggil factorial(4)  ...menunggu
  factorial(4) → memanggil factorial(3)  ...menunggu
    factorial(3) → memanggil factorial(2)  ...menunggu
      factorial(2) → memanggil factorial(1)  ...menunggu
        factorial(1) → BASE CASE! return 1 ✅
```

Bayangkan seperti menumpuk piring — setiap pemanggilan ditumpuk ke atas, dan baru bisa diselesaikan setelah yang di bawahnya selesai lebih dulu.

---

### 📈 Fase 2 — Naik (Unwinding)

Setelah base case return, nilai mulai "menggelembung naik" — setiap fungsi yang tadinya menunggu kini mendapat nilai return dari bawahnya dan bisa menyelesaikan perhitungannya.

```
        factorial(1) = 1                ← nilai mulai naik dari sini
      factorial(2) = 2 × 1    = 2
    factorial(3) = 3 × 2      = 6
  factorial(4) = 4 × 6        = 24
factorial(5) = 5 × 24         = 120  ✅ hasil akhir!
```

---

### 📊 Tabel Trace Lengkap

Kalau digabungkan jadi satu tabel, begini gambaran lengkap setiap langkahnya:

| Langkah | Pemanggilan | `num` | Status | Nilai Return |
|:---:|---|:---:|---|:---:|
| 1 | `factorial(5)` | 5 | ⏳ menunggu `factorial(4)` | — |
| 2 | `factorial(4)` | 4 | ⏳ menunggu `factorial(3)` | — |
| 3 | `factorial(3)` | 3 | ⏳ menunggu `factorial(2)` | — |
| 4 | `factorial(2)` | 2 | ⏳ menunggu `factorial(1)` | — |
| 5 | `factorial(1)` | 1 | ✅ BASE CASE | `1` |
| 6 | `factorial(2)` | 2 | ✅ selesai: `2 × 1` | `2` |
| 7 | `factorial(3)` | 3 | ✅ selesai: `3 × 2` | `6` |
| 8 | `factorial(4)` | 4 | ✅ selesai: `4 × 6` | `24` |
| 9 | `factorial(5)` | 5 | ✅ selesai: `5 × 24` | `120` |

> 🧠 **Pola yang perlu diingat:** Langkah 1–5 adalah fase turun (belum ada hasil), langkah 5–9 adalah fase naik (hasil mulai terbentuk). Base case di langkah 5 adalah titik baliknya.

---

<a name="proses-unwinding"></a>
## 🎯 Proses Unwinding

Setelah base case tercapai, rekursi mulai **"menggelembung naik"** — setiap nilai return dari bawah dipakai oleh pemanggilan di atasnya:

```
factorial(1) = 1                  ← mulai dari sini
factorial(2) = 2 × 1     = 2
factorial(3) = 3 × 2     = 6
factorial(4) = 4 × 6     = 24
factorial(5) = 5 × 24    = 120    ← hasil akhir! ✅
```

> 🧠 **Intinya:** Rekursi turun dulu sampai base case, lalu naik kembali sambil mengumpulkan nilai-nilai return dari bawah. Hasilnya baru ketahuan di paling atas.

---

<a name="testing"></a>
## ✅ Testing

File test menggunakan **Jest** untuk memastikan fungsi bekerja dengan benar:

### `factorial.test.js`

```javascript
const factorial = require('./factorial');

test('Factorial of 0 should be 1', () => {
  expect(factorial(0)).toBe(1);
});

test('Factorial of 5 should be 120', () => {
  expect(factorial(5)).toBe(120);
});

test('Factorial of 10 should be 3628800', () => {
  expect(factorial(10)).toBe(3628800);
});
```

Jalankan dengan:

```bash
npm test
```

Kalau semua test **pass** ✅ berarti fungsi rekursi sudah berjalan dengan benar untuk input `0`, `5`, dan `10`.

---

> 💬 **Pesan dari video:** Kalau rekursi masih terasa membingungkan, itu wajar! Ikuti terus latihan berikutnya dan lama-lama akan terasa lebih natural. Yang penting paham dulu konsep base case dan unwinding-nya. 🚀