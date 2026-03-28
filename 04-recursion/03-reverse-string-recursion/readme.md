# 🔄 Tantangan: Reverse String dengan Rekursi

> **Uji kemampuan rekursimu!** Dokumentasi ini memandu kamu memahami cara membalik string menggunakan pendekatan rekursif — salah satu teknik fundamental dalam pemrograman fungsional.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `reverseString` yang menerima sebuah string dan mengembalikan versi **terbalik** dari string tersebut. Pastikan kamu menggunakan **rekursi** dalam solusimu.

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan kebalikan dari sebuah string.
 * @param {string} str - String yang akan dibalik.
 * @returns {string} - Kebalikan dari string tersebut.
 */
function reverseString(str: string): string;
```

---

## 💡 Contoh Penggunaan

```js
reverseString('hello'); // harus mengembalikan 'olleh'
reverseString('world'); // harus mengembalikan 'dlrow'
reverseString('');      // harus mengembalikan ''
reverseString('a');     // harus mengembalikan 'a'
reverseString('racecar'); // harus mengembalikan 'racecar'
```

---

## 🗝️ Petunjuk

- Sebagai **base case**, kamu bisa memeriksa apakah string kosong dan mengembalikan string kosong jika demikian.
- Kamu bisa menggunakan rekursi untuk membalik string dengan **memanggil fungsi secara rekursif** menggunakan substring mulai dari karakter kedua, lalu menggabungkan karakter pertama di bagian akhir.
- Ingat bagaimana **unwinding** bekerja dan bagaimana nilai kembalian fungsi ditambahkan ke call stack dalam **urutan terbalik** dari pemanggilan fungsi.

---

## ✅ Solusi

<details>
  <summary>🔍 Klik untuk Melihat Solusi</summary>

```js
function reverseString(str) {
  if (str === '') {
    return '';
  }

  return reverseString(str.substr(1)) + str[0];
}
```

### 📖 Penjelasan

Fungsi `reverseString` menggunakan rekursi untuk membalik string.

- Jika string input **kosong** (`str === ''`), kembalikan string kosong (`''`). Jika tidak, fungsi memanggil dirinya sendiri dengan substring mulai dari karakter kedua (`str.substr(1)`) dan menggabungkan karakter pertama dari string asli di bagian akhir (`str[0]`).

Misalnya, jika inputnya adalah `'hello'`, fungsi pertama-tama memanggil dirinya sendiri dengan `'ello'` dan menggabungkan `'h'` di akhir. Kemudian ia memanggil dirinya sendiri dengan `'llo'` dan menggabungkan `'e'` di akhir. Proses ini berlanjut hingga input menjadi string kosong, lalu fungsi mulai menggabungkan karakter-karakter dalam urutan terbalik, menghasilkan string yang dibalik: `'olleh'`.

Sangat penting untuk memiliki **base case** berupa string kosong, karena tanpanya fungsi akan terus memanggil dirinya sendiri hingga kehabisan memori dan crash.

#### 🔬 Penjelasan Lebih Detail

Mari kita uraikan lebih lanjut...

1. Saat kita memanggil `reverseString('hello')`, ia mengeksekusi `reverseString('ello') + 'h'`.
2. Sekarang, `reverseString('ello')` memanggil `reverseString('llo') + 'e'`.
3. Melanjutkan, `reverseString('llo')` memanggil `reverseString('lo') + 'l'`.
4. Pada pemanggilan berikutnya, `reverseString('lo')` memanggil `reverseString('o') + 'l'`.
5. Akhirnya, `reverseString('o')` mengembalikan `'o'`.

Sekarang, kita bisa mulai **"unwinding"** rekursi dan menggabungkan karakter-karakter untuk membentuk string yang dibalik:

1. `'o' + 'l'` menghasilkan `'ol'`.
2. `'ol' + 'l'` menghasilkan `'oll'`.
3. `'oll' + 'e'` menghasilkan `'olle'`.
4. `'olle' + 'h'` menghasilkan `'olleh'`.

Jadi, fungsi menggabungkan karakter-karakter dalam **urutan terbalik** saat ia "unwind" rekursi, sehingga secara efektif membalik string asli.

Kita bahkan bisa mempersingkat solusi ini menjadi **satu baris**:

```js
// Versi lebih singkat
const reverseString = (str) =>
  str === '' ? '' : reverseString(str.substr(1)) + str.charAt(0);
```

</details>

---

## 🧪 Test Cases

```js
test('Membalik sebuah string', () => {
  expect(reverseString('Hello')).toBe('olleH');
  expect(reverseString('JavaScript')).toBe('tpircSavaJ');
  expect(reverseString('12345')).toBe('54321');
});
```