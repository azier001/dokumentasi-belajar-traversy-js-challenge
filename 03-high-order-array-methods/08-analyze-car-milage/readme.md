# 🚗 Tantangan: Analisis Mileage Mobil

> **Gunakan higher-order array methods** untuk menganalisis data mileage dari sekumpulan objek mobil — hitung rata-rata, temukan yang tertinggi & terendah, serta total keseluruhan.

---

## 📋 Instruksi

Kamu diberikan sebuah array berisi objek-objek mobil, masing-masing memuat informasi tentang **make**, **model**, **year**, dan **mileage** sebuah mobil. Tujuanmu adalah melakukan analisis pada data mileage menggunakan **higher-order array methods**.

Implementasikan sebuah fungsi bernama `analyzeCarMileage` yang menerima array objek mobil dan melakukan tugas-tugas berikut:

1. Hitung **rata-rata mileage** dari semua mobil.
2. Temukan **mobil dengan mileage tertinggi**.
3. Temukan **mobil dengan mileage terendah**.
4. Hitung **total mileage** dari semua mobil yang digabungkan.

Fungsi ini harus mengembalikan sebuah **object** yang berisi nilai-nilai yang telah dihitung sebagai propertinya.

Berikut adalah object yang bisa kamu gunakan untuk menguji fungsimu di file run:

```js
const cars = [
  { make: 'Toyota', model: 'Camry', year: 2020, mileage: 30800 },
  { make: 'Honda', model: 'Civic', year: 2019, mileage: 32000 },
  { make: 'Chevrolet', model: 'Impala', year: 2021, mileage: 17500 },
  { make: 'Audi', model: 'R8', year: 2020, mileage: 13000 },
  { make: 'Tesla', model: 'Model 3', year: 2018, mileage: 50000 },
];
```

---

## ✍️ Signature Fungsi

```js
/**
 * Menganalisis data mileage mobil menggunakan higher-order array methods.
 * @param {Array} cars - Sebuah array berisi objek-objek mobil.
 * @returns {Object} - Sebuah object yang berisi nilai-nilai hasil perhitungan.
 */
function analyzeCarMileage(cars: object[]): object;
```

Setiap objek mobil akan memiliki properti-properti berikut:

- `make` — Merek mobil (**string**).
- `model` — Model mobil (**string**).
- `year` — Tahun pembuatan mobil (**number**).
- `mileage` — Jarak tempuh mobil (**number**).

---

## 💡 Contoh

```js
const cars = [
  { make: 'Toyota', model: 'Corolla', year: 2020, mileage: 25000 },
  { make: 'Honda', model: 'Civic', year: 2019, mileage: 30000 },
  { make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000 },
];

const analysis = analyzeCarMileage(cars);
console.log(analysis);
// Output:
// {
//   averageMileage: 23333.33,
//   highestMileageCar: { make: "Honda", model: "Civic", year: 2019, mileage: 30000 },
//   lowestMileageCar: { make: "Ford", model: "Mustang", year: 2021, mileage: 15000 },
//   totalMileage: 70000
// }
```

---

## ⚠️ Batasan

- Array input `cars` akan berisi **paling banyak 100** objek mobil.
- Properti `mileage` setiap objek mobil akan berupa **bilangan bulat positif**.
- Hasil harus **dibulatkan hingga 2 angka desimal**.
- Jika array `cars` kosong atau `null`, fungsi akan **melempar `Error`**.

---

## 🔍 Petunjuk

- Kamu bisa menggunakan method `reduce` untuk sebagian besar perhitungan.

---

## ✅ Solusi

<details>
  <summary>Klik untuk melihat solusi</summary>

```js
function analyzeCarMileage(cars) {
  const totalMileage = cars.reduce((sum, car) => sum + car.mileage, 0);
  const averageMileage = totalMileage / cars.length;
  const highestMileageCar = cars.reduce(
    (highest, car) => (car.mileage > highest.mileage ? car : highest),
    cars[0]
  );
  const lowestMileageCar = cars.reduce(
    (lowest, car) => (car.mileage < lowest.mileage ? car : lowest),
    cars[0]
  );

  return {
    averageMileage: parseFloat(averageMileage.toFixed(2)),
    highestMileageCar,
    lowestMileageCar,
    totalMileage,
  };
}
```

### 🧠 Penjelasan

