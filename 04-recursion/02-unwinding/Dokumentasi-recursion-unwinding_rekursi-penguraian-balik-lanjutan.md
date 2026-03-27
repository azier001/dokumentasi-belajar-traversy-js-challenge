# 🌀 Rekursi: Memperdalam Proses Kembali (Unwinding), Base Case & Perilaku Call Stack

> **Catatan pribadi** · Pemula-friendly · Lanjutan dari sesi sebelumnya

---

## 📋 Daftar Isi

- 🐛 [Bug di Dokumentasi Sebelumnya: Edge Case `sumUpTo(0)`](#bug-sumupto)
- 🔧 [Memperbaiki Base Case](#memperbaiki-base-case)
- ⚖️ [Perbandingan: `n <= 0` vs `n <= 1`](#perbandingan-base-case)
- ⚠️ [Hati-hati: Nilai Negatif](#nilai-negatif)
- 🔍 [Mengamati Unwinding (Proses Kembali) Lewat `console.log`](#mengamati-unwinding)
- 🧪 [Kode `test(n)` — Versi Before/After](#test-before-after)
- 🧪 [Kode `test(n)` — Versi Tanpa Label](#test-tanpa-label)
- 🧠 [Pola "Turun Dulu, Naik Lagi"](#pola-turun-naik)
- 📌 [Takeaway Utama](#takeaway)

---

<a name="bug-sumupto"></a>
## 🐛 Bug di Dokumentasi Sebelumnya: Edge Case `sumUpTo(0)`

Di dokumentasi sebelumnya, kode `sumUpTo` ditulis seperti ini:

```js
function sumUpTo(n) {
  if (n === 1) {
    return 1;
  }
  return n + sumUpTo(n - 1);
}
```

Dan test case-nya adalah:

```js
test('Summing up positive integers', () => {
  expect(sumUpTo(5)).toBe(15);   // ✅ pass
  expect(sumUpTo(10)).toBe(55);  // ✅ pass
  expect(sumUpTo(1)).toBe(1);    // ✅ pass
  expect(sumUpTo(0)).toBe(0);    // ❌ FAIL!
});
```

**Kenapa `sumUpTo(0)` gagal?**

Karena base case-nya adalah `n === 1`. Ketika `n = 0` dipanggil:

```
sumUpTo(0)
→ n === 1? Tidak
→ return 0 + sumUpTo(-1)
               → return -1 + sumUpTo(-2)
                              → return -2 + sumUpTo(-3)
                                             → ... ♾️ infinite recursion!
```

`n` tidak pernah mencapai `1`, terus turun ke negatif — **stack overflow**!

> 💡 **Stack overflow** terjadi ketika call stack penuh karena terlalu banyak fungsi yang menumpuk tanpa pernah selesai.

---

<a name="memperbaiki-base-case"></a>
## 🔧 Memperbaiki Base Case

Ada dua pendekatan yang bisa dipakai:

### Opsi 1: `n <= 0` return `0`

```js
function sumUpTo(n) {
  if (n <= 0) return 0;  // handle nol dan negatif
  if (n === 1) return 1; // base case
  return n + sumUpTo(n - 1);
}
```

### Opsi 2: `n <= 1` return `n` ✅ (lebih ringkas)

```js
function sumUpTo(n) {
  if (n <= 1) return n;  // base case — cover n=0 dan n=1 sekaligus
  return n + sumUpTo(n - 1);
}
```

Opsi 2 lebih umum dipakai karena lebih ringkas dan tidak ada rekursi yang sia-sia.

---

<a name="perbandingan-base-case"></a>
## ⚖️ Perbandingan: `n <= 0` vs `n <= 1`

Ini pertanyaan yang menarik — apakah `n <= 0` sudah otomatis cover `n = 1`?

**Jawabannya: tidak secara langsung.**

Mari kita trace `sumUpTo(1)` dengan base case `n <= 0`:

```
sumUpTo(1)
→ n <= 0? Tidak (1 > 0)
→ return 1 + sumUpTo(0)
               → n <= 0? Ya → return 0
→ return 1 + 0 = 1  ✅
```

Hasilnya benar, tapi **ada satu pemanggilan rekursi ekstra yang tidak perlu**. Fungsi rekursi ke `sumUpTo(0)` dulu sebelum bisa return.

Sedangkan dengan `n <= 1`:

```
sumUpTo(1)
→ n <= 1? Ya → return 1  ✅ (langsung berhenti!)
```

| | `n <= 0` return `0` | `n <= 1` return `n` |
|---|---|---|
| Cover `n = 0` | ✅ | ✅ |
| Cover `n = 1` | ✅ (lewat rekursi dulu) | ✅ (langsung) |
| Efisiensi | Satu rekursi ekstra | Lebih efisien |
| Kejelasan intent | Explicit untuk nol/negatif | Ringkas |

> 💡 Untuk kasus sederhana seperti `sumUpTo`, **`n <= 1` return `n`** adalah pilihan yang paling umum ditemukan di tutorial dan buku teks.

---

<a name="nilai-negatif"></a>
## ⚠️ Hati-hati: Nilai Negatif

Dengan base case `n <= 1` return `n`, bagaimana kalau input-nya negatif?

```
sumUpTo(-3)
→ n <= 1? Ya (-3 <= 1) → return -3
```

Langsung return `-3` — tidak error, tidak infinite loop, tapi **hasilnya tidak masuk akal** secara matematis. Ini disebut *silent wrong answer* — berbahaya karena tidak ada peringatan.

Untuk production code yang lebih aman, bisa tambahkan validasi:

```js
function sumUpTo(n) {
  if (n < 0) throw new Error('n harus bilangan positif');
  if (n <= 1) return n;
  return n + sumUpTo(n - 1);
}
```

---

<a name="mengamati-unwinding"></a>
## 🔍 Mengamati Unwinding (Proses Kembali) Lewat `console.log`

**Unwinding** adalah istilah teknis untuk proses "kembali" setelah base case tercapai — bayangkan seperti mengurai benang yang sudah digulung, satu per satu dari yang paling atas. Dalam bahasa sehari-hari: *rekursi selesai memanggil dirinya sendiri, lalu mulai balik ke atas satu per satu*.

Cara terbaik untuk benar-benar *melihat* unwinding (proses kembali) adalah dengan menempatkan `console.log` di dua posisi berbeda — **sebelum** dan **sesudah** pemanggilan rekursi.

```js
function test(n) {
  if (n === 0) return 0;
  console.log("before", n);  // dijalankan saat MASUK stack
  test(n - 1);
  console.log("after", n);   // dijalankan saat KELUAR stack (unwinding)
}
```

Posisi `console.log` sangat menentukan kapan ia dieksekusi:

| Posisi | Dijalankan kapan? |
|---|---|
| Sebelum `test(n - 1)` | Saat fungsi **masuk** ke call stack |
| Sesudah `test(n - 1)` | Saat fungsi **keluar** dari call stack (unwinding / proses kembali) |

---

<a name="test-before-after"></a>
## 🧪 Kode `test(n)` — Versi Before/After

```js
function test(n) {
  if (n === 0) return 0;       // baris 1: base case
  console.log("before", n);    // baris 2: print sebelum rekursi
  test(n - 1);                 // baris 3: rekursi
  console.log("after", n);     // baris 4: print setelah rekursi (tertahan!)
}

test(3);
```

### Fase 1 — Menumpuk ke Stack

```
test(3) → before 3 ✅ → memanggil test(2), baris 4 TERTAHAN
test(2) → before 2 ✅ → memanggil test(1), baris 4 TERTAHAN
test(1) → before 1 ✅ → memanggil test(0), baris 4 TERTAHAN
test(0) → base case → return ✅ proses kembali (unwinding) dimulai!
```

Call stack saat penuh:

```
┌──────────────┐  ← paling atas (pertama keluar - LIFO)
│   test(0)    │  → base case, langsung return
├──────────────┤
│   test(1)    │  → menunggu test(0) selesai
├──────────────┤
│   test(2)    │  → menunggu test(1) selesai
├──────────────┤
│   test(3)    │  → menunggu test(2) selesai
└──────────────┘  ← paling bawah (terakhir keluar)
```

### Fase 2 — Unwinding (Proses Kembali)

```
test(1) selesai → baris 4 dijalankan → after 1
test(2) selesai → baris 4 dijalankan → after 2
test(3) selesai → baris 4 dijalankan → after 3
```

### Output Lengkap

```
before 3
before 2
before 1
after 1
after 2
after 3
```

> 💡 `baris 4` adalah kunci — ia **tidak bisa dijalankan** selama `test(n - 1)` di baris 3 belum selesai. Inilah yang menyebabkan `after` muncul dalam urutan terbalik saat unwinding (proses kembali) terjadi.

---

<a name="test-tanpa-label"></a>
## 🧪 Kode `test(n)` — Versi Tanpa Label

Versi yang lebih bersih — tanpa label `"before"` dan `"after"`, hanya `console.log(n)`:

```js
function test(n) {
  if (n === 0) return;   // base case (tanpa return value)
  console.log(n);        // baris 2: print saat masuk
  test(n - 1);           // baris 3: rekursi
  console.log(n);        // baris 4: print saat unwinding / proses kembali (tertahan!)
}

test(3);
```

Konsepnya **sama persis** — baris 2 dijalankan saat masuk, baris 4 tertahan sampai unwinding (proses kembali).

### Trace Lengkap

```
test(3) → print 3 → memanggil test(2)
  test(2) → print 2 → memanggil test(1)
    test(1) → print 1 → memanggil test(0)
      test(0) → base case → return ✅

    test(1) selesai → print 1
  test(2) selesai → print 2
test(3) selesai → print 3
```

### Output Lengkap

```
3
2
1
1
2
3
```

---

<a name="pola-turun-naik"></a>
## 🧠 Pola "Turun Dulu, Naik Lagi"

Dari kedua contoh `test(n)` di atas, terlihat pola yang sangat elegan:

```
3  ← masuk stack
2  ← masuk stack
1  ← masuk stack
1  ← keluar stack (unwinding / proses kembali)
2  ← keluar stack (unwinding / proses kembali)
3  ← keluar stack (unwinding / proses kembali)
```

Angkanya **turun dulu** `3→2→1` saat masuk stack, lalu **naik lagi** `1→2→3` saat unwinding.

Ini bukan kebetulan — ini adalah konsekuensi langsung dari **LIFO**:

> Yang terakhir masuk ke call stack → yang pertama keluar saat unwinding.

Inilah kekuatan rekursi yang sering tidak disadari — **kode yang sama** menghasilkan dua urutan sekaligus, hanya karena posisi `console.log` yang berbeda:

| Posisi `console.log` | Urutan output |
|---|---|
| Sebelum rekursi (baris 2) | Urutan normal: `3, 2, 1` |
| Sesudah rekursi (baris 4) | Urutan terbalik: `1, 2, 3` ← hasil unwinding (proses kembali) |

Konsep ini adalah fondasi dari algoritma seperti **reverse string rekursif** — yang akan kita bahas di sesi berikutnya!

---

<a name="takeaway"></a>
## 📌 Takeaway Utama

1. **Selalu test edge case** — `sumUpTo(0)` mengungkap bug base case yang tidak ketahuan dari test biasa.

2. **`n <= 1` return `n`** adalah base case yang lebih efisien dibanding dua base case terpisah untuk kasus `sumUpTo`.

3. **Posisi `console.log` menentukan urutan output** — sebelum rekursi = urutan normal, sesudah rekursi = urutan terbalik.

4. **Baris setelah pemanggilan rekursi selalu "tertahan"** — tidak akan dieksekusi sampai seluruh rekursi di bawahnya selesai.

5. **LIFO adalah inti dari unwinding (proses kembali)** — yang terakhir masuk call stack adalah yang pertama keluar, menciptakan pola "turun dulu, naik lagi".

---

> **📌 Koneksi ke sesi berikutnya:** Pola "turun dulu, naik lagi" dari unwinding (proses kembali) yang kita pelajari di sini adalah fondasi dari **reverse string rekursif** — kita akan memanfaatkan urutan terbalik dari unwinding untuk membalik string karakter demi karakter!