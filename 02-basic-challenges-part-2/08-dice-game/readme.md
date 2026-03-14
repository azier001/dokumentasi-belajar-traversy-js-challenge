# 🎲 Tantangan: Simulasi Permainan Dadu

> **Dokumentasi ini menjelaskan cara membuat fungsi simulasi permainan dadu klasik menggunakan JavaScript**, lengkap dengan aturan permainan, solusi, penjelasan kode, dan test cases.

---

## 📋 Instruksi

Tulis sebuah fungsi bernama `diceGameSimulation` yang mensimulasikan permainan dadu ini. Fungsi tersebut menerima satu argumen:

- `numSimulations`: **Jumlah kali** permainan dadu disimulasikan.

**Aturan permainan:**
- Jika dadu menghasilkan angka **7 atau 11**, pemain **menang** dan mendapat hasil `win`.
- Jika dadu menghasilkan angka **2, 3, atau 12**, pemain **kalah** dan mendapat hasil `lose`.
- Angka lainnya menghasilkan `roll again`.

Fungsi harus mengembalikan sebuah **array berisi objek-objek**, di mana setiap objek merepresentasikan satu hasil simulasi. Setiap objek harus memiliki properti berikut:

- `dice1`: Nilai dadu pertama (angka acak antara 1 hingga 6).
- `dice2`: Nilai dadu kedua (angka acak antara 1 hingga 6).
- `sum`: Jumlah dari kedua nilai dadu.
- `result`: Hasil lemparan, berupa `"win"`, `"lose"`, atau `"roll again"`.

---

## ✍️ Function Signature

```js
/**
 * Mensimulasikan permainan dadu.
 * @param {number} numSimulations - Jumlah kali permainan dadu disimulasikan.
 * @returns {Array} - Array berisi objek-objek hasil simulasi.
 */
function diceGameSimulation(numSimulations: number): Array;
```

---

## 💡 Contoh Penggunaan

```js
console.log(diceGameSimulation(3));
/*
  { dice1: 1, dice2: 5, sum: 6, result: 'roll again' },
  { dice1: 5, dice2: 6, sum: 11, result: 'win' },
  { dice1: 1, dice2: 1, sum: 2, result: 'lose' }
*/
```

---

## 🔍 Petunjuk

- Gunakan fungsi `Math.random()` untuk mensimulasikan lemparan dadu. Fungsi ini mengembalikan angka acak antara 0 (inklusif) dan 1 (eksklusif).

---

## ✅ Solusi

<details>
  <summary>Klik untuk Melihat Solusi</summary>

```js
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function diceGameSimulation(numSimulations) {
  const results = [];

  for (let i = 0; i < numSimulations; i++) {
    const dice1 = rollDice();
    const dice2 = rollDice();
    const sum = dice1 + dice2;

    let result = '';
    if (sum === 7 || sum === 11) {
      result = 'win';
    } else if (sum === 2 || sum === 3 || sum === 12) {
      result = 'lose';
    } else {
      result = 'roll again';
    }

    results.push({ dice1, dice2, sum, result });
  }

  return results;
}

module.exports = diceGameSimulation;
```

### 📖 Penjelasan

- Fungsi `rollDice` mensimulasikan pelemparan satu dadu. Fungsi ini menggunakan `Math.random()` untuk menghasilkan desimal acak antara 0 (inklusif) dan 1 (eksklusif), mengalikannya dengan 6, membulatkan ke bawah, lalu menambahkan 1 untuk mendapatkan angka acak antara 1 hingga 6.
- Fungsi `diceGameSimulation` mensimulasikan permainan dadu sebanyak jumlah simulasi yang ditentukan. Fungsi ini menggunakan `rollDice` untuk menghasilkan nilai dadu secara acak dan menghitung jumlah dari kedua dadu.
- Berdasarkan nilai `sum`, properti `result` ditentukan sesuai dengan aturan permainan.
- Hasil setiap simulasi disimpan dalam sebuah array berisi objek-objek.
- Module mengekspor fungsi `diceGameSimulation` agar dapat diakses di file lain.

</details>

---

## 🧪 Test Cases

```js
test('Dice Game Simulation', () => {
  const numSimulations = 5;
  const simulationResults = diceGameSimulation(numSimulations);

  simulationResults.forEach((result) => {
    console.log(`Simulation Result: ${result.finalResult}`);
    result.rolls.forEach((roll) => {
      console.log(
        `  Dice 1: ${roll.dice1}, Dice 2: ${roll.dice2}, Sum: ${roll.sum}, Result: ${roll.result}`
      );
    });
  });
});
```