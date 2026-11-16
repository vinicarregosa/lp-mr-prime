import { useEffect, useRef } from 'react';
import { INSTAGRAM_URL, ZAP_ORCAMENTO, zap } from '../data/site';
import { porQuadro, seg } from '../lib/util';
import { Icon } from './Icon';

/**
 * Íris: o azul profundo abre em círculo a partir do topo da seção, e o texto só aparece quando já está sobre o azul.
 * --ir (0 a 1) é a abertura; --R é o raio em pixels que alcança o canto mais distante; --tx (0 a 1) é o texto.
 * No fim da página a íris está sempre aberta.
 */
function useIris() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('fx')) return;
    const con = ref.current!;
    con.classList.add('fx-iris');
    const quadro = () => {
      const r = con.getBoundingClientRect(), vh = innerHeight;
      const fim = scrollY >= root.scrollHeight - vh - 4;
      const k = fim ? 1 : 1 - seg(r.top, vh * 0.45, vh * 0.95);
      con.style.setProperty('--R', (Math.hypot(con.offsetWidth / 2, con.offsetHeight) + 4).toFixed(0) + 'px');
      con.style.setProperty('--ir', k.toFixed(3));
      con.style.setProperty('--tx', seg(k, 0.45, 0.95).toFixed(3));
    };
    const pedir = porQuadro(quadro);
    const ac = new AbortController();
    addEventListener('scroll', pedir, { passive: true, signal: ac.signal });
    addEventListener('resize', pedir, { signal: ac.signal });
    addEventListener('load', pedir, { signal: ac.signal });
    quadro();
    return () => { ac.abort(); con.classList.remove('fx-iris'); };
  }, []);
  return ref;
}

/** Contato: só links, sem formulário. Fecha a página em azul profundo. */
export function Contato() {
  const ref = useIris();
  return (
    <section className="contato" id="contato" ref={ref}>
      <div className="wrap">
        <div>
          <h2>Vamos conversar sobre o seu poço.</h2>
          <p className="lead">O atendimento é pelo WhatsApp. Você conta como é o seu poço e a gente liga para indicar o equipamento adequado.</p>
          <div className="acoes">
            <a className="btn btn-claro" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
            <a className="btn btn-contorno" href={INSTAGRAM_URL} target="_blank" rel="noopener">Ver o Instagram <Icon nome="ig" /></a>
          </div>
        </div>
        <div className="vias">
          <a className="via" href={zap()} target="_blank" rel="noopener"><small><Icon nome="wa" /> WhatsApp</small><strong>(79) 99855-3063</strong></a>
          <a className="via" href={INSTAGRAM_URL} target="_blank" rel="noopener"><small><Icon nome="ig" /> Instagram</small><strong>@mraguaprimemrionizadorespro</strong></a>
        </div>
      </div>

      <footer className="rodape">
        <img src="/media/logo-mr.png" alt="MR Água Prime" width={254} height={304} />
        <p>Tratamento de água de poço artesiano e cacimba. Atendemos Sergipe, Alagoas, Bahia e Pernambuco.</p>
        <div className="redes">
          <a className="ico" href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram da MR Água Prime"><Icon nome="ig" /></a>
          <a className="ico" href={zap()} target="_blank" rel="noopener" aria-label="WhatsApp da MR Água Prime"><Icon nome="wa" /></a>
        </div>
        <p>© 2026 MR Água Prime</p>
      </footer>
    </section>
  );
}
