# Changelog

## [1.1.0] - 2025-05-27

### 🎯 Fitur Utama
- Deteksi baris visual dari elemen HTML (wrap, `<br>`, dsb)
- Highlight baris secara visual di browser
- Akses data baris: `lines`

### 🔥 Dukungan Multi-Environment
- ESM (`import`)
- CommonJS (`require`)
- UMD Global (`<script>`)

### 🛠️ Struktur API
- Class `VisualDebugger`
- Function `visualDebugger(el)`

## [1.0.0] - 2024-05-27

🎉 Initial Release

- Fitur utama:
  - Deteksi semua baris visual (line-break, wrapping, baris kosong) di DOM
  - Mendukung inline, block, nested elements
  - Highlight per baris visual tanpa mengubah DOM asli
  - API modular, clean, dan siap digunakan untuk analisis layout dan UI debugging
  - Encapsulation: Private methods untuk internal logic (`getBreakLine`, `analyze`)
  - Getter `lines` untuk ambil data hasil analisis
  - Method `highlight()`, `clear()`, dan `toggle()` untuk overlay

---

Terima kasih telah menggunakan Visual Debugger! 🚀
