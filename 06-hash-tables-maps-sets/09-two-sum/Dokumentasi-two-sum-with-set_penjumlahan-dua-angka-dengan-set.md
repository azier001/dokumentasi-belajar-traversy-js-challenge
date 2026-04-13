# 🔢 Challenge: Two Sum

> **Temukan dua angka** dalam sebuah array yang jika dijumlahkan menghasilkan nilai **target** tertentu, lalu kembalikan **indeks** dari kedua angka tersebut. Challenge ini mengajarkan cara memanfaatkan `Set` untuk pencarian yang efisien.

---

## 📑 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan-challenge)
- 📋 [Instruksi & Function Signature](#instruksi--function-signature)
- 📝 [Contoh Kasus](#contoh-kasus)
- ⚠️ [Batasan & Petunjuk](#batasan--petunjuk)
- 🏗️ [Langkah 1: Menyiapkan Fungsi & Set](#langkah-1-menyiapkan-fungsi--set)
- 🔄 [Langkah 2: Iterasi & Menghitung Complement](#langkah-2-iterasi--menghitung-complement)
- 🔍 [Langkah 3: Memahami Complement Lebih Dalam](#langkah-3-memahami-complement-lebih-dalam)
- ✅ [Langkah 4: Mengecek Set & Mengembalikan Hasil](#langkah-4-mengecek-set--mengembalikan-hasil)
- 🧪 [Menjalankan & Menguji Kode](#menjalankan--menguji-kode)
- 📖 [Solusi Lengkap](#solusi-lengkap)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan-challenge"></a>

## 🎯 Pengenalan Challenge

Challenge **Two Sum** ini cukup klasik dan sering muncul di interview coding. Intinya sederhana: kita punya sebuah **array berisi angka-angka** dan sebuah **angka target**. Tugas kita adalah **menemukan dua angka** di dalam array itu yang kalau dijumlahkan hasilnya sama dengan target, lalu kita **kembalikan indeks** dari kedua angka tersebut.

Misalnya kalau kita punya array `[2, 7, 11, 15]` dan target-nya `9`, maka dua angka yang dijumlahkan jadi `9` adalah `2` dan `7`. Karena `2` ada di posisi `0` dan `7` ada di posisi `1`, maka hasilnya adalah `[0, 1]`.

---

<a name="instruksi--function-signature"></a>

## 📋 Instruksi & Function Signature

Buatlah sebuah fungsi bernama `twoSum` yang menerima:
- **`nums`** — sebuah array berisi bilangan bulat
- **`target`** — bilangan bulat target yang ingin dicapai

Fungsi ini harus mengembalikan sebuah **array berisi indeks** dari dua angka yang jumlahnya sama dengan target.

```javascript
/**
 * Mengembalikan array berisi indeks dari dua angka yang jumlahnya sama dengan target.
 * @param {number[]} nums - Array input berisi bilangan bulat.
 * @param {number} target - Jumlah target yang dicari.
 * @returns {number[]} - Array berisi indeks dari dua angka tersebut.
 */
function twoSum(nums, target)
```

---

<a name="contoh-kasus"></a>

## 📝 Contoh Kasus

```javascript
console.log(twoSum([2, 7, 11, 15], 9));
// Output: [0, 1]
// Kenapa? Karena 2 + 7 = 9. Indeks 2 adalah 0, indeks 7 adalah 1.

console.log(twoSum([3, 2, 4], 6));
// Output: [1, 2]
// Kenapa? Karena 2 + 4 = 6. Indeks 2 adalah 1, indeks 4 adalah 2.

console.log(twoSum([3, 3], 6));
// Output: [0, 1]
// Kenapa? Cuma ada dua angka, keduanya 3. 3 + 3 = 6. Indeksnya 0 dan 1.
```

---

<a name="batasan--petunjuk"></a>

## ⚠️ Batasan & Petunjuk

**Batasan:**
- Setiap bilangan bulat dalam input bersifat **unik**

**💡 Petunjuk:**
- Kamu bisa menggunakan `Set` untuk **menyimpan angka-angka** yang sudah pernah ditemui selama proses iterasi pada array

---

<a name="langkah-1-menyiapkan-fungsi--set"></a>

## 🏗️ Langkah 1: Menyiapkan Fungsi & Set

Pertama-tama, kita buat kerangka fungsinya. Fungsi `twoSum` menerima parameter `nums` (array) dan `target` (angka target).

Di dalam fungsi, hal pertama yang kita lakukan adalah **membuat sebuah `Set`**. `Set` ini berguna untuk menyimpan angka-angka yang sudah pernah kita lihat saat kita iterasi array nanti.

```javascript
function twoSum(nums, target) {
  // Buat Set untuk menyimpan angka yang sudah pernah ditemui
  const numSet = new Set();

  // ... kode selanjutnya
}
```

> 💡 **Kenapa pakai `Set`?** Karena `Set` punya method `.has()` yang sangat **cepat** untuk mengecek apakah suatu angka sudah pernah kita simpan. Jauh lebih efisien daripada mengecek satu per satu di array.

---

<a name="langkah-2-iterasi--menghitung-complement"></a>

## 🔄 Langkah 2: Iterasi & Menghitung Complement

Selanjutnya kita **iterasi** array `nums` menggunakan `for` loop. Di setiap iterasi, kita menghitung yang namanya **complement**.

**Apa itu complement?** Complement adalah **angka yang kita butuhkan** untuk mencapai target dari angka saat ini. Cara menghitungnya:

```
complement = target - angka saat ini
```

Contoh: kalau target-nya `9` dan angka saat ini adalah `2`, maka complement-nya adalah `9 - 2 = 7`. Artinya kita **butuh angka `7`** untuk membuat pasangan yang jumlahnya `9`.

```javascript
// Iterasi semua angka di array
for (let i = 0; i < nums.length; i++) {
  // Hitung complement: angka yang diperlukan untuk mencapai target
  // nums[i] = angka saat ini yang sedang diiterasi
  // target = jumlah yang ingin dicapai
  // complement = sisa yang dibutuhkan
  const complement = target - nums[i];
}
```

---

<a name="langkah-3-memahami-complement-lebih-dalam"></a>

## 🔍 Langkah 3: Memahami Complement Lebih Dalam

Supaya lebih paham, coba kita lihat contoh nyata. Misalnya kita punya array `[2, 7, 11, 15]` dan target-nya `17`:

```javascript
const result = twoSum([2, 7, 11, 15], 17);
```

Kalau kita `console.log` complement di setiap iterasi, hasilnya seperti ini:

| Iterasi | `nums[i]` | `complement` (`17 - nums[i]`) | Artinya                        |
|---------|-----------|-------------------------------|--------------------------------|
| 0       | `2`       | `15`                          | Butuh `15` untuk mencapai `17` |
| 1       | `7`       | `10`                          | Butuh `10` untuk mencapai `17` |
| 2       | `11`      | `6`                           | Butuh `6` untuk mencapai `17`  |
| 3       | `15`      | `2`                           | Butuh `2` untuk mencapai `17`  |

Nah, di iterasi ke-3, complement-nya adalah `2`. Dan angka `2` sudah pernah kita simpan di `Set` (dari iterasi ke-0). Jadi kita **ketemu pasangannya**! Angka `2` (indeks `0`) dan `15` (indeks `3`) → `2 + 15 = 17` ✅

---

<a name="langkah-4-mengecek-set--mengembalikan-hasil"></a>

## ✅ Langkah 4: Mengecek Set & Mengembalikan Hasil

Sekarang kita gabungkan semuanya. Di setiap iterasi, kita lakukan dua hal:

1. **Cek** apakah complement sudah ada di `Set` → kalau **iya**, berarti kita sudah ketemu pasangannya! Kembalikan indeks keduanya.
2. **Tambahkan** angka saat ini ke `Set` → supaya bisa dicek di iterasi berikutnya.

Kalau setelah semua iterasi selesai tapi **tidak ada pasangan** yang ditemukan, kita kembalikan array kosong `[]`.

```javascript
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];

  // Cek apakah complement sudah ada di Set
  if (numSet.has(complement)) {
    // Ketemu! Kembalikan indeks complement dan indeks angka saat ini
    return [nums.indexOf(complement), i];
  }

  // Tambahkan angka saat ini ke Set untuk iterasi berikutnya
  numSet.add(nums[i]);
}

// Kalau tidak ada pasangan yang cocok, kembalikan array kosong
return [];
```

> ☝️ **Perhatikan urutan!** Kita **cek dulu** apakah complement ada di `Set`, **baru kemudian** tambahkan angka saat ini ke `Set`. Ini penting supaya kita tidak membandingkan angka dengan dirinya sendiri.

---

<a name="menjalankan--menguji-kode"></a>

## 🧪 Menjalankan & Menguji Kode

Kita bisa menjalankan kode ini dengan file terpisah:

```javascript
// two-sum-run.js
const twoSum = require('./two-sum');

const result = twoSum([2, 7, 11, 15], 17);
console.log(result);
// Output: [0, 3]
// Karena 2 (indeks 0) + 15 (indeks 3) = 17
```

Hasilnya `[0, 3]`, yang artinya:
- Indeks `0` → angka `2`
- Indeks `3` → angka `15`
- `2 + 15 = 17` ✅ **Benar!**

---

<a name="solusi-lengkap"></a>

## 📖 Solusi Lengkap

<details>
  <summary>Klik untuk melihat solusi lengkap</summary>

```javascript
function twoSum(nums, target) {
  // Buat Set untuk menyimpan angka yang sudah pernah ditemui
  const numSet = new Set();

  // Iterasi semua angka di array
  for (let i = 0; i < nums.length; i++) {
    // Hitung complement: angka yang dibutuhkan untuk mencapai target
    // nums[i] = angka saat ini yang sedang diiterasi
    // target = jumlah yang ingin dicapai
    // target - nums[i] = sisa yang dibutuhkan (complement)
    const complement = target - nums[i];

    // Kalau complement sudah ada di Set, kembalikan indeks keduanya
    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }

    // Tambahkan angka saat ini ke Set
    numSet.add(nums[i]);
  }

  // Kalau tidak ada pasangan yang cocok, kembalikan array kosong
  return [];
}

module.exports = twoSum;
```

### 🔁 Ringkasan Alur

1. Buat `Set` kosong bernama `numSet`
2. Iterasi array `nums`, untuk setiap angka:
   - Hitung **complement** = `target - nums[i]`
   - Cek apakah **complement** sudah ada di `numSet`
   - Kalau **ada** → kembalikan `[indeks complement, indeks saat ini]`
   - Kalau **belum ada** → tambahkan angka saat ini ke `numSet`
3. Kalau loop selesai tanpa menemukan pasangan → kembalikan `[]`

</details>

---

<a name="test-cases"></a>

## 🧪 Test Cases

```javascript
const twoSum = require('./two-sum');

describe('Two Sum', () => {
  test('Test 1', () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([0, 1]));
  });

  test('Test 2', () => {
    const nums = [3, 2, 4];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([1, 2]));
  });

  test('Test 3', () => {
    const nums = [3, 3];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual(expect.arrayContaining([0, 1]));
  });
});
```

---

> 📝 **Catatan:** Challenge ini termasuk yang cukup mudah. Sebagian besar challenge yang melibatkan `Set` memang polanya mirip — seperti mencari **perbedaan** antara dua array, **irisan** (intersection) dua array, dan sejenisnya. Challenge berikutnya (**Longest Consecutive**) akan sedikit lebih menantang! 💪
