# 🎯 Challenge: Balanced Parenthesis

> **Deskripsi**: Dokumentasi ini menjelaskan solusi tantangan untuk memeriksa keseimbangan tanda kurung menggunakan struktur data **Stack**.

---

## 📋 Instruksi

Kita akan menyelesaikan tantangan **Stack**. Buatlah sebuah fungsi bernama `isBalanced` yang menerima sebuah string dan memeriksa apakah tanda kurungnya seimbang.

Fungsi harus mengembalikan **true** jika seimbang dan **false** jika tidak. Gunakan implementasi `Stack` yang sudah kita buat sebelumnya.

---

### ✍️ Function Signature

```js
/**
 * Mengembalikan true jika tanda kurung dalam string seimbang.
 * @param {string} str - String yang akan diperiksa.
 * @returns {boolean} - Status keseimbangan tanda kurung.
 */
function isBalanced(str: string): boolean;
```

---

### 🧩 Contoh Penggunaan

```JS
isBalanced('()');     // true
isBalanced('(()())'); // true
isBalanced('(()');    // false
isBalanced(')(');     // false
```

---

### 📏 Batasan (Constraints)

- String hanya akan berisi tanda kurung `(` dan `)`.
- Tidak ada karakter lain dalam string.

---

### 💡 Petunjuk Logika

1. **Push** setiap tanda kurung buka `(` ke dalam stack.
2. **Pop** dari stack ketika menemukan tanda kurung tutup `)`.
3. Jika stack **kosong** saat menemukan tanda kurung tutup, berarti tidak seimbang.
4. Di akhir proses, stack harus **kosong** agar dianggap seimbang.

---

## 🛠️ Solusi Kode

<details>
  <summary>🔍 Klik untuk melihat kode solusi</summary>

```JS
const Stack = require('./stack');

function isBalanced(str) {
  const stack = new Stack();

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
    } else if (str[i] === ')') {
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.isEmpty();
}
```

### 📖 Penjelasan Langkah-demi-Langkah

1. **Inisialisasi**: Kita membuat instance baru dari `Stack`.
2. **Iterasi**: Kita memeriksa setiap karakter dalam string satu per satu.
3. **Handle Kurung Buka**: Jika menemukan `(`, kita menambahkannya ke tumpukan.
4. **Handle Kurung Tutup**: Jika menemukan `)`, kita cek apakah ada pasangan di tumpukan. Jika stack kosong, berarti kurung tutup ini tidak punya pasangan buka sebelumnya.
5. **Final Check**: Jika setelah semua karakter diperiksa stack masih berisi sesuatu, berarti ada kurung buka yang tidak tertutup.

</details>

---

## 📊 Visualisasi ASCII (Detail Internal Stack)

Berdasarkan implementasi `Stack` Anda (`top` awal = -1, `maxSize` = 100):

**Input String: `( ( ) )`**

```text
Kondisi Awal:
Stack Array: [ , , , ... ]
Top Pointer: -1
--------------------------------------

Langkah 1: Baca '('
  Action  : push('(')
  Internal: top++ -> 0, stack[0] = '('
  Visual  : [ '(' ]
              ^ top: 0
--------------------------------------

Langkah 2: Baca '('
  Action  : push('(')
  Internal: top++ -> 1, stack[1] = '('
  Visual  : [ '(', '(' ]
                   ^ top: 1
--------------------------------------

Langkah 3: Baca ')'
  Action  : pop()
  Internal: return stack.pop(), top-- -> 0
  Visual  : [ '(' ]
              ^ top: 0
--------------------------------------

Langkah 4: Baca ')'
  Action  : pop()
  Internal: return stack.pop(), top-- -> -1
  Visual  : [ ]
          ^ top: -1 (Kosong)
--------------------------------------

Hasil Akhir:
  stack.isEmpty() -> true (Karena top == -1)
  Status: BALANCED ✅
```

---

## 🧪 Test Cases

```js
describe('balancedParenthesis', () => {
  test('harus mengembalikan true untuk kurung seimbang', () => {
    expect(isBalanced('()')).toBe(true);
    expect(isBalanced('(())')).toBe(true);
    expect(isBalanced('(()())')).toBe(true);
  });

  test('harus mengembalikan false untuk kurung tidak seimbang', () => {
    expect(isBalanced(')(')).toBe(false);
    expect(isBalanced('(()')).toBe(false);
    expect(isBalanced('())')).toBe(false);
  });
});
```

---
