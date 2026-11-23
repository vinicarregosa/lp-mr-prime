import type { CSSProperties } from 'react';
import { FILTROS, ZAP_ORCAMENTO, zapModelo } from '../data/site';
import { Icon } from './Icon';
import { FxUp } from './Reveal';

/** Cartões de filtros: faixa colorida, foto sem fundo, lista curta e CTA para o WhatsApp. Sem preço. */
export function Filtros() {
  return (
    <section className="sec sec-gelo" id="filtros" aria-labelledby="filtros-h">
      <div className="wrap">
        <FxUp as="p" className="tag">Filtros e soluções</FxUp>
        <FxUp as="h2" atraso={60}><span id="filtros-h">Soluções completas para a sua água</span></FxUp>
        <FxUp as="p" className="lead" atraso={120}>Escolha o modelo ideal para o seu poço. A indicação certa depende da água de cada local, e a nossa equipe ajuda você a escolher pelo WhatsApp.</FxUp>

        <div className="grade-filtros">
          {FILTROS.map((f, i) => (
            <FxUp as="article" key={f.modelo} className={`pcard${f.destaque ? ' destaque' : ''}`} atraso={i * 80}>
              <header className="pfaixa">{f.faixa}</header>
              <div className={`pfoto${f.imagens ? ' multi' : ''}`} style={{ '--img': `url(${f.imagem})` } as CSSProperties}>
                {(f.imagens ?? [f.imagem]).map((src, k) => (
                  <img key={src} src={src} alt={`Filtro ${f.modelo}${f.imagens ? `, foto ${k + 1}` : ''}`} loading="lazy" decoding="async" />
                ))}
              </div>
              <div className="pcorpo">
                <h3>{f.titulo}</h3>
                <p className="pdesc">{f.descricao}</p>
                <ul className="pitens">
                  {f.itens.map((t) => <li key={t}><Icon nome="ok" /> {t}</li>)}
                </ul>
                <a className="btn pbtn" href={zapModelo(f.modelo)} target="_blank" rel="noopener"><Icon nome="wa" /> Solicitar orçamento</a>
              </div>
            </FxUp>
          ))}
        </div>

        <FxUp className="fila-cta">
          <p>Não sabe qual modelo escolher?</p>
          <a className="btn" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Falar com o Mister Prime <Icon nome="wa" /></a>
        </FxUp>
      </div>
    </section>
  );
}
