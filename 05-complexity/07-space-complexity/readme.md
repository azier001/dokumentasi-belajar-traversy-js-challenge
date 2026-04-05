# 🧠 Space Complexity

> Dokumentasi pribadi — dibuat dari video tutorial + kode praktik

---

## 📚 Daftar Isi

- 🔍 [Apa itu Space Complexity?](#apa-itu-space-complexity)
- ⚖️ [Space vs Time Complexity](#space-vs-time-complexity)
- 📏 [Aturan Menghitung Space Complexity](#aturan-menghitung-space-complexity)
- 💡 [Contoh-Contoh](#contoh-contoh)
  - 🟢 [O(1) — Constant Space](#o1--constant-space)
  - 🔵 [O(n) — Linear Space](#on--linear-space)
  - 🟠 [O(n²) — Quadratic Space](#on--quadratic-space)
  - 🟣 [O(log n) — Logarithmic Space](#olog-n--logarithmic-space)
  - 🔀 [Ketika Time ≠ Space](#ketika-time--space)
- 🚀 [Selanjutnya](#selanjutnya)

---

<a name="apa-itu-space-complexity"></a>
## 🔍 Apa itu Space Complexity?

Sebelumnya kita sudah belajar **time complexity** — yaitu gimana *waktu eksekusi* sebuah fungsi bertambah seiring inputnya membesar.

Nah, **space complexity** itu mirip, tapi fokusnya beda:

> 💬 **Space complexity** = seberapa banyak **memori** yang dipakai oleh sebuah fungsi atau algoritma, tergantung ukuran inputnya.

Intinya: kalau inputnya makin besar, apakah memori yang dibutuhkan ikut bertambah? Seberapa besar pertambahannya?

---

<a name="space-vs-time-complexity"></a>
## ⚖️ Space vs Time Complexity

Keduanya pakai notasi yang sama — **Big O** — dan punya kategori yang sama juga:

| Notasi | Nama |
|---|---|
| `O(1)` | Constant |
| `O(n)` | Linear |
| `O(n²)` | Quadratic |
| `O(log n)` | Logarithmic |
| `O(2ⁿ)` | Exponential |
| `O(n!)` | Factorial |

Bedanya: time complexity ngukur *operasi*, space complexity ngukur *memori*.

Seringkali keduanya nilainya sama — kalau time-nya `O(n)`, space-nya juga `O(n)`. Tapi **tidak selalu begitu**, dan kita akan lihat contohnya nanti.

---

<a name="aturan-menghitung-space-complexity"></a>
## 📏 Aturan Menghitung Space Complexity

Ada 3 hal yang perlu diingat:

### 📦 1. Variabel & Struktur Data Makan Memori
Setiap kali kamu deklarasi variabel atau pakai struktur data (array, object, dsb), itu butuh ruang di memori. Makin banyak dan makin besar variabelnya, makin besar space complexity-nya.

### 📞 2. Pemanggilan Fungsi Makan Memori
Setiap kali sebuah fungsi dipanggil, program perlu mengalokasikan memori untuk **call stack** — termasuk argumen, variabel lokal, return address, dll. Ini makin berat kalau ada **nested function calls** atau **rekursi**.

### ➕ 3. Space Complexity = Jumlah dari Semuanya
Space complexity total sebuah fungsi adalah **penjumlahan** dari semua variabel, struktur data, dan pemanggilan fungsi di dalamnya. Jadi kamu perlu mempertimbangkan semuanya, bukan hanya satu bagian.

---

<a name="contoh-contoh"></a>
## 💡 Contoh-Contoh

<a name="o1--constant-space"></a>
### 🟢 O(1) — Constant Space

Fungsi ini cukup sederhana: terima dua angka, langsung kembalikan hasilnya.

```js
// Space: O(1) | Time: O(1)
function add(num1, num2) {
  return num1 + num2;
}
```

✅ **Kenapa O(1)?**
Fungsi ini tidak membuat variabel baru atau struktur data apapun. Memori yang dipakai selalu sama, tidak peduli inputnya seberapa besar.

---

<a name="on--linear-space"></a>
### 🔵 O(n) — Linear Space

Fungsi ini membuat sebuah array dan mengisinya satu per satu lewat loop.

```js
// Space: O(n) | Time: O(n)
function createArray(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(i);
  }

  return arr;
}
```

✅ **Kenapa O(n)?**
Semakin besar `num`, semakin panjang array yang dibuat. Ukuran array tumbuh **seiring** inputnya — makanya ini linear, `O(n)`.

---

<a name="on--quadratic-space"></a>
### 🟠 O(n²) — Quadratic Space

Fungsi ini membuat **array dua dimensi** (matriks) pakai nested loop.

```js
// Space: O(n²) | Time: O(n²)
function createMatrix(num) {
  const matrix = [];

  for (let i = 0; i < num; i++) {
    matrix[i] = [];

    for (let j = 0; j < num; j++) {
      matrix[i][j] = i + j;
    }
  }

  return matrix;
}
```

✅ **Kenapa O(n²)?**
Kalau `num = 3`, matriksnya jadi 3×3 = 9 elemen. Kalau `num = 10`, jadi 10×10 = 100 elemen. Ukurannya tumbuh secara **kuadratik** — makanya ini `O(n²)`.

---

<a name="olog-n--logarithmic-space"></a>
### 🟣 O(log n) — Logarithmic Space

Fungsi ini menghitung pangkat sebuah angka menggunakan **rekursi**.

```js
// Space: O(log n) | Time: O(log n)
function findPower(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  if (exponent % 2 === 0) {
    const halfPower = findPower(base, exponent / 2);
    return halfPower * halfPower;
  } else {
    const halfPower = findPower(base, (exponent - 1) / 2);
    return base * halfPower * halfPower;
  }
}
```

✅ **Kenapa O(log n)?**
Setiap kali fungsi ini memanggil dirinya sendiri, `exponent`-nya **dibagi dua**. Jadi jumlah rekursi bertambah secara logaritmik. Tiap pemanggilan rekursif itu makan memori di call stack, makanya space-nya juga `O(log n)`.

---

<a name="ketika-time--space"></a>
### 🔀 Ketika Time ≠ Space

Ini contoh menarik di mana time dan space complexity-nya **berbeda**:

```js
// Space: O(1) | Time: O(n) ← Berbeda!
function findSum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}
```

✅ **Time-nya O(n):** Loop berjalan sebanyak panjang array, jadi waktu eksekusinya linear.

✅ **Space-nya O(1):** Fungsi ini hanya pakai **satu variabel** (`sum`), tidak peduli array inputnya sepanjang apapun. Makanya memori yang dipakai selalu konstan — `O(1)`.

> 💡 **Intinya:** Tidak semua fungsi punya time = space. Kadang satu lebih efisien dari yang lain!

---

<a name="selanjutnya"></a>
## 🚀 Selanjutnya

Setelah ini, kita akan belajar tentang **Sliding Window Technique** — sebuah cara untuk mengubah solusi kuadratik `O(n²)` (yang pakai nested loop) menjadi solusi linear `O(n)` yang jauh lebih efisien!