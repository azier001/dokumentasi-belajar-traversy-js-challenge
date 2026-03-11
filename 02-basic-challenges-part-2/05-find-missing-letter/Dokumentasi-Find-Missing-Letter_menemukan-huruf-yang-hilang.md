# 🔤 Find Missing Letter — Dokumentasi Pribadi

> **Challenge:** Temukan huruf yang hilang dari array berurutan
> **Level:** Pemula
> **Bahasa:** JavaScript

---

## 📋 Daftar Isi

- 🎯 [Pengenalan](#pengenalan)
- 🧩 [Memahami Masalahnya](#memahami-masalahnya)
- 💡 [Solusi 1 — Pakai String Alfabet](#solusi-1)
- ⚡ [Solusi 2 — Pakai Char Code](#solusi-2)
- 🙋 [Solusi 3 — Pakai `expectedNextCharCode`](#solusi-3)
- 🧪 [Test Cases](#test-cases)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Challenge ini mirip dengan *find missing number*, tapi bedanya kita nyari **huruf yang hilang** dari sebuah array. Pendekatannya mirip, tapi solusinya cukup berbeda.

Array yang dikirim ke fungsi ini selalu berisi huruf yang **berurutan** (konsekutif), dan pasti ada satu huruf yang hilang di antaranya.

---

<a name="memahami-masalahnya"></a>
## 🧩 Memahami Masalahnya

### Contoh Input & Output

```js
findMissingLetter(['a', 'b', 'c', 'd', 'f']); // → 'e'
findMissingLetter(['o', 'q', 'r', 's']);       // → 'p'
findMissingLetter(['t', 'u', 'v', 'w', 'x', 'z']); // → 'y'
```

Lihat polanya? Di setiap array ada satu huruf yang **lompat** — itulah yang perlu kita kembalikan.

### Aturan Penting

- ✅ Array hanya berisi huruf **satu case** — semua huruf kecil atau semua huruf besar
- ✅ Kalau array kosong, kembalikan **string kosong** `''`

---

<a name="solusi-1"></a>
## 💡 Solusi 1 — Pakai String Alfabet + `indexOf`

### Ide Dasarnya

Kita simpan seluruh alfabet ke dalam sebuah string, lalu gunakan posisi (index) huruf pertama dari array sebagai "titik mulai". Dari situ, kita bandingkan satu per satu — apakah huruf di array cocok dengan huruf di alfabet pada posisi yang sama?

### Kodenya

```js
function findMissingLetter(arr) {
  // Simpan seluruh alfabet (huruf kecil & besar) dalam satu string
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Cari di mana posisi huruf pertama dari array di dalam string alfabet
  const startIndex = alphabet.indexOf(arr[0]);

  // Loop melalui array
  for (let i = 0; i < arr.length; i++) {
    // Kalau huruf di array TIDAK sama dengan huruf di alfabet pada posisi yang seharusnya...
    if (arr[i] !== alphabet[startIndex + i]) {
      // ...berarti inilah huruf yang hilang!
      return alphabet[startIndex + i];
    }
  }

  // Kalau tidak ada yang hilang, kembalikan string kosong
  return '';
}
```

### Penjelasan Langkah demi Langkah

**Step 1 — Buat string alfabet**

```js
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
```

Kita tulis semua huruf ke dalam satu string. Walaupun ini string, kita bisa akses tiap karakternya pakai index, persis seperti array — `alphabet[0]` = `'a'`, `alphabet[1]` = `'b'`, dst.

---

**Step 2 — Temukan titik mulai**

```js
const startIndex = alphabet.indexOf(arr[0]);
```

`indexOf` mencari posisi sebuah karakter di dalam string. Misalnya kalau `arr[0]` adalah `'c'`, maka `startIndex` = `2` (karena `'c'` ada di index ke-2 dalam alfabet).

---

**Step 3 — Bandingkan satu per satu**

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] !== alphabet[startIndex + i]) {
    return alphabet[startIndex + i];
  }
}
```

Di setiap iterasi, kita cek: apakah huruf ke-`i` di array sama dengan huruf yang seharusnya ada di posisi `startIndex + i` dalam alfabet?

Contoh dengan `['a', 'b', 'c', 'd', 'f']`:

| `i` | `arr[i]` | `alphabet[startIndex + i]` | Cocok? |
|-----|----------|---------------------------|--------|
| 0   | `'a'`    | `'a'`                     | ✅     |
| 1   | `'b'`    | `'b'`                     | ✅     |
| 2   | `'c'`    | `'c'`                     | ✅     |
| 3   | `'d'`    | `'d'`                     | ✅     |
| 4   | `'f'`    | `'e'`                     | ❌ → return `'e'` |

---

<a name="solusi-2"></a>
## ⚡ Solusi 2 — Pakai Char Code + `charCodeAt`

### Ide Dasarnya

Setiap huruf punya **nilai unicode** (angka unik). Huruf yang berurutan punya nilai yang berurutan juga. Jadi kalau selisih nilai antara dua huruf lebih dari 1, berarti ada huruf yang terlewat di antaranya.

> 💡 **Info:** `'a'` = 97, `'b'` = 98, `'c'` = 99, dst.

### Kodenya

```js
function findMissingLetter(arr) {
  // Ambil nilai unicode dari huruf pertama sebagai titik mulai
  let start = arr[0].charCodeAt(0);

  // Loop mulai dari index 1 (karena kita bandingkan dengan huruf sebelumnya)
  for (let i = 1; i < arr.length; i++) {
    // Ambil nilai unicode dari huruf saat ini
    const current = arr[i].charCodeAt(0);

    // Kalau selisihnya lebih dari 1, berarti ada huruf yang terlewat
    if (current - start > 1) {
      // Konversi nilai unicode ke huruf, lalu kembalikan
      return String.fromCharCode(start + 1);
    }

    // Update titik mulai untuk iterasi berikutnya
    start = current;
  }

  // Kalau tidak ada yang hilang, kembalikan string kosong
  return '';
}
```

### Penjelasan Langkah demi Langkah

**Step 1 — `charCodeAt(0)` untuk dapat nilai unicode**

```js
let start = arr[0].charCodeAt(0);
```

`charCodeAt(0)` mengambil nilai unicode karakter pertama dari sebuah string. Kita pakai `(0)` karena setiap elemen array adalah satu huruf, jadi kita ambil karakter di posisi pertama.

Misalnya: `'a'.charCodeAt(0)` → `97`

---

**Step 2 — Cek selisih nilai unicode**

```js
const current = arr[i].charCodeAt(0);

if (current - start > 1) { ... }
```

Kalau dua huruf berurutan normal, selisih nilai unicode-nya pasti `1`. Kalau selisihnya lebih dari `1`, berarti ada huruf yang terlewat.

Contoh dengan `['a', 'b', 'c', 'd', 'f']`:

| Iterasi | `start` | `current` | Selisih | Ada yang hilang? |
|---------|---------|-----------|---------|-----------------|
| `i=1`   | 97 (`a`)| 98 (`b`)  | 1       | ❌              |
| `i=2`   | 98 (`b`)| 99 (`c`)  | 1       | ❌              |
| `i=3`   | 99 (`c`)| 100 (`d`) | 1       | ❌              |
| `i=4`   | 100 (`d`)| 102 (`f`)| **2**   | ✅ → hilang!   |

---

**Step 3 — `String.fromCharCode()` untuk balik ke huruf**

```js
return String.fromCharCode(start + 1);
```

`String.fromCharCode()` adalah kebalikan dari `charCodeAt` — dia mengubah nilai unicode kembali menjadi huruf. Kita kembalikan `start + 1` karena itulah huruf yang harusnya ada tapi terlewat.

---

**Step 4 — Update `start` di setiap iterasi**

```js
start = current;
```

Ini penting! Kita update `start` supaya perbandingan di iterasi berikutnya selalu mengacu ke huruf **sebelumnya**, bukan huruf pertama.

---

<a name="solusi-3"></a>
## 🙋 Solusi 3 — Pakai `expectedNextCharCode`

### Ide Dasarnya

Sama-sama pakai char code seperti Solusi 2, tapi pendekatannya lebih eksplisit — kita hitung dulu **"seharusnya huruf apa"** di posisi berikutnya, lalu bandingkan langsung dengan huruf yang ada di array.

### Kodenya

```js
function findMissingLetter(arr) {
  for (let i = 1; i < arr.length; i++) {
    const previousCharCode = arr[i - 1].charCodeAt(0);
    const currentCharCode = arr[i].charCodeAt(0);
    const expectedNextCharCode = previousCharCode + 1;

    // Jika huruf sekarang tidak sama dengan huruf yang seharusnya
    if (currentCharCode !== expectedNextCharCode) {
      return String.fromCharCode(expectedNextCharCode);
    }
  }

  // Kalau tidak ada yang hilang, kembalikan string kosong
  return '';
}
```

### Penjelasan Langkah demi Langkah

**Step 1 — Loop mulai dari index 1**

```js
for (let i = 1; i < arr.length; i++) {
```

Loop dimulai dari `i = 1` (bukan `0`) karena kita selalu membandingkan huruf **sekarang** dengan huruf **sebelumnya**. Jadi butuh setidaknya dua elemen untuk mulai membandingkan.

---

**Step 2 — Ambil char code huruf sebelumnya & sekarang**

```js
const previousCharCode = arr[i - 1].charCodeAt(0);
const currentCharCode = arr[i].charCodeAt(0);
```

`arr[i - 1]` adalah huruf sebelumnya, `arr[i]` adalah huruf sekarang. Keduanya dikonversi ke nilai unicode.

---

**Step 3 — Hitung nilai yang "seharusnya"**

```js
const expectedNextCharCode = previousCharCode + 1;
```

Kalau huruf berurutan normal, nilai unicode huruf berikutnya pasti `previousCharCode + 1`. Ini disimpan di variabel `expectedNextCharCode` agar kodenya lebih mudah dibaca.

---

**Step 4 — Bandingkan dan kembalikan hasilnya**

```js
if (currentCharCode !== expectedNextCharCode) {
  return String.fromCharCode(expectedNextCharCode);
}
```

Kalau huruf sekarang tidak sesuai dengan yang diharapkan, berarti `expectedNextCharCode` itulah huruf yang hilang. Tinggal konversi balik ke huruf pakai `String.fromCharCode`.

Contoh dengan `['a', 'b', 'c', 'd', 'f']`:

| Iterasi | `previousCharCode` | `currentCharCode` | `expectedNextCharCode` | Cocok? |
|---------|--------------------|-------------------|------------------------|--------|
| `i=1`   | 97 (`a`)           | 98 (`b`)          | 98                     | ✅     |
| `i=2`   | 98 (`b`)           | 99 (`c`)          | 99                     | ✅     |
| `i=3`   | 99 (`c`)           | 100 (`d`)         | 100                    | ✅     |
| `i=4`   | 100 (`d`)          | 102 (`f`)         | 101                    | ❌ → return `'e'` |

---

### ✨ Kelebihan Solusi Ini

Dibanding Solusi 2, versi ini lebih **readable** karena nama variabelnya sangat deskriptif. Kita tidak perlu mikir "kenapa dikurangi lalu dibandingkan dengan 1?" — cukup baca `expectedNextCharCode` dan langsung paham maksudnya.

---

<a name="test-cases"></a>
## 🧪 Test Cases

```js
test('Find Missing Letter', () => {
  expect(findMissingLetter(['a', 'b', 'c', 'e'])).toBe('d');   // huruf kecil
  expect(findMissingLetter(['X', 'Z'])).toBe('Y');              // huruf besar, hanya 2 elemen
  expect(findMissingLetter(['m', 'n', 'o', 'q', 'r'])).toBe('p'); // hilang di tengah
  expect(findMissingLetter(['F', 'G', 'H', 'J'])).toBe('I');   // huruf besar, hilang di akhir
});
```

---

## 🔑 Ringkasan

| | Solusi 1 | Solusi 2 | Solusi 3 |
|---|---|---|---|
| **Metode utama** | `indexOf` | `charCodeAt` + `String.fromCharCode` | `charCodeAt` + `String.fromCharCode` |
| **Cara kerja** | Bandingkan posisi di string alfabet | Bandingkan selisih nilai unicode | Hitung nilai yang diharapkan, lalu bandingkan |
| **Perlu string alfabet?** | ✅ Ya | ❌ Tidak | ❌ Tidak |
| **Readability** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

Ketiga solusi ini sama-sama valid. Solusi 1 intuitif karena langsung "melihat" alfabet. Solusi 2 & 3 sama-sama pakai char code, tapi Solusi 3 paling mudah dibaca karena nama variabelnya menjelaskan diri sendiri.