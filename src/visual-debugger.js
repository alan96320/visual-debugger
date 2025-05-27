class VisualDebugger {
    #lines = []; // Private property
    #bounding = null;
    #overlayEls = [];

    constructor(targetEl) {
        this.targetEl = targetEl;
        this.#analyze();
    }

    // Private method (analyze)
    #analyze() {
        const result = this.#getBreakLine();
        this.#lines = result.lines;
        this.#bounding = result.bounding;
    }

    // Private: Core logic dari getBreakLine
    #getBreakLine() {
        let el = this.targetEl;
        const range = document.createRange();

        // kita ambil Rect / ukuran dari tampilan
        // range.getClientRects() berfugsi untuk mengambil ukuran dari range yang sudah dirender
        range.selectNodeContents(el);
        const rects = range.getClientRects();
        let bounding = range.getBoundingClientRect();

        // kita filter rects yang memiliki tinggi lebih dari 0
        // lalu kita gabungkan rects berdasarkan posisi y / posisi vertikal
        // sehingga kita mendapatkan posisi y yang sama dan menghasil kan jumlah baris
        let lines = Array.from(rects)
            .filter((e) => e.height > 0)
            .reduce((a, b) => {
                const y = Math.floor(b.y);
                // if (!a[y]) a[y] = {data: [], text: []};
                if (!a[y]) a[y] = [];
                return a;
            }, {});

        const walker = document.createTreeWalker(el, NodeFilter.SHOW_ALL, {
            acceptNode: (node) => {
                return [1, 3].includes(node.nodeType)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP;
            },
        });

        while (walker.nextNode()) {
            const node = walker.currentNode;

            // jika panjang node tidak ada, kita lewati
            // ini biasanya terjadi pada node DOM tipe element (NodeType 1)
            // seperti <div>, <p>, <a>, <img>, <canvas>, <svg>, dsb.
            if (node.length == undefined) {
                let rects = JSON.parse(JSON.stringify(node.getBoundingClientRect()));

                lines[rects.y].push({
                    node,
                    text: "",
                    ...rects,
                    width: 0,
                    height: 0,
                });
                continue;
            }

            range.setStart(node, 0);
            range.setEnd(node, node.length);

            const rects = range.getClientRects();

            // jika tidak ada rects, kita lewati
            // ini biasanya terjadi pada node DOM tipe text (NodeType 3) yang tidak memiliki text atau hanya space saja
            // seperti \n, \s, atau karakter whitespace lainnya
            if (rects.length == 0) continue; // jika tidak ada rects, kita lewati

            // kita ambil semua text dari node per karakter
            // dan kita ambil ukuran dari setiap karakter
            // sekaligus memfilter dengan cara reduce tersebut dengan ketentuan last width > lastRect.width
            // atau simple nya kita membuat atau mendeteksi wrap yang di sebabkan wrap otomatis oleh browser lalu memisahkan kedalam baris baru
            // sehingga kita mendapatkan text yang sudah di wrap sesuai dengan ukuran yang di render
            let rectText = Array.from(node)
                .reduce(
                    (a, b, i) => {
                        range.setStart(node, a.startIndex);
                        range.setEnd(node, i + 1);

                        const rects = range.getClientRects();
                        const lastRect = rects[rects.length - 1];

                        if (a.data.length == 0 || a.lw > lastRect.width) {
                            a.startIndex = i;
                            a.data.push([]);
                        }

                        a.data.at(-1).push({
                            text: range.toString().trimStart(),
                            ...JSON.parse(JSON.stringify(lastRect)),
                        });

                        a.lw = lastRect.width;

                        return a;
                    },
                    { lw: 0, startIndex: 0, data: [] }
                )
                .data.map((e) => e.at(-1));

            // kita ambil posisi y dari rectText dan kita masukkan kedalam lines
            for (let i = 0; i < rectText.length; i++) {
                const item = rectText[i];
                item.node = node;
                lines[item.y].push(item);
            }
        }

        let hasil = Object.keys(lines).reduce((a, b) => {
            // kita ambil baris yang memiliki panjang lebih dari 0
            // dan kita ambil text dari setiap baris tersebut
            if (lines[b].length > 0) {
                let first = lines[b][0];
                a.push({
                    node: first.node,
                    x: first.x,
                    y: first.y,
                    top: first.top,
                    left: first.left,
                    bottom: first.bottom,
                    right: first.right,
                    height: Math.max(...lines[b].map((e) => e.height)),
                    width: lines[b].reduce((acc, cur) => acc + cur.width, 0),
                    text: lines[b].map((e) => e.text).join(""),
                });
            }
            return a;
        }, []);

        return {
            el,
            lines: hasil,
            bounding,
        };
    }

    // Getter untuk ambil data lines (read-only)
    get lines() {
        if (this.#lines.length === 0) this.#analyze();
        return this.#lines;
    }

    get bounding() {
        if (!this.#bounding) this.#analyze();
        return this.#bounding;
    }

    // Public method: highlight visual lines
    highlight() {
        this.clear();

        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = 9999;
        container.classList.add("visual-debug-overlay");
        this.targetEl.style.position = "relative";
        this.targetEl.appendChild(container);

        this.#lines.forEach((line, i) => {
            const hl = document.createElement("div");
            hl.style.position = "absolute";
            hl.style.top = `${line.top - this.#bounding.top}px`;
            hl.style.left = `${line.left - this.#bounding.left}px`;
            hl.style.width = `${line.width}px`;
            hl.style.height = `${line.height}px`;
            hl.style.background = `rgba(255,0,0,0.2)`;
            hl.style.border = `1px dashed rgba(255,0,0,0.4)`;
            hl.style.pointerEvents = "none";
            hl.dataset.index = i;

            container.appendChild(hl);
            this.#overlayEls.push(hl);
        });
    }

    clear() {
        const overlay = this.targetEl.querySelector(".visual-debug-overlay");
        if (overlay) overlay.remove();
        this.#overlayEls = [];
    }

    toggle() {
        if (this.#overlayEls.length > 0) {
            this.clear();
        } else {
            this.highlight();
        }
    }
}

function visualDebugger(el) {
    return new VisualDebugger(el);
}

// UMD + ESM + CommonJS Support
(function (global, factory) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = { visualDebugger, VisualDebugger };
        module.exports.default = visualDebugger; // CommonJS
    } else if (typeof define === "function" && define.amd) {
        define([], () => ({ visualDebugger, VisualDebugger }));
    } else {
        global.visualDebugger = visualDebugger;
        global.VisualDebugger = VisualDebugger;
    }
})(typeof self !== "undefined" ? self : this, function () {
    return { visualDebugger, VisualDebugger };
});

// ESM export
export { visualDebugger, VisualDebugger };
export default visualDebugger;
