# 🎲 Dice Game Simulation — Catatan Belajar

> Dokumentasi ini dibuat berdasarkan video tutorial tentang **Dice Game Simulation** menggunakan JavaScript.

---

## 📚 Daftar Isi

- 🎯 [Pengenalan Challenge](#pengenalan)
- 🎲 [Aturan Permainan](#aturan-permainan)
- 🛠️ [Fungsi `rollDice()`](#fungsi-rolldice)
- 🔄 [Fungsi Utama: `diceGameSimulation()`](#fungsi-utama)
- 📦 [Menyimpan Hasil ke Array](#menyimpan-hasil)
- 🧪 [Menjalankan & Testing](#testing)
- 💡 [Rangkuman](#rangkuman)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan Challenge

Tantangan ini adalah membuat sebuah fungsi bernama `diceGameSimulation` yang mensimulasikan permainan dadu.

Fungsi ini menerima **satu argumen** yaitu jumlah simulasi — alias berapa kali kita mau "melempar" dadunya.

```js
diceGameSimulation(10); // Simulasikan 10 kali lemparan dadu
```

**Output**-nya adalah sebuah **array berisi objek-objek**, di mana setiap objek mewakili satu hasil simulasi.

Contoh hasil yang dikembalikan:

```js
[
  { dice1: 1, dice2: 5, sum: 6,  result: 'roll again' },
  { dice1: 5, dice2: 6, sum: 11, result: 'win' },
  { dice1: 1, dice2: 1, sum: 2,  result: 'lose' }
]
```

Setiap objek punya 4 properti:

| Properti | Isi |
|----------|-----|
| `dice1`  | Hasil lemparan dadu pertama (1–6) |
| `dice2`  | Hasil lemparan dadu kedua (1–6) |
| `sum`    | Total dari `dice1 + dice2` |
| `result` | `'win'`, `'lose'`, atau `'roll again'` |

---

<a name="aturan-permainan"></a>
## 🎲 Aturan Permainan

Aturannya cukup simpel:

| Total Dadu | Hasil |
|------------|-------|
| **7 atau 11** | 🏆 `'win'` — Pemain menang! |
| **2, 3, atau 12** | 💀 `'lose'` — Pemain kalah |
| **Selain itu** | 🔄 `'roll again'` — Lempar lagi |

---

<a name="fungsi-rolldice"></a>
## 🛠️ Fungsi `rollDice()`

Sebelum membuat fungsi utama, kita butuh helper kecil untuk mensimulasikan lemparan **satu dadu**.

Di JavaScript, kita pakai `Math.random()` yang menghasilkan angka desimal antara `0` (inklusif) sampai `1` (eksklusif). Tapi kita perlu angka bulat antara **1 sampai 6**, jadi kita manipulasi seperti ini:

```js
// Fungsi untuk melempar satu dadu (menghasilkan angka 1–6)
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
```

Cara kerjanya langkah demi langkah:

1. `Math.random()` → menghasilkan angka seperti `0.72`
2. `* 6` → jadi `4.32`
3. `Math.floor(...)` → dibulatkan ke bawah jadi `4`
4. `+ 1` → jadi `5`

> 💡 Kita tambahkan `+1` supaya hasilnya **tidak pernah `0`** — dadu dimulai dari angka `1`, bukan `0`.

---

<a name="fungsi-utama"></a>
## 🔄 Fungsi Utama: `diceGameSimulation()`

Sekarang kita buat fungsi utamanya. Strukturnya seperti ini:

```js
function diceGameSimulation(numSimulations) {
  const results = []; // Tempat menampung semua hasil simulasi

  // Ulangi sebanyak numSimulations kali
  for (let i = 0; i < numSimulations; i++) {

    // 1. Lempar dua dadu
    const dice1 = rollDice();
    const dice2 = rollDice();

    // 2. Hitung total
    const sum = dice1 + dice2;

    // 3. Tentukan hasil berdasarkan aturan permainan
    let result = '';

    if (sum === 7 || sum === 11) {
      result = 'win';
    } else if (sum === 2 || sum === 3 || sum === 12) {
      result = 'lose';
    } else {
      result = 'roll again';
    }

    // 4. Simpan hasil ke array
    results.push({ dice1, dice2, sum, result });
  }

  return results; // Kembalikan semua hasil
}
```

### 🔍 Penjelasan bagian per bagian

**Array `results`** — dibuat kosong dulu di awal, nanti diisi satu per satu di setiap putaran loop.

**For loop** — dijalankan sebanyak `numSimulations` kali. Setiap putaran = satu simulasi lemparan dadu.

**Logika `if/else if/else`** — mengecek nilai `sum` dan menentukan apakah pemain menang, kalah, atau harus lempar lagi.

---

<a name="menyimpan-hasil"></a>
## 📦 Menyimpan Hasil ke Array

Di akhir setiap putaran loop, kita `push` sebuah objek ke array `results`:

```js
results.push({ dice1, dice2, sum, result });
```

> 💡 **Shorthand property!** Karena nama variabel sama dengan nama key-nya, kita bisa tulis `{ dice1 }` alih-alih `{ dice1: dice1 }`. Ini fitur JavaScript modern yang bikin kode lebih ringkas.

---

<a name="testing"></a>
## 🧪 Menjalankan & Testing

### Menjalankan langsung

Buat file `dice-game-run.js` untuk mencoba fungsinya:

```js
const diceGameSimulation = require('./dice-game');

const result = diceGameSimulation(10);
console.log(result);
```

Jalankan di terminal:
```bash
node dice-game-run.js
```

Contoh output yang bisa kamu lihat:
```
[
  { dice1: 3, dice2: 4, sum: 7,  result: 'win' },
  { dice1: 5, dice2: 6, sum: 11, result: 'win' },
  { dice1: 4, dice2: 6, sum: 10, result: 'roll again' },
  ...
]
```

> 🎰 Karena ini simulasi acak, setiap kali dijalankan hasilnya akan berbeda!

### Menjalankan test otomatis

File `dice-game.test.js` berisi test yang mengecek:
- Array hasil punya panjang yang benar
- Nilai `dice1` dan `dice2` selalu antara 1–6
- Nilai `sum` selalu antara 2–12
- `result` sesuai dengan aturan permainan

```bash
npm test
```

Kalau semua benar, kamu akan melihat pesan ✅ **PASS**.

---

<a name="rangkuman"></a>
## 💡 Rangkuman

Ini poin-poin utama yang dipelajari dari challenge ini:

- **`Math.random()` + `Math.floor()`** digunakan untuk mensimulasikan angka acak dalam rentang tertentu
- **Helper function** (`rollDice`) bisa dibuat di luar fungsi utama untuk memisahkan tanggung jawab
- **`for` loop** digunakan untuk mengulang simulasi sebanyak yang diminta
- **`if/else if/else`** untuk menentukan hasil berdasarkan kondisi
- **`array.push()`** untuk menambahkan objek ke dalam array secara bertahap
- **Shorthand property** `{ dice1 }` adalah cara ringkas untuk membuat objek di JavaScript