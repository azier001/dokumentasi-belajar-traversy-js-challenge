# 📧 Belajar JavaScript — Validasi Email dengan Regex

> 🗓️ **Tanggal:** 14 Maret 2026
> 👤 **Level:** Pemula
> 🏷️ **Topik:** JavaScript · Regex · Validasi Email

---

## 📚 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- ⚙️ [Kode Lengkap](#kode-lengkap)
- 🏗️ [Apa itu Fungsi?](#apa-itu-fungsi)
- 🧩 [Apa itu Regex?](#apa-itu-regex)
- 🔬 [Bedah Regex — Karakter per Karakter](#bedah-regex)
- 🧪 [Analisis Test Case](#analisis-test-case)
- 🎯 [Visualisasi Lengkap](#visualisasi-lengkap)
- 📝 [Catatan Penting](#catatan-penting)
- 📖 [Referensi & Bahan Belajar](#referensi)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Sesi ini membahas sebuah fungsi JavaScript yang sangat umum digunakan di dunia web: **validasi format email**.

Sebelum sebuah form dikirim ke server, kita perlu memastikan bahwa pengguna benar-benar memasukkan alamat email yang valid — bukan teks acak. Di sinilah **Regex** berperan.

> 💡 **Inti pembelajaran:**
> Memahami cara kerja Regex dan bagaimana menerapkannya untuk memvalidasi input pengguna.

---

<a name="kode-lengkap"></a>
## ⚙️ Kode Lengkap

```javascript
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Contoh penggunaan:
validateEmail("user@example.com");   // ✅ true
validateEmail("user@example.co.id"); // ✅ true
validateEmail("invalid.email");      // ❌ false
validateEmail("@example.com");       // ❌ false
```

---

<a name="apa-itu-fungsi"></a>
## 🏗️ Apa itu Fungsi?

Bayangkan fungsi seperti sebuah **mesin di pabrik**:

```
[ Input: email ] ──▶ [ MESIN validateEmail ] ──▶ [ Output: true / false ]
```

Kamu memasukkan sesuatu → mesin memprosesnya → mesin mengeluarkan hasil.

```javascript
function validateEmail(email) {
  //                   ^^^^^
  //         Ini "kotak" tempat menyimpan input-mu.
  //         Apapun yang kamu masukkan saat memanggil fungsi,
  //         akan tersimpan di variabel "email" ini.
}
```

> 💡 **Analogi sederhana:**
> Fungsi = Resep masakan. Kamu memberi bahan (input), resep mengolahnya, dan menghasilkan hidangan (output).

---

<a name="apa-itu-regex"></a>
## 🧩 Apa itu Regex?

**Regex** *(Regular Expression)* adalah seperti sebuah **cetakan / stempel**.

Bayangkan kamu punya cetakan berbentuk bintang ⭐:
- Tempelkan ke kertas berbentuk bintang → **cocok ✅**
- Tempelkan ke kertas berbentuk lingkaran → **tidak cocok ❌**

Regex bekerja persis seperti itu, tapi cetakannya adalah **pola teks**.

```javascript
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//            ↑                                                    ↑
//     Tanda / adalah pembuka dan penutup regex (seperti tanda kutip pada string)
```

---

<a name="bedah-regex"></a>
## 🔬 Bedah Regex — Karakter per Karakter

Mari kita potong regex menjadi bagian-bagian kecil:

```
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  ───────────────── ─ ────────────── ─ ──────────
        [1]        [2]     [3]      [4]    [5]
```

### 🔹 [1] `^` — Jangkar Awal

Pencocokan **harus dimulai dari awal string**. Tidak boleh ada karakter lain sebelumnya.

```
"user@gmail.com"    → mulai dari 'u'   ✅
" user@gmail.com"   → ada spasi di depan ❌
```

---

### 🔹 [2] `[a-zA-Z0-9._%+-]+` — Local Part (Sebelum @)

Tanda kurung siku `[ ]` artinya **"pilih salah satu karakter di dalam ini"**.

```
[a-zA-Z0-9._%+-]
 │   │   │ ││││
 │   │   │ │││└─ minus      → user-name   ✅
 │   │   │ ││└── plus       → user+tag    ✅
 │   │   │ │└─── persen     → user%name   ✅
 │   │   │ └──── underscore → user_name   ✅
 │   │   └─────  titik      → user.name   ✅
 │   └─────────  angka 0–9  → user99      ✅
 └─────────────  huruf a–z dan A–Z       ✅
```

> ⛔ Karakter seperti `#`, `!`, `*`, spasi → **TIDAK diizinkan**

Tanda `+` di belakang artinya **minimal 1 karakter**. Itulah kenapa `"@gmail.com"` gagal — tidak ada karakter sebelum `@`.

---

### 🔹 [3] `@` — Karakter Wajib

Ini benar-benar **mencari karakter `@`** di dalam string. Harus ada, tepat di posisi ini.

```
"user@gmail.com"   → ada @  ✅
"usergmail.com"    → tidak ada @  ❌
```

---

### 🔹 [4] `[a-zA-Z0-9.-]+` — Nama Domain

Sama seperti local part, tapi lebih terbatas. Tidak ada `_%+` karena nama domain tidak mengizinkan karakter tersebut.

```
"gmail"     ✅
"my-site"   ✅
"my_site"   ❌  (underscore tidak diizinkan di nama domain)
```

---

### 🔹 [5] `\.` — Titik yang Sesungguhnya

```javascript
// Dalam regex, ada dua jenis titik:
.    // Tanpa backslash = "karakter APA SAJA" (wildcard)
\.   // Dengan backslash = titik sungguhan "."
```

| Pola | Arti | Contoh cocok |
|------|------|--------------|
| `.`  | Karakter apa saja | `a`, `1`, `@`, `!` |
| `\.` | Titik sungguhan | `.` saja |

---

### 🔹 [6] `[a-zA-Z]{2,}` — Ekstensi Domain

```
[a-zA-Z]{2,}
          ↑
       {2,} = minimal 2 karakter, maksimal tidak terbatas
```

```
"com"     → 3 huruf  ✅
"id"      → 2 huruf  ✅
"co"      → 2 huruf  ✅
"c"       → 1 huruf  ❌
"123"     → angka    ❌
```

---

### 🔹 [7] `$` — Jangkar Akhir

Pencocokan **harus berakhir di sini**. Tidak boleh ada karakter tambahan di belakang.

```
"user@gmail.com"          ✅
"user@gmail.com  "        ❌ (ada spasi di belakang)
"user@gmail.com.hacked"   ❌ (ada tambahan di belakang)
```

---

<a name="analisis-test-case"></a>
## 🧪 Analisis Test Case

### ✅ `"user@example.com"` → `true`

| Bagian | Nilai | Status |
|--------|-------|--------|
| Local part | `user` | ✅ huruf valid |
| @ | `@` | ✅ ada |
| Domain | `example` | ✅ valid |
| Titik | `.` | ✅ ada |
| Ekstensi | `com` | ✅ 3 huruf |

---

### ✅ `"user@example.co.id"` → `true`

| Bagian | Nilai | Status |
|--------|-------|--------|
| Local part | `user` | ✅ |
| Domain | `example.co` | ✅ titik & huruf diizinkan di domain |
| Ekstensi akhir | `id` | ✅ 2 huruf |

> 💡 Regex hanya mengecek **ekstensi paling akhir** setelah titik terakhir, yaitu `id`.

---

### ❌ `"invalid.email"` → `false`

Tidak ada karakter `@` sama sekali → pola gagal dicocokkan sejak awal.

---

### ❌ `"@example.com"` → `false`

Tanda `+` mengharuskan **minimal 1 karakter** sebelum `@`, tapi tidak ada → langsung gagal.

---

<a name="visualisasi-lengkap"></a>
## 🎯 Visualisasi Lengkap

### Alur kerja fungsi:

```
         Input: "user@example.com"
                        │
                        ▼
         ┌──────────────────────────┐
         │  Ada karakter sebelum @? │──── Tidak ──▶ false ❌
         └──────────────────────────┘
                        │ Ya
                        ▼
         ┌──────────────────────────┐
         │     Ada tanda @ ?        │──── Tidak ──▶ false ❌
         └──────────────────────────┘
                        │ Ya
                        ▼
         ┌──────────────────────────┐
         │     Domain valid?        │──── Tidak ──▶ false ❌
         └──────────────────────────┘
                        │ Ya
                        ▼
         ┌──────────────────────────┐
         │  Ekstensi ≥ 2 huruf?     │──── Tidak ──▶ false ❌
         └──────────────────────────┘
                        │ Ya
                        ▼
                     true ✅
```

### Peta posisi regex pada string:

```
  u  s  e  r  @  e  x  a  m  p  l  e  .  c  o  m
  ─────────── ─  ──────────────────── ─  ─────────
  local part  @       domain          .  ekstensi
  [1] + [2]  [3]       [4]           [5]    [6]
```

---

<a name="catatan-penting"></a>
## 📝 Catatan Penting

### ⚠️ Keterbatasan Regex Ini

Regex ini bagus untuk pemula, tapi perlu kamu tahu bahwa ada beberapa kasus yang bisa lolos padahal tidak valid di dunia nyata:

| Kasus | Hasil Fungsi | Kenyataan |
|-------|-------------|-----------|
| `"user@domain.c"` | ❌ false | ✅ Benar ditolak |
| `"user@@domain.com"` | ❌ false | ✅ Benar ditolak |
| `"user@.com"` | ❌ false | ✅ Benar ditolak |
| `"a@b.co"` | ✅ true | ⚠️ Format valid tapi domain mungkin tidak ada |

> 💡 **Pelajaran:** Validasi di sisi client (browser/JavaScript) hanya untuk kenyamanan pengguna. Validasi sebenarnya tetap harus dilakukan di **server**.

### 🧠 Konsep Kunci yang Dipelajari

| Konsep | Penjelasan Singkat |
|--------|--------------------|
| `function` | Blok kode yang bisa dipanggil berulang kali |
| `const` | Variabel yang nilainya tidak bisa diubah |
| `regex` | Pola untuk mencocokkan teks |
| `[ ]` | Kelas karakter dalam regex |
| `+` | Kuantifier — minimal 1 kali muncul |
| `{2,}` | Kuantifier — minimal 2 kali muncul |
| `^` dan `$` | Jangkar awal dan akhir string |
| `\.` | Escape character untuk titik literal |
| `.test()` | Method untuk menguji regex terhadap string |

---

<a name="referensi"></a>
## 📖 Referensi & Bahan Belajar

### 📚 Dokumentasi Resmi

- 🌐 [MDN — Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) — Panduan lengkap regex di JavaScript
- 🌐 [MDN — RegExp.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) — Dokumentasi method `.test()`
- 🌐 [MDN — Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) — Panduan lengkap fungsi JavaScript

### 🛠️ Tools Online

- 🔧 [Regex101](https://regex101.com) — Coba dan debug regex secara visual & interaktif *(sangat direkomendasikan untuk pemula!)*
- 🔧 [RegExr](https://regexr.com) — Alternatif Regex101 dengan penjelasan hover
- 🔧 [JSFiddle](https://jsfiddle.net) — Coba kode JavaScript langsung di browser

### 📘 Bahan Belajar Lanjutan

- 📖 [JavaScript.info — Regex](https://javascript.info/regular-expressions) — Tutorial regex berbahasa Inggris yang sangat ramah pemula
- 📖 [Eloquent JavaScript](https://eloquentjavascript.net/09_regexp.html) — Buku gratis, bab khusus Regex

---

> 💬 **Catatan Sesi:**
> Dokumentasi ini dibuat dari sesi belajar bersama AI mentor.
> Selalu praktikkan kode sendiri dan eksplorasi lebih jauh menggunakan tools di atas!

---

*📅 Dibuat: 14 Maret 2026 | ✍️ Topik: JavaScript Regex Email Validation*