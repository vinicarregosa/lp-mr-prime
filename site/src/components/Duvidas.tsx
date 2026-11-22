import { DUVIDAS } from '../data/site';
import { FxUp } from './Reveal';

export function Duvidas() {
  return (
    <section className="sec" id="duvidas" aria-labelledby="duvidas-h">
      <div className="wrap duvidas">
        <div>
          <FxUp as="p" className="tag">Dúvidas</FxUp>
          <FxUp as="h2" atraso={60}><span id="duvidas-h">Perguntas frequentes</span></FxUp>
          <FxUp as="p" className="lead" atraso={120}>As dúvidas mais comuns de quem tem poço em casa, no sítio ou na empresa.</FxUp>
        </div>
        <FxUp className="faq" atraso={80}>
          {DUVIDAS.map((d) => (
            <details key={d.q}>
              <summary>{d.q}</summary>
              <p>{d.a}</p>
            </details>
          ))}
        </FxUp>
      </div>
    </section>
  );
}
