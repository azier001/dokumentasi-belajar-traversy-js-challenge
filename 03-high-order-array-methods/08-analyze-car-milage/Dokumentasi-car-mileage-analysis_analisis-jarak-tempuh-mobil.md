# 🚗 Car Mileage Analysis — Dokumentasi Pribadi

> Catatan belajar dari video tutorial: **Car Mileage Analysis** menggunakan Higher-Order Array Methods di JavaScript.

---

## 📚 Daftar Isi

- 🔍 [Pengenalan](#pengenalan)
- 🎯 [Tujuan Challenge](#tujuan-challenge)
- 📦 [Struktur Data](#struktur-data)
- 🔁 [Cara Kerja `reduce`](#cara-kerja-reduce)
- 🧮 [Menghitung Total Mileage](#menghitung-total-mileage)
- 📊 [Menghitung Rata-rata Mileage](#menghitung-rata-rata-mileage)
- 🏆 [Menemukan Mileage Tertinggi](#menemukan-mileage-tertinggi)
- 🥇 [Menemukan Mileage Terendah](#menemukan-mileage-terendah)
- 📤 [Mengembalikan Hasil (Return Object)](#mengembalikan-hasil)
- ✅ [Kode Lengkap](#kode-lengkap)
- 🚀 [Versi Improvement](#versi-improvement)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🔍 Pengenalan

Di challenge ini kita akan berlatih menggunakan **Higher-Order Array Methods**, khususnya `reduce`, untuk menganalisis data mileage (jarak tempuh) dari sekumpulan objek mobil.

Challenge ini bagus untuk membiasakan diri dengan `reduce` — salah satu method yang sering membingungkan pemula, termasuk instruktur sendiri yang mengakui hal itu.

---

<a name="tujuan-challenge"></a>
## 🎯 Tujuan Challenge

Buat sebuah function bernama `analyzeCarMileage` yang menerima array berisi objek-objek mobil, lalu mengembalikan sebuah object dengan 4 informasi berikut:

| # | Yang Dicari | Nama Property |
|---|-------------|---------------|
| 1 | Rata-rata mileage semua mobil | `averageMileage` |
| 2 | Mobil dengan mileage tertinggi | `highestMileageCar` |
| 3 | Mobil dengan mileage terendah | `lowestMileageCar` |
| 4 | Total mileage semua mobil dijumlah | `totalMileage` |

> 💡 **Catatan:** Hasil harus dibulatkan ke **2 angka desimal**.

---

<a name="struktur-data"></a>
## 📦 Struktur Data

Setiap objek mobil punya 4 properti:

```js
{
  make: 'Toyota',     // Merek mobil (string)
  model: 'Camry',     // Model mobil (string)
  year: 2020,         // Tahun produksi (number)
  mileage: 30800      // Jarak tempuh (number, selalu positif)
}
```

Ini contoh array yang bisa dipakai untuk testing:

```js
const cars = [
  { make: 'Toyota',    model: 'Camry',   year: 2020, mileage: 30800 },
  { make: 'Honda',     model: 'Civic',   year: 2019, mileage: 32000 },
  { make: 'Chevrolet', model: 'Impala',  year: 2021, mileage: 17500 },
  { make: 'Audi',      model: 'R8',      year: 2020, mileage: 13000 },
  { make: 'Tesla',     model: 'Model 3', year: 2018, mileage: 50000 },
];
```

---

<a name="cara-kerja-reduce"></a>
## 🔁 Cara Kerja `reduce`

Sebelum masuk ke kode, penting banget paham dulu cara kerja `reduce` karena kita akan pakai ini hampir di semua bagian.

`reduce` akan **menelusuri setiap elemen array** sambil membawa satu nilai "akumulasi" (accumulator) yang terus diperbarui di setiap iterasi.

**Struktur dasarnya:**

```js
array.reduce((accumulator, currentItem) => {
  // lakukan sesuatu
  return nilaiBaruUntukAccumulator;
}, nilaiAwal);
```

**Analogi:** Bayangkan kamu punya tumpukan bon belanja. Kamu mulai dari angka 0, terus menjumlahkan satu per satu bon sampai habis — hasil akhirnya adalah total pengeluaran. Itulah yang dilakukan `reduce`.

---

<a name="menghitung-total-mileage"></a>
## 🧮 Menghitung Total Mileage

Ini bagian paling mudah. Kita pakai `reduce` untuk menjumlahkan semua nilai `mileage`.

```js
// Accumulator diberi nama 'sum', mulai dari 0
// Setiap iterasi: tambahkan mileage mobil saat ini ke sum
const totalMileage = cars.reduce((sum, car) => sum + car.mileage, 0);
```

**Langkah per langkah dengan contoh data:**

| Iterasi | Mobil | Mileage | Sum Setelah Iterasi |
|---------|-------|---------|---------------------|
| 1 | Toyota Camry | 30800 | 0 + 30800 = **30800** |
| 2 | Honda Civic | 32000 | 30800 + 32000 = **62800** |
| 3 | Chevrolet Impala | 17500 | 62800 + 17500 = **80300** |
| 4 | Audi R8 | 13000 | 80300 + 13000 = **93300** |
| 5 | Tesla Model 3 | 50000 | 93300 + 50000 = **143300** |

> Hasil: `totalMileage = 143300`

---

<a name="menghitung-rata-rata-mileage"></a>
## 📊 Menghitung Rata-rata Mileage

Setelah punya total, rata-rata tinggal dibagi jumlah mobilnya.

```js
// Bagi total mileage dengan jumlah elemen di array
const averageMileage = totalMileage / cars.length;
```

Dari contoh di atas: `143300 / 5 = 28660`

---

<a name="menemukan-mileage-tertinggi"></a>
## 🏆 Menemukan Mileage Tertinggi

Di sini `reduce` dipakai dengan cara yang berbeda — **accumulatornya bukan angka, melainkan sebuah objek mobil**.

```js
const highestMileageCar = cars.reduce(
  (highest, car) => (car.mileage > highest.mileage ? car : highest),
  cars[0]  // 👈 nilai awal: mobil pertama di array
);
```

**Cara bacanya:**
- Mulai dengan anggapan mobil pertama (`cars[0]`) adalah yang tertinggi
- Untuk setiap mobil berikutnya, bandingkan mileage-nya dengan `highest`
- Kalau mileage mobil saat ini **lebih besar**, ganti `highest` dengan mobil itu
- Kalau tidak, pertahankan `highest` yang lama
- Setelah semua mobil diperiksa, `highest` adalah pemenangnya

> 🏁 Dari contoh data: **Tesla Model 3** dengan mileage **50,000**

---

<a name="menemukan-mileage-terendah"></a>
## 🥇 Menemukan Mileage Terendah

Polanya hampir sama persis dengan mencari tertinggi — hanya tanda pembandingnya yang berubah dari `>` menjadi `<`.

```js
const lowestMileageCar = cars.reduce(
  (lowest, car) => (car.mileage < lowest.mileage ? car : lowest),
  cars[0]  // 👈 nilai awal: mobil pertama di array
);
```

**Logikanya:**
- Kalau mileage mobil saat ini **lebih kecil** dari `lowest`, ganti dengan mobil itu
- Kalau tidak, pertahankan `lowest` yang lama

> 🥇 Dari contoh data: **Audi R8** dengan mileage **13,000**

---

<a name="mengembalikan-hasil"></a>
## 📤 Mengembalikan Hasil (Return Object)

Terakhir, semua nilai yang sudah dihitung dikemas dalam satu object dan dikembalikan.

```js
return {
  // parseFloat + toFixed(2) untuk membulatkan ke 2 desimal
  averageMileage: parseFloat(averageMileage.toFixed(2)),
  highestMileageCar,
  lowestMileageCar,
  totalMileage,
};
```

> 💡 **Kenapa `parseFloat(averageMileage.toFixed(2))`?**
> - `.toFixed(2)` membulatkan angka ke 2 desimal, tapi **mengubahnya jadi string** (misal `"28660.00"`)
> - `parseFloat(...)` mengubah string itu kembali jadi **number** (`28660`)

---

<a name="kode-lengkap"></a>
## ✅ Kode Lengkap

```js
function analyzeCarMileage(cars) {
  // 1. Jumlahkan semua mileage
  const totalMileage = cars.reduce((sum, car) => sum + car.mileage, 0);

  // 2. Hitung rata-rata
  const averageMileage = totalMileage / cars.length;

  // 3. Cari mobil dengan mileage tertinggi
  const highestMileageCar = cars.reduce(
    (highest, car) => (car.mileage > highest.mileage ? car : highest),
    cars[0]
  );

  // 4. Cari mobil dengan mileage terendah
  const lowestMileageCar = cars.reduce(
    (lowest, car) => (car.mileage < lowest.mileage ? car : lowest),
    cars[0]
  );

  // 5. Kembalikan semua hasil dalam satu object
  return {
    averageMileage: parseFloat(averageMileage.toFixed(2)),
    highestMileageCar,
    lowestMileageCar,
    totalMileage,
  };
}

module.exports = analyzeCarMileage;
```

**Contoh output saat dijalankan:**

```js
{
  averageMileage: 28660,
  highestMileageCar: { make: 'Tesla', model: 'Model 3', year: 2018, mileage: 50000 },
  lowestMileageCar:  { make: 'Audi',  model: 'R8',      year: 2020, mileage: 13000 },
  totalMileage: 143300
}
```

---

<a name="versi-improvement"></a>
## 🚀 Versi Improvement

Setelah memahami solusi dari video, ini versi yang saya tulis sendiri dengan beberapa perbaikan:

```js
function analyzeCarMileage(cars) {
  // ✅ Guard clause — lempar error jika array kosong atau tidak valid
  if (!cars || cars.length === 0) {
    throw new Error('Array cars tidak boleh kosong');
  }

  // ✅ Destructuring { mileage } langsung di parameter — lebih ringkas
  const totalMileage = cars.reduce((total, { mileage }) => total + mileage, 0);
  const averageMileage = totalMileage / cars.length;

  // ✅ Math.round sebagai alternatif pembulatan
  const roundedAverageMileage = Math.round(averageMileage * 100) / 100;

  // ✅ reduce tanpa initial value — otomatis pakai elemen pertama sebagai accumulator
  const highestMileageCar = cars.reduce((max, current) => {
    return current.mileage > max.mileage ? current : max;
  });

  const lowestMileageCar = cars.reduce((min, current) => {
    return current.mileage < min.mileage ? current : min;
  });

  return {
    averageMileage: roundedAverageMileage,
    highestMileageCar,
    lowestMileageCar,
    totalMileage,
  };
}
```

**Apa yang berubah dari solusi video?**

| # | Perubahan | Kenapa Lebih Baik |
|---|-----------|-------------------|
| 1 | Tambah **guard clause** di awal | Kalau array kosong, error-nya jelas dan tidak crash tiba-tiba |
| 2 | **Destructuring** `{ mileage }` di parameter reduce | Lebih ringkas, tidak perlu tulis `car.mileage` berulang |
| 3 | `reduce` untuk highest/lowest **tanpa initial value** | Kalau tidak ada initial value, `reduce` otomatis pakai `cars[0]` — tidak perlu tulis manual |
| 4 | `Math.round(x * 100) / 100` sebagai **alternatif** `parseFloat(toFixed(2))` | Sama-sama valid, ini pendekatan yang berbeda untuk pembulatan |

> ⚠️ **Catatan kecil soal pembulatan:**
> `Math.round` dan `toFixed(2)` punya hasil yang sedikit berbeda di edge case tertentu (misal angka yang tepat di tengah seperti `x.335`). Untuk kebanyakan kasus belajar, keduanya tidak masalah.

---

<a name="test-cases"></a>
## 🧪 Test Cases

Untuk menjalankan test: `npm test`

```js
test('Analyzing Car Mileage Data', () => {
  const cars = [
    { make: 'Toyota', model: 'Corolla', year: 2020, mileage: 25000 },
    { make: 'Honda',  model: 'Civic',   year: 2019, mileage: 30000 },
    { make: 'Ford',   model: 'Mustang', year: 2021, mileage: 15000 },
  ];

  const analysis = analyzeCarMileage(cars);

  expect(analysis.averageMileage).toBeCloseTo(23333.33);
  expect(analysis.highestMileageCar).toEqual({
    make: 'Honda', model: 'Civic', year: 2019, mileage: 30000,
  });
  expect(analysis.lowestMileageCar).toEqual({
    make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000,
  });
  expect(analysis.totalMileage).toBe(70000);
});
```

> ✅ Jika semua test lulus, output terminal akan menampilkan **PASS**.

---

*Dokumentasi ini dibuat untuk keperluan belajar pribadi — bebas dimodifikasi sesuai kebutuhan* 📝