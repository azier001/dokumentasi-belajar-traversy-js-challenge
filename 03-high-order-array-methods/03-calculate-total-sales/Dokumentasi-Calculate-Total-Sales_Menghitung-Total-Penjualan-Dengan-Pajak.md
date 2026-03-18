# 🧾 Challenge: Calculate Total Sales with Tax

Dokumentasi pribadi dari video tutorial — cara menghitung total penjualan dengan pajak menggunakan JavaScript.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🧩 [Studi Kasus](#studi-kasus)
- 🔧 [Membangun Fungsi](#membangun-fungsi)
- ➕ [Menghitung Total Sales dengan `reduce`](#menghitung-total-sales-dengan-reduce)
- 💰 [Menambahkan Pajak](#menambahkan-pajak)
- 🔢 [Membulatkan ke 2 Desimal](#membulatkan-ke-2-desimal)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Di challenge ini, kita diminta membuat sebuah fungsi bernama `calculateTotalSalesWithTax`.

Fungsi ini bertugas:
- Menerima sebuah **array berisi objek produk** (nama, harga, jumlah)
- Menerima sebuah **tax rate** (persentase pajak)
- Mengembalikan **total harga termasuk pajak**, dibulatkan ke 2 desimal

---

<a name="studi-kasus"></a>
## 🧩 Studi Kasus

Misalnya kita punya data produk seperti ini:

```js
const products = [
  { name: 'Apple',  price: 0.5, quantity: 10 },
  { name: 'Banana', price: 0.3, quantity: 20 },
  { name: 'Orange', price: 0.6, quantity: 15 },
];
```

Setiap produk punya:
- `name` → nama produk
- `price` → harga satuan
- `quantity` → jumlah yang terjual

Kalau kita hitung manual:

| Produk | Harga | Qty | Subtotal |
|--------|-------|-----|----------|
| Apple  | 0.5   | 10  | 5.0      |
| Banana | 0.3   | 20  | 6.0      |
| Orange | 0.6   | 15  | 9.0      |
| **Total** | | | **20.0** |

Dengan pajak 8%: `20 + (20 × 8 / 100) = 20 + 1.6 = **21.6** ✅`

---

<a name="membangun-fungsi"></a>
## 🔧 Membangun Fungsi

Fungsi kita menerima dua parameter:

```js
function calculateTotalSalesWithTax(products, taxRate) {
  // ...
}
```

- `products` → array of objects (produk-produk)
- `taxRate` → angka 1–100, misalnya `8` artinya 8%

---

<a name="menghitung-total-sales-dengan-reduce"></a>
## ➕ Menghitung Total Sales dengan `reduce`

> 💡 `reduce` sangat berguna saat kita ingin **"merangkum"** seluruh item dalam array menjadi satu nilai, misalnya total harga keranjang belanja di e-commerce.

Karena `products` berisi objek (bukan angka biasa), kita harus mengambil `product.price` dan `product.quantity` secara eksplisit:

```js
const totalSales = products.reduce(
  (sum, product) => sum + product.price * product.quantity,
  0  // nilai awal sum = 0
);
```

Cara bacanya:
- Mulai dari `sum = 0`
- Untuk setiap `product`, tambahkan `harga × jumlah` ke `sum`
- Hasilnya adalah total penjualan sebelum pajak

---

<a name="menambahkan-pajak"></a>
## 💰 Menambahkan Pajak

Setelah dapat total penjualan, kita hitung pajak dan tambahkan:

```js
// Hitung jumlah pajak
const taxAmount = (totalSales * taxRate) / 100;

// Total akhir = penjualan + pajak
const totalSalesWithTax = totalSales + taxAmount;
```

Contoh: `totalSales = 20`, `taxRate = 8`
- `taxAmount = (20 × 8) / 100 = 1.6`
- `totalSalesWithTax = 20 + 1.6 = 21.6` ✅

---

<a name="membulatkan-ke-2-desimal"></a>
## 🔢 Membulatkan ke 2 Desimal

Karena kita berurusan dengan uang, hasilnya perlu dibulatkan ke 2 angka desimal.

Caranya: kombinasikan `.toFixed(2)` dan `parseFloat()`:

```js
return parseFloat(totalSalesWithTax.toFixed(2));
```

- `.toFixed(2)` → mengubah angka jadi string dengan 2 desimal, misal `"21.60"`
- `parseFloat(...)` → mengubah string itu kembali jadi angka, misal `21.6`

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

```js
function calculateTotalSalesWithTax(products, taxRate) {
  // 1. Hitung total penjualan (harga × qty untuk setiap produk)
  const totalSales = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // 2. Hitung jumlah pajak
  const taxAmount = (totalSales * taxRate) / 100;

  // 3. Tambahkan pajak ke total
  const totalSalesWithTax = totalSales + taxAmount;

  // 4. Kembalikan hasil, dibulatkan ke 2 desimal
  return parseFloat(totalSalesWithTax.toFixed(2));
}

module.exports = calculateTotalSalesWithTax;
```

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
// Test 1 — Apple, Banana, Orange dengan pajak 8%
calculateTotalSalesWithTax(
  [
    { name: 'Apple',  price: 0.5, quantity: 10 },
    { name: 'Banana', price: 0.3, quantity: 20 },
    { name: 'Orange', price: 0.6, quantity: 15 },
  ],
  8
);
// → 21.6  (total 20 + 8% pajak)

// Test 2 — Chocolate, Chips, Soda, Candy dengan pajak 5%
calculateTotalSalesWithTax(
  [
    { name: 'Chocolate', price: 2.5, quantity: 5  },
    { name: 'Chips',     price: 1.2, quantity: 10 },
    { name: 'Soda',      price: 1.0, quantity: 8  },
    { name: 'Candy',     price: 0.5, quantity: 15 },
  ],
  5
);
// → 42  (total 40 + 5% pajak)
```

Kedua test di atas **passed** ✅

---

> 📝 **Catatan Penting:**
> - Array produk minimal berisi 1 objek
> - `price` dan `quantity` selalu bilangan positif
> - `taxRate` adalah bilangan positif di bawah 100
> - Hasil selalu dibulatkan ke 2 desimal