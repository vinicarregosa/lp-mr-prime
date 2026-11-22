import { ZAP_ORCAMENTO } from '../data/site';
import { Icon, type NomeIcone } from './Icon';
import { FxUp } from './Reveal';

const ITENS: [NomeIcone, string, string][] = [
  ['camadas', 'Vasos de fibra de vidro', 'Resistentes, na medida certa para o seu poço'],
  ['raio', 'Válvula de controle digital', 'Retrolavagem automática e programável'],
  ['chave', 'Tubulação e conexões', 'Instalação limpa, feita pela nossa equipe'],
  ['medidor', 'Mídias filtrantes em camadas', 'Remoção de cor, cheiro, gosto e impurezas'],
];

/** Bloco escuro com as fotos reais das instalações (sem inventar números nem depoimentos). */
export function Demonstracao() {
  return (
    <section className="sec sec-demo" id="instalacao" aria-labelledby="demo-h">
      <div className="wrap">
        <div className="demo">
          <div className="demo-txt">
            <FxUp as="p" className="tag tag-claro">Instalações reais</FxUp>
            <FxUp as="h2" atraso={60}><span id="demo-h">Veja o sistema MR Água Prime em detalhes</span></FxUp>
            <FxUp as="p" className="lead" atraso={120}>Cada sistema é montado com componentes de alta qualidade e instalado na entrada do seu imóvel.</FxUp>
            <ul className="demo-lista">
              {ITENS.map(([ic, t, d]) => (
                <li key={t}>
                  <span className="demo-ic"><Icon nome={ic} /></span>
                  <span><b>{t}</b><small>{d}</small></span>
                </li>
              ))}
            </ul>
            <a className="btn btn-claro" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
          </div>
          <div className="demo-fotos">
            <figure>
              <img src="/media/cli-3.webp" alt="Filtro MR instalado ao ar livre, com tubulação verde, ao lado de uma caixa d'água, em Maceió" width={1029} height={1373} loading="lazy" decoding="async" />
              <figcaption>Instalação ao ar livre, em Maceió</figcaption>
            </figure>
            <figure>
              <img src="/media/cli-2.webp" alt="Dois filtros MR instalados lado a lado, com controladores digitais e tubulação azul, em Aracaju" width={738} height={984} loading="lazy" decoding="async" />
              <figcaption>Dois filtros com controle digital, em Aracaju</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
