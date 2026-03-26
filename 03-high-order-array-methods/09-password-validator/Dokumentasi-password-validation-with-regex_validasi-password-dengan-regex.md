# 🔐 Belajar JavaScript — Validasi Password dengan Regex

> 🗓️ **Tanggal:** 26 Maret 2026
> 👤 **Level:** Pemula
> 🏷️ **Topik:** JavaScript · Regex · Arrow Function · Lookahead · Validasi Password

---

## 📚 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- ⚙️ [Kode Lengkap — 4 Versi](#kode-lengkap)
- ⚖️ [Perbandingan Keempat Versi](#perbandingan)
- 🏹 [Arrow Function vs Function Biasa](#arrow-function)
- 🔬 [Bedah Regex — Lookahead `(?=...)`](#lookahead)
- 🧪 [Analisis Test Case](#analisis-test-case)
- ⚠️ [Keterbatasan & Saran Improvement](#keterbatasan)
- 🏆 [Versi Terbaik untuk Production](#production)
- 📝 [Catatan Penting](#catatan-penting)
- 📖 [Referensi & Bahan Belajar](#referensi)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Sesi ini membahas fungsi JavaScript yang sangat umum digunakan: **validasi format password**.

Password yang lemah adalah salah satu celah keamanan paling umum di aplikasi web. Sebelum data dikirim ke server, kita perlu memastikan password memenuhi syarat minimum — minimal 8 karakter, ada huruf kapital, huruf kecil, dan angka.

Di sesi ini kita akan mempelajari **4 cara berbeda** untuk menulis fungsi yang sama, dan memahami kelebihan serta kekurangan masing-masing.

> 💡 **Inti pembelajaran:**
> Memahami lookahead regex, perbedaan arrow function vs function biasa, dan bagaimana memilih pendekatan yang tepat sesuai kebutuhan.

---

<a name="kode-lengkap"></a>
## ⚙️ Kode Lengkap — 4 Versi

### Versi 1 — Original (Single Regex, Karakter Bebas)

```javascript
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  return regex.test(password);
};
```

### Versi 2 — Early Return

```javascript
function validatePassword(password) {
  if (password.length < 8) return false;

  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;

  return true;
}
```

### Versi 3 — Named Variables

```javascript
const validatePassword = (password) => {
  if (password.length < 8) return false;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLowerCase && hasUpperCase && hasDigit;
};
```

### Versi 4 — Single Regex (Karakter Dibatasi)

```javascript
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};
```

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Keempat Versi

### Versi 1 — Original

**Kelebihan:**
- Singkat, satu baris logika
- Cocok kalau sudah paham regex

**Kekurangan:**
- `.{8,}` artinya karakter **apa saja** diizinkan — termasuk spasi dan emoji
- Sulit dibaca pemula
- Makin sulit dikembangkan kalau ada aturan baru

---

### Versi 2 — Early Return

**Kelebihan:**
- Sangat mudah dibaca — tiap baris = satu aturan
- **Paling efisien** — kalau panjang kurang dari 8, langsung berhenti tanpa cek sisanya
- Mudah ditambah aturan baru (tinggal tambah baris `if`)

**Kekurangan:**
- Lebih panjang secara baris kode
- Tidak tahu *semua* aturan yang gagal — berhenti di kegagalan pertama

---

### Versi 3 — Named Variables

**Kelebihan:**
- Nama variabel **menjelaskan diri sendiri** — `hasUpperCase` langsung paham maksudnya
- Cocok untuk memberi **feedback spesifik** ke user:

```javascript
// Hasil bisa langsung dipakai untuk pesan error
if (!hasUpperCase) showError("Butuh huruf kapital!");
if (!hasDigit)     showError("Butuh angka!");
```

**Kekurangan:**
- Semua regex tetap dijalankan meski yang pertama sudah `false` — tidak seefisien Early Return
- Sedikit lebih verbose

---

### Versi 4 — Karakter Dibatasi

**Kelebihan:**
- Perbaikan dari Versi 1 — `[a-zA-Z\d]{8,}` lebih ketat
- Satu regex, satu return — ringkas

**Kekurangan:**
- Karakter spesial seperti `@`, `_`, `!` justru **ditolak** — padahal di dunia nyata karakter spesial *dianjurkan* untuk password kuat
- Sama seperti Versi 1 — makin sulit dibaca kalau aturan bertambah

---

### Tabel Perbandingan

| | Keterbacaan | Efisiensi | Fleksibilitas | Feedback ke User |
|---|---|---|---|---|
| Original | ⚠️ Sedang | ✅ | ⚠️ Terbatas | ❌ |
| Early Return | ✅ Tinggi | ✅ Terbaik | ✅ | ❌ |
| Named Variables | ✅ Tinggi | ⚠️ Sedang | ✅ | ✅ Terbaik |
| Karakter Dibatasi | ⚠️ Sedang | ✅ | ❌ Terlalu ketat | ❌ |

---

<a name="arrow-function"></a>
## 🏹 Arrow Function vs Function Biasa

Di kode ini ada dua gaya penulisan fungsi yang berbeda. Versi 2 pakai `function` biasa, sisanya pakai **arrow function** `=>`.

### Perbedaan Sintaks

```javascript
// Function biasa
function validatePassword(password) {
  return true;
}

// Arrow function — cara 1 (dengan kurung kurawal)
const validatePassword = (password) => {
  return true;
};

// Arrow function — cara 2 (tanpa kurung kurawal, langsung return)
const validatePassword = (password) => true;
```

### Analogi

Bayangkan dua cara menulis resep:

```
Cara lama:  "Nama Resep: Nasi Goreng. Bahan: ... Cara: ..."
Cara baru:  nasi_goreng = (bahan) => masak(bahan)
```

Keduanya menghasilkan makanan yang sama — hanya gaya penulisannya berbeda.

### Kapan Pakai Masing-masing?

| Situasi | Pilihan |
|---|---|
| Fungsi sederhana, sekali pakai | Arrow function |
| Fungsi dengan nama jelas di kode besar | `function` biasa |
| Callback (`.map()`, `.filter()`, dll.) | Arrow function |
| Method di dalam object/class | Tergantung kebutuhan `this` |

> 💡 **Untuk pemula:** Keduanya menghasilkan hasil yang sama untuk kasus validasi seperti ini. Pilih yang lebih mudah kamu baca!

---

<a name="lookahead"></a>
## 🔬 Bedah Regex — Lookahead `(?=...)`

Ini bagian paling unik dari regex kita. Lookahead bekerja berbeda dari regex biasa.

### Analogi — Satpam yang Tidak Bergerak

Bayangkan kamu mau masuk gedung, dan ada **3 satpam** di pintu:

```
Satpam 1: "Ada huruf kapital tidak di password-mu?"
Satpam 2: "Ada huruf kecil tidak?"
Satpam 3: "Ada angka tidak?"
```

Yang unik — setiap satpam **tidak memindahkan kamu**. Mereka cuma *melihat*, lalu mengembalikan kamu ke posisi semula sebelum satpam berikutnya giliran.

Itulah lookahead — **mengecek tanpa menggeser posisi**.

---

### Regex Biasa vs Lookahead

Regex biasa bergerak **maju** sambil "memakan" karakter:

```
/[A-Z]/  →  ketemu 'P' di "Password1"  →  posisi bergeser ke 'a'
```

Lookahead **mengintip ke depan** tanpa bergerak:

```
(?=.*[A-Z])  →  "ada huruf kapital di mana saja tidak?"
              →  posisi tetap di awal string
```

---

### Bedah Satu Lookahead

```
(?=.*[A-Z])
│  │ └───── karakter yang dicari: huruf kapital
│  └─────── .* = "lewati karakter apa saja dulu"
└────────── (?= ) = "intip ke depan, jangan bergerak"
```

Cara bacanya: *"dari posisi sekarang, apakah ada huruf kapital di mana saja ke depan?"*

---

### Bedah Regex Lengkap

```
/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
  ─────────── ─────────── ──────── ─────
      [1]         [2]       [3]     [4]
```

| Bagian | Arti |
|---|---|
| `^` | Mulai dari awal string |
| `(?=.*[A-Z])` | Harus ada minimal 1 huruf kapital di mana saja |
| `(?=.*[a-z])` | Harus ada minimal 1 huruf kecil di mana saja |
| `(?=.*\d)` | Harus ada minimal 1 angka di mana saja |
| `.{8,}` | Karakter apa saja, minimal 8 |
| `$` | Berakhir di sini |

---

### Simulasi di String `"passWord1"`

```
Posisi awal: ^ (sebelum 'p')
│
├─ (?=.*[A-Z])  →  intip... ada 'W'?  ✅  →  posisi kembali ke awal
├─ (?=.*[a-z])  →  intip... ada 'p'?  ✅  →  posisi kembali ke awal
├─ (?=.*\d)     →  intip... ada '1'?  ✅  →  posisi kembali ke awal
│
└─ .{8,}  →  baru mulai "memakan" karakter → "passWord1" = 9 karakter ✅
```

Semua lolos → `true` ✅

---

### Kenapa Tidak Pakai Cara Biasa Saja?

Coba tulis **tanpa** lookahead:

```javascript
// Tanpa lookahead — tidak bisa dalam satu regex!
/^[A-Z][a-z]\d.{8,}$/
//  ↑ ini mengharuskan urutan KAPITAL dulu, lalu kecil, lalu angka
//  "Password1" ✅  tapi  "passWord1" ❌ — urutan salah!
```

Masalahnya — regex biasa **peduli urutan**. Lookahead tidak peduli urutan, dia cuma tanya *"ada tidak?"* dari posisi yang sama.

> 💡 **Kesimpulan:** Lookahead = "Syarat tambahan tanpa menggeser posisi"

---

<a name="analisis-test-case"></a>
## 🧪 Analisis Test Case

### ✅ `"passWord1"` → `true`

| Lookahead | Dicari | Ditemukan | Status |
|---|---|---|---|
| `(?=.*[A-Z])` | Huruf kapital | `W` | ✅ |
| `(?=.*[a-z])` | Huruf kecil | `p`, `a`, `s`, `s` | ✅ |
| `(?=.*\d)` | Angka | `1` | ✅ |
| `.{8,}` | Min. 8 karakter | 9 karakter | ✅ |

---

### ❌ `"password1"` → `false`

Lookahead `(?=.*[A-Z])` gagal — tidak ada huruf kapital. Langsung berhenti, tidak perlu cek sisanya.

---

### ❌ `"Pass1"` → `false`

Semua lookahead lolos, tapi `.{8,}` gagal — hanya 5 karakter.

---

### ❌ `"PASSWORD1"` → `false`

Lookahead `(?=.*[a-z])` gagal — tidak ada huruf kecil.

---

### Alur Kerja Fungsi

```
         Input: "passWord1"
                     │
                     ▼
    ┌─────────────────────────────┐
    │  Ada huruf kapital?         │──── Tidak ──▶ false ❌
    └─────────────────────────────┘
                     │ Ya
                     ▼
    ┌─────────────────────────────┐
    │  Ada huruf kecil?           │──── Tidak ──▶ false ❌
    └─────────────────────────────┘
                     │ Ya
                     ▼
    ┌─────────────────────────────┐
    │  Ada angka?                 │──── Tidak ──▶ false ❌
    └─────────────────────────────┘
                     │ Ya
                     ▼
    ┌─────────────────────────────┐
    │  Minimal 8 karakter?        │──── Tidak ──▶ false ❌
    └─────────────────────────────┘
                     │ Ya
                     ▼
                  true ✅
```

---

<a name="keterbatasan"></a>
## ⚠️ Keterbatasan & Saran Improvement

### Keterbatasan 1 — Karakter Spesial Tidak Diwajibkan

```javascript
validatePassword("Password1")  // ✅ true — tapi password lemah!
validatePassword("Aaaaaaaa1")  // ✅ true — ini juga lolos!
```

Kode kita hanya cek tiga syarat. Karakter seperti `@`, `!`, `#` tidak diwajibkan — padahal hampir semua sistem modern menganjurkannya.

**Improvement:**

```javascript
// Tambah satu syarat: minimal 1 karakter spesial
const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
```

---

### Keterbatasan 2 — Spasi Tidak Ditangani (Versi 1, 2, 3)

```javascript
validatePassword("Pass word1")  // ✅ true — spasi lolos!
```

Di Versi 1, 2, dan 3, spasi diizinkan karena tidak ada aturan yang melarangnya.

**Improvement:**

```javascript
// Tolak spasi secara eksplisit
if (/\s/.test(password)) return false;
```

---

### Keterbatasan 3 — Tidak Ada Batas Maksimum Panjang

```javascript
validatePassword("A".repeat(10000) + "a1")  // ✅ true — 10.002 karakter lolos!
```

Tidak ada batas atas. Ini bisa jadi celah serangan **ReDoS** *(Regular Expression Denial of Service)* — input sangat panjang bisa membuat regex berjalan sangat lambat.

**Improvement:**

```javascript
if (password.length > 128) return false;  // Tambah di baris paling awal
```

---

### Keterbatasan 4 — Tidak Ada Feedback ke User

```javascript
validatePassword("pass")  // ❌ false — tapi kenapa? User tidak tahu!
```

Semua versi (kecuali sebagian Named Variables) hanya mengembalikan `true` atau `false` — user tidak tahu aturan mana yang belum terpenuhi.

---

### Tabel Keterbatasan

| Keterbatasan | V1 Original | V2 Early Return | V3 Named Var | V4 Karakter Dibatasi |
|---|---|---|---|---|
| Karakter spesial tidak wajib | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Spasi lolos | ⚠️ | ⚠️ | ⚠️ | ✅ Aman |
| Tidak ada batas maksimum | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Tidak ada feedback ke user | ❌ | ❌ | ⚠️ Sebagian | ❌ |

---

<a name="production"></a>
## 🏆 Versi Terbaik untuk Production

Menggabungkan semua pelajaran dari keempat versi:

```javascript
const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8)          errors.push("Minimal 8 karakter");
  if (password.length > 128)        errors.push("Maksimal 128 karakter");
  if (/\s/.test(password))          errors.push("Tidak boleh mengandung spasi");
  if (!/[A-Z]/.test(password))      errors.push("Minimal 1 huruf kapital");
  if (!/[a-z]/.test(password))      errors.push("Minimal 1 huruf kecil");
  if (!/\d/.test(password))         errors.push("Minimal 1 angka");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Minimal 1 karakter spesial");

  return {
    isValid: errors.length === 0,
    errors
  };
};
```

**Contoh penggunaan:**

```javascript
const result = validatePassword("pass");

result.isValid  // false
result.errors
// [
//   "Minimal 8 karakter",
//   "Minimal 1 huruf kapital",
//   "Minimal 1 angka",
//   "Minimal 1 karakter spesial"
// ]
```

Versi ini menggabungkan **keterbacaan Early Return** + **feedback Named Variables** + **keamanan ekstra** dari semua pelajaran tadi.

---

<a name="catatan-penting"></a>
## 📝 Catatan Penting

### ⚠️ Validasi Client ≠ Validasi Server

> 💡 **Pelajaran penting:** Validasi di sisi client (JavaScript/browser) hanya untuk **kenyamanan pengguna**. Validasi sesungguhnya tetap harus dilakukan di **server** — karena JavaScript di browser bisa dilewati oleh pengguna yang berniat jahat.

### 🧠 Konsep Kunci yang Dipelajari

| Konsep | Penjelasan Singkat |
|---|---|
| `function` | Gaya penulisan fungsi klasik, cocok untuk fungsi besar |
| Arrow function `=>` | Gaya penulisan modern, lebih ringkas |
| `const` | Variabel yang nilainya tidak bisa diubah |
| `regex` | Pola untuk mencocokkan teks |
| `(?=...)` | Lookahead — cek tanpa menggeser posisi |
| `.*` | Cocokkan karakter apa saja, berapa pun banyaknya |
| `{8,}` | Kuantifier — minimal 8 kali muncul |
| `^` dan `$` | Jangkar awal dan akhir string |
| `.test()` | Method untuk menguji regex terhadap string |
| Early Return | Keluar dari fungsi lebih awal saat kondisi gagal |
| Named Variables | Menyimpan hasil ke variabel bermakna untuk keterbacaan |

---

<a name="referensi"></a>
## 📖 Referensi & Bahan Belajar

### 📚 Dokumentasi Resmi

- 🌐 [MDN — Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) — Panduan lengkap regex di JavaScript
- 🌐 [MDN — Lookahead Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) — Dokumentasi khusus lookahead
- 🌐 [MDN — Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) — Panduan arrow function
- 🌐 [MDN — RegExp.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) — Dokumentasi method `.test()`

### 🛠️ Tools Online

- 🔧 [Regex101](https://regex101.com) — Coba dan debug regex secara visual & interaktif *(sangat direkomendasikan!)*
- 🔧 [RegExr](https://regexr.com) — Alternatif Regex101 dengan penjelasan hover
- 🔧 [JSFiddle](https://jsfiddle.net) — Coba kode JavaScript langsung di browser

### 📘 Bahan Belajar Lanjutan

- 📖 [JavaScript.info — Regex](https://javascript.info/regular-expressions) — Tutorial regex ramah pemula
- 📖 [JavaScript.info — Lookahead](https://javascript.info/regexp-lookahead-lookbehind) — Penjelasan mendalam lookahead & lookbehind
- 📖 [Eloquent JavaScript](https://eloquentjavascript.net/09_regexp.html) — Buku gratis, bab khusus Regex

---

> 💬 **Catatan Sesi:**
> Dokumentasi ini dibuat dari sesi belajar bersama AI mentor.
> Selalu praktikkan kode sendiri dan eksplorasi lebih jauh menggunakan tools di atas!

---

*📅 Dibuat: 26 Maret 2026 | ✍️ Topik: JavaScript Regex Password Validation · Arrow Function · Lookahead*