import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { FILTROS, ZAP_ORCAMENTO, zapModelo } from '../data/site';
import { reducedMotion } from '../lib/util';
import { FxUp } from './Reveal';
import { Icon } from './Icon';

const EASE = 'cubic-bezier(.2,.85,.25,1)';
const SHIFT = 20;   // quanto os vizinhos se afastam do filtro em foco (px)

/**
 * Filtros em fila: retângulos pequenos e padronizados que levantam, afastam os vizinhos e inclinam na direção do cursor.
 * Ao clicar, o detalhe nasce do próprio cartão e cresce até o centro; ao fechar, encolhe de volta para o mesmo lugar.
 * Com movimento reduzido não há inclinação nem animação de abrir e fechar.
 */
function useFila() {
  const ulRef = useRef<HTMLUListElement>(null);
  const dlgRef = useRef<HTMLDialogElement>(null);
  const [mostrado, setMostrado] = useState(0);    // qual filtro o detalhe mostra
  const [fora, setFora] = useState(-1);           // qual cartão "saiu" da fila enquanto o detalhe está aberto

  useEffect(() => {
    const ul = ulRef.current!, dlg = dlgRef.current!;
    const slots = [...ul.children] as HTMLElement[];
    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const reduced = reducedMotion();
    const finePtr = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let atual = -1, idx = 0, fechando = false;

    // entrada em cascata ao rolar
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    slots.forEach((s) => io.observe(s));

    const picDe = (s: HTMLElement) => s.querySelector('.pic') as HTMLElement;
    const ativar = (i: number) => {
      if (i === atual) return; atual = i;
      slots.forEach((s, j) => {
        const on = j === i, pic = picDe(s);
        (s.querySelector('.sw') as HTMLElement).style.setProperty('--dx', (i < 0 || on ? 0 : j < i ? -SHIFT : SHIFT) + 'px');
        s.classList.toggle('on', on);
        if (!on) { pic.style.removeProperty('--rx'); pic.style.removeProperty('--ry'); }
      });
      if (i < 0) ul.removeAttribute('data-ativo'); else ul.setAttribute('data-ativo', String(i));
    };
    // o filtro acompanha o cursor com uma inclinação leve, como se virasse para você
    const inclinar = (e: PointerEvent, s: HTMLElement) => {
      if (reduced) return;
      const pic = picDe(s), r = pic.getBoundingClientRect();
      pic.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2) + 'deg');
      pic.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 7).toFixed(2) + 'deg');
    };

    const preencher = (i: number) => {
      idx = (i + slots.length) % slots.length;
      flushSync(() => { setMostrado(idx); setFora(idx); });   // o conteúdo precisa estar no DOM antes de medir a caixa
      return slots[idx];
    };
    const deltas = (origem: HTMLElement) => {
      const box = dlg.querySelector('.d-box') as HTMLElement, a = origem.getBoundingClientRect(), b = box.getBoundingClientRect();
      return { box, dx: a.left + a.width / 2 - (b.left + b.width / 2), dy: a.top + a.height / 2 - (b.top + b.height / 2), s: Math.max(a.width / b.width, a.height / b.height) };
    };
    const abrir = (i: number) => {
      const jaAberto = dlg.open, s = preencher(i);
      if (!jaAberto) dlg.showModal();
      if (reduced) return;
      const info = dlg.querySelector('.d-info') as HTMLElement;
      if (!jaAberto) {
        const d = deltas(picDe(s));                          // o detalhe nasce do próprio cartão e cresce até o centro
        d.box.animate([{ transform: `translate(${d.dx}px,${d.dy}px) scale(${d.s})`, opacity: 0 }, { opacity: 1, offset: 0.3 }, { transform: 'none', opacity: 1 }], { duration: 620, easing: EASE });
        info.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 440, delay: 240, easing: EASE, fill: 'backwards' });
      } else {
        info.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: EASE });
        (dlg.querySelector('.d-img') as HTMLElement).animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 260, easing: EASE });
      }
    };
    const fechar = () => {
      if (!dlg.open || fechando) return;
      const pronto = () => { fechando = false; setFora(-1); dlg.close(); };
      if (reduced) { pronto(); return; }
      fechando = true;
      const d = deltas(picDe(slots[idx]));                   // volta encolhendo para o lugar do cartão
      const a = d.box.animate([{ transform: 'none', opacity: 1 }, { opacity: 0.9, offset: 0.55 }, { transform: `translate(${d.dx}px,${d.dy}px) scale(${d.s})`, opacity: 0 }], { duration: 420, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'forwards' });
      a.onfinish = () => { pronto(); a.cancel(); };
    };

    slots.forEach((s, i) => {
      const card = s.querySelector('.card') as HTMLElement;
      if (finePtr) {
        s.addEventListener('pointerenter', () => ativar(i), sig);
        s.addEventListener('pointermove', (e) => inclinar(e, s), sig);
      }
      card.addEventListener('focus', () => ativar(i), sig);
      card.addEventListener('click', () => abrir(i), sig);
    });
    ul.addEventListener('pointerleave', () => ativar(-1), sig);
    ul.addEventListener('focusout', (e) => { if (!ul.contains(e.relatedTarget as Node)) ativar(-1); }, sig);

    (dlg.querySelector('#d-fechar') as HTMLElement).addEventListener('click', fechar, sig);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) fechar(); }, sig);         // clique fora do cartão
    dlg.addEventListener('cancel', (e) => { e.preventDefault(); fechar(); }, sig);          // Esc também volta animando
    (dlg.querySelector('#d-ant') as HTMLElement).addEventListener('click', () => abrir(idx - 1), sig);
    (dlg.querySelector('#d-prox') as HTMLElement).addEventListener('click', () => abrir(idx + 1), sig);
    dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') abrir(idx - 1); else if (e.key === 'ArrowRight') abrir(idx + 1); }, sig);
    dlg.addEventListener('close', () => ativar(-1), sig);

    return () => { ac.abort(); io.disconnect(); };
  }, []);

  return { ulRef, dlgRef, mostrado, fora };
}

