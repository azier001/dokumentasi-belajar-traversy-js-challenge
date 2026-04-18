# 🧩 Tantangan: Method getValues pada HashTable

> Perluas class `HashTable` yang sudah ada dengan menambahkan method baru bernama `getValues()`. Method ini harus mengembalikan sebuah **array** yang berisi semua **values** yang tersimpan di dalam **hash table**, tanpa memedulikan **keys**-nya.

---

## 📜 Instruksi

Tambahkan method `getValues()` ke dalam file `HashTable.js`. Method ini harus mengumpulkan semua data **value** dari setiap **bucket** yang ada di dalam **storage**.

---

## 💡 Contoh

```javascript
const myHashTable = new HashTable();

myHashTable.set('name', 'Alice');
myHashTable.set('age', 30);
myHashTable.set('city', 'New York');

console.log(myHashTable.getValues()); // Output yang diharapkan: ['Alice', 30, 'New York']
```

---

## 🥦 Petunjuk (Hints)

- Anda perlu melakukan **iterasi** melalui semua **buckets** di dalam array **storage** dan semua **key-value pairs** di dalam setiap **bucket**.
- Buat sebuah array untuk menyimpan **values**, lakukan **loop** pada setiap **bucket**, lalu lakukan **loop** lagi pada setiap **key-value pair**. **Push** setiap **value** ke dalam array tersebut.
- Setelah selesai melakukan **iterasi** pada semua **key-value pairs**, kembalikan (**return**) array dari **values** tersebut.

---

## ✅ Solusi

<details>
  <summary>Klik Untuk Melihat Solusi</summary>

```js
 getValues() {
    const values = [];

    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i]) {
        for (const [key, value] of this.storage[i]) {
          values.push(value);
        }
      }
    }

    return values;
  }
```

</details>

---

## 🧪 Test Cases

```js
const HashTable = require('./HashTable');

describe('HashTable', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  test('Get values from hash table', () => {
    hashTable.set('name', 'Alice');
    hashTable.set('age', 30);
    hashTable.set('city', 'New York');

    const values = hashTable.getValues();
    expect(values).toEqual(expect.arrayContaining(['Alice', 30, 'New York']));
    expect(values).toHaveLength(3);
  });

  test('Get values from an empty hash table', () => {
    const values = hashTable.getValues();
    expect(values).toEqual([]);
  });
});
```
