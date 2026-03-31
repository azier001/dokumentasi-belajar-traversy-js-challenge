# 🔢 Tantangan: Rentang Angka Menggunakan Rekursi

> **Dokumentasi ini membahas cara membangun array rentang angka menggunakan pendekatan rekursif dalam JavaScript/TypeScript.**

---

## 📋 Instruksi

Tuliskan sebuah fungsi bernama `numberRange` yang menerima `startNum` dan `endNum`, lalu mengembalikan array berisi angka-angka dari `startNum` hingga `endNum`, **inklusif**. Pastikan kamu menggunakan **rekursi** dalam solusimu.

---

## ✍️ Tanda Tangan Fungsi

```js
/**
 * Mengembalikan array berisi angka dari startNum hingga endNum, inklusif.
 * @param {number} startNum - Angka awal.
 * @param {number} endNum - Angka akhir.
 * @returns {number[]} - Sebuah array berisi angka-angka.
 */
function numberRange(startNum: number, endNum: number): number[];
```

---

## 💡 Contoh Penggunaan

```js
numberRange(1, 5);  // harus mengembalikan [1, 2, 3, 4, 5]
numberRange(3, 10); // harus mengembalikan [3, 4, 5, 6, 7, 8, 9, 10]
numberRange(7, 7);  // harus mengembalikan [7] (hanya satu angka)
```

---

## 🗝️ Petunjuk

- Kamu dapat membangun array dengan terlebih dahulu memanggil `numberRange` pada rentang yang lebih kecil, kemudian **menambahkan** `endNum` ke dalam array tersebut.

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function numberRange(startNum, endNum) {
  if (startNum === endNum) {
    return [startNum];
  }

  const numbers = numberRange(startNum, endNum - 1);
  numbers.push(endNum);
  return numbers;
}
```

### 🔍 Penjelasan

- Pertama, kita menangani **base case**: jika `startNum` sama dengan `endNum`, maka kita kembalikan `startNum` di dalam sebuah array.
- Untuk **kasus rekursif**, kita simpan hasil pemanggilan fungsi dengan `startNum` dan `endNum` dikurangi satu ke dalam variabel `numbers`.
- Kemudian kita tambahkan `endNum` ke dalam array `numbers` dan mengembalikannya.

Itulah inti dari solusinya. Sekarang mari kita telusuri **langkah demi langkah** untuk `numberRange(1, 5)`:

**Langkah 1:** Karena `startNum(1)` tidak sama dengan `endNum(5)`, kita masuk ke blok rekursif.

**Langkah 2:** Kita melakukan pemanggilan rekursif ke `numberRange(1, 4)`, yang kemudian akan memanggil `numberRange(1, 3)`, dan seterusnya, hingga mencapai *base case*.

**Langkah 3:** *Base case* tercapai ketika `startNum(1)` menjadi sama dengan `endNum(1)`. Pada titik ini, fungsi mengembalikan array yang hanya berisi angka `1`.

**Langkah 4:** Proses *unwinding* (pembukaan kembali tumpukan rekursi) dimulai. Hasil dari `numberRange(1, 2)` kini menjadi array `[1, 2]`. Kemudian hasil `numberRange(1, 3)` menjadi `[1, 2, 3]`, dan seterusnya, hingga akhirnya kita mendapatkan hasil dari `numberRange(1, 5)` yaitu `[1, 2, 3, 4, 5]`.

Fungsi ini mengikuti proses rekursif yang sama untuk membangun array angka — dimulai dari *base case* dan menambahkan angka satu per satu seiring dengan pembukaan kembali pemanggilan rekursif.

</details>

---

## 🧪 Test Cases

```js
test('Menghitung rentang angka', () => {
  expect(numberRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  expect(numberRange(3, 10)).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  expect(numberRange(7, 7)).toEqual([7]);
});
```