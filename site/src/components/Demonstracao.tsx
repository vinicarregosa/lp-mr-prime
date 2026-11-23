import { ZAP_ORCAMENTO } from '../data/site';
import { Icon, type NomeIcone } from './Icon';
import { FxUp } from './Reveal';

const ITENS: [NomeIcone, string, string][] = [
  ['camadas', 'Tanque em PVC reforçado com fibra de vidro', 'Aprovado pelo Inmetro'],
  ['raio', 'Válvula automática com controle digital', 'Operação automática e programável'],
  ['chave', 'Tubulação e conexões', 'Instalação limpa, feita pela nossa equipe'],
  ['medidor', 'Mídias filtrantes em camadas', 'Remoção de cheiro, cor, sabor e metais pesados'],
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
            <FxUp as="p" className="lead" atraso={120}>Cada sistema é montado com componentes de alta qualidade e instalado na entrada do seu imóvel, seguindo a Portaria GM/MS nº 888, de 4 de maio de 2021 (Anexo XX), do Ministério da Saúde, para o controle e a vigilância da qualidade da água para consumo humano.</FxUp>
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
