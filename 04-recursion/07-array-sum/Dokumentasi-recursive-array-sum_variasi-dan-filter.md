# 🔁 Variasi Array Sum Rekursif & Filter Angka Positif

> 📝 *Dokumentasi lanjutan — membahas berbagai pendekatan alternatif rekursi dan kasus filter angka positif*

---

## 📑 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🗂️ [Gambaran Tiga Pendekatan](#gambaran-tiga-pendekatan)
- 🔢 [Bagian 1 — arraySum (All Numbers)](#bagian-1)
  - 📌 [V1 — Slice (Kiri ke Kanan)](#v1-all)
  - 📌 [V2 — Index Parameter (Kanan ke Kiri)](#v2-all)
  - 📌 [V3 — Helper Function](#v3-all)
  - 🎞️ [Simulasi Lengkap V3](#simulasi-all)
  - ✅ [Test Cases — All Numbers](#test-all)
- ➕ [Bagian 2 — arraySum (Positive Only)](#bagian-2)
  - 📌 [V1 — Slice dengan Filter Positif](#v1-pos)
  - 📌 [V2 — Index Parameter dengan Filter Positif](#v2-pos)
  - 📌 [V3 — Helper Function dengan Filter Positif](#v3-pos)
  - 🎞️ [Simulasi Lengkap V3](#simulasi-pos)
  - ✅ [Test Cases — Positive Only](#test-pos)
- 🏁 [Kesimpulan & Perbandingan Akhir](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Dokumentasi ini adalah **lanjutan** dari pembahasan `arraySum` rekursif dasar. Di sini kita akan mengeksplorasi **tiga pendekatan berbeda** untuk mengimplementasikan fungsi yang sama, lalu mengembangkannya ke kasus lebih spesifik yaitu **hanya menjumlahkan angka positif**.

Tiga pendekatan yang akan dibahas:

| Pendekatan | Ciri Khas |
|---|---|
| **V1 — Slice** | Memotong array dengan `arr.slice(1)` setiap rekursi |
| **V2 — Index Parameter** | Menelusuri array via parameter `index` |
| **V3 — Helper Function** | Fungsi rekursif tersembunyi di dalam wrapper |

> 💡 **Mengapa ada banyak variasi?** Karena setiap pendekatan punya trade-off tersendiri — dari sisi keterbacaan, efisiensi memori, hingga keamanan input. Memahami ketiganya membuat kamu lebih fleksibel dalam menulis rekursi.

---

<a name="gambaran-tiga-pendekatan"></a>
## 🗂️ Gambaran Tiga Pendekatan

Sebelum masuk ke detail, ini perbandingan besar ketiga pendekatan:

| | **V1 — Slice** | **V2 — Index Param** | **V3 — Helper Function** |
|---|---|---|---|
| **Arah penelusuran** | Kiri → Kanan | Kanan → Kiri | Kanan → Kiri |
| **Membuat array baru?** | ✅ Ya, tiap rekursi | ❌ Tidak | ❌ Tidak |
| **Penggunaan memori** | Lebih boros | Lebih efisien | Lebih efisien |
| **Validasi input** | ❌ | ❌ | ✅ Di luar rekursi |
| **Parameter "bocor" keluar** | ❌ Bersih | ⚠️ `index` terekspos | ❌ Bersih |
| **Kompleksitas kode** | Sederhana | Sedang | Sedang |

> 🔑 **"Parameter bocor"** artinya user dari luar bisa memanggil fungsi dengan nilai `index` yang tidak diinginkan, misalnya `arraySum([1,2,3], 99)` — ini bisa menyebabkan hasil yang tidak terduga.

---

<a name="bagian-1"></a>
## 🔢 Bagian 1 — arraySum (All Numbers)

Menjumlahkan **semua angka** di dalam array, baik positif maupun negatif.

```js
arraySum([1, 2, 3, 4, 5]);      // → 15
arraySum([-1, -2, -3, -4, -5]); // → -15
arraySum([]);                    // → 0
```

---

<a name="v1-all"></a>
### 📌 V1 — Slice (Kiri ke Kanan)

```js
function arraySum(arr) {
  if (arr.length === 0) return 0;
  
  return arr[0] + arraySum(arr.slice(1));
}
```

**Cara kerjanya:**
- Ambil elemen **pertama** (`arr[0]`), tambahkan dengan hasil rekursi sisa array
- `arr.slice(1)` membuat **array baru** tanpa elemen pertama di setiap pemanggilan
- Base case: array kosong → kembalikan `0`

> ⚠️ **Catatan memori:** Setiap `slice()` menciptakan array baru di memori. Untuk array yang sangat panjang, ini bisa menjadi tidak efisien.

---

<a name="v2-all"></a>
### 📌 V2 — Index Parameter (Kanan ke Kiri)

```js
const arraySum = (arr, index = arr.length - 1) => {
  if (index < 0) return 0;
  
  return arr[index] + arraySum(arr, index - 1);
};
```

**Cara kerjanya:**
- Mulai dari **index terakhir** dan mundur ke index `0`
- Parameter `index` berkurang satu di setiap rekursi — **tidak ada array baru** yang dibuat
- Base case: `index < 0` → artinya semua elemen sudah dijumlahkan

**Perbedaan utama dari V1:**
- Arah terbalik — dari kanan ke kiri
- Jauh lebih hemat memori karena array asli tidak pernah dimodifikasi

> ⚠️ **Kelemahan:** Parameter `index` terekspos sebagai argumen publik. User bisa secara tidak sengaja memanggil `arraySum([1,2,3], 99)` dan mendapat hasil yang salah.

---

<a name="v3-all"></a>
### 📌 V3 — Helper Function

```js
const arraySum = (arr) => {
  if (!Array.isArray(arr)) return 0;

  const helper = (index) => {
    if (index < 0) return 0;
    
    return arr[index] + helper(index - 1);
  };

  return helper(arr.length - 1);
};
```

**Cara kerjanya:**
- `arraySum` adalah **fungsi luar (wrapper)** — tugasnya hanya validasi input dan memulai rekursi
- `helper` adalah **fungsi dalam** yang melakukan rekursi sesungguhnya
- `arr` diakses oleh `helper` lewat **closure** — tidak perlu diteruskan sebagai parameter

**Keunggulan dibanding V1 & V2:**

| Keunggulan | Penjelasan |
|---|---|
| ✅ Validasi input terpusat | `!Array.isArray(arr)` hanya dicek **sekali**, bukan setiap rekursi |
| ✅ Parameter bersih | User hanya memanggil `arraySum(arr)` — tidak ada parameter tersembunyi |
| ✅ Hemat memori | Sama seperti V2, tidak membuat array baru |
| ✅ Lebih aman | User tidak bisa "menyusup" nilai `index` dari luar |

> 💡 **Apa itu closure?** `helper` bisa mengakses variabel `arr` dari fungsi luarnya meskipun `arr` bukan parameternya. Itulah yang disebut closure — fungsi yang "mengingat" lingkungan tempat ia dibuat.

---

<a name="simulasi-all"></a>
### 🎞️ Simulasi Lengkap V3

Mari kita telusuri `arraySum([1, 2, 3])` secara detail:

**Tahap 1 — Pemanggilan awal:**
```
arraySum([1, 2, 3])
  → validasi: arr adalah array ✅
  → memanggil helper(2)   // index = arr.length - 1 = 2
```

**Tahap 2 — Proses rekursi (winding):**
```
helper(2)  → arr[2] + helper(1)  →  3 + helper(1)
helper(1)  → arr[1] + helper(0)  →  2 + helper(0)
helper(0)  → arr[0] + helper(-1) →  1 + helper(-1)
helper(-1) → 0  ✅ BASE CASE!
```

**Tahap 3 — Proses unwinding (nilai terkumpul):**
```
helper(-1)          → 0
helper(0)           → 1 + 0  = 1
helper(1)           → 2 + 1  = 3
helper(2)           → 3 + 3  = 6
arraySum([1, 2, 3]) → 6 🎉
```

> 🧠 **Mengapa helper bisa mengakses `arr` tanpa parameter?** Karena `helper` didefinisikan **di dalam** `arraySum`, sehingga ia memiliki akses ke semua variabel di scope `arraySum` — termasuk `arr`. Inilah kekuatan closure.

---

<a name="test-all"></a>
### ✅ Test Cases — All Numbers

```js
const arraySum = require('./array-sum');

test('All Numbers — arraySum dengan berbagai variasi input', () => {
  expect(arraySum([1, 2, 3, 4, 5])).toEqual(15);      // angka positif
  expect(arraySum([-1, -2, -3, -4, -5])).toEqual(-15); // angka negatif
  expect(arraySum([1, -2, 3, -4, 5])).toEqual(3);      // campuran
  expect(arraySum([])).toEqual(0);                      // array kosong
  expect(arraySum("bukan array")).toEqual(0);           // input invalid (V3)
});
```

> 📝 **Catatan:** Test case `input invalid` hanya berlaku untuk **V3** karena hanya V3 yang memiliki validasi `!Array.isArray(arr)`.

---

<a name="bagian-2"></a>
## ➕ Bagian 2 — arraySum (Positive Only)

Menjumlahkan **hanya angka positif** — angka negatif dan nol dilewati.

```js
arraySum([1, -2, 3, -4, 5]);  // → 9  (hanya 1 + 3 + 5)
arraySum([-1, -2, -3]);        // → 0  (tidak ada yang positif)
arraySum([0, 1, 2]);           // → 3  (0 dilewati)
```

> 🔍 **Mengapa `> 0` bukan `>= 0`?** Karena `0` bukan angka positif. Dengan `>= 0`, angka nol ikut dijumlahkan padahal tidak mengubah hasil — namun secara semantik kurang tepat untuk kasus "positif saja".

---

<a name="v1-pos"></a>
### 📌 V1 — Slice dengan Filter Positif

```js
const arraySum = (arr) => {
  if (arr.length === 0) return 0;
  
  if (arr[0] > 0) {
    return arr[0] + arraySum(arr.slice(1));
  } else {
    return arraySum(arr.slice(1));
  }
};
```

**Perubahan dari V1 All Numbers:**
- Ditambahkan kondisi `if (arr[0] > 0)` sebelum menjumlahkan
- Jika elemen pertama **tidak positif** → lewati, langsung rekursi ke sisa array
- Mekanisme `slice` tetap sama seperti sebelumnya

---

<a name="v2-pos"></a>
### 📌 V2 — Index Parameter dengan Filter Positif

```js
const arraySum = (arr, index = arr.length - 1) => {
  if (index < 0) return 0;
  
  if (arr[index] > 0) {
    return arr[index] + arraySum(arr, index - 1);
  } else {
    return arraySum(arr, index - 1);
  }
};
```

**Perubahan dari V2 All Numbers:**
- Ditambahkan kondisi `if (arr[index] > 0)` sebelum menjumlahkan
- Jika elemen di `index` saat ini **tidak positif** → lewati, lanjut ke `index - 1`
- Arah penelusuran tetap dari kanan ke kiri

---

<a name="v3-pos"></a>
### 📌 V3 — Helper Function dengan Filter Positif

```js
const arraySum = (arr) => {
  if (!Array.isArray(arr)) return 0;

  const helper = (index) => {
    if (index < 0) return 0;
    
    if (arr[index] > 0) {
      return arr[index] + helper(index - 1);
    } else {
      return helper(index - 1);
    }
  };

  return helper(arr.length - 1);
};
```

**Perubahan dari V3 All Numbers:**
- Di dalam `helper`, ditambahkan kondisi `if (arr[index] > 0)`
- Validasi input dan struktur wrapper tetap sama persis
- Filter positif hanya ada di **dalam** `helper` — tidak mencemari logika luar

---

<a name="simulasi-pos"></a>
### 🎞️ Simulasi Lengkap V3 — Positive Only

Mari telusuri `arraySum([1, -2, 3])`:

**Tahap 1 — Pemanggilan awal:**
```
arraySum([1, -2, 3])
  → validasi: arr adalah array ✅
  → memanggil helper(2)   // index = arr.length - 1 = 2
```

**Tahap 2 — Proses rekursi (winding):**
```
helper(2)  → arr[2] = 3  → positif ✅ → 3 + helper(1)
helper(1)  → arr[1] = -2 → negatif ❌ → helper(0)  // dilewati!
helper(0)  → arr[0] = 1  → positif ✅ → 1 + helper(-1)
helper(-1) → 0  ✅ BASE CASE!
```

**Tahap 3 — Proses unwinding:**
```
helper(-1)           → 0
helper(0)            → 1 + 0  = 1
helper(1)            → 1      = 1  // -2 dilewati, tidak ditambahkan
helper(2)            → 3 + 1  = 4
arraySum([1, -2, 3]) → 4 🎉
```

> 🧠 **Perhatikan** saat `helper(1)` — karena `arr[1] = -2` tidak memenuhi kondisi `> 0`, fungsi langsung meneruskan nilai dari `helper(0)` tanpa menambahkan apapun. Angka negatif benar-benar "transparan" dalam perhitungan.

---

<a name="test-pos"></a>
### ✅ Test Cases — Positive Only

```js
const arraySum = require('./array-sum-positive');

test('Positive Only — arraySum hanya menjumlahkan angka positif', () => {
  expect(arraySum([1, 2, 3, 4, 5])).toEqual(15);     // semua positif
  expect(arraySum([-1, -2, -3, -4, -5])).toEqual(0); // semua negatif → 0
  expect(arraySum([1, -2, 3, -4, 5])).toEqual(9);    // campuran → 1+3+5
  expect(arraySum([0, 1, 2])).toEqual(3);             // nol dilewati
  expect(arraySum([])).toEqual(0);                    // array kosong
  expect(arraySum("bukan array")).toEqual(0);         // input invalid (V3)
});
```

---

<a name="kesimpulan"></a>
## 🏁 Kesimpulan & Perbandingan Akhir

Kita sudah menjelajahi **6 variasi** fungsi `arraySum` rekursif:

| Variasi | Kasus | Pendekatan | Keunggulan Utama |
|---|---|---|---|
| All — V1 | Semua angka | Slice | Paling mudah dibaca |
| All — V2 | Semua angka | Index param | Hemat memori |
| All — V3 | Semua angka | Helper function | Paling aman & bersih |
| Positive — V1 | Angka positif | Slice | Mudah dipahami |
| Positive — V2 | Angka positif | Index param | Hemat memori |
| Positive — V3 | Angka positif | Helper function | Paling aman & bersih |

**Kapan pakai yang mana?**

- 🟢 **V1 (Slice)** → Cocok untuk belajar dan kode yang butuh keterbacaan tinggi
- 🟡 **V2 (Index param)** → Cocok saat performa jadi pertimbangan, tapi struktur masih sederhana
- 🔵 **V3 (Helper)** → Cocok untuk kode produksi — bersih, aman, dan efisien sekaligus

> 🎓 **Takeaway:** Tidak ada satu pendekatan yang selalu terbaik. Pilihan tergantung konteks — apakah kamu prioritaskan keterbacaan, efisiensi memori, atau keamanan input. Yang terpenting, pahami **trade-off** dari setiap pendekatan.