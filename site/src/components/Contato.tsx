import { INSTAGRAM_URL, INSTAGRAM_USER, TELEFONE, ZAP_ORCAMENTO, zap } from '../data/site';
import { Icon } from './Icon';
import { FxUp } from './Reveal';

const SELOS = ['Residências e condomínios', 'Água de poço', 'Instalação especializada', 'Suporte técnico'];

/** Contato: só links, sem formulário. Fecha a página com o bloco azul-marinho e o rodapé. */
export function Contato() {
  return (
    <section className="sec sec-contato" id="contato" aria-labelledby="contato-h">
      <FxUp className="cta">
        <div className="wrap cta-in">
          <div className="cta-txt">
            <h2 id="contato-h">Fale com o Mister Prime</h2>
            <p className="lead">Solicite um orçamento sem compromisso e fale agora mesmo com a nossa equipe técnica.</p>
            <div className="tel">
              <span className="tel-ic"><Icon nome="fone" /></span>
              <span><small>Telefone</small><b>{TELEFONE}</b></span>
            </div>
            <div className="acoes">
              <a className="btn btn-zap" href={ZAP_ORCAMENTO} target="_blank" rel="noopener"><Icon nome="wa" /> WhatsApp {TELEFONE}</a>
              <a className="btn btn-claro" href={INSTAGRAM_URL} target="_blank" rel="noopener"><Icon nome="ig" /> Seguir no Instagram</a>
            </div>
          </div>
          <div className="cta-lado">
            <p><Icon nome="pino" /> Atendemos Sergipe, Alagoas, Bahia e Pernambuco, com bases em Aracaju e Maceió.</p>
            <p><Icon nome="ig" /> Siga-nos {INSTAGRAM_USER}</p>
          </div>
        </div>
      </FxUp>

      <div className="wrap">
        <footer className="rodape">
          <a className="marca marca-esc" href="#inicio" aria-label="MR Água Prime, início">
            <img src="/media/logo-mr.png" alt="" width={254} height={304} />
            <span><b>MR ÁGUA PRIME</b><small>Água pura de verdade</small></span>
          </a>
          <ul className="selos">
            {SELOS.map((s) => <li key={s}><Icon nome="ok" /> {s}</li>)}
          </ul>
          <nav className="rod-links" aria-label="Rodapé">
            <a href="#sobre">Sobre nós</a>
            <a href="#filtros">Filtros</a>
            <a href="#duvidas">Perguntas frequentes</a>
            <a href={zap()} target="_blank" rel="noopener">Contato</a>
          </nav>
          <p className="copy">© 2026 MR Água Prime · Aracaju, SE</p>
          <p className="copy creditos">Site desenvolvido por <a href="https://mavintecnologia.vercel.app" target="_blank" rel="noopener noreferrer">MAVIN</a></p>
        </footer>
      </div>
    </section>
  );
}
