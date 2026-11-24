import { ZAP_ORCAMENTO } from '../data/site';
import { Icon, type NomeIcone } from './Icon';

const DESTAQUES: [NomeIcone, string][] = [
  ['escudo', 'Mais saúde e segurança'],
  ['gota', 'Sem cor, cheiro ou gosto ruim'],
  ['casa', 'Soluções inteligentes no tratamento de água de poço, cacimbas, tanques, rios e etc…'],
  ['ondas', 'Conforto e qualidade de vida'],
];

/** Hero: foto da casa com aproximação lenta (CSS) e tom azul-marinho por cima. */
export function Hero() {
  return (
    <section className="hero" id="inicio" aria-label="Início">
      <div className="hero-foto" aria-hidden="true">
        <picture>
          <source media="(max-width: 899px)" srcSet="/media/hero-casa-m.webp" />
          {/* React 18 só conhece fetchPriority em minúsculas como atributo HTML */}
          <img src="/media/hero-casa.webp" alt="" width={2400} height={1018} {...{ fetchpriority: 'high' }} decoding="async" />
        </picture>
      </div>

      <p className="hero-frase" aria-hidden="true">Água pura<br />de verdade!</p>

      <div className="wrap hero-in">
        <div className="vidro">
          <p className="selo">Água limpa e segura para sua família</p>
          <h1>Filtro central para <em>água de poço</em><span className="h1-sub">Residencial, comercial e industrial</span></h1>
          <p className="sub">Tratamento de água de poço para residências, condomínios, sítios e empresas. Água pura em todas as torneiras, com instalação e suporte técnico especializados.</p>
          <div className="acoes">
            <a className="btn" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento</a>
            <a className="btn btn-vidro" href="#filtros">Ver modelos</a>
          </div>
        </div>

        <ul className="chips">
          {DESTAQUES.map(([ic, t]) => (
            <li key={t}><Icon nome={ic} /> {t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
