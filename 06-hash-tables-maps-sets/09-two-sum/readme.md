# 🔢 Challenge: Two Sum

> **Tantangan klasik** — Temukan dua angka dalam sebuah array yang jika dijumlahkan menghasilkan nilai target tertentu, lalu kembalikan **indeks** dari kedua angka tersebut.

---

## 📋 Instruksi

Buatlah sebuah fungsi bernama `twoSum` yang menerima sebuah **array bilangan bulat** dan sebuah **bilangan bulat target** sebagai input, lalu mengembalikan sebuah array berisi **indeks dari dua angka** yang jumlahnya sama dengan target.

---

## 🔧 Function Signature

```javascript
/**
 * Mengembalikan array berisi indeks dari dua angka yang jumlahnya sama dengan target.
 * @param {number[]} nums - Array input berisi bilangan bulat.
 * @param {number} target - Jumlah target yang dicari.
 * @returns {number[]} - Array berisi indeks dari dua angka tersebut.
 */
function twoSum(nums: number[], target: number): number[]
```

---

## 📝 Contoh

```javascript
console.log(twoSum([2, 7, 11, 15], 9));
// Output: [0, 1] (2 + 7 = 9)

console.log(twoSum([3, 2, 4], 6));
// Output: [1, 2] (2 + 4 = 6)

console.log(twoSum([3, 3], 6));
// Output: [0, 1] (3 + 3 = 6)
```

---

## ⚠️ Batasan

- Setiap bilangan bulat dalam input bersifat **unik**.

---

## 💡 Petunjuk

- Kamu bisa menggunakan `Set` untuk **menyimpan angka-angka** yang sudah pernah ditemui selama proses iterasi pada array.

---

## ✅ Solusi

<details>
  <summary>Klik untuk melihat solusi</summary>

```javascript
function twoSum(nums, target) {
  const numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numSet.has(complement)) {
      return [nums.indexOf(complement), i];
    }
    
    numSet.add(nums[i]);
  }

  return [];
}
```

### 📖 Penjelasan

- Buat sebuah `Set` bernama `numSet` untuk menyimpan angka-angka yang sudah ditemui selama iterasi pada array.
- Lakukan iterasi pada array input `nums`. Untuk setiap angka, hitung **complement**-nya (angka yang diperlukan untuk mencapai target) dengan rumus `target - nums[i]`.
- Jika **complement** sudah ada di dalam `numSet`, kembalikan array yang berisi indeks dari complement tersebut dan angka saat ini.
- Jika **complement** belum ada di dalam `numSet`, tambahkan angka saat ini ke dalam set.
- Jika tidak ditemukan solusi, kembalikan **array kosong**.

</details>

---

## 🧪 Test Cases

```javascript
const twoSum = require('./twoSum');

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
