import { Icon, type NomeIcone } from './Icon';
import { FxUp } from './Reveal';

// Só o que consta nos materiais do dono (folhetos dos filtros e cartuchos).
const PROBLEMAS: [NomeIcone, string][] = [
  ['gota', 'Cor, cheiro e gosto ruim'],
  ['frasco', 'Ferro e manganês'],
  ['escudo', 'Metais pesados'],
  ['ondas', 'Sólidos em suspensão'],
  ['camadas', 'Dureza (cálcio e magnésio)'],
  ['medidor', 'Nitratos'],
  ['bicho', 'Vírus e bactérias'],
];

const MIDIAS: [string, string][] = [
  ['Zeólita', 'Auxilia na remoção de ferro e manganês'],
  ['Carvão ativado', 'Reduz odores e gostos indesejáveis'],
  ['Resina catiônica', 'Reforço contra a dureza da água'],
];

export function Diagnostico() {
  return (
    <section className="sec sec-gelo" id="diagnostico" aria-labelledby="diag-h">
      <div className="wrap diag">
        <div className="diag-esq">
          <FxUp as="p" className="tag">Diagnóstico</FxUp>
          <FxUp as="h2" atraso={60}><span id="diag-h">Sua água tem problemas?</span></FxUp>
          <FxUp as="p" className="lead" atraso={120}>A água de poço sem tratamento pode ter impurezas que afetam a saúde, os equipamentos e o conforto do seu imóvel. Os nossos filtros resolvem.</FxUp>
          <FxUp className="diag-foto" atraso={160}>
            <img src="/media/diagnostico.webp" alt="Água limpa sendo servida de uma jarra em um copo" width={393} height={406} loading="lazy" decoding="async" />
          </FxUp>
        </div>

        <div className="diag-dir">
          <FxUp as="h3" className="diag-tit">Nossos filtros resolvem:</FxUp>
          <ul className="problemas">
            {PROBLEMAS.map(([ic, t], i) => (
              <FxUp as="li" key={t} atraso={i * 50}><span className="prob-ic"><Icon nome={ic} /></span>{t}</FxUp>
            ))}
          </ul>
          <div className="midias">
            {MIDIAS.map(([t, d], i) => (
              <FxUp key={t} className="midia" atraso={i * 70}>
                <b>{t}</b>
                <span>{d}</span>
              </FxUp>
            ))}
          </div>
          <p className="diag-nota">Os resultados variam conforme a água de cada poço.</p>
        </div>
      </div>
    </section>
  );
}
