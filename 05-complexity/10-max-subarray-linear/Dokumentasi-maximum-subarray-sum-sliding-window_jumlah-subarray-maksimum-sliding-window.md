# 🪟 Maximum Subarray Sum — Solusi O(n) dengan Sliding Window

> **Catatan pribadi:** Dokumentasi ini melanjutkan dari solusi O(n²) sebelumnya. Di sini kita pakai teknik *sliding window* biar lebih efisien!

---

## 📋 Daftar Isi

- 🎯 [Gambaran Masalah](#gambaran-masalah)
- 🪟 [Apa Itu Sliding Window?](#apa-itu-sliding-window)
- 💡 [Kenapa Lebih Efisien?](#kenapa-lebih-efisien)
- 🏗️ [Membangun Solusinya Step by Step](#membangun-solusinya-step-by-step)
- 📦 [Kode Lengkap](#kode-lengkap)
- 🧪 [Test Cases](#test-cases)

---

<a name="gambaran-masalah"></a>
## 🎯 Gambaran Masalah

Kita punya fungsi `maxSubarraySum` yang menerima dua parameter:
- **`arr`** — array berisi angka-angka
- **`k`** — panjang subarray yang ingin kita cek

Tugasnya: cari **jumlah terbesar** dari semua kemungkinan subarray sepanjang `k`.

**Contoh:**
```
arr = [2, 5, 3, 1, 11, 7, 6, 4], k = 3

Subarray yang dicek:
[2, 5, 3]  → 10
[5, 3, 1]  → 9
[3, 1, 11] → 15
[1, 11, 7] → 19
[11, 7, 6] → 24  ✅ ini yang terbesar!
[7, 6, 4]  → 17

Jawaban: 24
```

---

<a name="apa-itu-sliding-window"></a>
## 🪟 Apa Itu Sliding Window?

Bayangkan kamu punya jendela kecil yang bisa digeser ke kanan satu langkah setiap kali.

```
arr = [2, 5, 3, 1, 11, 7, 6, 4]
       ↑_____↑         ← window pertama (k=3): sum = 10
          ↑_____↑      ← geser kanan: sum = 9
             ↑_____↑   ← geser lagi: sum = 15
                ...
```

Setiap kali window digeser:
- ❌ **Buang** angka yang keluar dari kiri
- ✅ **Tambah** angka baru yang masuk dari kanan

Jadi kita **tidak perlu menghitung ulang dari nol** setiap kali!

---

<a name="kenapa-lebih-efisien"></a>
## 💡 Kenapa Lebih Efisien?

Dengan solusi nested loop (O(n²)), ada banyak **perhitungan yang redundant**:

```
Saat i = 0 → kita hitung: [2, 5, 3]
Saat i = 1 → kita hitung: [5, 3, 1]  ← 5 dan 3 sudah pernah dihitung!
Saat i = 2 → kita hitung: [3, 1, 11] ← 3 dan 1 sudah pernah dihitung!
```

Dengan **sliding window**, kita cukup:
- Kurangi angka yang keluar
- Tambah angka yang masuk

Tidak ada perhitungan ulang → jauh lebih efisien → **O(n)**!

---

<a name="membangun-solusinya-step-by-step"></a>
## 🏗️ Membangun Solusinya Step by Step

### Langkah 1 — Inisialisasi variabel

```javascript
function maxSubarraySum(arr, k) {
  let maxSum = 0;
  let currentSum = 0;
```

Dua variabel ini akan kita pakai untuk:
- `maxSum` → menyimpan hasil jumlah terbesar yang pernah kita temukan
- `currentSum` → menyimpan jumlah window yang sedang aktif

---

### Langkah 2 — Hitung jumlah `k` elemen pertama

```javascript
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
```

Loop ini menjumlahkan elemen pertama sebanyak `k`. Ini adalah **window pertama** kita.

Contoh: `k = 3`, maka `2 + 5 + 3 = 10` → `maxSum = 10`.

---

### Langkah 3 — Set `currentSum` sama dengan `maxSum`

```javascript
  currentSum = maxSum;
```

Kita mulai dari window pertama, jadi `currentSum` dan `maxSum` sama dulu di awal.

---

### Langkah 4 — Geser window dan update sum

```javascript
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum);
  }
```

Ini inti dari sliding window! Loop dimulai dari index `k` (bukan 0), karena window pertama sudah kita hitung di atas.

Setiap iterasi:
- `arr[i - k]` → elemen yang **keluar** dari window (kiri)
- `arr[i]` → elemen yang **masuk** ke window (kanan)
- `Math.max(maxSum, currentSum)` → simpan yang terbesar

**Visualisasi:**
```
i = 3 → currentSum = 10 - arr[0] - arr[3] = 10 - 2 + 1 = 9
i = 4 → currentSum = 9  - arr[1] + arr[4] = 9  - 5 + 11 = 15
i = 5 → currentSum = 15 - arr[2] + arr[5] = 15 - 3 + 7  = 19
i = 6 → currentSum = 19 - arr[3] + arr[6] = 19 - 1 + 6  = 24 ✅
i = 7 → currentSum = 24 - arr[4] + arr[7] = 24 - 11 + 4 = 17
```

---

### Langkah 5 — Return hasilnya

```javascript
  return maxSum;
}
```

Setelah loop selesai, `maxSum` sudah berisi jumlah terbesar dari semua window.

---

<a name="kode-lengkap"></a>
## 📦 Kode Lengkap

### Versi 1 — Dari Video

```javascript
function maxSubarraySum(arr, k) {
  // maxSum diinisialisasi 0 dulu, currentSum menyusul setelahnya
  let maxSum = 0;
  let currentSum = 0;

  // Hitung window pertama langsung ke maxSum
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }

  // Baru set currentSum dari maxSum
  currentSum = maxSum;

  // Geser window dan update maxSum
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, currentSum); // pakai Math.max
  }

  return maxSum;
}

module.exports = maxSubarraySum;
```

---

### Versi 2 — Alternatif 

```javascript
function maxSubarraySum(arr, k) {
  // Hitung window pertama dulu ke currentSum
  let currentSum = 0;

  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }

  // Baru set maxSum dari currentSum yang sudah ada nilainya
  let maxSum = currentSum;

  // Geser window dan update maxSum
  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum - arr[i - k] + arr[i];
    if (currentSum > maxSum) { // pakai if
      maxSum = currentSum;
    }
  }

  return maxSum;
}

module.exports = maxSubarraySum;
```

---

### ⚖️ Perbedaan Keduanya

| | Versi 1 (Video) | Versi 2 (Alternatif) |
|---|---|---|
| **Inisialisasi** | `maxSum = 0` dulu, `currentSum` menyusul | `currentSum` dihitung dulu, `maxSum` dari `currentSum` |
| **Perbandingan** | `Math.max(maxSum, currentSum)` | `if (currentSum > maxSum)` |
| **Array negatif** | ⚠️ Rawan — `maxSum` mulai dari `0` bisa jadi "pemenang palsu" | ✅ Aman — `maxSum` langsung dari nilai nyata window pertama |
| **Keterbacaan** | Lebih ringkas | Lebih eksplisit |

> 💬 Keduanya menghasilkan output yang sama untuk kasus umum. Tapi untuk array yang semua elemennya negatif, **Versi 2 lebih aman** karena `maxSum` tidak pernah dimulai dari `0`.

---

<a name="test-cases"></a>
## 🧪 Test Cases

```javascript
const maxSubarraySum = require('./max-subarray-linear');

test('Finding maximum subarray sum using sliding window O(n) solution', () => {
  const arr1 = [2, 5, 3, 1, 11, 7, 6, 4];
  const k1 = 3;
  expect(maxSubarraySum(arr1, k1)).toBe(24);
  // Window [11, 7, 6] = 24 ✅

  const arr2 = [-2, -5, -3, -1, -11, -7, -6, -4];
  const k2 = 4;
  expect(maxSubarraySum(arr2, k2)).toBe(-11);
  // Semua negatif, pilih yang paling "tidak rugi" ✅
});
```

> ⚠️ **Koreksi dari dokumentasi sebelumnya:** Output untuk `arr2` dengan `k2 = 4` adalah **`-11`**, bukan `-9`. Window `[-2, -5, -3, -1]` = `-11` adalah yang terbesar di antara semua window.

---

## 🔢 Kompleksitas

| | Nested Loop (O(n²)) | Sliding Window (O(n)) |
|---|---|---|
| **Waktu** | O(n²) | ✅ O(n) |
| **Memori** | O(1) | ✅ O(1) |
| **Redundansi** | Banyak | Tidak ada |

> 💬 **Kesimpulan:** Dua solusi bisa memberikan jawaban yang sama, tapi dengan efisiensi yang sangat berbeda. Sliding window jauh lebih cepat karena tidak menghitung ulang hal yang sudah dihitung sebelumnya.