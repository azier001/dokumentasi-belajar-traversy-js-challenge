# ⏱️ Quadratic Time Complexity — `O(n²)`

> 📝 *Catatan pribadi dari video tutorial Big O Notation*

---

## 📋 Daftar Isi

- 🔍 [Apa itu Quadratic Time?](#apa-itu-quadratic-time)
- ⚖️ [Perbandingan dengan Linear Time](#perbandingan-dengan-linear-time)
- 🏗️ [Contoh Kode: Nested Loop](#contoh-kode-nested-loop)
- 🔬 [Kenapa Ini O(n²)?](#kenapa-ini-on2)
- 🧪 [Uji Performa Sendiri](#uji-performa-sendiri)
- 💡 [Kesimpulan](#kesimpulan)

---

<a name="apa-itu-quadratic-time"></a>
## 🔍 Apa itu Quadratic Time?

**Quadratic time** artinya waktu yang dibutuhkan sebuah fungsi untuk selesai itu **berbanding lurus dengan kuadrat dari ukuran input-nya**.

Gampangnya begini:

| Ukuran Input (`n`) | Jumlah Operasi (`n²`) |
|---|---|
| 1 | 1 |
| 10 | 100 |
| 100 | 10.000 |
| 1.000 | 1.000.000 |

Semakin besar inputnya, waktu eksekusinya **meledak** jauh lebih cepat. Ini dilambangkan dengan notasi Big O sebagai:

```
O(n²)  →  "O of n squared"
```

---

<a name="perbandingan-dengan-linear-time"></a>
## ⚖️ Perbandingan dengan Linear Time

`O(n²)` **lebih tidak efisien** dibanding linear time `O(n)`.

Buktinya dari percobaan di video:

| Ukuran Array | Linear Time `O(n)` | Quadratic Time `O(n²)` |
|---|---|---|
| 1 juta item | ~8 ms | 💥 *tidak selesai-selesai* |
| 10.000 item | ~2,5 ms | ~165 ms |

Dengan input yang sama (1 juta item), linear time selesai dalam 8 milidetik, tapi quadratic time **sampai harus di-stop manual** karena terlalu lama. Beda banget kan?

---

<a name="contoh-kode-nested-loop"></a>
## 🏗️ Contoh Kode: Nested Loop

Ciri khas `O(n²)` adalah adanya **nested loop** — loop di dalam loop.

```js
function sumArray(arr) {
  let sum = 0;
  let sum2 = 0;

  // 🔁 Outer loop — iterasi setiap elemen array
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    // 🔁🔁 Inner loop — iterasi SELURUH array lagi, untuk setiap elemen outer loop
    for (let j = 0; j < arr.length; j++) {
      sum2 += arr[j];
    }
  }

  return sum + sum2;
}
```

> ⚠️ **Perhatikan:** Ada dua loop yang bersarang. Outer loop jalan `n` kali, dan untuk setiap putarannya, inner loop juga jalan `n` kali. Totalnya: `n × n = n²` operasi.

---

<a name="kenapa-ini-on2"></a>
## 🔬 Kenapa Ini O(n²)?

Mari kita bedah cara kerjanya:

1. **Outer loop** (`for i`) → berjalan sebanyak `n` kali (sesuai panjang array)
2. **Inner loop** (`for j`) → untuk **setiap** iterasi outer loop, inner loop berjalan lagi sebanyak `n` kali
3. Jadi total operasi = `n × n` = **`n²`**

Analoginya seperti ini: bayangkan kamu punya daftar 10 nama. Untuk setiap nama di daftar, kamu harus membaca ulang semua 10 nama dari awal. Totalnya 10 × 10 = **100 pembacaan**. Kalau daftarnya 100 nama? **10.000 pembacaan**. Itu quadratic time!

---

<a name="uji-performa-sendiri"></a>
## 🧪 Uji Performa Sendiri

Kamu bisa jalankan kode ini untuk melihat sendiri betapa lambatnya dengan input besar:

```js
function sumArray(arr) {
  let sum = 0;
  let sum2 = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    for (let j = 0; j < arr.length; j++) {
      sum2 += arr[j];
    }
  }
  return sum + sum2;
}

// Array kecil — 5 item, harusnya super cepat
const arr1 = [1, 2, 3, 4, 5];
console.time('Sum Array 1');
sumArray(arr1);
console.timeEnd('Sum Array 1');

// Array besar — 10.000 item, mulai terasa bedanya
const arr2 = Array.from({ length: 10000 }, (_, index) => index + 1);
console.time('Sum Array 2');
sumArray(arr2);
console.timeEnd('Sum Array 2');
```

> 💡 **Tips:** Kalau mau coba 1 juta item, bersiaplah nunggu lama — atau langsung stop aja kodenya. Itu justru membuktikan betapa tidak efisiennya `O(n²)` untuk input besar!

---

<a name="kesimpulan"></a>
## 💡 Kesimpulan

- `O(n²)` atau **quadratic time** terjadi ketika ada **nested loop**
- Semakin besar input, waktu eksekusi tumbuh **sangat pesat** (kuadrat dari input)
- Ini **lebih lambat** dari linear time `O(n)`
- Tandanya di kode: lihat saja apakah ada **loop di dalam loop** 🔁🔁

> 🚀 **Next up:** Di video berikutnya akan dibahas **Logarithmic Time `O(log n)`** — yang justru lebih efisien dari linear time. Penasaran kan?