import { Icon } from './Icon';
import { FxUp } from './Reveal';

const LUGARES: [string, string][] = [
  ['Residências', 'residencias'],
  ['Condomínios', 'condominios'],
  ['Sítios e fazendas', 'sitios'],
  ['Empresas', 'empresas'],
  ['Indústrias', 'industrias'],
];

/** "Onde atuamos": faixa logo abaixo do hero, com foto de cada ambiente e faixa azul com o nome. */
export function Atuacao() {
  return (
    <section className="atua" id="atuacao" aria-labelledby="atua-h">
      <div className="wrap">
        <FxUp as="h2" atraso={0}><span id="atua-h">Onde atuamos</span></FxUp>
        <FxUp as="p" className="atua-sub" atraso={60}>Tratamos água de poço em Sergipe, Alagoas, Bahia e Pernambuco, com bases em Aracaju e Maceió.</FxUp>
        <ul className="lugares">
          {LUGARES.map(([t, f], i) => (
            <FxUp as="li" key={t} atraso={i * 60}>
              <img src={`/media/lugar-${f}.webp`} alt="" width={560} height={334} loading="lazy" decoding="async" />
              <span>{t}</span>
            </FxUp>
          ))}
        </ul>
        <FxUp as="p" className="nota" atraso={120}><Icon nome="ondas" /> <span>Além dos filtros que comercializamos, damos <b>manutenção em todos os tipos de equipamento do mercado</b>.</span></FxUp>
      </div>
    </section>
  );
}
