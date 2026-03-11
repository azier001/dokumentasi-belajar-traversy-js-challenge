# 🔍 Tantangan: Temukan Huruf yang Hilang

> **Dokumentasi ini menjelaskan cara membuat fungsi untuk menemukan huruf yang hilang dalam sebuah array huruf berurutan.**

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `findMissingLetter` yang menerima sebuah array berisi huruf-huruf **berurutan (meningkat)** sebagai input, dan mengembalikan **huruf yang hilang** dari array tersebut.

### ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan huruf yang hilang dalam array huruf berurutan.
 * @param {string[]} arr - Array berisi huruf-huruf berurutan.
 * @returns {string} - Huruf yang hilang.
 */
function findMissingLetter(arr: string[]): string;
```

---

### 💡 Contoh Penggunaan

```js
findMissingLetter(['a', 'b', 'c', 'd', 'f']); // => "e"
findMissingLetter(['O', 'Q', 'R', 'S']);        // => "P"
findMissingLetter(['t', 'u', 'v', 'w', 'x', 'z']); // => "y"
```

---

### ⚠️ Batasan

- Array input hanya akan berisi huruf dalam **satu jenis huruf** (huruf kecil semua atau huruf besar semua)
- Jika array **tidak berisi huruf apapun**, kembalikan string kosong `""`

---

### 🗒️ Petunjuk

- Kamu bisa menyimpan **seluruh alfabet dalam sebuah string** dan menggunakan method `indexOf` untuk mendapatkan indeks suatu huruf dalam string alfabet tersebut.
- Pendekatan lain adalah menggunakan method `charCodeAt` untuk mendapatkan **nilai unicode** dari sebuah huruf.

---

## 🧩 Solusi

<details>
  <summary>👆 Klik untuk Solusi 1</summary>

```js
function findMissingLetter(arr) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const startIndex = alphabet.indexOf(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== alphabet[startIndex + i]) {
      return alphabet[startIndex + i];
    }
  }

  return '';
}
```

### 📖 Penjelasan

- Deklarasikan variabel `alphabet` dan isi dengan string yang berisi **semua huruf alfabet**.
- Deklarasikan variabel `startIndex` dan isi dengan **indeks huruf pertama** dari array input di dalam string `alphabet`.
- **Iterasi** melalui array input dan periksa apakah huruf saat ini di array input **tidak sama** dengan huruf pada indeks yang sesuai di string `alphabet`.
- Jika **tidak sama**, kembalikan huruf pada indeks tersebut dari string `alphabet`.
- Jika sudah mencapai **akhir loop** tanpa mengembalikan apapun, kembalikan string kosong `""`.

</details>

<details>
  <summary>👆 Klik untuk Solusi 2</summary>

```js
function findMissingLetter(arr) {
  let start = arr[0].charCodeAt(0);

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i].charCodeAt(0);

    if (current - start > 1) {
      return String.fromCharCode(start + 1);
    }

    start = current;
  }

  return '';
}
```

### 📖 Penjelasan

- Deklarasikan variabel `start` dan isi dengan **kode ASCII** dari huruf pertama array input menggunakan `charCodeAt`.
- **Iterasi** melalui array input dan periksa apakah **selisih kode ASCII** huruf saat ini dengan huruf sebelumnya lebih besar dari `1`.
- Jika iya, kembalikan huruf yang nilainya **satu lebih besar** dari huruf sebelumnya menggunakan `String.fromCharCode`.
- Jika sudah mencapai **akhir loop** tanpa mengembalikan apapun, kembalikan string kosong `""`.

</details>

<details>
  <summary>👆 Klik untuk Solusi 3</summary>

```js
function findMissingLetter(arr) {
  for (let i = 1; i < arr.length; i++) {
    const previousCharCode = arr[i - 1].charCodeAt(0);
    const currentCharCode = arr[i].charCodeAt(0);
    const expectedNextCharCode = previousCharCode + 1;

    // jika huruf sekarang tidak sama dengan huruf yang seharusnya
    if (currentCharCode !== expectedNextCharCode) {
      return String.fromCharCode(expectedNextCharCode);
    }
  }
  
  return '';
}
```

### 📖 Penjelasan

- **Iterasi** mulai dari indeks `1`, lalu ambil kode ASCII huruf **sebelumnya** (`previousCharCode`) dan huruf **saat ini** (`currentCharCode`).
- Hitung **kode ASCII yang seharusnya** muncul berikutnya dengan `previousCharCode + 1` dan simpan ke `expectedNextCharCode`.
- Jika huruf saat ini **tidak sama** dengan yang seharusnya, kembalikan huruf dari `expectedNextCharCode` menggunakan `String.fromCharCode`.
- Jika sudah mencapai **akhir loop** tanpa mengembalikan apapun, kembalikan string kosong `""`.

</details>

---

## 🧪 Test Cases

```js
test('Find Missing Letter', () => {
  expect(findMissingLetter(['a', 'b', 'c', 'e'])).toBe('d');
  expect(findMissingLetter(['X', 'Z'])).toBe('Y');
  expect(findMissingLetter(['m', 'n', 'o', 'q', 'r'])).toBe('p');
  expect(findMissingLetter(['F', 'G', 'H', 'J'])).toBe('I');
});
```