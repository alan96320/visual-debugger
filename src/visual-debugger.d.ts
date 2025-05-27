declare class VisualDebugger {
    /**
     * Inisialisasi VisualDebugger dengan elemen target
     * @param targetEl Elemen HTML yang ingin dianalisis
     */
    constructor(targetEl: HTMLElement);

    /**
     * Menampilkan highlight visual pada baris-baris yang terdeteksi
     */
    highlight(): void;

    /**
     * Menghapus highlight visual
     */
    clear(): void;

    /**
     * Toggle (nyalakan/matikan) highlight visual
     */
    toggle(): void;

    /**
     * Data semua baris visual yang terdeteksi
     */
    get lines(): Array<{
        node: Node;
        x: number;
        y: number;
        top: number;
        left: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
        text: string;
    }>;

    /**
     * Bounding box dari elemen target
     */
    get bounding(): DOMRect;
}

export default VisualDebugger;
