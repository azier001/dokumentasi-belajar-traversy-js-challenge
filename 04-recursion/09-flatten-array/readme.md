# 🧩 Tantangan: Flatten Array

> **Ratakan semua elemen array bersarang menjadi satu level tunggal** — sebuah tantangan klasik yang melatih pemahaman rekursi dan manipulasi array.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `flattenArray` yang menerima sebuah array berisi **array-array bersarang** (nested arrays) dari integer, dan mengembalikan array baru dengan semua integer dari array-array bersarang tersebut **diratakan menjadi satu level tunggal**.

---

### 🔏 Function Signature

```js
/**
 * Mengembalikan array yang sudah diratakan.
 * @param {number[]} arr - Array yang berisi nested arrays.
 * @returns {number[]} - Array yang sudah diratakan.
 */
function flattenArray(arr: number[]): number[];
```

---

### 💡 Contoh Penggunaan

```js
flattenArray([1, [2, 3], [4, 5, [6]]]); // seharusnya mengembalikan [1, 2, 3, 4, 5, 6]
flattenArray([
  [1, 2],
  [3, [4, 5]],
  [6, [7]],
]); // seharusnya mengembalikan [1, 2, 3, 4, 5, 6, 7]
flattenArray([1, [2, [3, [4, [5]]]]]); // seharusnya mengembalikan [1, 2, 3, 4, 5]
```

---

### ⚠️ Batasan

- Array input dapat berisi nested arrays dengan **kedalaman berapa pun**
- Array input dapat berisi **jumlah nested arrays berapa pun**

---

### 🔍 Petunjuk

- Kamu dapat menggunakan **rekursi** untuk menelusuri nested arrays dan meratakannya.
- Jika elemen saat ini adalah sebuah array, kamu dapat memanggil fungsi `flattenArray` secara rekursif pada elemen tersebut untuk meratakannya lebih lanjut.

---

## ✅ Solusi

<details>
  <summary>🔓 Solusi 1 — Menggunakan <code>concat</code></summary>

```js
function flattenArray(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
```

### 🧠 Penjelasan

- Buat variabel `result` untuk menyimpan array yang sudah diratakan.
- Iterasi melalui array input menggunakan loop `for...of`.
- Jika elemen saat ini adalah sebuah array, panggil fungsi `flattenArray` secara **rekursif** pada elemen tersebut untuk meratakannya lebih lanjut, lalu gabungkan hasilnya ke array `result` menggunakan `concat`.
- Jika elemen saat ini **bukan** array, masukkan langsung ke array `result` menggunakan `push`.
- Kembalikan array `result`.

**Base case** ditangani secara implisit di dalam struktur loop. Saat loop mengiterasi setiap elemen dari array input `arr`, rekursi pada akhirnya mencapai titik di mana tidak ada lagi elemen yang perlu diproses.

Ketika array input `arr` kosong, loop tidak akan dieksekusi, dan fungsi akan langsung mengembalikan array `result` yang kosong.

</details>

<details>
  <summary>🔓 Solusi 2 — Menggunakan <code>push</code> + spread operator</summary>

```js
// Siapkan wadah untuk menampung hasil akhir
const flattenArray = (arr) => {
  const result = []
  for (const item of arr) {
    if (!Array.isArray(item)) {
      // Kalau item bukan array, langsung masukkan ke result
      result.push(item)
    } else {
      // Kalau item adalah array, rekursi — lalu spread hasilnya ke result
      result.push(...flattenArray(item))
    }
  }
  return result
}
```

### 🧠 Penjelasan

- Logika dasarnya **sama dengan Solusi 1**, namun ada beberapa perbedaan gaya penulisan.
- Menggunakan **arrow function** dan `const` — lebih idiomatis di gaya penulisan JavaScript modern.
- Urutan kondisi dibalik: mengecek `!Array.isArray(item)` (negasi) lebih dulu, baru menangani kasus rekursi di `else`.
- Alih-alih `concat`, hasil rekursi langsung di-**spread** menggunakan `...` ke dalam `push` — sehingga elemen dimasukkan satu per satu ke array `result` yang **sudah ada**, tanpa membuat array sementara baru.
- Pendekatan ini sedikit lebih **efisien memori** dibanding `concat` karena menghindari alokasi array baru di setiap iterasi rekursi.

</details>

---

## 🧪 Test Cases

```js
test('Flatten Nested Arrays', () => {
  expect(flattenArray([1, [2, 3], [4, 5, [6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  expect(
    flattenArray([
      [1, 2],
      [3, [4, 5]],
      [6, [7]],
    ])
  ).toEqual([1, 2, 3, 4, 5, 6, 7]);
  expect(flattenArray([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
});
```