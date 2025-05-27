# Visual Debugger

🚀 **Visual Debugger** adalah library JavaScript modular untuk mendeteksi **baris visual** (line-break, wrapping, dan layout) pada elemen HTML di browser. Cocok untuk analisis layout, debugging UI, atau membuat fitur **"read more"**, **tooltip per baris**, dan lainnya.

## ✨ Fitur

✅ Deteksi semua baris visual yang dirender:  
- Termasuk baris kosong (`<br>`, wrapping otomatis, dll)

✅ Highlight baris tanpa mengubah DOM asli  
✅ Mendukung elemen inline, block, dan kombinasi nested  
✅ API sederhana & clean

## 🔧 Instalasi

```bash
npm install visual-debugger
```

## 🚀 Pemakaian
```JS
import VisualDebugger from 'visual-debugger';

const el = document.querySelector('#yourElement');
const debuggerInstance = new VisualDebugger(el);

// Tampilkan highlight
debuggerInstance.highlight();

// Hilangkan highlight
debuggerInstance.clear();

// Toggle highlight
debuggerInstance.toggle();

// Ambil data baris
console.log(debuggerInstance.lines);

// Ambil bounding box element utama
console.log(debuggerInstance.bounding);
```

## 📊 Struktur Data `lines`
Setiap baris visual direpresentasikan sebagai objek:
```js
{
    node: Node,          // Node asal
    x: Number,           // Posisi X (viewport)
    y: Number,           // Posisi Y (viewport)
    top: Number,         // Dimensi kotak
    left: Number,        // Dimensi kotak
    right: Number,       // Dimensi kotak
    bottom: Number,      // Dimensi kotak
    height: Number,      // Dimensi kotak
    width: Number,       // Dimensi kotak
    text: String         // Teks pada baris
}
```

## 🧪 Contoh Test
HTML:
```html
<div id="testElement" style="width: 300px; height: auto;">
  Baris pertama.<br><br>
  Baris kedua dengan <a href="#">link</a>.
  <div style="height: 50px;">Blok lain</div>
  Baris terakhir.
</div>
```
JS Test:
```js
import VisualDebugger from 'visual-debugger';

const dbg = new VisualDebugger(document.querySelector('#testElement'));
console.log(dbg.lines);
```
✅ Hasil: Array dengan data per-baris (termasuk baris kosong & wrapping).

## 🔥 Catatan Tambahan
Khusus untuk development **frontend heavy**:

- Cocok dipakai untuk **inspeksi layout**, **debugging truncation**, **read more**, dan **tooltip**.
- Bebas dimodifikasi untuk kebutuhan spesifik.