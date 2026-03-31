# 🔄 Number Range dengan Rekursi

> 📝 **Catatan pribadi** — dokumentasi dari video tutorial JavaScript Recursion

---

## 📚 Daftar Isi

- 🔍 [Apa itu Challenge Ini?](#pengenalan)
- 🎯 [Tujuan Fungsi](#tujuan-fungsi)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🧩 [Konsep Rekursi yang Dipakai](#konsep-rekursi)
- 🏗️ [Struktur Kode](#struktur-kode)
- 🔁 [Base Case](#base-case)
- ⚙️ [Recursive Case](#recursive-case)
- 🎬 [Simulasi Step-by-Step](#simulasi)
- 📚 [Visualisasi Call Stack](#call-stack)
- 🧪 [Testing](#testing)
- 💡 [Rangkuman](#rangkuman)

---

<a name="pengenalan"></a>
## 🔍 Apa itu Challenge Ini?

Di challenge ini kita diminta membuat sebuah **fungsi bernama `numberRange`** yang menerima dua angka — angka awal dan angka akhir — lalu mengembalikan sebuah **array berisi semua angka** dari awal sampai akhir.

Yang menarik: kita harus menyelesaikannya **menggunakan rekursi**, bukan loop biasa seperti `for` atau `while`.

---

<a name="tujuan-fungsi"></a>
## 🎯 Tujuan Fungsi

### Contoh-contoh yang diharapkan:

```js
numberRange(1, 5);  // → [1, 2, 3, 4, 5]
numberRange(3, 10); // → [3, 4, 5, 6, 7, 8, 9, 10]
numberRange(7, 7);  // → [7]
```

> 💬 Intinya: "kasih aku angka awal dan akhir, aku kembalikan semua angka di antaranya dalam bentuk array."

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, ada framework sederhana yang bisa selalu dipakai sebagai titik awal berpikir. Cukup jawab 3 pertanyaan ini, dan struktur fungsinya akan terbentuk sendiri.

> 💡 **Kenapa 3 pertanyaan ini penting?** Karena setiap fungsi rekursif — apapun topiknya — selalu punya tiga hal: titik mulai, arah gerak, dan kondisi berhenti. Kalau ketiga ini sudah jelas, nulis kodenya jadi jauh lebih mudah. Framework ini bisa kamu pakai ulang untuk challenge rekursi lain di masa depan.

Diterapkan ke Number Range:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | Dua ujung range yang di-pass ke fungsi (`startNum` dan `endNum`) |
| ➡️ Bergerak ke mana? | Ke bawah — `endNum - 1` setiap langkah sampai menyentuh `startNum` |
| 🛑 Berhenti kapan? | Saat `startNum === endNum` (range sudah menyusut jadi 1 angka) |

Dari tabel di atas, kita sudah bisa "membaca" struktur kodenya sebelum menulisnya:

- **Mulai dari `startNum` dan `endNum`** → dua parameter fungsi kita
- **Bergerak ke `endNum - 1`** → recursive call-nya adalah `numberRange(startNum, endNum - 1)`
- **Berhenti saat `startNum === endNum`** → base case-nya adalah `if (startNum === endNum) return [startNum]`

---

<a name="konsep-rekursi"></a>
## 🧩 Konsep Rekursi yang Dipakai

Rekursi berarti **fungsi memanggil dirinya sendiri**. Tapi biar tidak loop selamanya, kita butuh dua hal:

| Komponen | Penjelasan |
|---|---|
| 🛑 **Base case** | Kondisi berhenti — kapan fungsi *tidak* memanggil dirinya lagi |
| 🔁 **Recursive case** | Kondisi fungsi memanggil dirinya lagi dengan input yang lebih kecil |

Untuk challenge ini:
- **Base case** → ketika `startNum === endNum` (range sudah menyusut jadi 1 angka)
- **Recursive case** → panggil lagi dengan `endNum - 1`, biar rangenya mengecil sedikit demi sedikit

---

<a name="struktur-kode"></a>
## 🏗️ Struktur Kode

Berikut hasil akhir kode `number-range.js`:

```js
function numberRange(startNum, endNum) {
  // 🛑 Base case: kalau startNum sudah sama dengan endNum, berhenti
  if (startNum === endNum) {
    return [startNum];
  }

  // 🔁 Recursive case: panggil diri sendiri dengan endNum yang lebih kecil
  const numbers = numberRange(startNum, endNum - 1);

  // ➕ Tambahkan endNum ke array hasil rekursi
  numbers.push(endNum);

  // 📤 Kembalikan array yang sudah lengkap
  return numbers;
}
```

---

<a name="base-case"></a>
## 🛑 Base Case

```js
if (startNum === endNum) {
  return [startNum];
}
```

Ini adalah **kondisi berhenti**. Kalau `startNum` sudah sama dengan `endNum`, artinya range sudah habis — tinggal satu angka tersisa. Kita langsung kembalikan angka itu dalam sebuah array.

Contoh: `numberRange(7, 7)` langsung masuk base case dan return `[7]`.

---

<a name="recursive-case"></a>
## ⚙️ Recursive Case

```js
const numbers = numberRange(startNum, endNum - 1);
numbers.push(endNum);
return numbers;
```

Kalau belum sampai base case, kita:

1. **Panggil `numberRange` lagi**, tapi kali ini dengan `endNum - 1` — jadi rangenya mengecil satu langkah
2. **Simpan hasilnya** di variabel `numbers`
3. **Tambahkan `endNum`** ke array menggunakan `.push()`
4. **Return array-nya**

> 💬 Logikanya: *"Aku belum tahu array lengkapnya, tapi aku tahu bahwa array lengkap = array dari startNum sampai (endNum-1), ditambah endNum di ujungnya."*

---

<a name="simulasi"></a>
## 🎬 Simulasi Step-by-Step: `numberRange(1, 5)`

Ini bagian paling penting biar kita benar-benar paham cara kerjanya!

### 📉 Fase Penurunan (Fungsi terus memanggil dirinya)

```
numberRange(1, 5)
  └─ numberRange(1, 4)
       └─ numberRange(1, 3)
            └─ numberRange(1, 2)
                 └─ numberRange(1, 1)  ← 🛑 BASE CASE! Return [1]
```

### 📈 Fase Pembalikan / Unwinding (Return values mulai balik ke atas)

```
numberRange(1, 1) → return [1]
numberRange(1, 2) → numbers = [1], push(2) → return [1, 2]
numberRange(1, 3) → numbers = [1, 2], push(3) → return [1, 2, 3]
numberRange(1, 4) → numbers = [1, 2, 3], push(4) → return [1, 2, 3, 4]
numberRange(1, 5) → numbers = [1, 2, 3, 4], push(5) → return [1, 2, 3, 4, 5] ✅
```

> ✨ **Kunci pemahamannya:** Fungsi dulu **turun** sampai base case, baru kemudian **naik kembali** sambil membangun array dari bawah ke atas.

---

<a name="call-stack"></a>
## 📚 Visualisasi Call Stack

Ini yang sebenernya terjadi di memori saat `numberRange(1, 5)` dipanggil:

### 📉 Fase Turun — fungsi terus dipanggil, stack menumpuk

```
┌─────────────────────────────────┐
│  numberRange(1, 5)              │  ← dipanggil pertama
│  menunggu hasil numberRange(1,4)│
├─────────────────────────────────┤
│  numberRange(1, 4)              │
│  menunggu hasil numberRange(1,3)│
├─────────────────────────────────┤
│  numberRange(1, 3)              │
│  menunggu hasil numberRange(1,2)│
├─────────────────────────────────┤
│  numberRange(1, 2)              │
│  menunggu hasil numberRange(1,1)│
├─────────────────────────────────┤
│  numberRange(1, 1)              │  ← 🛑 BASE CASE: return [1]
└─────────────────────────────────┘
```

> 💬 Semua fungsi di atas **mengantri dan menunggu** — belum ada yang selesai. Baru setelah base case tercapai, mereka mulai selesai satu per satu dari bawah ke atas.

### 📈 Fase Naik — stack mulai dikosongkan, array terbentuk

```
┌─────────────────────────────────┐
│  numberRange(1, 1)              │  return [1]
└────────────────┬────────────────┘
                 │ [1]
┌────────────────▼────────────────┐
│  numberRange(1, 2)              │  [1] → push(2) → return [1, 2]
└────────────────┬────────────────┘
                 │ [1, 2]
┌────────────────▼────────────────┐
│  numberRange(1, 3)              │  [1, 2] → push(3) → return [1, 2, 3]
└────────────────┬────────────────┘
                 │ [1, 2, 3]
┌────────────────▼────────────────┐
│  numberRange(1, 4)              │  [1, 2, 3] → push(4) → return [1, 2, 3, 4]
└────────────────┬────────────────┘
                 │ [1, 2, 3, 4]
┌────────────────▼────────────────┐
│  numberRange(1, 5)              │  [1, 2, 3, 4] → push(5) → return [1, 2, 3, 4, 5] ✅
└─────────────────────────────────┘
```

> ✨ **Intinya:** `.push(endNum)` baru dieksekusi saat fungsi **selesai menunggu** — bukan saat pertama dipanggil. Itulah kenapa angkanya tersusun rapi dari kecil ke besar.

---

<a name="testing"></a>
## 🧪 Testing

File test-nya (`number-range.test.js`) terlihat seperti ini:

```js
const numberRange = require('./number-range');

test('Calculating the range of numbers', () => {
  expect(numberRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  expect(numberRange(3, 10)).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  expect(numberRange(7, 7)).toEqual([7]);
});
```

Jalankan test dengan:

```bash
npm run test
```

Kalau semua test **passes** ✅, berarti implementasi kita sudah benar!

---

<a name="rangkuman"></a>
## 💡 Rangkuman

| Bagian | Yang dilakukan |
|---|---|
| `if (startNum === endNum)` | Base case — berhenti rekursi, return array 1 angka |
| `numberRange(startNum, endNum - 1)` | Recursive call — kurangi endNum tiap pemanggilan |
| `numbers.push(endNum)` | Tambahkan angka saat fungsi "naik balik" (unwinding) |
| `return numbers` | Kembalikan array yang sudah lengkap |

> 🧠 **Pola umumnya:** Rekursi = **pecah masalah jadi lebih kecil** → selesaikan yang kecil → **gabungkan hasilnya** saat kembali naik.