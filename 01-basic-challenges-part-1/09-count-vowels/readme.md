# 🎯 Tantangan: Hitung Huruf Vokal

> **Uji kemampuanmu** dalam memanipulasi string dengan membuat fungsi yang menghitung jumlah huruf vokal — sederhana namun fundamental!

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `countVowels` yang menerima sebuah string dan **mengembalikan jumlah huruf vokal** yang terdapat di dalam string tersebut.

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan jumlah huruf vokal dalam sebuah string.
 * @param {string} str - String yang akan diperiksa.
 * @returns {number} - Jumlah huruf vokal dalam string tersebut.
 */
function countVowels(str: string): number;
```

---

## 💡 Contoh Penggunaan

```js
countVowels('hello'); // 2
countVowels('why');   // 0
countVowels('mississippi'); // 4
```

---

## ⚠️ Batasan

- Fungsi **tidak boleh terpengaruh** oleh huruf besar atau kecil pada string input

---

## 🔍 Petunjuk

*(Coba selesaikan sendiri dulu sebelum melihat solusi!)*

<details>
  <summary>💡 Hint — Solusi 1: <code>for</code> loop klasik</summary>

- Sebelum mulai loop, ubah dulu seluruh string jadi **huruf kecil** agar kamu cukup mengecek vokal kecil saja (`a`, `e`, `i`, `o`, `u`)
- Siapkan sebuah variabel **counter** yang dimulai dari `0`
- Gunakan `for` loop biasa dengan **index** untuk mengakses tiap karakter satu per satu
- Di dalam loop, cek apakah karakter saat ini **sama dengan** salah satu huruf vokal menggunakan operator `===` dan `||`

</details>

<details>
  <summary>💡 Hint — Solusi 2: <code>for...of</code> + <code>String.includes()</code></summary>

- Daripada `toLowerCase()`, coba simpan semua vokal — **huruf kecil dan besar sekaligus** — dalam satu string
- `for...of` bisa iterasi karakter string **tanpa perlu index** sama sekali
- Untuk mengecek apakah sebuah karakter ada di dalam string, kamu bisa pakai method **`.includes()`**

</details>

<details>
  <summary>💡 Hint — Solusi 3: Regex</summary>

- JavaScript punya method **`.match()`** pada string yang bisa mencocokkan pola tertentu
- Untuk mencocokkan "salah satu dari beberapa karakter", gunakan **character class** dalam regex: `[aeiou]`
- Agar pengecekan **tidak case-sensitive**, tambahkan flag `i` pada regex-mu
- Agar regex mencari **semua kemunculan** (bukan hanya yang pertama), tambahkan flag `g`
- Perhatikan bahwa `.match()` bisa mengembalikan **`null`** — pastikan kamu menghandle kasus ini

</details>

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi 1 — Pendekatan <code>for</code> loop klasik</summary>

```js
function countVowels(str) {
  const formattedStr = str.toLowerCase();
  let count = 0;

  for (let i = 0; i < formattedStr.length; i++) {
    const char = formattedStr[i];

    if (
      char === 'a' ||
      char === 'e' ||
      char === 'i' ||
      char === 'o' ||
      char === 'u'
    ) {
      count++;
    }
  }

  return count;
}
```

### 🧠 Penjelasan

- **Ubah string menjadi huruf kecil** menggunakan `toLowerCase()`. Hal ini dilakukan agar kita bisa menghitung huruf vokal baik yang **uppercase** maupun **lowercase**.
- **Buat variabel** bernama `count` dan set nilainya ke `0`. Variabel ini digunakan untuk **melacak jumlah huruf vokal** yang telah ditemukan.
- **Buat `for` loop** yang akan mengiterasi setiap karakter dalam string. Di dalam loop, buat variabel `char` yang menyimpan karakter saat ini.
- **Periksa apakah karakter tersebut adalah huruf vokal**. Jika iya, tambahkan nilai `count` sebesar `1`. Setelah seluruh string selesai diiterasi, kembalikan nilai `count`.

</details>

---

<details>
  <summary>👆 Klik untuk Melihat Solusi 2 — Pendekatan <code>for...of</code> + <code>String.includes()</code></summary>

```js
function countVowels(inputString) {
  const vowelChars = 'aiueoAIUEO';
  let vowelCount = 0;

  for (const char of inputString) {
    if (vowelChars.includes(char)) vowelCount++;
  }

  return vowelCount;
}
```

### 🧠 Penjelasan

- **Buat string `vowelChars`** yang berisi semua huruf vokal, baik huruf kecil maupun besar. Dengan begitu, kita tidak perlu memanggil `toLowerCase()` lagi.
- **Gunakan `for...of`** untuk iterasi karakter per karakter — lebih bersih dan readable dibanding `for` loop klasik karena tidak butuh index.
- **`vowelChars.includes(char)`** mengecek apakah karakter saat ini ada di dalam string `vowelChars`. Jauh lebih ringkas dibanding menulis 5 kondisi `||` secara manual.
- Jika cocok, **increment `vowelCount`**, lalu kembalikan nilainya setelah loop selesai.

</details>

---

<details>
  <summary>👆 Klik untuk Melihat Solusi 3 — Pendekatan Regex</summary>

```js
function countVowels(inputString) {
  const matches = inputString.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
```

### 🧠 Penjelasan

- **`.match(/[aeiou]/gi)`** mencari semua huruf vokal dalam `inputString` menggunakan **regular expression**.
  - `[aeiou]` → **character class**, cocokkan salah satu dari huruf-huruf ini
  - flag `g` → **global**, cari semua kemunculan, bukan hanya yang pertama
  - flag `i` → **case-insensitive**, tidak perlu tulis `AEIOU` secara terpisah
- Hasilnya berupa **array** berisi semua vokal yang ditemukan (misal `['e', 'o', 'o']`), atau **`null`** jika tidak ada sama sekali.
- **Ternary operator** `matches ? matches.length : 0` digunakan untuk menghandle kasus `null` — jika tidak ada vokal, kembalikan `0`.

> 💡 **One-liner alternative** menggunakan **nullish coalescing operator**:
> ```js
> return (inputString.match(/[aeiou]/gi) ?? []).length;
> ```

</details>

---

## 🧪 Test Cases

```js
test('Menghitung huruf vokal dalam sebuah string', () => {
  expect(countVowels('Hello, World!')).toBe(3);
  expect(countVowels('JavaScript')).toBe(3);
  expect(countVowels('OpenAI Chatbot')).toBe(6);
  expect(countVowels('Coding Challenge')).toBe(5);
});
```