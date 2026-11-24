import { Icon, type NomeIcone } from './Icon';
import { FxUp } from './Reveal';

const CARTOES: [NomeIcone, string, string][] = [
  ['gota', 'Água tratada na entrada', 'Filtros centrais que tratam a água do poço antes de chegar às caixas d\'água e às torneiras.'],
  ['chave', 'Equipe técnica especializada para instalação', 'Equipe técnica própria para instalação e manutenção de todos os equipamentos do mercado.'],
  ['escudo', 'Suporte técnico', 'Acompanhamento no pós-venda, direto no WhatsApp com o Mister Prime.'],
  ['camadas', 'Filtragem em camadas', 'Mídias filtrantes que ajudam a remover cheiro, cor, sabor e todas as deficiências que a água venha a ter.'],
];

const LUGARES: [NomeIcone, string][] = [
  ['casa', 'Residências'],
  ['predio', 'Condomínios'],
  ['planta', 'Sítios e fazendas'],
  ['maleta', 'Empresas'],
  ['fabrica', 'Indústrias'],
];

export function Sobre() {
  return (
    <section className="sec" id="sobre" aria-labelledby="sobre-h">
      <div className="wrap sobre-grid">
        <div>
          <FxUp as="p" className="tag">Sobre nós</FxUp>
          <FxUp as="h2" atraso={60}><span id="sobre-h">Empresa especializada em tratamento para água de poço residencial, comercial e industrial.</span></FxUp>
          <FxUp as="p" className="lead" atraso={120}>A MR Água Prime oferece soluções completas em tratamento de águas de poço artesiano, tanques, cacimbas, cisternas, rios, etc. Unimos equipamentos de qualidade, instalação e suporte técnico para entregar água limpa e segura onde você precisa. À frente da empresa está o Mister Prime, e o atendimento é próximo e direto.</FxUp>

          <div className="onde">
            <h3>Onde atuamos</h3>
            <p>Tratamos água de poço em Sergipe, Alagoas, Bahia e Pernambuco, com bases em Aracaju e Maceió.</p>
            <ul className="lugares">
              {LUGARES.map(([ic, t]) => (
                <li key={t}><Icon nome={ic} /><span>{t}</span></li>
              ))}
            </ul>
            <p className="nota"><Icon nome="ondas" /> <span>Além dos filtros que comercializamos, damos <b>manutenção em todos os tipos de equipamento do mercado</b>.</span></p>
          </div>
        </div>

        <div className="cartoes">
          {CARTOES.map(([ic, t, d], i) => (
            <FxUp key={t} className="cartao" atraso={i * 70}>
              <span className="cartao-ic"><Icon nome={ic} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </FxUp>
          ))}
        </div>
      </div>
    </section>
  );
}
