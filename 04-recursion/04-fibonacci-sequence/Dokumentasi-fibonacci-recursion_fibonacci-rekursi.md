# 🌀 Fibonacci dengan Rekursi

> 📝 **Catatan pribadi** — Dokumentasi dari video tutorial tentang Fibonacci sequence menggunakan rekursi di JavaScript.

---

## 📚 Daftar Isi

- 🔍 [Apa itu Fibonacci Sequence?](#apa-itu-fibonacci-sequence)
- 🧩 [Rumus dan Logika Dasar](#rumus-dan-logika-dasar)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🏗️ [Struktur Fungsi Rekursif](#struktur-fungsi-rekursif)
- 💻 [Kode Lengkap](#kode-lengkap)
- 🔁 [Cara Kerja Step by Step](#cara-kerja-step-by-step)
- ✂️ [Versi Singkat (One-liner)](#versi-singkat-one-liner)
- ⚠️ [Perhatikan: Performa](#perhatikan-performa)
- 🧪 [Test Cases](#test-cases)

---

<a name="apa-itu-fibonacci-sequence"></a>
## 🔍 Apa itu Fibonacci Sequence?

Fibonacci sequence adalah deretan angka yang dimulai dari **0 dan 1**, dan setiap angka berikutnya adalah **jumlah dari dua angka sebelumnya**.

Contoh deretnya:

```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

| Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7  | 8  |
|-------|---|---|---|---|---|---|---|----|----|
| Nilai | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 |

Cara bacanya:
- `1` = `0 + 1`
- `2` = `1 + 1`
- `3` = `2 + 1`
- `5` = `3 + 2`
- `8` = `5 + 3`
- dan seterusnya...

> 💡 Ini adalah salah satu topik yang **sering muncul di job interview**, jadi penting banget untuk paham cara kerjanya.

---

<a name="rumus-dan-logika-dasar"></a>
## 🧩 Rumus dan Logika Dasar

Rumus matematisnya adalah:

```
F(n) = F(n-1) + F(n-2)
```

Artinya:
- `F(n)` → angka yang ingin kita cari
- `F(n-1)` → satu angka **sebelumnya** di sequence
- `F(n-2)` → dua angka **sebelumnya** di sequence

**Contoh nyata:**
Kalau kita mau cari `F(8) = 21`:
- Satu sebelumnya di sequence = `13` → itu adalah `F(7)`
- Dua sebelumnya di sequence = `8` → itu adalah `F(6)`
- Jadi: `21 = 13 + 8` ✅

### 🎯 Challenge-nya

Tulis fungsi `fibonacci(num)` yang menerima sebuah **index**, dan mengembalikan **angka yang ada di index tersebut**.

```js
fibonacci(4); // → 3  (index ke-4 nilainya 3)
fibonacci(6); // → 8  (index ke-6 nilainya 8)
fibonacci(8); // → 21 (index ke-8 nilainya 21)
```

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke Fibonacci:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | Index yang di-pass ke fungsi (`num`) |
| ➡️ Bergerak ke mana? | Ke bawah — `num - 1` dan `num - 2` setiap langkah |
| 🛑 Berhenti kapan? | Saat `num < 2` (base case sudah tercapai) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:
- **Mulai dari `num`** → parameter fungsi kita adalah `num`
- **Bergerak ke `num - 1` dan `num - 2`** → recursive call-nya adalah `fibonacci(num - 1)` dan `fibonacci(num - 2)`
- **Berhenti saat `num < 2`** → base case-nya adalah `if (num < 2) return num`

---

<a name="struktur-fungsi-rekursif"></a>
## 🏗️ Struktur Fungsi Rekursif

Fungsi rekursif punya dua bagian penting:

### 1️⃣ Base Case (Kondisi Berhenti)

Kita tahu dua angka pertama di sequence adalah `0` dan `1`. Keduanya ada di **index 0 dan 1**. Jadi kalau `num < 2`, kita tinggal langsung return `num`-nya.

```js
if (num < 2) return num;
// num = 0 → return 0
// num = 1 → return 1
```

### 2️⃣ Recursive Case (Kasus Rekursif)

Kalau index-nya lebih dari atau sama dengan 2, kita pakai rumus:

```js
return fibonacci(num - 1) + fibonacci(num - 2);
```

Fungsi akan terus memanggil dirinya sendiri dengan angka yang semakin kecil, sampai akhirnya mencapai base case (`num < 2`), lalu mulai **unwind** (balik ke atas dan menjumlahkan hasilnya).

---

<a name="kode-lengkap"></a>
## 💻 Kode Lengkap

Versi standar dengan function declaration:

```js
function fibonacci(num) {
  // Base case: jika index 0 atau 1, langsung return
  if (num < 2) return num;

  // Recursive case: jumlah dari dua fibonacci sebelumnya
  return fibonacci(num - 1) + fibonacci(num - 2);
}

module.exports = fibonacci;
```

Cara menjalankan:

```js
// fibonacci-run.js
const fibonacci = require('./fibonacci');

const result = fibonacci(8);
console.log(result); // Output: 21
```

---

<a name="cara-kerja-step-by-step"></a>
## 🔁 Cara Kerja Step by Step

Mari trace `fibonacci(5)` secara manual. Ada dua cara melihatnya — **tree diagram** untuk struktur percabangan, dan **call stack** untuk urutan eksekusinya.

---

### 🌳 Tree Diagram — "Kenapa bisa bercabang?"

Setiap panggilan `fibonacci(n)` selalu memecah diri menjadi **dua cabang**: kiri (`n-1`) dan kanan (`n-2`). Ini terus terjadi sampai menyentuh base case (`0` atau `1`).

```
                        fib(5)
                       /      \
                  fib(4)        fib(3)
                 /     \        /    \
            fib(3)    fib(2)  fib(2)  fib(1)
            /    \    /    \    /   \     |
        fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  [1]
        /    \   |      |      |      |      |
    fib(1) fib(0) [1]  [1]   [0]    [1]   [0]
      |      |
     [1]    [0]
```

Perhatikan:
- Angka dalam `[ ]` adalah **nilai yang dikembalikan** (base case)
- `fib(3)` muncul **2 kali**, `fib(2)` muncul **3 kali** → inilah kenapa rekursi biasa jadi lambat untuk angka besar (banyak perhitungan berulang)

---

### 📦 Call Stack — "Gimana urutan eksekusinya?"

Call stack adalah tumpukan. Fungsi yang dipanggil **masuk ke atas**, dan baru bisa **keluar setelah dapat nilai balik**.

```
TAHAP 1 — Masuk terus ke kiri dulu (n-1):
┌─────────────────┐
│  fib(1) = 1 ✅  │  ← base case, langsung return
├─────────────────┤
│  fib(2) nunggu  │  ← butuh fib(1) + fib(0)
├─────────────────┤
│  fib(3) nunggu  │  ← butuh fib(2) + fib(1)
├─────────────────┤
│  fib(4) nunggu  │  ← butuh fib(3) + fib(2)
├─────────────────┤
│  fib(5) nunggu  │  ← butuh fib(4) + fib(3)
└─────────────────┘

TAHAP 2 — fib(1) selesai, sekarang cabang kanan fib(2):
┌─────────────────┐
│  fib(0) = 0 ✅  │  ← base case, langsung return
├─────────────────┤
│  fib(2) nunggu  │  ← punya fib(1)=1, nunggu fib(0)
├─────────────────┤
│  fib(3) nunggu  │
├─────────────────┤
│  fib(4) nunggu  │
├─────────────────┤
│  fib(5) nunggu  │
└─────────────────┘

TAHAP 3 — fib(2) selesai, unwind dimulai:
┌─────────────────────────────┐
│  fib(2) = fib(1)+fib(0)     │
│         = 1 + 0 = 1 ✅      │  ← keluar dari stack
├─────────────────────────────┤
│  fib(3) nunggu              │  ← punya fib(2)=1, lanjut ke cabang fib(1)
├─────────────────────────────┤
│  fib(4) nunggu              │
├─────────────────────────────┤
│  fib(5) nunggu              │
└─────────────────────────────┘

TAHAP 4 — fib(3) selesai:
┌─────────────────────────────┐
│  fib(3) = fib(2)+fib(1)     │
│         = 1 + 1 = 2 ✅      │  ← keluar dari stack
├─────────────────────────────┤
│  fib(4) nunggu              │  ← punya fib(3)=2, lanjut ke cabang fib(2)
├─────────────────────────────┤
│  fib(5) nunggu              │
└─────────────────────────────┘

TAHAP 5 — fib(4) selesai:
┌─────────────────────────────┐
│  fib(4) = fib(3)+fib(2)     │
│         = 2 + 1 = 3 ✅      │  ← keluar dari stack
├─────────────────────────────┤
│  fib(5) nunggu              │  ← punya fib(4)=3, lanjut ke cabang fib(3)
└─────────────────────────────┘

TAHAP 6 — semua selesai:
┌─────────────────────────────┐
│  fib(5) = fib(4)+fib(3)     │
│         = 3 + 2 = 5 ✅      │  ← stack kosong, hasil final keluar
└─────────────────────────────┘
```

---

### 🔍 Cek Sendiri dengan `console.log`

Kalau mau lihat urutan panggilan secara nyata di terminal:

```js
function fibonacci(num) {
  console.log(`→ masuk fib(${num})`);
  if (num < 2) {
    console.log(`← base case fib(${num}) = ${num}`);
    return num;
  }
  const result = fibonacci(num - 1) + fibonacci(num - 2);
  console.log(`← selesai fib(${num}) = ${result}`);
  return result;
}

fibonacci(4);
```

Output yang akan muncul:
```
→ masuk fib(4)
→ masuk fib(3)
→ masuk fib(2)
→ masuk fib(1)
← base case fib(1) = 1
→ masuk fib(0)
← base case fib(0) = 0
← selesai fib(2) = 1
→ masuk fib(1)
← base case fib(1) = 1
← selesai fib(3) = 2
→ masuk fib(2)
→ masuk fib(1)
← base case fib(1) = 1
→ masuk fib(0)
← base case fib(0) = 0
← selesai fib(2) = 1
← selesai fib(4) = 3
```

> 📌 Perhatikan `→` berarti *masuk ke stack*, `←` berarti *keluar dari stack sambil bawa nilai*. Ini persis gambaran call stack di atas, tapi dalam bentuk teks yang bisa kamu jalankan sendiri.

---

<a name="versi-singkat-one-liner"></a>
## ✂️ Versi Singkat (One-liner)

Bisa juga ditulis lebih pendek menggunakan **ternary operator** dan **arrow function**:

```js
// Logika yang sama, tapi lebih ringkas
const fibonacci = (num) =>
  num < 2 ? num : fibonacci(num - 1) + fibonacci(num - 2);
```

Cara bacanya:
- Kalau `num < 2` → return `num` (base case)
- Selain itu → return `fibonacci(num - 1) + fibonacci(num - 2)` (recursive case)

---

<a name="perhatikan-performa"></a>
## ⚠️ Perhatikan: Performa

Setiap kali `fibonacci(n)` dipanggil, fungsi akan memanggil dirinya **dua kali** di recursive case. Ini berarti jumlah pemanggilan tumbuh **secara eksponensial**.

```
fibonacci(4)  → beberapa kali panggilan, cepat
fibonacci(8)  → sudah cukup banyak
fibonacci(40) → butuh ~2 detik
fibonacci(43) → butuh ~4-5 detik
```

> ⚡ Semakin besar angkanya, semakin lama jalannya karena banyak perhitungan yang **dihitung ulang berkali-kali**. Ini adalah trade-off dari solusi rekursif sederhana ini.

---

<a name="test-cases"></a>
## 🧪 Test Cases

File test menggunakan Jest:

```js
// fibonacci.test.js
const fibonacci = require('./fibonacci');

describe('fibonacci', () => {
  it('should return the correct Fibonacci number', () => {
    expect(fibonacci(0)).toBe(0);   // index 0 → nilai 0
    expect(fibonacci(1)).toBe(1);   // index 1 → nilai 1
    expect(fibonacci(2)).toBe(1);   // index 2 → nilai 1
    expect(fibonacci(3)).toBe(2);   // index 3 → nilai 2
    expect(fibonacci(4)).toBe(3);   // index 4 → nilai 3
    expect(fibonacci(5)).toBe(5);   // index 5 → nilai 5
    expect(fibonacci(6)).toBe(8);   // index 6 → nilai 8
    expect(fibonacci(7)).toBe(13);  // index 7 → nilai 13
  });
});
```

Jalankan test dengan:

```bash
npx jest fibonacci.test.js
```

---

> 💬 **Intinya:** Fibonacci dengan rekursi itu elegan karena rumusnya `F(n) = F(n-1) + F(n-2)` bisa langsung diterjemahkan jadi kode. Base case-nya sederhana (`num < 2`), dan recursive case-nya langsung pakai rumus itu. Ini adalah contoh klasik yang wajib hafal, terutama untuk whiteboard challenge di interview!