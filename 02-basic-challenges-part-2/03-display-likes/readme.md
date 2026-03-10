# 👍 Tantangan: Display Likes

> **Terjemahan dokumentasi** tantangan pemrograman *Display Likes* — menulis fungsi yang memformat siapa saja yang menyukai sebuah postingan.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `displayLikes` yang menerima sebuah array berisi nama-nama dan mengembalikan sebuah string tentang siapa yang menyukai postingan tersebut.

Fungsi ini harus mengembalikan string dengan format sebagai berikut:

- Jika **tidak ada yang menyukai**, kembalikan `'no one likes this'`
- Jika **satu orang menyukai**, kembalikan `'{name} likes this'`
- Jika **dua orang menyukai**, kembalikan `'{name1} and {name2} like this'`
- Jika **tiga orang menyukai**, kembalikan `'{name1}, {name2} and {name3} like this'`
- Jika **lebih dari tiga orang menyukai**, kembalikan `'{name1}, {name2} and {x} others like this'`

---

## ✍️ Function Signature

```js
/**
 * Mengembalikan string tentang siapa yang menyukai postingan.
 * @param {string[]} names - Nama-nama orang yang menyukai postingan.
 * @returns {string} - String tentang siapa yang menyukai postingan.
 */
function displayLikes(names: string[]): string;
```

---

## 💡 Contoh Penggunaan

```js
displayLikes([])                              // 'no one likes this'
displayLikes(['Peter'])                       // 'Peter likes this'
displayLikes(['Jacob', 'Alex'])               // 'Jacob and Alex like this'
displayLikes(['Max', 'John', 'Mark'])         // 'Max, John and Mark like this'
displayLikes(['Alex', 'Jacob', 'Mark', 'Max'])       // 'Alex, Jacob and 2 others like this'
displayLikes(['Alex', 'Jacob', 'Mark', 'Max', 'Jill']) // 'Alex, Jacob and 3 others like this'
```

---

## ⚠️ Batasan

- Array input **hanya akan berisi string**

---

## 🔍 Petunjuk

*(Coba selesaikan sendiri terlebih dahulu sebelum melihat solusi!)*

---

## ✅ Solusi

<details>
  <summary>🔓 Klik untuk Melihat Solusi</summary>

```js
function displayLikes(names) {
  const length = names.length;

  if (length === 0) {
    return 'no one likes this';
  } else if (length === 1) {
    return `${names[0]} likes this`;
  } else if (length === 2) {
    return `${names[0]} and ${names[1]} like this`;
  } else if (length === 3) {
    return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  } else {
    return `${names[0]}, ${names[1]} and ${length - 2} others like this`;
  }
}
```

### 🧠 Penjelasan

Solusi ini cukup sederhana karena hanya membutuhkan serangkaian pernyataan `if`. Kita juga bisa menggunakan `switch` statement di sini, namun akan sedikit lebih panjang.

- **Ambil panjang array** menggunakan `length`, lalu periksa apakah nilainya `0`, `1`, `2`, `3`, atau lebih. Bergantung pada panjangnya, kita kembalikan string yang sesuai.
- Jika terdapat **lebih dari 3 nama**, kita kembalikan dua nama pertama, lalu hitung `length - 2` untuk jumlah orang lainnya.

</details>

<details>
  <summary>🔓 Klik untuk Melihat Solusi Alternatif (switch statement)</summary>

```js
function displayLikes(names) {
  const length = names.length;

  switch (length) {
    case 0:
      return 'no one likes this';
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    default:
      return `${names[0]}, ${names[1]} and ${length - 2} others like this`;
  }
}
```

### 🧠 Penjelasan

Solusi ini menggunakan `switch` statement sebagai alternatif yang lebih bersih dari `if-else` berantai.

- **Ambil panjang array** menggunakan `length`, lalu gunakan `switch` untuk mencocokkan nilainya dengan setiap `case`.
- Setiap `case` merepresentasikan **satu kondisi spesifik** (0, 1, 2, atau 3 nama), sehingga alur kode lebih mudah dibaca sekilas.
- `default` case menangani kondisi ketika terdapat **lebih dari 3 nama** — menampilkan dua nama pertama dan menghitung sisanya dengan `length - 2`.
- Tidak memerlukan `break` di setiap `case` karena langsung menggunakan `return`.

</details>

---

## 🧪 Test Cases

```js
test('Display Likes', () => {
  expect(displayLikes([])).toEqual('no one likes this');
  expect(displayLikes(['Peter'])).toEqual('Peter likes this');
  expect(displayLikes(['Jacob', 'Alex'])).toEqual('Jacob and Alex like this');
  expect(displayLikes(['Max', 'John', 'Mark'])).toEqual(
    'Max, John and Mark like this'
  );
  expect(displayLikes(['Alex', 'Jacob', 'Mark', 'Max'])).toEqual(
    'Alex, Jacob and 2 others like this'
  );
  expect(displayLikes(['Alex', 'Jacob', 'Mark', 'Max', 'Jill'])).toEqual(
    'Alex, Jacob and 3 others like this'
  );
});
```