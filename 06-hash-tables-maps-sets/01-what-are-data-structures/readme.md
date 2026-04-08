> 📘 **Dokumen ini menjelaskan konsep dasar Data Structures (Struktur Data) dan hubungannya dengan algoritma dalam pemrograman.**

---

# 📦 Apa Itu Data Structures?

Sekarang setelah kita mengerjakan beberapa challenge dan mempelajari **time complexity** serta notasi **Big O**, saatnya kita mulai membahas **data structures**.

**Data structures** digunakan di setiap bahasa pemrograman. Secara sederhana, data structure adalah cara untuk **menyimpan dan mengorganisir data** agar dapat digunakan secara efektif.

Data structures tidak hanya digunakan untuk menyimpan data, tetapi juga untuk **mengakses** dan **memanipulasi** data.

Misalnya, jika kita memiliki daftar berisi 1000 item dan ingin menemukan item tertentu, kita bisa menggunakan data structure untuk menyimpan data dengan cara yang memudahkan pencarian.

---

## 🧱 Built-In Data Structures

Setiap bahasa pemrograman memiliki data structure bawaan.

* JavaScript memiliki **arrays**, **objects**, serta **maps** dan **sets**
* Python memiliki **lists**, **tuples**, **dictionaries**, dan **sets**
* Java memiliki **arrays**, **lists**, **maps**, dan **sets**

Karena ini adalah course JavaScript, kita akan melihat data structures dari perspektif JavaScript, tetapi **konsepnya tetap sama di semua bahasa pemrograman**.

---

## 🎯 Data Structures yang Lebih Spesifik

Selain data structure bawaan, ada juga struktur yang lebih spesifik dengan cara kerja tertentu.

Array di JavaScript sangat fleksibel karena memiliki banyak method dan properti.

Sebaliknya, **linked list** adalah data structure yang memiliki cara kerja yang sangat spesifik. Meskipun tidak sefleksibel array, linked list bisa **lebih efisien dalam situasi tertentu**.

Saat membuat **linked list**, **stack**, atau **queue**, kita bisa menggunakan array JavaScript sebagai dasar, lalu hanya menyediakan method dan properti tertentu yang sesuai dengan struktur tersebut.

Itulah pendekatan yang akan kita gunakan dalam course ini.

Kemungkinan besar kamu jarang melihat linked list dalam kode sehari-hari. Sebaliknya, kamu lebih sering menggunakan arrays dan objects karena sifatnya fleksibel.

Namun, linked list tetap berguna dalam kondisi tertentu karena efisiensinya.

Selain itu, data structures adalah topik penting dalam **technical interview**. Kamu mungkin akan diminta untuk:

* Mengimplementasikan **linked list**, **stack**, atau **queue**
* Menggunakan data structure tertentu untuk menyelesaikan masalah

Karena itu, penting untuk memahami **cara kerja** dan **kapan menggunakannya**.

---

## ⚙️ Data Structures dan Algorithms

Data structures dan algorithms saling berkaitan erat.

* **Algorithm** adalah sekumpulan instruksi untuk menyelesaikan masalah
* **Data structure** adalah cara menyimpan dan mengorganisir data

Challenge yang sudah kita kerjakan sebelumnya bisa dianggap sebagai algorithm.

Kita juga sudah menggunakan:

* arrays
* objects
* maps

Sekarang, kita akan mulai membuat **custom class** untuk mengimplementasikan data structures tertentu.

Kita akan mulai dari:

* `maps`
* `sets`
* custom **hash table**

Kemudian lanjut ke:

* **stacks**
* **queues**
* **linked lists**
* **trees**
* **graphs**

Setelah itu, kita akan menggunakan data structures tersebut untuk menyelesaikan berbagai masalah.

---

## 📚 Data Structures yang Umum

Berikut adalah beberapa data structures yang paling umum dalam pemrograman:

* Arrays
* Objects
* Maps
* Sets
* Stacks
* Queues
* Linked Lists
* Trees
* Binary Trees
* Binary Search Trees (BST)
* Graphs
* Hash Tables

Semua ini akan kita pelajari dalam course ini.

---

## 🔗 Linear vs Non-Linear Data Structures

Data structures dapat dibagi menjadi dua kategori utama:

### 📏 Linear Data Structures

Struktur di mana data disusun secara **berurutan (sequential)**, dan setiap elemen terhubung dengan elemen sebelumnya dan berikutnya.

Contoh:

* arrays
* stacks
* queues
* linked lists

### 🌐 Non-Linear Data Structures

Struktur di mana data **tidak disusun secara berurutan**.

Contoh:

* trees
* graphs

Dalam course ini, kita akan mempelajari kedua jenis struktur ini.

---

## 🚀 Selanjutnya

Pada lesson berikutnya, kita akan membahas **hash tables**, termasuk `maps` dan `sets`.
