# 🔁 Tantangan: Palindrome

> **Palindrome** adalah kata, frasa, angka, atau urutan karakter lain yang terbaca sama baik dari depan maupun dari belakang. Contoh palindrome adalah **"madam"**.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `isPalindrome` yang menerima sebuah string dan mengembalikan `true` jika string tersebut adalah palindrome, dan `false` jika bukan.

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan true jika string adalah palindrome.
 * @param {string} str - String yang akan diperiksa.
 * @returns {boolean} - True jika string adalah palindrome, false jika tidak.
 */
function isPalindrome(str: string): boolean;
```

---

### 💡 Contoh Penggunaan

```js
isPalindrome('madam')   // true
isPalindrome('racecar') // true
isPalindrome('hello')   // false
isPalindrome('')        // true
```

---

### ⚠️ Batasan

- String input hanya akan mengandung **huruf kecil** dan **spasi**
- Fungsi harus **mengabaikan spasi** saat memeriksa apakah string adalah palindrome

---

### 🔎 Petunjuk

- Kamu bisa menyelesaikan ini dengan cara yang mirip dengan tantangan *reverse string*, ditambah beberapa langkah tambahan.
- Ingat, kamu ingin **menghapus semua karakter non-alfanumerik** dari string sebelum membandingkannya dengan string yang dibalik. Ada banyak cara untuk melakukan ini, tetapi salah satunya adalah menggunakan method `replace` dengan regular expression `/[^a-z0-9]/g`.

---

## ✅ Solusi

<details>
  <summary>🔓 Klik untuk Solusi 1</summary>

Menggunakan `replace` dengan regular expression adalah cara termudah untuk menyelesaikan tantangan ini.

```js
function isPalindrome(str) {
  const formattedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = formattedStr.split('').reverse().join('');
  return formattedStr === reversedStr;
}
```

### 📖 Penjelasan

- Ambil string input dan ubah menjadi **huruf kecil** menggunakan `toLowerCase`.
- Gunakan method `replace` dengan regular expression untuk **menghapus semua karakter non-alfanumerik** dari string. Dengan begitu kita bisa membandingkan string tanpa khawatir soal spasi atau tanda baca, seperti `'racecar'` dan `'race car'`.
- Simpan hasilnya ke dalam variabel bernama `formattedStr`.
- **Balik string** tersebut, sama seperti yang kita lakukan di tantangan sebelumnya.
- Bandingkan string asli dengan string yang sudah dibalik dan kembalikan hasilnya. Jika palindrome, keduanya akan **sama**, sehingga kita mengembalikan `true`. Jika bukan palindrome, keduanya akan **berbeda**, sehingga kita mengembalikan `false`.

</details>

<details>
  <summary>🔓 Klik untuk Solusi 2</summary>

Jika kamu tidak ingin menggunakan regular expression untuk menghapus karakter non-alfanumerik, ada beberapa cara lain untuk melakukannya. Kita akan membuat beberapa **fungsi pembantu (helper functions)** agar lebih mudah.

```js
function isPalindrome(str) {
  const formattedStr = removeNonAlphanumeric(str.toLowerCase());
  const reversedStr = reverseString(formattedStr);
  return formattedStr === reversedStr;
}

function removeNonAlphanumeric(str) {
  let formattedStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (isAlphaNumeric(char)) {
      formattedStr += char;
    }
  }
  return formattedStr;
}

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // Angka 0-9
    (code >= 97 && code <= 122)   // Huruf kecil a-z
  );
}

function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
```

### 📖 Penjelasan

Solusi ini sedikit lebih kompleks.

- Buat fungsi pembantu bernama `removeNonAlphanumeric` yang menerima sebuah string dan mengembalikan string baru dengan **semua karakter non-alfanumerik dihapus**. Kita melakukan ini dengan melakukan perulangan pada string dan memeriksa setiap karakter menggunakan fungsi pembantu lain bernama `isAlphaNumeric`.

- Di dalam fungsi `isAlphaNumeric`, kita menggunakan method `charCodeAt` untuk mendapatkan **kode karakter** dari setiap karakter. Kemudian kita memeriksa apakah kode karakter tersebut berada di antara `48` dan `57` (rentang untuk angka 0–9), atau antara `97` dan `122` (rentang untuk huruf kecil a–z). Jika ya, kita kembalikan `true`. Jika tidak, kita kembalikan `false`.

- Setelah mendapatkan string yang hanya berisi karakter alfanumerik, kita bisa **membaliknya** dan membandingkan dengan string asli untuk memeriksa apakah itu palindrome.

</details>

<details>
  <summary>🔓 Klik untuk Solusi 3</summary>

Pendekatan **two-pointer** (dua penunjuk) — memeriksa karakter dari kedua ujung string secara bersamaan tanpa perlu membalik string terlebih dahulu. Cara ini lebih **efisien memori** karena tidak membuat salinan string yang dibalik.

```js
function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {
    const leftChar = normalizedStr[i];
    const rightChar = normalizedStr[normalizedStr.length - 1 - i];
    if (leftChar !== rightChar) return false;
  }
  return true;
}
```

### 📖 Penjelasan

- Normalisasi string terlebih dahulu dengan `toLowerCase` dan `replace` untuk menghapus karakter non-alfanumerik, lalu simpan ke `normalizedStr`.
- Lakukan perulangan hanya sampai **pertengahan string** (`Math.floor(normalizedStr.length / 2)`) — tidak perlu memeriksa semua karakter.
- Di setiap iterasi, ambil `leftChar` dari **kiri** (indeks `i`) dan `rightChar` dari **kanan** (indeks `normalizedStr.length - 1 - i`).
- Jika `leftChar !== rightChar` di posisi mana pun, langsung kembalikan `false` — string **bukan** palindrome.
- Jika perulangan selesai tanpa menemukan ketidakcocokan, kembalikan `true` — string **adalah** palindrome.

</details>

---

## 🧪 Test Cases

```js
test('Memeriksa string palindrome', () => {
  expect(isPalindrome('racecar')).toBe(true);
  expect(isPalindrome('Hello')).toBe(false);
  expect(isPalindrome('A man, a plan, a canal, Panama')).toBe(true);
  expect(isPalindrome('12321')).toBe(true);
});
```