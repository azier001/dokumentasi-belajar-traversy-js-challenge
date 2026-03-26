# 🔍 Tantangan: Refactor `findMissingLetter`

> **Tugas:** Implementasi ulang fungsi `findMissingLetter` yang menerima array huruf berurutan dan mengembalikan huruf yang hilang — kali ini menggunakan **higher-order array methods**.

---

## 📋 Instruksi

Pada bagian sebelumnya, kita telah membuat fungsi bernama `findMissingLetter` yang menerima array **huruf berurutan (meningkat)** sebagai input dan mengembalikan huruf yang hilang dari array tersebut.

Sekarang kita akan melakukan hal yang sama menggunakan **higher-order array methods**. Hal ini bisa dilakukan dengan menggunakan `map`, `filter`, `reduce`, atau `forEach`.

---

## ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan huruf yang hilang dalam array huruf berurutan.
 * @param {string[]} arr - Array huruf-huruf berurutan.
 * @returns {string} - Huruf yang hilang.
 */
function findMissingLetter(arr: string[]): string;
```

---

## 💡 Contoh Penggunaan

```js
findMissingLetter(['a', 'b', 'c', 'd', 'f']); // => "e"
findMissingLetter(['O', 'Q', 'R', 'S']);       // => "P"
findMissingLetter(['t', 'u', 'v', 'w', 'x', 'z']); // => "y"
```

---

## ⚠️ Batasan

- Array input **selalu mengandung minimal dua huruf**
- Array input **hanya mengandung huruf dalam satu jenis huruf** (huruf kecil atau huruf besar)
- **Gunakan hanya higher-order array methods. Penggunaan `for` loop tidak diperbolehkan.**

---

## 🗝️ Petunjuk

- Kamu bisa menggunakan `map` untuk mendapatkan array berisi kode unicode (menggunakan `charCodeAt`) dari huruf-huruf dalam array input, lalu gunakan `find` untuk menemukan kode karakter yang hilang.
- Kamu juga bisa menggunakan `filter` maupun `reduce`.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Solusi 1 — menggunakan <code>map</code> dan <code>find</code></summary>

Solusi ini menggunakan method `map` dan `find`.

```js
function findMissingLetter(arr) {
  let start = arr[0].charCodeAt(0);
  const missingCharCode = arr
    .slice(1)
    .map((char) => char.charCodeAt(0))
    .find((current) => {
      if (current - start > 1) {
        return true;
      }
      start = current;
      return false;
    });
  return missingCharCode ? String.fromCharCode(missingCharCode - 1) : '';
}
```

### 📖 Penjelasan

- Deklarasikan variabel `start` dan assign nilai kode ASCII dari **huruf pertama** dalam array input.
- Deklarasikan variabel `missingCharCode` dan assign hasil pemanggilan method `map` pada array input. Fungsi callback yang diteruskan ke method `map` menerima sebuah huruf dan mengembalikan **kode ASCII** dari huruf tersebut.
- Panggil method `find` pada hasil `map`. Fungsi callback yang diteruskan ke `find` menerima kode ASCII saat ini dan memeriksa apakah **selisih antara kode ASCII saat ini dan sebelumnya lebih dari 1**. Jika iya, mengembalikan `true`. Jika tidak, mengembalikan `false`.
- Jika method `find` mengembalikan nilai **truthy**, kita kembalikan huruf yang nilainya satu kurang dari huruf saat ini.
- Jika method `find` mengembalikan nilai **falsy**, kita kembalikan **string kosong**.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 2 — menggunakan <code>filter</code></summary>

Solusi ini menggunakan method `filter`.

```js
function findMissingLetter(arr) {
  const missingCharCode = arr.filter((char, index) => {
    if (index === 0) return false;
    const prevCharCode = arr[index - 1].charCodeAt(0);
    const currentCharCode = char.charCodeAt(0);
    return currentCharCode - prevCharCode > 1;
  })[0];

  return missingCharCode
    ? String.fromCharCode(missingCharCode.charCodeAt(0) - 1)
    : '';
}
```

### 📖 Penjelasan

- Deklarasikan variabel `missingCharCode` dan assign hasil pemanggilan method `filter` pada array input.
- Fungsi callback yang diteruskan ke `filter` menerima sebuah huruf beserta **indeks**-nya, lalu memeriksa apakah huruf saat ini adalah huruf pertama dalam array. Jika iya, mengembalikan `false`. Jika tidak, memeriksa apakah **selisih kode ASCII huruf saat ini dengan kode ASCII huruf sebelumnya lebih dari 1**. Jika iya, mengembalikan `true`. Jika tidak, mengembalikan `false`.
- Jika method `filter` mengembalikan array dengan **panjang lebih dari 0**, kita kembalikan huruf yang nilainya satu kurang dari huruf saat ini.
- Jika method `filter` mengembalikan **array kosong**, kita kembalikan string kosong.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 3 — menggunakan <code>reduce</code></summary>

Solusi ini menggunakan method `reduce`.

```js
function findMissingLetter(arr) {
  let start = arr[0].charCodeAt(0);
  const missingCharCode = arr.reduce((missing, char) => {
    const current = char.charCodeAt(0);
    if (current - start > 1 && missing === null) {
      missing = start + 1;
    }
    start = current;
    return missing;
  }, null);
  return missingCharCode ? String.fromCharCode(missingCharCode) : '';
}
```

### 📖 Penjelasan

- Deklarasikan variabel `start` dan assign nilai kode ASCII dari **huruf pertama** dalam array input.
- Deklarasikan variabel `missingCharCode` dan assign hasil pemanggilan method `reduce` pada array input. Fungsi callback menerima sebuah **accumulator** dan sebuah huruf. Accumulator menyimpan kode ASCII yang hilang. Callback memeriksa apakah **selisih kode ASCII saat ini dengan sebelumnya lebih dari 1** dan apakah accumulator bernilai `null`. Jika iya, kode ASCII yang hilang di-assign ke accumulator. Kemudian nilai kode ASCII saat ini di-assign ke variabel `start`, lalu accumulator dikembalikan.
- Jika method `reduce` mengembalikan nilai **truthy**, kita kembalikan huruf yang sesuai dengan kode ASCII tersebut.
- Jika method `reduce` mengembalikan nilai **falsy**, kita kembalikan **string kosong**.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 4 — <code>find</code> one-pass (lebih ringkas dari Solusi 1)</summary>

Solusi ini menggunakan method `find` secara langsung tanpa `slice` atau `map` terlebih dahulu.

```js
const findMissingLetter = (arr) => {
  const found = arr.find((char, i) => {
    const current = char.charCodeAt(0);
    const next = arr[i + 1]?.charCodeAt(0);

    return next - current > 1;
  });

  return found ? String.fromCharCode(found.charCodeAt(0) + 1) : '';
}
```

### 📖 Penjelasan

- Panggil method `find` langsung pada array input tanpa transformasi awal.
- Fungsi callback menerima **huruf saat ini** dan **indeks**-nya, lalu mengambil kode ASCII huruf saat ini (`current`) dan huruf berikutnya (`next`) menggunakan **optional chaining** `?.`.
- Jika selisih `next - current` lebih dari 1, berarti ada huruf yang hilang di antara keduanya — `find` mengembalikan huruf saat ini (`found`).
- Pada iterasi **terakhir**, `arr[i + 1]` bernilai `undefined`, sehingga `next - current` menghasilkan `NaN`. Karena `NaN > 1` adalah `false`, iterasi terakhir **aman** tanpa pengecekan tambahan.
- Return `found.charCodeAt(0) + 1` karena `found` adalah huruf **sebelum** yang hilang, bukan huruf yang hilang itu sendiri.

> 💡 **Keunggulan dibanding Solusi 1:** Tidak membutuhkan `slice`, `map`, maupun variabel eksternal `let start` — sehingga lebih ringkas dan mudah dibaca.

</details>

---

<details>
  <summary>👆 Klik untuk Solusi 5 — <code>reduce</code> one-pass (lebih ringkas dari Solusi 3)</summary>

Solusi ini menggunakan method `reduce` tanpa variabel eksternal di luar scope-nya.

```js
const findMissingLetter = (arr) => {
  const result = arr.reduce((acc, char, i) => {
    if (acc) return acc;

    const current = char.charCodeAt(0);
    const next = arr[i + 1]?.charCodeAt(0);

    if (next - current > 1) {
      return current + 1;
    }

    return acc;
  }, null);

  return result ? String.fromCharCode(result) : '';
};
```

### 📖 Penjelasan

- Panggil method `reduce` dengan nilai awal accumulator `null`.
- Di awal setiap iterasi, cek apakah `acc` sudah terisi. Jika iya, **langsung kembalikan `acc`** tanpa komputasi lebih lanjut — ini adalah teknik **short-circuit** untuk menghindari proses yang tidak perlu setelah jawaban ditemukan.
- Ambil kode ASCII huruf saat ini (`current`) dan huruf berikutnya (`next`) menggunakan **optional chaining** `?.`.
- Jika selisih `next - current` lebih dari 1, simpan `current + 1` (kode ASCII huruf yang hilang) ke dalam accumulator.
- Di akhir, konversi hasil accumulator ke huruf menggunakan `String.fromCharCode`.

> 💡 **Keunggulan dibanding Solusi 3:** Tidak membutuhkan variabel `let start` di luar scope `reduce`, sehingga **state sepenuhnya terkapsul** di dalam fungsi.

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