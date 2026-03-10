# 🔢 Find The Missing Number — Catatan Belajar Pribadi

---

## 📋 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🧩 [Memahami Masalahnya](#memahami-masalah)
- 💡 [Ide Solusi: Gauss Formula](#gauss-formula)
- 🏗️ [Langkah-Langkah Penyelesaian](#langkah-langkah)
- 🔁 [Solusi 1: Pakai For Loop](#solusi-for-loop)
- ⚡ [Solusi 2: Pakai Reduce](#solusi-reduce)
- ✅ [Testing](#testing)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Tantangannya adalah: **temukan angka yang hilang** dari sebuah array.

Kita punya array berisi angka unik dari `1` sampai `n`, tapi **satu angka hilang**. Tugas kita adalah menemukan angka mana yang tidak ada.

**Contoh:**

```js
findMissingNumber([1, 2, 3, 4, 6, 7, 8, 9, 10]); // → 5
```

Angka 5 tidak ada di array, jadi function harus mengembalikan `5`.

> **Catatan khusus:** Kalau array-nya kosong `[]`, kembalikan `1`. Kalau tidak ada input (`undefined`), kembalikan `undefined`.

---

<a name="memahami-masalah"></a>
## 🧩 Memahami Masalahnya

Angka-angka di dalam array **tidak harus berurutan** — bisa acak, yang penting salah satu angka hilang.

```js
findMissingNumber([10, 8, 6, 7, 5, 4, 2, 3, 1]); // → 9
findMissingNumber([10, 5, 1, 2, 4, 6, 8, 3, 9]); // → 7
findMissingNumber([]);                             // → 1
```

---

<a name="gauss-formula"></a>
## 💡 Ide Solusi: Gauss Formula

Trik utamanya adalah: **bandingkan jumlah yang seharusnya vs jumlah yang ada**.

Kalau kita tahu berapa total seharusnya semua angka dari 1 sampai n, lalu kita kurangi dengan total yang ada di array... **selisihnya adalah angka yang hilang!**

Nah, untuk menghitung total dari 1 sampai n tanpa harus menjumlahkan satu-satu, kita pakai **Gauss Formula**:

$$\text{Total} = \frac{n \times (n + 1)}{2}$$

**Contoh verifikasi:**
- Angka 1 sampai 10: `1 + 2 + 3 + ... + 10 = 55`
- Pakai rumus: `10 × (10 + 1) / 2 = 10 × 11 / 2 = 55` ✅

```
💡 n di sini = panjang array + 1
   Kenapa +1? Karena kita tahu ada satu angka yang hilang,
   jadi jumlah angka aslinya = panjang array + 1.
```

---

<a name="langkah-langkah"></a>
## 🏗️ Langkah-Langkah Penyelesaian

Sebelum nulis kode, mari kita susun rencananya:

1. **Cek** apakah input `undefined` → return `undefined`
2. **Cek** apakah array kosong → return `1`
3. Hitung **`n`** = `arr.length + 1`
4. Hitung **`expectedSum`** = total yang seharusnya ada (pakai Gauss Formula)
5. Hitung **`actualSum`** = total yang benar-benar ada di array
6. Return **`expectedSum - actualSum`** = angka yang hilang 🎯

---

<a name="solusi-for-loop"></a>
## 🔁 Solusi 1: Pakai For Loop

Cara pertama yang lebih familiar untuk pemula — pakai `for` loop biasa untuk menjumlahkan semua angka di array.

```js
function findMissingNumber(arr) {
  // Kalau tidak ada input sama sekali
  if (arr === undefined) {
    return undefined;
  }

  // Kalau array kosong, angka yang hilang pasti 1
  if (arr.length === 0) {
    return 1;
  }

  // n = jumlah angka yang seharusnya ada
  const n = arr.length + 1;

  // Hitung total yang seharusnya ada (pakai Gauss Formula)
  const expectedSum = (n * (n + 1)) / 2;

  // Hitung total yang benar-benar ada di array
  let actualSum = 0;
  for (let i = 0; i < arr.length; i++) {
    actualSum += arr[i]; // tambahkan tiap angka ke actualSum
  }

  // Selisihnya = angka yang hilang
  return expectedSum - actualSum;
}
```

**Cara kerjanya step by step:**

Misalnya array-nya `[1, 2, 3, 5]`:
- `n = 4 + 1 = 5`
- `expectedSum = 5 × 6 / 2 = 15` (total 1+2+3+4+5)
- `actualSum = 1 + 2 + 3 + 5 = 11`
- `return 15 - 11 = 4` ✅

---

<a name="solusi-reduce"></a>
## ⚡ Solusi 2: Pakai Reduce

Cara kedua adalah pakai method `reduce()` — ini cara yang lebih ringkas. Method ini akan dibahas lebih dalam di section berikutnya, tapi berikut gambaran singkatnya.

```js
function findMissingNumber(arr) {
  if (arr === undefined) {
    return undefined;
  }

  if (arr.length === 0) {
    return 1;
  }

  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;

  // Pakai reduce untuk menjumlahkan semua angka di array
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  //                            ↑               ↑        ↑
  //                        accumulator   angka saat ini  nilai awal

  return expectedSum - actualSum;
}
```

**Cara membaca `reduce`:**
- `sum` = akumulator (angka yang terus bertambah)
- `num` = angka di tiap iterasi
- `0` = nilai awal dari `sum`
- Setiap iterasi: `sum = sum + num`

Hasilnya sama persis dengan for loop, hanya lebih ringkas ditulis dalam satu baris.

---

<a name="testing"></a>
## ✅ Testing

Test case yang dipakai untuk memverifikasi function ini bekerja dengan benar:

```js
test('Finding the missing number', () => {
  expect(findMissingNumber([1, 2, 3, 5])).toBe(4);
  expect(findMissingNumber([10, 8, 6, 7, 5, 4, 2, 3, 1])).toBe(9);
  expect(findMissingNumber([1, 3, 4, 5, 6])).toBe(2);
});
```

Jalankan test dengan:

```bash
npm test
```

Kalau semua test `PASS` ✅ berarti function sudah bekerja dengan benar!

---

> 🧠 **Takeaway utama:** Kunci dari challenge ini adalah **Gauss Formula** — cara cerdas menghitung total 1 sampai n tanpa perlu loop. Sisanya tinggal hitung total array yang ada, lalu cari selisihnya.