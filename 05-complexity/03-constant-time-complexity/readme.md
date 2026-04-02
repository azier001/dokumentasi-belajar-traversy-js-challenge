# ⏱️ Constant Time Complexity — O(1)

## 📑 Daftar Isi
- 🎯 [Apa Itu Constant Time?](#apa-itu-constant-time)
- 🧩 [Contoh Fungsi O(1)](#contoh-fungsi)
- 🧪 [Membuktikan dengan Kode](#membuktikan-dengan-kode)
- 📊 [Hasil & Kesimpulan](#hasil--kesimpulan)

---

<a name="apa-itu-constant-time"></a>
## 🎯 Apa Itu Constant Time?

**Constant time** artinya waktu yang dibutuhkan sebuah fungsi **selalu sama**, tidak peduli seberapa besar input-nya. Mau array-nya cuma punya 2 item atau 10.000 item — waktunya tetap di kisaran yang sama.

Dalam notasi Big O, ini ditulis sebagai **`O(1)`** (dibaca *"O of one"*).

> 💡 Bayangkan kamu disuruh ambil buku dari rak. Kalau kamu sudah tahu persis di posisi mana bukunya, kamu bisa langsung ambil — tidak perlu cek satu-satu dari awal. Itulah constant time!

---

<a name="contoh-fungsi"></a>
## 🧩 Contoh Fungsi O(1)

### Langkah 1 — Buat fungsinya dulu

```js
function accessElement(arr, index) {
  return arr[index];
}
```

💡 **Apa yang terjadi di sini?**
| Baris | Penjelasan |
|---|---|
| `function accessElement(arr, index)` | Fungsi menerima dua parameter: sebuah array dan posisi index yang ingin diambil |
| `return arr[index]` | Langsung mengembalikan elemen di posisi tersebut — **hanya satu operasi!** |

Tidak ada perulangan, tidak ada pergeseran data. Makanya selalu `O(1)` — sesederhana itu. ✅

---

<a name="membuktikan-dengan-kode"></a>
## 🧪 Membuktikan dengan Kode

Sekarang kita buktikan bahwa waktunya memang tetap sama walaupun ukuran array berbeda jauh.

### Langkah 2 — Tambahkan array kecil dan ukur waktunya

```js
function accessElement(arr, index) {
  return arr[index];
}

const arr1 = [1, 2, 3, 4, 5]; // array dengan 5 item

console.time('Access Element 1');       // ⏱️ mulai timer
console.log(accessElement(arr1, 1));    // jalankan fungsi
console.timeEnd('Access Element 1');    // ⏱️ hentikan timer
```

💡 **Apa yang terjadi di sini?**
| Baris | Penjelasan |
|---|---|
| `console.time('...')` | Mulai menghitung waktu dengan label tertentu |
| `console.log(accessElement(arr1, 1))` | Memanggil fungsi dan mencetak hasilnya — elemen di index `1` adalah `2` |
| `console.timeEnd('...')` | Menghentikan timer dan mencetak hasilnya ke konsol |

> ⚠️ **Catatan:** Label di `console.time` dan `console.timeEnd` **harus sama persis**, supaya timer-nya nyambung!

---

### Langkah 3 — Tambahkan array besar dan bandingkan

```js
function accessElement(arr, index) {
  return arr[index];
}

const arr1 = [1, 2, 3, 4, 5];

console.time('Access Element 1');
console.log(accessElement(arr1, 1));
console.timeEnd('Access Element 1');

// Array dengan 10.000 item
const arr2 = Array.from({ length: 10000 }, (_, index) => index + 1);

console.time('Access Element 2');
console.log(accessElement(arr2, 100));  // ambil elemen di index 100
console.timeEnd('Access Element 2');
```

💡 **Apa yang terjadi di sini?**
| Baris | Penjelasan |
|---|---|
| `Array.from({ length: 10000 }, ...)` | Membuat array baru dengan 10.000 elemen secara otomatis |
| `(_, index) => index + 1` | Callback-nya mengisi tiap slot dengan nilai `index + 1`, jadi isinya 1, 2, 3, ... sampai 10.000 |
| `_` | Underscore adalah konvensi untuk parameter yang tidak dipakai — di sini kita tidak butuh nilai elemennya, hanya index-nya |

---

<a name="hasil--kesimpulan"></a>
## 📊 Hasil & Kesimpulan

Setelah dijalankan, hasilnya kira-kira seperti ini:

```
2
Access Element 1: 2ms
101
Access Element 2: 0.65ms
```

Menarik kan? Array yang **10.000 kali lebih besar** malah bisa lebih *cepat* di run tertentu! Ini menunjukkan bahwa waktunya **tidak bergantung pada ukuran array sama sekali**.

> 💬 **Kenapa hasilnya tidak selalu sama?**
> Ada banyak faktor yang memengaruhi — spesifikasi komputer, sistem operasi, hingga program lain yang sedang berjalan. Kamu tidak akan mendapat angka yang sama persis seperti di video, dan itu wajar. Yang penting, **ukuran array tidak mengubah pola waktu-nya**.

### ✅ Kesimpulan

| Ukuran Array | Waktu | Kompleksitas |
|---|---|---|
| 5 item | ~2ms | O(1) |
| 10.000 item | ~0.65ms | O(1) |

Karena fungsi hanya **langsung mengakses satu posisi** tanpa iterasi atau operasi tambahan, waktu eksekusinya selalu konstan — itulah definisi `O(1)`. 🎉