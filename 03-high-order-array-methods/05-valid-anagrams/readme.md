# 🧩 Tantangan: Valid Anagrams

> **Uji kemampuanmu** dalam memanipulasi string dan menghitung frekuensi karakter untuk menentukan apakah dua string merupakan anagram yang valid satu sama lain.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `validAnagrams` yang menerima **dua string** dan menentukan apakah keduanya merupakan anagram yang valid satu sama lain. Anagram adalah kata atau frasa yang dibentuk dengan **menyusun ulang huruf-huruf** dari kata atau frasa lain, biasanya menggunakan semua huruf aslinya tepat satu kali.

---

## ✍️ Function Signature

```js
/**
 * Menentukan apakah dua string merupakan anagram yang valid.
 * @param {string} str1 - String pertama.
 * @param {string} str2 - String kedua.
 * @returns {boolean} - True jika kedua string adalah anagram yang valid, false jika tidak.
 */
function validAnagrams(str1: string, str2: string): boolean;
```

---

## 💡 Contoh Penggunaan

```js
validAnagrams('listen', 'silent');         // true
validAnagrams('hello', 'world');           // false
validAnagrams('astronomer', 'moonstarer'); // true
```

---

## 🔍 Petunjuk

- **Pecah** string menjadi array karakter, lalu hitung frekuensi kemunculan setiap karakter
- **Bandingkan** frekuensi karakter dari kedua string tersebut

---

## ✅ Solusi

### 1️⃣ Versi Dua `reduce` + `Object.keys`

> Pendekatan **functional** — menggunakan dua frequency object yang dibandingkan via `Object.keys`.

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function validAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freqCount1 = str1.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const freqCount2 = str2.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(freqCount1).every(
    (char) => freqCount1[char] === freqCount2[char]
  );
}
```

### 🧠 Penjelasan

- Pengecekan `str1.length !== str2.length` di awal memastikan **early exit** jika panjang string berbeda.
- `freqCount1` dan `freqCount2` masing-masing menyimpan **frekuensi karakter** dari `str1` dan `str2` menggunakan `reduce`.
- `Object.keys(freqCount1).every(...)` memastikan setiap karakter di `freqCount1` memiliki frekuensi yang **sama persis** di `freqCount2`.

</details>

---

### 2️⃣ Versi `for...of` Semua

> Pendekatan **imperative** — menggunakan dua loop `for...of` dengan **early exit** saat karakter tidak cocok.

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function validAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = {};

  for (const char of str1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

### 🧠 Penjelasan

- Hanya menggunakan **satu object** `freq` — lebih hemat memori dibanding versi dua `reduce`.
- Loop pertama **menambah** counter untuk setiap karakter di `str1`.
- Loop kedua **mengurangi** counter untuk setiap karakter di `str2` — jika karakter tidak ditemukan atau sudah habis (`0`/`falsy`), langsung `return false` tanpa menyelesaikan seluruh iterasi.

</details>

---

### 3️⃣ Versi `reduce` + `for...of`

> Pendekatan **hybrid** — menggabungkan `reduce` untuk membangun frequency map dan `for...of` untuk decrement dengan early exit.

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
function validAnagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const freq = [...str1].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  for (const char of str2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

### 🧠 Penjelasan

- `[...str1].reduce(...)` membangun frequency map dari `str1` secara **declarative**.
- Loop `for...of` pada `str2` melakukan decrement dengan **early exit** — menggabungkan keunggulan gaya functional dan imperative.

</details>

---

### 4️⃣ Versi `sort`

> Pendekatan **paling ringkas** — mengurutkan karakter kedua string lalu membandingkannya langsung.

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

```js
const validAnagrams = (str1, str2) => {
  if (str1.length !== str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('');
};
```

### 🧠 Penjelasan

- `split('')` memecah string menjadi array karakter, `sort()` mengurutkannya secara alfabetis, dan `join('')` menggabungkannya kembali menjadi string.
- Jika kedua string adalah anagram, hasil `sort` keduanya akan **identik**.
- Paling mudah dibaca, namun kompleksitasnya **O(n log n)** karena proses sorting — lebih lambat dibanding versi frequency counter yang **O(n)**.

</details>

---

## 📊 Perbandingan Semua Versi

| | Versi 1 (`reduce` + `Object.keys`) | Versi 2 (`for...of` semua) | Versi 3 (`reduce` + `for...of`) | Versi 4 (`sort`) |
|---|---|---|---|---|
| **Readability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Kompleksitas** | O(n) | O(n) | O(n) | O(n log n) |
| **Memory** | O(n) × 2 | O(n) | O(n) | O(n) |
| **Early exit** | ✅ | ✅ | ✅ | ❌ |
| **Gaya** | Functional | Imperative | Hybrid | Functional |

---

## 🧪 Test Cases

```js
test('Memeriksa Valid Anagrams', () => {
  expect(validAnagrams('listen', 'silent')).toBe(true);
  expect(validAnagrams('hello', 'world')).toBe(false);
  expect(validAnagrams('astronomer', 'moonstarer')).toBe(true);
  expect(validAnagrams('apple', 'banana')).toBe(false);
});
```