- Buat variabel `totalMileage` dan inisialisasi dengan hasil pemanggilan method `reduce` pada array `cars`. Akumulator menjumlahkan akumulator dengan mileage setiap mobil. Nilai awal `0` digunakan sebagai nilai awal akumulator.
- Buat variabel `averageMileage` dan inisialisasi dengan hasil pembagian `totalMileage` dengan panjang array `cars`.
- Buat variabel `highestMileageCar` dan inisialisasi dengan hasil pemanggilan method `reduce` pada array `cars`. Akumulator menyimpan mobil dengan mileage tertinggi. Nilai awal `cars[0]` digunakan sebagai nilai awal akumulator.
- Buat variabel `lowestMileageCar` dan inisialisasi dengan hasil pemanggilan method `reduce` pada array `cars`. Akumulator menyimpan mobil dengan mileage terendah. Nilai awal `cars[0]` digunakan sebagai nilai awal akumulator.
- Kembalikan sebuah object yang berisi nilai-nilai yang telah dihitung. Bulatkan `averageMileage` hingga 2 angka desimal menggunakan method `toFixed` dan konversikan ke number menggunakan method `parseFloat`.

---

### 🔬 Pembahasan Mendalam: `reduce` untuk `highestMileageCar`

Kita tahu bahwa `reduce` bisa sedikit sulit dipahami, jadi mari kita uraikan secara detail untuk variabel `highestMileageCar`. Berikut kodenya sebagai referensi:

```js
const highestMileageCar = cars.reduce(
  (highest, car) => (car.mileage > highest.mileage ? car : highest),
  cars[0]
);
```

1. `reduce` menerima dua argumen utama: sebuah **fungsi** dan sebuah **nilai awal**. Nilai awal diatur ke `cars[0]`, yaitu mobil pertama dalam daftar.
2. Fungsi tersebut menerima dua parameter: `highest` dan `car`. `highest` awalnya menyimpan mobil pertama, dan `car` adalah mobil berikutnya dalam daftar.
3. Untuk setiap mobil, fungsi membandingkan mileage mobil saat ini `car.mileage` dengan mileage mobil yang dianggap tertinggi sejauh ini `highest.mileage`.
4. Jika mileage mobil saat ini **lebih besar**, kita mengganti nilai `highest` dengan mobil saat ini.
5. Jika mileage mobil saat ini **tidak lebih besar**, kita tetap menggunakan mobil yang dianggap terbaik sejauh ini (`highest`).
6. Proses ini **berulang** untuk setiap mobil dalam daftar.

Apapun yang kita kembalikan dari callback method `reduce` akan menjadi **nilai baru dari akumulator**.

</details>

---

## 💡 Solusi Alternatif

<details>
  <summary>Klik untuk melihat solusi alternatif</summary>

```js
function analyzeCarMileage(cars) {
  if (!cars || cars.length === 0) {
    throw new Error('Array cars tidak boleh kosong');
  }

  const totalMileage = cars.reduce((total, { mileage }) => total + mileage, 0);
  const averageMileage = totalMileage / cars.length;
  const roundedAverageMileage = Math.round(averageMileage * 100) / 100;

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

### 🧠 Perbedaan dengan Solusi Referensi

- **Guard clause** di awal fungsi — jika `cars` kosong atau `null`, fungsi langsung melempar `Error` yang jelas daripada gagal diam-diam
- **Destructuring** `{ mileage }` pada parameter `reduce` — lebih ringkas dan elegan dibanding mengakses `car.mileage` secara eksplisit
- **Tanpa initial value** pada `reduce` untuk `highestMileageCar` dan `lowestMileageCar` — `reduce` otomatis menggunakan elemen pertama sebagai akumulator awal, sehingga tidak perlu menulis `cars[0]` secara manual
- **`Math.round(averageMileage * 100) / 100`** sebagai pengganti `parseFloat(toFixed(2))` — hasilnya sudah guaranteed `number`, tidak perlu parsing ulang

</details>

---

## 🧪 Test Cases

```js
test('Analyzing Car Mileage Data', () => {
  const cars = [
    { make: 'Toyota', model: 'Corolla', year: 2020, mileage: 25000 },
    { make: 'Honda', model: 'Civic', year: 2019, mileage: 30000 },
    { make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000 },
  ];

  const analysis = analyzeCarMileage(cars);

  expect(analysis.averageMileage).toBeCloseTo(23333.33);
  expect(analysis.highestMileageCar).toEqual({
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    mileage: 30000,
  });
  expect(analysis.lowestMileageCar).toEqual({
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    mileage: 15000,
  });
  expect(analysis.totalMileage).toBe(70000);
});
```

> 💬 Jangan ragu untuk menambahkan lebih banyak test cases guna memverifikasi kebenaran fungsi `analyzeCarMileage` milikmu.

```js
test('Throws error on empty array', () => {
  expect(() => analyzeCarMileage([])).toThrow('Array cars tidak boleh kosong');
});

test('Throws error on null input', () => {
  expect(() => analyzeCarMileage(null)).toThrow('Array cars tidak boleh kosong');
});
```