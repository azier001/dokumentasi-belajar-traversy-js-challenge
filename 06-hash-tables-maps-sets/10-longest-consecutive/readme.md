# 🔗 Challenge: Longest Consecutive Sequence

> **Tantangan ini menguji kemampuanmu dalam menemukan urutan bilangan bulat berurutan terpanjang di dalam sebuah array, menggunakan struktur data `Set` untuk efisiensi optimal.**

---

## 📋 Instruksi

Buatlah sebuah fungsi bernama `longestConsecutiveSequence` yang menerima sebuah array berisi bilangan bulat sebagai input dan mengembalikan **panjang urutan bilangan berurutan terpanjang** di dalam array tersebut.

**Urutan berurutan** (*consecutive sequence*) adalah rangkaian bilangan bulat yang berurutan, di mana setiap bilangan dalam urutan tersebut **tepat satu lebih besar** dari bilangan sebelumnya.

---

### 🔧 Function Signature

```js
/**
 * Returns the length of the longest consecutive sequence in the array.
 * @param {number[]} nums - An array of integers.
 * @returns {number} - The length of the longest consecutive sequence.
 */
function longestConsecutiveSequence(nums: number[]): number
```

---

### 📌 Contoh

```js
longestConsecutiveSequence([100, 4, 200, 1, 3, 2]); // Output: 4 (Urutan berurutan terpanjang adalah [1, 2, 3, 4])
longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1]); // Output: 10 (Urutan berurutan terpanjang adalah [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

---

### ⚠️ Batasan

- Array input hanya akan berisi **bilangan bulat**
- Array input **mungkin mengandung bilangan duplikat**

---

### 💡 Petunjuk

- Kamu bisa menggunakan `Set` untuk menemukan urutan berurutan di dalam array secara **efisien**.

---

## ✅ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
function longestConsecutiveSequence(nums) {
  const numSet = new Set(nums);
  let longestSequence = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentSequence = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentSequence++;
      }

      longestSequence = Math.max(longestSequence, currentSequence);
    }
  }

  return longestSequence;
}
```

### 📖 Penjelasan

- Buat sebuah `Set` bernama `numSet` dari array input `nums`. `Set` ini memungkinkan kita untuk **memeriksa keberadaan suatu bilangan** di dalam array secara efisien dalam waktu konstan (*constant time*).
- Inisialisasi variabel `longestSequence` dengan nilai `0`, yang akan menyimpan **panjang urutan berurutan terpanjang** yang ditemukan sejauh ini.
- Iterasi setiap bilangan `num` di dalam `numSet` menggunakan loop `for...of`. Untuk setiap bilangan, periksa apakah bilangan sebelumnya `num - 1` ada di dalam `numSet`. Jika `num - 1` **tidak ada**, berarti `num` adalah **elemen awal** dari sebuah urutan berurutan.
- Inisialisasi dua variabel: `currentNum` dan `currentSequence`. `currentNum` diatur ke bilangan saat ini `num`, dan `currentSequence` diatur ke `1`, karena kita telah menemukan **elemen pertama** dari urutan berurutan.
- Gunakan loop `while` untuk melakukan iterasi selama bilangan berikutnya `currentNum + 1` ada di dalam `numSet`. Pada setiap iterasi, tambahkan `currentNum` dan `currentSequence` untuk **memperpanjang urutan berurutan**.
- Setelah loop `while` selesai, perbarui `longestSequence` ke nilai **maksimum** antara `longestSequence` saat ini dan `currentSequence`. Dengan cara ini, kita terus melacak urutan berurutan terpanjang yang ditemukan sejauh ini.
- Setelah seluruh loop selesai, kembalikan `longestSequence` sebagai output akhir, yang merepresentasikan **panjang urutan berurutan terpanjang** di dalam array input.

</details>

---

### 🧪 Test Cases

```js
test('Longest Consecutive Sequence', () => {
  expect(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])).toBe(4);
  expect(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 9, 1])).toBe(10);
});
```

---

> **Catatan**: Kamu perlu mendefinisikan fungsi `longestConsecutiveSequence` seperti yang ditunjukkan pada contoh. Test cases di atas memverifikasi bahwa fungsi mengembalikan **panjang urutan berurutan terpanjang** yang benar dari array input.
