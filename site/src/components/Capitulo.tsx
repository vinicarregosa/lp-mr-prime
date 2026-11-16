import type { CSSProperties } from 'react';
import { useCapitulo, useHeroVideo } from '../hooks/useCapitulo';
import { ZAP_ORCAMENTO } from '../data/site';
import { Icon } from './Icon';

const atraso = (ms: number) => ({ '--d': `${ms}ms` } as CSSProperties);

/**
 * Capítulo: Hero e Quem somos.
 * No desktop com movimento o palco fica fixo e a rolagem faz a água do hero virar o retângulo do Quem somos.
 * Nos outros casos são duas seções comuns, uma abaixo da outra.
 */
export function Capitulo() {
  useHeroVideo();
  useCapitulo();

  return (
    <div className="capitulo" id="cap">
      <section className="hero" id="hero" aria-label="Início">
        <span className="film-sombra" aria-hidden="true" />
        <div className="film" id="film">
          <picture>
            <source media="(max-width: 899px)" srcSet="/media/poster-mobile.webp" />
            {/* React 18 só conhece fetchPriority em minúsculas como atributo HTML */}
            <img className="poster" src="/media/poster-desktop.webp" alt="" width={1920} height={1080} {...{ fetchpriority: 'high' }} decoding="async" />
          </picture>
          <video id="vid" muted loop playsInline preload="none" tabIndex={-1} aria-hidden="true" />
        </div>

        <div className="inner" id="inner">
          <h1 className="rise" style={atraso(80)}>Água de qualidade começa com a solução certa.</h1>
          <p className="sub rise" style={atraso(200)}>Filtros e sistemas de tratamento para água de poço, com instalação e suporte técnico. Atendemos Sergipe, Alagoas, Bahia e Pernambuco.</p>
          <div className="actions rise" style={atraso(320)}>
            <a className="btn" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento</a>
            <a className="link" href="#produtos">Ver os filtros</a>
          </div>
        </div>

        <p className="facts rise" id="facts" style={atraso(520)}>
          <span>Poço artesiano e cacimba</span>
          <span>Instalação e suporte técnico</span>
          <span>Sergipe, Alagoas, Bahia e Pernambuco</span>
        </p>
      </section>

      <section className="sec quem" id="quem-somos" aria-labelledby="quem-h">
        <div className="quem-grid">
          <div className="quem-txt">
            <p className="tag q-i">Quem somos</p>
            <h2 className="q-i" id="quem-h">Somos a MR&nbsp;Água&nbsp;Prime, de&nbsp;Aracaju.</h2>
            <p className="q-i">A MR Água Prime trata água de poço artesiano e de cacimba. Fica em Aracaju e atende Sergipe, Alagoas, Bahia e Pernambuco, em residências, condomínios, sítios e empresas.</p>
            <p className="q-i">À frente da empresa está o Ribeirinho, o Mr.&nbsp;Prime. Nossos equipamentos usam tecnologia americana e chegam com instalação e suporte técnico.</p>
            <p className="q-i">Além dos filtros, vendemos ionizadores solares para piscina e consertamos máquinas de gelo. O atendimento é pelo WhatsApp: você conta como é o seu poço e a gente liga para indicar o equipamento adequado.</p>
            <a className="btn q-i" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
          </div>
          <div className="quem-panel" id="qPanel">
            <div className="qp-agua" aria-hidden="true">
              <video id="vQuem" muted loop playsInline preload="none" poster="/media/quem-poster.webp" tabIndex={-1} />
            </div>
            <div className="emb" id="emb" role="img" aria-label="Emblema da MR Água Prime: tecnologia em tratamento de água de poço">
              <div className="emb-float" aria-hidden="true">
                <video id="vEmb" className="emb-v" muted playsInline preload="none" poster="/media/emblema-poster.webp" tabIndex={-1} />
                <span className="emb-sheen" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
