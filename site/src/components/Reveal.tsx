import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

/** Marca o elemento com .vis na primeira vez que ele aparece na tela. O CSS (.js.fx .fx-up) faz o resto. */
function useVis<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('vis'); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

interface FxUpProps { as?: ElementType; className?: string; atraso?: number; children: ReactNode }

/** Entrada simples: sobe 22 px com fade. `atraso` em milissegundos. */
export function FxUp({ as: Tag = 'div', className = '', atraso = 0, children }: FxUpProps) {
  const ref = useVis<HTMLElement>();
  const style = atraso ? ({ '--d': `${atraso}ms` } as CSSProperties) : undefined;
  return <Tag ref={ref} className={`fx-up ${className}`.trim()} style={style}>{children}</Tag>;
}

/** Título que monta palavra a palavra. O texto inteiro fica no aria-label. */
export function Kinetic({ texto, as: Tag = 'h2' }: { texto: string; as?: ElementType }) {
  const ref = useVis<HTMLElement>();
  const palavras = texto.trim().split(/\s+/);
  return (
    <Tag ref={ref} className="kin" aria-label={texto}>
      {palavras.map((p, i) => (
        <span key={i}>
          <span className="w" aria-hidden="true"><span style={{ '--i': i } as CSSProperties}>{p}</span></span>
          {i < palavras.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
