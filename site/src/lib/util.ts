export const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
/** Quanto de x (entre a e b) já passou, de 0 a 1. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
export const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeS = (k: number) => k * k * (3 - 2 * k);

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Pede um quadro de animação no máximo uma vez por rolagem. */
export function porQuadro(fn: () => void): () => void {
  let esperando = false;
  return () => {
    if (esperando) return;
    esperando = true;
    requestAnimationFrame(() => { esperando = false; fn(); });
  };
}
