# ⏱️ Kompleksitas Waktu Linear — `O(n)`

---

## 📋 Daftar Isi

- 🔍 [Apa itu Linear Time?](#apa-itu-linear-time)
- 🏗️ [Membuat Fungsi Linear](#membuat-fungsi-linear)
- 🧪 [Mencoba Langsung](#mencoba-langsung)
- 📈 [Memperbesar Input](#memperbesar-input)
- 🎲 [Contoh Nyata: Dice Game](#contoh-nyata-dice-game)
- 💡 [Kesimpulan](#kesimpulan)

---

<a name="apa-itu-linear-time"></a>
## 🔍 Apa itu Linear Time?

**Linear time** artinya waktu yang dibutuhkan sebuah fungsi untuk selesai **berbanding lurus** dengan ukuran inputnya.

> 📌 Gampangnya: semakin **besar** inputnya, semakin **lama** waktu yang dibutuhkan — dengan laju yang konsisten dan bisa diprediksi.

Ini ditulis sebagai **`O(n)`** dalam notasi Big O, di mana `n` adalah ukuran input.

Bandingkan dengan **constant time `O(1)`** yang sudah kita pelajari sebelumnya, di mana ukuran input sama sekali tidak berpengaruh (seperti mengakses elemen array lewat indeks). Dengan `O(n)`, setiap item dalam input harus *diproses satu per satu*, jadi lebih banyak item = lebih banyak pekerjaan = lebih lama.

> 💬 Sebagian besar fungsi yang kamu tulis sehari-hari adalah `O(n)` — sekitar 95–98% dari tantangan algoritma umum masuk kategori ini.

---

<a name="membuat-fungsi-linear"></a>
## 🏗️ Membuat Fungsi Linear

Ini contoh sederhana — fungsi yang menjumlahkan semua angka dalam sebuah array:

```js
function sumArray(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // proses setiap item satu per satu
  }

  return sum;
}
```

**Kenapa ini `O(n)`?**

| Ukuran array | Jumlah langkah |
|---|---|
| 5 item | 5 langkah |
| 1.000 item | 1.000 langkah |
| 1.000.000 item | 1.000.000 langkah |

Setiap elemen dalam array butuh satu langkah (satu operasi penjumlahan). Jadi jumlah operasi bertumbuh *secara linear* seiring ukuran input — itulah `O(n)`.

---

<a name="mencoba-langsung"></a>
## 🧪 Mencoba Langsung

Yuk bandingkan array kecil vs. array besar dan ukur waktunya langsung:

```js
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Array kecil — 5 item
const arr1 = [1, 2, 3, 4, 5];
console.time('Sum Array 1');
sumArray(arr1);
console.timeEnd('Sum Array 1');

// Array besar — 10 juta item
const arr2 = Array.from({ length: 10000000 }, (_, index) => index + 1);
console.time('Sum Array 2');
sumArray(arr2);
console.timeEnd('Sum Array 2');
```

> 🛠️ `Array.from({ length: N }, (_, index) => index + 1)` adalah cara cepat untuk membuat array berisi angka dari `1` sampai `N`.

**Contoh hasil:**

```
Sum Array 1: ~0.039ms   ← array kecil, hampir instan
Sum Array 2: ~9.09ms    ← 10 juta item, terasa lebih lama
```

Meskipun 9ms masih cepat, perbedaannya sudah terlihat jelas — dan akan terus membesar seiring inputnya bertambah.

---

<a name="memperbesar-input"></a>
## 📈 Memperbesar Input

Ini yang terjadi kalau ukuran array terus dilipatgandakan:

| Ukuran array | Waktu (kira-kira) |
|---|---|
| 5 item | ~0.04ms |
| 10.000 item | ~0.15ms |
| 1.000.000 item | ~9ms |
| 10.000.000 item | ~20ms |
| 100.000.000 item | ~176ms |

Polanya jelas — **input 10× lebih besar ≈ waktu 10× lebih lama**. Itulah definisi pertumbuhan linear.

> ⚡ Catatan: Bahkan method bawaan seperti `.split()`, `.reverse()`, dan `.join()` juga `O(n)` di balik layar — semuanya harus mengiterasi input, meskipun kamu tidak nulis loop-nya sendiri.
>
> ```js
> function reverseString(str) {
>   return str.split('').reverse().join(''); // tetap O(n)!
> }
> ```

---

<a name="contoh-nyata-dice-game"></a>
## 🎲 Contoh Nyata: Dice Game

Mari kita bedah fungsi dice game dan analisis kompleksitasnya bagian per bagian:

```js
function diceGameSimulation() {
  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const initialSum = rollDice() + rollDice();

  if (initialSum === 7 || initialSum === 11) {
    return 'Win';
  } else if (initialSum === 2 || initialSum === 3 || initialSum === 12) {
    return 'Lose';
  }

  while (true) {
    const newSum = rollDice() + rollDice();
    if (newSum === 7 || newSum === 11) {
      return 'Win';
    } else if (newSum === initialSum) {
      return 'Lose';
    }
  }
}
```

**Bedah per bagian:**

```js
const rollDice = () => Math.floor(Math.random() * 6) + 1;
```
✅ **`O(1)`** — selalu melakukan tepat satu operasi, tidak bergantung pada input apapun.

```js
const initialSum = rollDice() + rollDice();

if (initialSum === 7 || initialSum === 11) { ... }
else if (initialSum === 2 || ...) { ... }
```
✅ **`O(1)`** — serangkaian pengecekan yang tetap, jumlah pekerjaannya selalu sama.

```js
while (true) {
  const newSum = rollDice() + rollDice();
  if (newSum === 7 || newSum === 11) { return 'Win'; }
  else if (newSum === initialSum) { return 'Lose'; }
}
```
⚠️ **`O(n)`** — loop ini bisa jalan berkali-kali tergantung keberuntungan. Jumlah iterasinya tidak pasti.

**Kompleksitas keseluruhan: `O(n)`**

> 📌 Kalau sebuah fungsi punya bagian `O(1)` dan `O(n)` sekaligus, bagian `O(n)` yang menang — bagian constant time jadi tidak signifikan dibandingkan yang linear.

---

<a name="kesimpulan"></a>
## 💡 Kesimpulan

| Konsep | Penjelasan |
|---|---|
| **`O(n)` = Linear Time** | Waktu eksekusi bertumbuh sebanding dengan ukuran input |
| **Kebanyakan loop = `O(n)`** | Kalau kamu iterasi input, kemungkinan besar itu linear |
| **Method bawaan juga sama** | `.map()`, `.filter()`, `.split()` dll. semuanya `O(n)` |
| **Aturan dominasi** | `O(n)` mengalahkan `O(1)` — istilah terbesar yang menentukan |

> ✍️ Kalau kamu tidak yakin kompleksitas suatu fungsi, tanya diri sendiri: *"Apakah ini memproses setiap item dalam input?"* — kalau iya, kemungkinan besar itu `O(n)`.