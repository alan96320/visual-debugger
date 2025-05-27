// index.d.ts

export interface LineData {
  top: number;
  left: number;
  width: number;
  height: number;
  text: string;
}

export class VisualDebugger {
  constructor(el: Element);

  /** Analisis elemen dan ambil data baris */
  analyze(): void;

  /** Highlight baris di layar */
  highlight(): void;

  /** Bersihkan highlight */
  clear(): void;

  /** Data semua baris */
  get lines(): LineData[];
}

/** Helper function: instansiasi VisualDebugger */
export function visualDebugger(el: Element): VisualDebugger;

declare const _default: typeof visualDebugger;
export default _default;
