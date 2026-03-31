# 🔄 Number Range — Alternatif Implementasi Rekursi

> 📝 **Catatan pribadi** — dokumentasi alternatif dari challenge `numberRange` yang sama

---

## 📚 Daftar Isi

- 🧭 [Konteks](#konteks)
- 🅰️ [Alternatif 1 — Rekursi Maju (startNum naik)](#alternatif-1)
- 🅱️ [Alternatif 2 — Concat instead of Push](#alternatif-2)
- 🅲 [Alternatif 3 — Spread Operator](#alternatif-3)
- ⚖️ [Perbandingan Ketiga Alternatif](#perbandingan)
- 💡 [Rangkuman](#rangkuman)

---

<a name="konteks"></a>
## 🧭 Konteks

Di dokumentasi sebelumnya, kita sudah menyelesaikan `numberRange` dengan pendekatan:
- Rekursi **mundur** — `endNum` dikurangi setiap langkah
- Array dibangun dengan `.push(endNum)` saat fase *unwinding*

Dokumen ini mencatat **3 cara alternatif** untuk menyelesaikan challenge yang sama, dengan hasil identik namun pendekatan berbeda.

---

<a name="alternatif-1"></a>
## 🅰️ Alternatif 1 — Rekursi Maju (startNum naik)

### 💡 Ide Dasarnya

Kebalikan dari versi sebelumnya — alih-alih `endNum` yang dikecilkan, kali ini **`startNum` yang dinaikkan** setiap langkah rekursi.

### 🤔 3 Pertanyaan Inti Rekursi

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Mulai dari mana? | `startNum` dan `endNum` yang di-pass ke fungsi |
| ➡️ Bergerak ke mana? | Ke atas — `startNum + 1` setiap langkah sampai menyentuh `endNum` |
| 🛑 Berhenti kapan? | Saat `startNum === endNum` (range sudah menyusut jadi 1 angka) |

### 🏗️ Kode

```js
function numberRange(startNum, endNum) {
  // 🛑 Base case
  if (startNum === endNum) {
    return [startNum];
  }

  // 🔁 Recursive case: naikkan startNum
  const numbers = numberRange(startNum + 1, endNum);

  // ➕ Sisipkan startNum di depan array
  numbers.unshift(startNum);

  return numbers;
}
```

### 🎬 Simulasi Step-by-Step: `numberRange(1, 5)`

#### 📉 Fase Penurunan

```
numberRange(1, 5)
  └─ numberRange(2, 5)
       └─ numberRange(3, 5)
            └─ numberRange(4, 5)
                 └─ numberRange(5, 5)  ← 🛑 BASE CASE! Return [5]
```

#### 📈 Fase Pembalikan

```
numberRange(5, 5) → return [5]
numberRange(4, 5) → numbers = [5], unshift(4) → return [4, 5]
numberRange(3, 5) → numbers = [4, 5], unshift(3) → return [3, 4, 5]
numberRange(2, 5) → numbers = [3, 4, 5], unshift(2) → return [2, 3, 4, 5]
numberRange(1, 5) → numbers = [2, 3, 4, 5], unshift(1) → return [1, 2, 3, 4, 5] ✅
```

> ✨ **Perbedaan kunci:** Versi ini pakai `.unshift()` (sisip di depan) bukan `.push()` (tambah di belakang), karena `startNum` harus ada di posisi paling awal array.

---

<a name="alternatif-2"></a>
## 🅱️ Alternatif 2 — Concat instead of Push

### 💡 Ide Dasarnya

Struktur rekursinya sama persis dengan versi original (mundur, `endNum` dikurangi), tapi cara **menggabungkan array-nya berbeda** — pakai `.concat()` alih-alih `.push()`.

### 🏗️ Kode

```js
function numberRange(startNum, endNum) {
  // 🛑 Base case
  if (startNum === endNum) {
    return [startNum];
  }

  // 🔁 Recursive case + concat langsung di return
  return numberRange(startNum, endNum - 1).concat(endNum);
}
```

### 🎬 Simulasi Step-by-Step: `numberRange(1, 5)`

#### 📉 Fase Penurunan

```
numberRange(1, 5)
  └─ numberRange(1, 4)
       └─ numberRange(1, 3)
            └─ numberRange(1, 2)
                 └─ numberRange(1, 1)  ← 🛑 BASE CASE! Return [1]
```

#### 📈 Fase Pembalikan

```
numberRange(1, 1) → return [1]
numberRange(1, 2) → [1].concat(2) → return [1, 2]
numberRange(1, 3) → [1, 2].concat(3) → return [1, 2, 3]
numberRange(1, 4) → [1, 2, 3].concat(4) → return [1, 2, 3, 4]
numberRange(1, 5) → [1, 2, 3, 4].concat(5) → return [1, 2, 3, 4, 5] ✅
```

### 🔍 Push vs Concat — Apa Bedanya?

| | `.push()` | `.concat()` |
|---|---|---|
| **Modifikasi** | Mengubah array asli (*mutate*) | Membuat array baru (*immutable*) |
| **Return value** | Panjang array baru | Array baru hasil gabungan |
| **Gaya kode** | Perlu variabel perantara | Bisa langsung di `return` |

> 💬 `.concat()` membuat kode lebih ringkas karena bisa langsung di-chain di baris `return`, tanpa perlu variabel `numbers` terpisah.

---

<a name="alternatif-3"></a>
## 🅲 Alternatif 3 — Spread Operator

### 💡 Ide Dasarnya

Mirip dengan versi `.concat()`, tapi menggunakan **ES6 spread operator** (`...`) untuk menggabungkan array hasil rekursi dengan angka baru.

### 🏗️ Kode

```js
function numberRange(startNum, endNum) {
  // 🛑 Base case
  if (startNum === endNum) {
    return [startNum];
  }

  // 🔁 Recursive case + spread langsung di return
  return [...numberRange(startNum, endNum - 1), endNum];
}
```

### 🎬 Simulasi Step-by-Step: `numberRange(1, 5)`

#### 📉 Fase Penurunan

```
numberRange(1, 5)
  └─ numberRange(1, 4)
       └─ numberRange(1, 3)
            └─ numberRange(1, 2)
                 └─ numberRange(1, 1)  ← 🛑 BASE CASE! Return [1]
```

#### 📈 Fase Pembalikan

```
numberRange(1, 1) → return [1]
numberRange(1, 2) → [...[1], 2] → return [1, 2]
numberRange(1, 3) → [...[1, 2], 3] → return [1, 2, 3]
numberRange(1, 4) → [...[1, 2, 3], 4] → return [1, 2, 3, 4]
numberRange(1, 5) → [...[1, 2, 3, 4], 5] → return [1, 2, 3, 4, 5] ✅
```

### 🔍 Concat vs Spread — Apa Bedanya?

| | `.concat()` | Spread `...` |
|---|---|---|
| **Sintaks** | Method chaining | Array literal |
| **Keterbacaan** | Eksplisit, jelas maksudnya | Lebih modern, ringkas |
| **Performa** | Relatif sama untuk array kecil | Relatif sama untuk array kecil |
| **Gaya** | Functional | ES6+ modern |

> 💬 Spread operator sering dianggap lebih *readable* karena langsung terlihat bentuk array finalnya — `[...bagianLama, elemenBaru]` — tanpa perlu membayangkan hasil `.concat()`.

---

<a name="perbandingan"></a>
## ⚖️ Perbandingan Ketiga Alternatif

| | Arah Rekursi | Method | Mutate array? | Bisa inline di `return`? |
|---|---|---|---|---|
| **Original** | Mundur (`endNum--`) | `.push()` | ✅ Ya | ❌ Tidak |
| **Alternatif 1** | Maju (`startNum++`) | `.unshift()` | ✅ Ya | ❌ Tidak |
| **Alternatif 2** | Mundur (`endNum--`) | `.concat()` | ❌ Tidak | ✅ Ya |
| **Alternatif 3** | Mundur (`endNum--`) | Spread `...` | ❌ Tidak | ✅ Ya |

> 🧠 **Takeaway:** Alternatif 2 dan 3 menghasilkan kode yang lebih ringkas karena tidak memerlukan variabel perantara. Alternatif 1 punya arah berpikir yang berbeda — berguna untuk melatih fleksibilitas dalam memandang rekursi.

---

<a name="rangkuman"></a>
## 💡 Rangkuman

Keempat versi (original + 3 alternatif) menghasilkan output yang **identik** — tapi masing-masing mengajarkan sesuatu yang berbeda:

| Versi | Pelajaran Utama |
|---|---|
| Original (push) | Rekursi mundur + mutasi array |
| Alternatif 1 (unshift) | Rekursi maju — arah bisa dibalik |
| Alternatif 2 (concat) | Immutability + kode lebih ringkas |
| Alternatif 3 (spread) | Sintaks ES6 modern yang ekspresif |

> 🧠 **Pola umumnya:** Satu masalah rekursi bisa diselesaikan dengan banyak cara — yang membedakan bukan hasilnya, tapi **arah gerak** dan **cara menggabungkan** hasil rekursinya.