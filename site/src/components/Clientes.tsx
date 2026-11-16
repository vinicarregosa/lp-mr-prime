import { useEffect, useRef } from 'react';
import { CLIENTES } from '../data/site';
import { clamp, porQuadro } from '../lib/util';
import { FxUp, Kinetic } from './Reveal';

// Quanto cada cartão anda (px) entre o fundo e o topo da tela. Ritmos diferentes dão a sensação de camadas.
const RITMOS = [48, -34, 76];

/** Paralaxe: cada cartão anda num ritmo e a foto se move dentro da moldura. No celular os cartões empilham, então só a foto anda. */
function useParalaxe() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!document.documentElement.classList.contains('fx')) return;
    const lista = ref.current!;
    const cartoes = [...lista.children] as HTMLElement[];
    const quadro = () => {
      const r = lista.getBoundingClientRect();
      if (r.bottom < -120 || r.top > innerHeight + 120) return;
      const u = clamp(((r.top + r.height / 2) - innerHeight / 2) / (innerHeight / 2 + r.height / 2), -1, 1);   // 0 = centrado na tela
      const coluna = matchMedia('(max-width: 899px)').matches;
      cartoes.forEach((c, i) => {
        c.style.transform = coluna ? '' : `translate3d(0,${(u * RITMOS[i % RITMOS.length]).toFixed(1)}px,0)`;
        const img = c.querySelector('img');
        if (img) img.style.transform = `translate3d(0,${(-u * 11).toFixed(1)}px,0) scale(1.08)`;
      });
    };
    const pedir = porQuadro(quadro);
    const ac = new AbortController();
    addEventListener('scroll', pedir, { passive: true, signal: ac.signal });
    addEventListener('resize', pedir, { signal: ac.signal });
    addEventListener('load', pedir, { signal: ac.signal });
    quadro();
    return () => ac.abort();
  }, []);
  return ref;
}

export function Clientes() {
  const lista = useParalaxe();
  return (
    <section className="sec" id="depoimentos">
      <Kinetic texto="Clientes que atendemos." />
      <FxUp as="p" className="lead" atraso={260}>Condomínios, empresas e propriedades que já têm equipamentos MR instalados.</FxUp>
      <div className="deps" ref={lista}>
        {CLIENTES.map((c) => (
          <article className="dep" key={c.nome}>
            <div className="dep-foto"><img src={c.foto} alt={c.alt} width={c.largura} height={c.altura} loading="lazy" decoding="async" /></div>
            <h3>{c.nome}</h3>
            <p className="onde">{c.onde}</p>
            <p className="equip">{c.equipamento}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
