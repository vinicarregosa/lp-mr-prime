import { ZAP_ORCAMENTO } from '../data/site';
import { Icon, type NomeIcone } from './Icon';

const DESTAQUES: [NomeIcone, string][] = [
  ['escudo', 'Mais saúde e segurança'],
  ['gota', 'Sem cor, cheiro ou gosto ruim'],
  ['casa', 'Soluções inteligentes no tratamento de água de poço, cacimbas, tanques, rios e etc…'],
  ['ondas', 'Conforto e qualidade de vida'],
];

/** Hero: fundo de água com aproximação lenta (CSS) e o filtro MR Água Prime ao lado do texto. */
export function Hero() {
  return (
    <section className="hero" id="inicio" aria-label="Início">
      <div className="hero-foto" aria-hidden="true">
        {/* React 18 só conhece fetchPriority em minúsculas como atributo HTML */}
        <img src="/media/hero-agua.webp" alt="" width={1000} height={958} {...{ fetchpriority: 'high' }} decoding="async" />
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

        <div className="hero-filtro" aria-hidden="true">
          <img src="/media/hero-filtro.webp" alt="" width={602} height={1158} decoding="async" />
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
