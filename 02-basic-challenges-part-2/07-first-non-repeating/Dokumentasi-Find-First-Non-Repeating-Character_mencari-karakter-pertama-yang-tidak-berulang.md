# 🔤 Catatan Belajar: Find First Non-Repeating Character

> 📝 **Catatan pribadi** — dokumentasi ini dibuat dari video tutorial + kode latihan.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🤔 [Apa Masalah yang Mau Diselesaikan?](#masalah)
- 🏗️ [Solusi 1 — Pakai Object](#solusi-object)
- ⚠️ [Jebakan yang Sering Terjadi](#jebakan)
- 🗺️ [Solusi 2 — Pakai Map](#solusi-map)
- 🧪 [Test Cases](#test-cases)
- 📌 [Ringkasan](#ringkasan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini mirip banget sama challenge sebelumnya (cek semua karakter unik). Bedanya, kali ini kita mau **cari karakter pertama yang tidak berulang** dalam sebuah string.

Pendekatan yang dipakai juga mirip: kita gunakan **object** atau **Map** untuk menghitung berapa kali setiap karakter muncul di string.

---

<a name="masalah"></a>
## 🤔 Apa Masalah yang Mau Diselesaikan?

Diberikan sebuah string, temukan **karakter pertama yang hanya muncul satu kali**.

Beberapa contoh:

| Input | Output | Alasan |
|-------|--------|--------|
| `'aabccdeff'` | `'b'` | `a` dan `c` berulang, `b` adalah yang pertama tidak berulang |
| `'aabbcc'` | `null` | Semua karakter berulang |
| `'abcdef'` | `'a'` | Semua unik, jadi `a` adalah yang pertama |

> 🔔 **Aturan input:** String hanya mengandung huruf kecil dan spasi.

---

<a name="solusi-object"></a>
## 🏗️ Solusi 1 — Pakai Object

### Langkah 1: Hitung kemunculan setiap karakter

Pertama, kita buat objek `charCount` untuk menyimpan berapa kali tiap karakter muncul.

```javascript
const charCount = {};

for (const char of str) {
  charCount[char] = (charCount[char] || 0) + 1;
}
```

**Cara bacanya:**
- Kalau karakter belum ada di objek → `charCount[char]` bernilai `undefined`, maka hasilnya `0 + 1 = 1`
- Kalau sudah ada → nilainya di-increment jadi `2`, `3`, dst.

Misalnya kita masukkan string `'programming'`, objeknya akan terbentuk seperti ini:

```
{
  p: 1,
  r: 2,  ← 'r' muncul 2 kali
  o: 1,
  g: 2,  ← 'g' muncul 2 kali
  a: 1,
  m: 2,  ← 'm' muncul 2 kali
  i: 1,
  n: 1
}
```

### Langkah 2: Cari karakter pertama yang count-nya = 1

Setelah objek selesai dibuat, **baru** kita loop lagi untuk cari yang pertama.

```javascript
for (const char of str) {
  if (charCount[char] === 1) {
    return char;
  }
}

return null; // kalau tidak ada yang non-repeating
```

### Kode Lengkap (Object)

```javascript
function findFirstNonRepeatingCharacter(str) {
  const charCount = {};

  // Loop 1: hitung semua karakter dulu
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Loop 2: cari yang pertama count-nya = 1
  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null;
}
```

---

<a name="jebakan"></a>
## ⚠️ Jebakan yang Sering Terjadi

> 💡 **Ini penting banget!** Jangan taruh kondisi `if` di dalam loop pertama!

Kalau kita taruh pengecekan di loop yang sama dengan penghitungan, hasilnya akan **salah**. Misalnya untuk string `'aabbc'`:

```javascript
// ❌ SALAH — jangan lakukan ini!
for (const char of str) {
  charCount[char] = (charCount[char] || 0) + 1;

  if (charCount[char] === 1) {
    return char; // akan return 'a' padahal 'a' sebenarnya berulang!
  }
}
```

**Kenapa salah?** Karena pas kita pertama ketemu `'a'`, hitungannya memang `1`. Tapi kita belum tahu bahwa `'a'` akan muncul lagi di iterasi berikutnya. Jadi kita langsung return padahal seharusnya tidak.

**Solusinya:** Pisahkan menjadi **dua loop** — loop pertama buat hitung semua, baru loop kedua untuk cek.

---

<a name="solusi-map"></a>
## 🗺️ Solusi 2 — Pakai Map

Cara kerja `Map` mirip sekali dengan object, tapi menggunakan method `.set()` dan `.get()`.

```javascript
function findFirstNonRepeatingCharacter(str) {
  const charCount = new Map();

  // Loop 1: hitung semua karakter pakai Map
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Loop 2: cari yang pertama count-nya = 1
  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }

  return null;
}
```

**Perbedaan syntax Object vs Map:**

| Operasi | Object | Map |
|---------|--------|-----|
| Set nilai | `obj[key] = value` | `map.set(key, value)` |
| Get nilai | `obj[key]` | `map.get(key)` |
| Buat baru | `{}` | `new Map()` |

> 📌 Kalau Map masih terasa asing, jangan khawatir. Kedua solusi ini menghasilkan output yang sama persis. Map akan dibahas lebih dalam di materi selanjutnya.

---

<a name="test-cases"></a>
## 🧪 Test Cases

```javascript
test('Find First Non-Repeating Character', () => {
  expect(findFirstNonRepeatingCharacter('aabccdeff')).toBe('b');
  expect(findFirstNonRepeatingCharacter('aabbcc')).toBe(null);
  expect(findFirstNonRepeatingCharacter('hello world')).toBe('h');
});
```

Penjelasan tiap test:
- `'aabccdeff'` → `a` berulang, `b` **tidak** → return `'b'` ✅
- `'aabbcc'` → semua berulang → return `null` ✅
- `'hello world'` → `h` hanya muncul sekali → return `'h'` ✅

---

<a name="ringkasan"></a>
## 📌 Ringkasan

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| **charCount** | Object/Map untuk menghitung frekuensi tiap karakter |
| **`(charCount[char] \|\| 0) + 1`** | Trik untuk increment nilai, dimulai dari 0 jika belum ada |
| **Dua loop terpisah** | Loop 1 untuk hitung, Loop 2 untuk cari — urutan ini **wajib**! |
| **return null** | Dipanggil kalau tidak ada karakter yang non-repeating |

> ✨ **Intinya:** Kumpulkan data dulu (loop 1), baru analisis (loop 2). Jangan digabung!