export function Filtros() {
  const { ulRef, dlgRef, mostrado, fora } = useFila();
  const f = FILTROS[mostrado];

  return (
    <>
      <section className="sec" id="produtos">
        <FxUp as="h2">Cada poço pede um filtro.</FxUp>
        <FxUp as="p" className="lead" atraso={90}>Passe o mouse ou toque em um modelo para ver de perto. A indicação certa depende da água do seu poço, e a gente ajuda a escolher pelo WhatsApp.</FxUp>

        <div className="fila" id="fila">
          <ul className="slots" id="slots" ref={ulRef}>
            {FILTROS.map((x, i) => (
              <li className="slot" key={x.modelo} data-modelo={x.modelo} style={{ '--img': `url(${x.imagem})`, '--delay': `${i * 90}ms` } as CSSProperties}>
                <div className="sw">
                  <button className="card" type="button" aria-haspopup="dialog">
                    <span className={`pic${fora === i ? ' fora' : ''}`}><img src={x.imagem} alt="" loading="lazy" decoding="async" /></span>
                    <span className="chao" aria-hidden="true" />
                    <span className="cap"><b>{x.modelo}</b><small>{x.tipo}</small></span>
                  </button>
                  <a className="cta-card" href={zapModelo(x.modelo)} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <FxUp className="fila-cta">
          <p>Não sabe qual é o ideal para o seu poço?</p>
          <a className="btn" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
        </FxUp>
      </section>

      <dialog className="detalhe" id="detalhe" ref={dlgRef} aria-labelledby="d-titulo">
        <div className="d-box">
          <button className="fechar" id="d-fechar" type="button" aria-label="Fechar">
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" /></svg>
          </button>
          <div className="d-img" id="d-img" style={{ '--img': `url(${f.imagem})` } as CSSProperties}><img id="d-foto" src={f.imagem} alt={f.modelo} /></div>
          <div className="d-info">
            <div id="d-conteudo">
              <p className="kind">{f.tipo}</p>
              <h3 className="name" id="d-titulo">{f.modelo}</h3>
              <p className="desc">{f.descricao}</p>
              <dl className="specs">
                {f.specs.map((s) => (
                  <div key={s.rotulo}><dt>{s.rotulo}</dt><dd className={s.naoInformado ? 'na' : undefined}>{s.valor}</dd></div>
                ))}
              </dl>
              {f.nota ? <p className="fine">{f.nota}</p> : null}
            </div>
            <div className="d-nav">
              <a className="btn" id="d-cta" href={zapModelo(f.modelo)} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
              <button className="passo" id="d-ant" type="button">Anterior</button>
              <button className="passo" id="d-prox" type="button">Próximo</button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
