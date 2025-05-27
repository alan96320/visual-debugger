# Visual Debugger

🚀 **Visual Debugger** adalah library JavaScript modular untuk mendeteksi **baris visual** (line-break, wrapping, dan layout) pada elemen HTML di browser. Cocok untuk analisis layout, debugging UI, atau membuat fitur **"read more"**, **tooltip per baris**, dan lainnya.

## ✨ Fitur Utama

✅ Deteksi dan ambil data baris yang di-wrap, `<br>`, atau akibat CSS flow.
✅ Highlight baris tanpa mengubah DOM asli  
✅ Mendukung elemen inline, block, dan kombinasi nested  
✅ API sederhana & clean

## 🔧 Instalasi
### 1️⃣ NPM
```bash
npm install visual-debugger
```

### 2️⃣ Manual (Browser)
Unduh `VisualDebugger.js`, lalu:
```html
<script src="VisualDebugger.js"></script>
```

## 🚀 Penggunaan
### ES Module (Modern)
```javascript
import visualDebugger, { VisualDebugger } from './VisualDebugger.js';

const v = visualDebugger(document.querySelector('.target'));
v.highlight();
console.log(v.lines);
```

### CommonJS (Node.js)
```javascript
const { visualDebugger, VisualDebugger } = require('./VisualDebugger.js');

const v = visualDebugger(document.querySelector('.target'));
v.highlight();
```

### Browser Global
```html
<script src="VisualDebugger.js"></script>
<script>
  const v = visualDebugger(document.querySelector('.target'));
  v.highlight();
</script>
```

## ✨ API
`VisualDebugger(el)`

Instansiasi class baru:
```javascript
const v = new VisualDebugger(el);
```

`visualDebugger(el)`

Helper function untuk instansiasi cepat:
```javascript
const v = visualDebugger(el);
```
Method/Property  | Keterangan
------------- | -------------
`highlight()`  | `Tampilkan highlight pada baris visual.`
`clear()`  | `Hapus semua highlight.`
`lines`  | `	Akses data semua baris (array).`

## 🌍 Dukungan Lingkungan
✅ ES Module

✅ CommonJS

✅ Browser (`<script>`)

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