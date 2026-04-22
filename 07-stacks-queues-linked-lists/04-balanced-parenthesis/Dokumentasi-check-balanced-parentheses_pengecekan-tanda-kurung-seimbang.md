# ⚖️ Tantangan: Pengecekan Tanda Kurung Seimbang (Balanced Parenthesis)

Halo! 👋 Di tantangan ini, kita akan pakai lagi struktur data **Stack** (Tumpukan) untuk menyelesaikan satu masalah klasik: mengecek apakah susunan tanda kurung dalam sebuah string itu **seimbang** atau tidak.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan Masalah](#pengenalan-masalah)
- 💡 [Contoh Kasus: Seimbang vs Tidak Seimbang](#contoh-kasus)
- 🧠 [Petunjuk & Strategi Penyelesaian](#petunjuk-strategi)
- 🚀 [Solusi Kode Lengkap](#solusi-kode)
- 🔍 [Bedah Kode Baris demi Baris](#bedah-kode)
- 🎨 [Visualisasi ASCII: Stack Beraksi](#visualisasi-ascii)
- ✅ [Ringkasan Poin Penting](#ringkasan)

---

<a name="pengenalan-masalah"></a>
## 🎯 Pengenalan Masalah

Tugas kita: buat fungsi bernama `isBalanced` yang menerima sebuah string berisi tanda kurung, lalu mengecek apakah kurung-kurung tersebut **seimbang**.

### Apa sih "seimbang" itu?

Bayangkan kamu sedang menumpuk piring. Setiap piring yang kamu taruh di atas (`(`) harus diangkat lagi (`)`). Kalau di akhir masih ada piring yang belum diangkat, atau kamu coba angkat piring padahal tumpukan sudah kosong — berarti **tidak seimbang**.

Secara teknis:
- Setiap kurung buka `(` **wajib** punya pasangan kurung tutup `)`
- Kurung tutup `)` **tidak boleh** muncul duluan sebelum ada kurung buka
- Urutan harus benar — bukan cuma jumlahnya yang sama

Fungsi mengembalikan:
- `true` → kurung seimbang
- `false` → kurung tidak seimbang

> **Batasan:** String input hanya berisi karakter `(` dan `)`, tidak ada karakter lain.

---

<a name="contoh-kasus"></a>
## 💡 Contoh Kasus: Seimbang vs Tidak Seimbang

### ✅ Kasus yang Seimbang (`true`)

| Input | Alasan |
|-------|--------|
| `()` | Satu pasang: buka → tutup |
| `()()` | Dua pasang berurutan: buka-tutup, buka-tutup |
| `(())` | Bersarang: buka, buka, tutup, tutup |
| `(()())` | Campuran: buka, (buka-tutup), (buka-tutup), tutup |
| `()((()))()` | Kombinasi berurutan dan bersarang |

### ❌ Kasus yang Tidak Seimbang (`false`)

| Input | Alasan |
|-------|--------|
| `((`  | Dua kurung buka tanpa penutup |
| `)(` | Dimulai dengan kurung tutup — salah urutan! |
| `())` | Kurung tutup terakhir tidak punya pasangan |
| `(()` | Satu kurung buka tidak tertutup |

---

<a name="petunjuk-strategi"></a>
## 🧠 Petunjuk & Strategi Penyelesaian

Inilah kenapa **Stack** adalah alat yang pas untuk masalah ini:

```text
Logika utama:
┌──────────────────────────────────────────────────────┐
│  1. Ketemu '('  →  PUSH ke stack (simpan)            │
│  2. Ketemu ')'  →  Cek stack dulu:                   │
│     • Stack kosong?  →  return FALSE (tidak ada       │
│                          pasangan, langsung gagal!)   │
│     • Stack ada isi? →  POP dari stack (pasangkan)    │
│  3. Selesai loop  →  Cek stack:                       │
│     • Stack kosong?  →  return TRUE  (semua cocok!)   │
│     • Stack ada isi? →  return FALSE (ada sisa buka)  │
└──────────────────────────────────────────────────────┘
```

**Kenapa pakai Stack?** Karena sifat LIFO (Last In, First Out) dari Stack sangat cocok — kurung buka **terakhir** yang masuk haruslah yang **pertama** ditutup.

---

<a name="solusi-kode"></a>
## 🚀 Solusi Kode Lengkap

```javascript
const Stack = require('./stack');

function isBalanced(str) {
  // Buat stack baru sebagai "catatan" kurung buka
  const stack = new Stack();

  // Periksa setiap karakter satu per satu
  for (let i = 0; i < str.length; i++) {

    if (str[i] === '(') {
      // Ketemu kurung buka → simpan ke stack
      stack.push(str[i]);

    } else if (str[i] === ')') {
      // Ketemu kurung tutup → cek apakah ada pasangannya

      if (stack.isEmpty()) {
        // Stack kosong = kurung tutup tanpa pasangan → GAGAL
        return false;
      }

      // Ada pasangan → keluarkan kurung buka dari stack
      stack.pop();
    }
  }

  // Semua karakter sudah dicek
  // Jika stack kosong = semua kurung berpasangan = SEIMBANG
  return stack.isEmpty();
}

module.exports = isBalanced;
```

---

<a name="bedah-kode"></a>
## 🔍 Bedah Kode Baris demi Baris

Mari kita telusuri alur kode dari awal sampai akhir:

### 1️⃣ Inisialisasi Stack
```javascript
const stack = new Stack();
```
Kita bikin tumpukan kosong. Tumpukan ini akan jadi "buku catatan" untuk melacak semua kurung buka yang belum menemukan pasangannya.

### 2️⃣ Loop Setiap Karakter
```javascript
for (let i = 0; i < str.length; i++) {
```
Kita periksa string dari kiri ke kanan, karakter per karakter.

### 3️⃣ Ketemu Kurung Buka `(`
```javascript
if (str[i] === '(') {
  stack.push(str[i]);
}
```
Ketika ketemu kurung buka, kita **catat** dengan memasukkannya ke dalam stack. Artinya: *"Oke, ada satu kurung buka yang butuh pasangan."*

### 4️⃣ Ketemu Kurung Tutup `)`
```javascript
} else if (str[i] === ')') {
  if (stack.isEmpty()) {
    return false;        // Tidak ada pasangan!
  }
  stack.pop();           // Pasangkan & hapus dari catatan
}
```
Ini bagian kritis. Dua skenario:
- **Stack kosong** → Kurung tutup muncul, tapi tidak ada kurung buka yang menunggu. Langsung `return false`.
- **Stack ada isi** → Cocok! Kita `pop()` satu kurung buka dari stack, menandakan satu pasang sudah komplit.

### 5️⃣ Pengecekan Final
```javascript
return stack.isEmpty();
```
Setelah semua karakter selesai diperiksa:
- Stack **kosong** → Semua kurung buka sudah menemukan pasangan → `true` ✅
- Stack **masih ada isi** → Ada kurung buka yang "jomblo" → `false` ❌

---

<a name="visualisasi-ascii"></a>
## 🎨 Visualisasi ASCII: Stack Beraksi

### Kasus 1: `(())` → Seimbang ✅

```text
String:  (    (    )    )
Index:   0    1    2    3

═══════════════════════════════════════════════════════════

Index 0 → Karakter: '('  →  PUSH!

         ┌─────┐
         │     │
         │     │
         │  (  │  ← masuk
         └─────┘
          Stack

───────────────────────────────────────────────────────────

Index 1 → Karakter: '('  →  PUSH!

         ┌─────┐
         │     │
         │  (  │  ← masuk
         │  (  │
         └─────┘
          Stack

───────────────────────────────────────────────────────────

Index 2 → Karakter: ')'  →  Ada pasangan? Stack ada isi → POP!

         ┌─────┐
         │     │
         │     │     ( ← keluar (dipasangkan!)
         │  (  │
         └─────┘
          Stack

───────────────────────────────────────────────────────────

Index 3 → Karakter: ')'  →  Ada pasangan? Stack ada isi → POP!

         ┌─────┐
         │     │
         │     │     ( ← keluar (dipasangkan!)
         │     │
         └─────┘
          Stack

═══════════════════════════════════════════════════════════

Loop selesai → stack.isEmpty() === true → return TRUE ✅
Semua kurung buka berhasil menemukan pasangannya!
```

---

### Kasus 2: `()(` → Tidak Seimbang ❌

```text
String:  (    )    (
Index:   0    1    2

═══════════════════════════════════════════════════════════

Index 0 → Karakter: '('  →  PUSH!

         ┌─────┐
         │     │
         │     │
         │  (  │  ← masuk
         └─────┘
          Stack

───────────────────────────────────────────────────────────

Index 1 → Karakter: ')'  →  Ada pasangan? Stack ada isi → POP!

         ┌─────┐
         │     │
         │     │     ( ← keluar (dipasangkan!)
         │     │
         └─────┘
          Stack

───────────────────────────────────────────────────────────

Index 2 → Karakter: '('  →  PUSH!

         ┌─────┐
         │     │
         │     │
         │  (  │  ← masuk
         └─────┘
          Stack

═══════════════════════════════════════════════════════════

Loop selesai → stack.isEmpty() === false → return FALSE ❌
Masih ada 1 kurung buka yang "jomblo", tidak punya pasangan!
```

---

### Kasus 3: `)(` → Tidak Seimbang ❌

```text
String:  )    (
Index:   0    1

═══════════════════════════════════════════════════════════

Index 0 → Karakter: ')'  →  Cek stack... KOSONG!

         ┌─────┐
         │     │
         │     │
         │     │  ← tidak ada isi!
         └─────┘
          Stack

         Kurung tutup muncul, tapi tidak ada kurung buka
         yang menunggu → langsung return FALSE ❌

═══════════════════════════════════════════════════════════

Proses BERHENTI di sini. Tidak perlu cek karakter berikutnya.
```

---

<a name="ringkasan"></a>
## ✅ Ringkasan Poin Penting

| Konsep | Penjelasan |
|--------|------------|
| **Stack (LIFO)** | Kurung buka terakhir yang masuk, harus jadi yang pertama dipasangkan |
| **Push saat `(`** | Catat bahwa ada kurung buka yang butuh pasangan |
| **Pop saat `)`** | Hapus satu kurung buka dari catatan (sudah berpasangan) |
| **Stack kosong + `)`** | Berarti ada kurung tutup tanpa pasangan → `false` |
| **Sisa di stack** | Setelah loop, kalau stack masih ada isi → ada kurung buka yang "jomblo" → `false` |
| **Stack kosong di akhir** | Semua kurung berhasil dipasangkan → `true` |

---

Semoga catatan ini membantu memahami cara kerja Stack dalam memecahkan masalah Balanced Parenthesis! 🚀
