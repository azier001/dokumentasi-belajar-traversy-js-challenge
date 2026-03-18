# 🧮 Tantangan: Hitung Total Penjualan

> **Uji kemampuanmu** dalam memanipulasi array dan kalkulasi numerik dengan JavaScript — lengkap dengan penerapan pajak!

---

## 📋 Instruksi

Gunakan array objek produk di bawah ini, di mana setiap objek memiliki nama, harga, dan jumlah terjual. Selain itu, kamu diberikan **tarif pajak** dalam bentuk persentase. Tulis sebuah fungsi bernama `calculateTotalSalesWithTax` yang menerima array objek produk beserta tarif pajak, lalu mengembalikan **total penjualan termasuk pajak**.

```js
const products = [
  { name: 'Apple', price: 0.5, quantity: 10 },
  { name: 'Banana', price: 0.3, quantity: 20 },
  { name: 'Orange', price: 0.6, quantity: 15 },
];
```

---

## ✍️ Function Signature

```js
/**
 * Menghitung dan mengembalikan total penjualan termasuk pajak
 * dari array produk dan tarif pajak yang diberikan.
 * @param {Object[]} products - Array objek produk.
 * @param {string} products[].name - Nama produk.
 * @param {number} products[].price - Harga produk.
 * @param {number} products[].quantity - Jumlah terjual dari produk.
 * @param {number} taxRate - Tarif pajak dalam bentuk persentase.
 * @returns {number} - Total penjualan termasuk pajak.
 */
function calculateTotalSalesWithTax(products: { name: string, price: number, quantity: number }[], taxRate: number): number;
```

---

## 💡 Contoh Penggunaan

```js
calculateTotalSalesWithTax(
  [
    { name: 'Apple', price: 0.5, quantity: 10 },
    { name: 'Banana', price: 0.3, quantity: 20 },
    { name: 'Orange', price: 0.6, quantity: 15 },
  ],
  8
); // 21.6 (20 + pajak 8%)

calculateTotalSalesWithTax(
  [
    { name: 'Chocolate', price: 2.5, quantity: 5 },
    { name: 'Chips', price: 1.2, quantity: 10 },
    { name: 'Soda', price: 1.0, quantity: 8 },
    { name: 'Candy', price: 0.5, quantity: 15 },
  ],
  5
); // 42 (40 + pajak 5%)
```

---

## ⚠️ Batasan

- Array input akan **selalu mengandung minimal satu** objek produk.
- Nilai `price` dan `quantity` adalah **bilangan positif**.
- `taxRate` adalah bilangan positif yang **kurang dari 100**.
- **Bulatkan** hasil hingga **2 angka desimal**.

---

## 🔍 Petunjuk

- Hitung total penjualan **sebelum** menerapkan pajak, lalu tambahkan jumlah pajak ke dalamnya.

---

## ✅ Solusi

<details>
  <summary>👆 Klik untuk Melihat Solusi</summary>

Solusi ini menghitung total penjualan termasuk pajak dengan cara mengiterasi produk-produk yang ada, menjumlahkan hasil perkalian `price` dan `quantity` untuk setiap produk, kemudian menambahkan jumlah pajak ke total tersebut.

```js
const products = [
  { name: 'Apple', price: 0.5, quantity: 10 },
  { name: 'Banana', price: 0.3, quantity: 20 },
  { name: 'Orange', price: 0.6, quantity: 15 },
];

function calculateTotalSalesWithTax(products, taxRate) {
  const totalSales = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const taxAmount = (totalSales * taxRate) / 100;
  const totalSalesWithTax = totalSales + taxAmount;
  return totalSalesWithTax;
}
```

### 📖 Penjelasan

- Hitung **total penjualan** menggunakan method `reduce` untuk mengiterasi array `products`, menjumlahkan hasil kali `price` dan `quantity` untuk setiap produk.
- Hitung **jumlah pajak** dengan mengalikan total penjualan dengan `taxRate` lalu membaginya dengan 100.
- Hitung **total penjualan termasuk pajak** dengan menjumlahkan total penjualan dan jumlah pajak.
- **Kembalikan** total penjualan termasuk pajak.

</details>

---

## 🧪 Test Cases

```js
test('Menghitung total penjualan dengan pajak', () => {
  expect(
    calculateTotalSalesWithTax(
      [
        { name: 'Apple', price: 0.5, quantity: 10 },
        { name: 'Banana', price: 0.3, quantity: 20 },
        { name: 'Orange', price: 0.6, quantity: 15 },
      ],
      8
    )
  ).toBe(21.6);

  expect(
    calculateTotalSalesWithTax(
      [
        { name: 'Chocolate', price: 2.5, quantity: 5 },
        { name: 'Chips', price: 1.2, quantity: 10 },
        { name: 'Soda', price: 1.0, quantity: 8 },
        { name: 'Candy', price: 0.5, quantity: 15 },
      ],
      5
    )
  ).toBe(42);
});
```

---

> 💬 **Catatan**: Jangan ragu untuk menyesuaikan tantangan atau test cases sesuai kebutuhan. Jika ada pertanyaan lebih lanjut atau butuh bantuan tambahan, silakan bertanya!