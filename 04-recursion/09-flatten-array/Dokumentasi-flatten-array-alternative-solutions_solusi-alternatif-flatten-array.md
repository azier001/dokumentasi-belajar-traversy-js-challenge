# 🧩 Flatten Array — Solusi Alternatif

> Kumpulan solusi alternatif lanjutan dari tantangan Flatten Array.
> Lihat dokumentasi utama untuk instruksi lengkap, batasan, dan test cases.

---

## 📚 Daftar Isi

- 🔢 [Solusi 3 — `reduce` + `concat` + Rekursi](#solusi-3)
- 🏗️ [Solusi 4 — Inner Function + `reduce` + `concat`](#solusi-4)
- 🔀 [Solusi 5 — Inner Function + `reduce` + Spread](#solusi-5)
- ⚡ [Solusi 6 — `reduce` + `concat` Langsung](#solusi-6)
- 🌀 [Solusi 7 — `reduce` + Spread Langsung](#solusi-7)
- 🏆 [Solusi 8 — `flat(Infinity)`](#solusi-8)
- 📊 [Tabel Perbandingan](#tabel-perbandingan)

---

<a name="solusi-3"></a>

<details>
  <summary>🔓 Solusi 3 — Menggunakan <code>reduce</code> + <code>concat</code> + Rekursi</summary>

```js
function flattenArray(arr) {
  return arr.reduce((acc, item) => {
    return Array.isArray(item)
      ? acc.concat(flattenArray(item))
      : acc.concat(item);
  }, []);
}
```

### 🧠 Penjelasan

- Menggunakan `reduce` untuk mengakumulasi hasil ke dalam array kosong `[]` sebagai **initial value**.
- Di setiap iterasi, jika `item` adalah array, fungsi dipanggil **secara rekursif** lalu digabung ke `acc` menggunakan `concat`.
- Jika `item` bukan array, langsung digabung ke `acc`.
- Pendekatan ini lebih **fungsional** (*functional programming style*) dibanding loop `for...of`.

</details>

---

<a name="solusi-4"></a>

<details>
  <summary>🔓 Solusi 4 — Menggunakan Inner Function + <code>reduce</code> + <code>concat</code></summary>

```js
const flattenArray = (arr) => {
  const flatten = (item) => {
    // Base case: kalau bukan array, kembalikan langsung
    if (!Array.isArray(item)) return item
    // Recursive case: reduce tiap elemen, concat hasilnya ke accumulator
    return item.reduce((acc, current) => {
      return acc.concat(flatten(current))
    }, [])
  }
  return flatten(arr)
}
```

### 🧠 Penjelasan

- Mendefinisikan **inner function** `flatten` di dalam `flattenArray` untuk menangani rekursi — memisahkan logika rekursi dari fungsi utama.
- **Base case**: mengembalikan `item` secara langsung (bukan dibungkus `[item]`), karena `concat` sudah bisa menangani nilai non-array secara native — ia otomatis membungkusnya menjadi elemen tunggal.
- **Recursive case**: gunakan `reduce` untuk mengiterasi setiap elemen, lalu gabungkan hasil pemanggilan `flatten(current)` ke accumulator menggunakan `concat`.
- Fungsi utama `flattenArray` hanya bertugas sebagai **entry point** yang memanggil `flatten(arr)`.

</details>

---

<a name="solusi-5"></a>

<details>
  <summary>🔓 Solusi 5 — Menggunakan Inner Function + <code>reduce</code> + Spread</summary>

```js
const flattenArray = (arr) => {
  const flatten = (item) => {
    // Base case: kalau bukan array, bungkus jadi array agar bisa di-spread
    if (!Array.isArray(item)) return [item]
    // Recursive case: reduce setiap elemen, spread hasilnya ke accumulator
    return item.reduce((acc, current) => [...acc, ...flatten(current)], [])
  }
  return flatten(arr)
}
```

### 🧠 Penjelasan

- Strukturnya **identik dengan Solusi 4** — menggunakan inner function `flatten` sebagai entry point rekursi.
- Perbedaan utama ada di dua hal:
  - **Base case**: mengembalikan `[item]` (dibungkus array), karena spread `...` membutuhkan nilai berupa array agar bisa diurai dengan benar.
  - **Penggabungan hasil**: menggunakan spread `[...acc, ...flatten(current)]` alih-alih `concat`, sehingga elemen dimasukkan satu per satu ke array baru di setiap iterasi.
- Pola `[...acc, ...flatten(current)]` membangun array baru di setiap iterasi — lebih **deklaratif** namun berpotensi lebih boros memori dibanding `concat` untuk array yang sangat besar.

</details>

---

<a name="solusi-6"></a>

<details>
  <summary>🔓 Solusi 6 — Menggunakan <code>reduce</code> + <code>concat</code> Langsung (Tanpa Inner Function)</summary>

```js
// Pakai concat untuk menggabungkan hasil rekursi ke accumulator
const flattenArray = (arr) => {
  return arr.reduce((acc, item) => {
    return acc.concat(
      Array.isArray(item) ? flattenArray(item) : item
    )
  }, [])
}
```

### 🧠 Penjelasan

- Tidak menggunakan inner function — `flattenArray` **langsung memanggil dirinya sendiri** secara rekursif.
- Ternary operator dipindahkan **ke dalam argumen `concat`** — menjadikan keseluruhan logika hanya satu ekspresi yang sangat padat.
- `concat` menangani kedua kondisi secara seragam: jika hasilnya array (dari rekursi), elemen-elemennya akan **diratakan satu level** ke `acc`; jika bukan array, langsung ditambahkan sebagai elemen tunggal.
- Dibanding Solusi 4 dan 5, pendekatan ini lebih **langsung** karena tidak ada lapisan abstraksi tambahan dari inner function.

</details>

---

<a name="solusi-7"></a>

<details>
  <summary>🔓 Solusi 7 — Menggunakan <code>reduce</code> + Spread Langsung (Tanpa Inner Function)</summary>

```js
// Fungsi langsung rekursi ke dirinya sendiri, tanpa inner function
const flattenArray = (arr) => {
  return arr.reduce((acc, item) => {
    return Array.isArray(item)
      ? [...acc, ...flattenArray(item)]  // kalau array → rekursi, spread hasilnya
      : [...acc, item]                   // kalau bukan array → langsung masukkan
  }, [])
}
```

### 🧠 Penjelasan

- Strukturnya **identik dengan Solusi 6**, perbedaannya hanya pada cara penggabungan hasil.
- Menggunakan `reduce` dengan ternary operator untuk memisahkan dua kondisi secara ringkas dalam satu ekspresi.
- **Recursive case**: jika `item` adalah array, rekursi dipanggil lalu hasilnya di-spread ke accumulator `acc`.
- **Base case**: jika `item` bukan array, langsung di-spread sebagai elemen tunggal ke `acc`.
- Dibanding Solusi 6 yang menggunakan `concat`, pendekatan spread ini lebih **eksplisit** secara visual namun menghasilkan array baru di setiap iterasi.

</details>

---

<a name="solusi-8"></a>

<details>
  <summary>🔓 Solusi 8 — Menggunakan <code>flat(Infinity)</code></summary>

```js
function flattenArray(arr) {
  return arr.flat(Infinity);
}
```

### 🧠 Penjelasan

- Method bawaan JavaScript `flat()` menerima argumen **depth** yang menentukan seberapa dalam nested array akan diratakan.
- Dengan mengoper `Infinity`, kita memastikan **semua level kedalaman** diratakan sekaligus tanpa perlu rekursi manual.
- Solusi ini paling **ringkas dan readable**, cocok digunakan di lingkungan yang mendukung ES2019+.

</details>

---

<a name="tabel-perbandingan"></a>

## 📊 Tabel Perbandingan

| Solusi | Pendekatan | Inner Function | Rekursi | Keunggulan |
|---|---|---|---|---|
| 3 — `reduce` + `concat` | Fungsional | ❌ | ✅ | Gaya functional programming |
| 4 — Inner Function + `reduce` + `concat` | Fungsional + terstruktur | ✅ | ✅ | Logika rekursi terpisah, base case toleran |
| 5 — Inner Function + `reduce` + spread | Fungsional + terstruktur | ✅ | ✅ | Sama dengan Solusi 4, lebih eksplisit dengan spread |
| 6 — `reduce` + `concat` langsung | Fungsional | ❌ | ✅ | Paling padat, tanpa abstraksi tambahan |
| 7 — `reduce` + spread langsung | Fungsional | ❌ | ✅ | Variasi eksplisit dari Solusi 6 |
| 8 — `flat(Infinity)` | Built-in | ❌ | ❌ | Paling ringkas, satu baris |