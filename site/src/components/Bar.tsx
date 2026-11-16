import { useEffect, useRef, useState } from 'react';
import { INSTAGRAM_URL, ZAP_ORCAMENTO, zap } from '../data/site';
import { Icon } from './Icon';

// Ordem em que as seções aparecem na página: a última cujo início já passou é a "atual".
const ORDEM = ['hero', 'quem-somos', 'antes-depois', 'produtos', 'depoimentos', 'contato'];

/** Onde a seção começa na página. Dentro do capítulo fixo, "Quem somos" só vale a partir de ~80% dele. */
function inicio(id: string): number {
  const el = document.getElementById(id);
  if (!el) return Infinity;
  if (id === 'quem-somos' && document.documentElement.classList.contains('pinned')) {
    const cap = document.getElementById('cap')!;
    return cap.getBoundingClientRect().top + scrollY + (cap.offsetHeight - innerHeight) * 0.8;
  }
  return el.getBoundingClientRect().top + scrollY;
}

export function Bar() {
  const [aberto, setAberto] = useState(false);
  const [solida, setSolida] = useState(false);
  const [atual, setAtual] = useState<string | null>(null);
  const barRef = useRef<HTMLElement>(null);

  // fundo da barra depois do hero + seção atual
  useEffect(() => {
    const ac = new AbortController();
    let esperando = false;
    const atualizar = () => {
      esperando = false;
      setSolida(scrollY > innerHeight * 0.6);
      const y = scrollY + innerHeight * 0.45;
      let a: string | null = null;
      ORDEM.forEach((id) => { if (inicio(id) <= y) a = id; });
      setAtual(a);
    };
    const pedir = () => { if (!esperando) { esperando = true; requestAnimationFrame(atualizar); } };
    addEventListener('scroll', pedir, { passive: true, signal: ac.signal });
    addEventListener('load', atualizar, { signal: ac.signal });
    atualizar();
    return () => ac.abort();
  }, []);

  // menu recolhido: Esc, largura grande e clique fora fecham
  useEffect(() => {
    const ac = new AbortController();
    addEventListener('keydown', (e) => { if (e.key === 'Escape') setAberto(false); }, { signal: ac.signal });
    addEventListener('resize', () => { if (innerWidth >= 1100) setAberto(false); }, { signal: ac.signal });
    document.addEventListener('click', (e) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setAberto(false);
    }, { signal: ac.signal });
    return () => ac.abort();
  }, []);

  const link = (href: string, texto: string) => (
    <a href={href} aria-current={atual === href.slice(1) ? 'true' : undefined}>{texto}</a>
  );

  return (
    <header className={`bar${solida ? ' solid' : ''}${aberto ? ' open' : ''}`} id="bar" ref={barRef}>
      <a className="logo" href="#" aria-label="MR Água Prime, início">
        <img src="/media/logo-mr.png" alt="MR Água Prime" width={254} height={304} />
      </a>
      <nav className="menu" id="menu" aria-label="Seções da página" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setAberto(false); }}>
        {link('#quem-somos', 'Quem somos')}
        {link('#produtos', 'Filtros')}
        {link('#depoimentos', 'Clientes')}
        {link('#contato', 'Contato')}
        <a className="btn menu-cta" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento <Icon nome="wa" /></a>
      </nav>
      <div className="bar-acoes">
        <a className="ico" href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram da MR Água Prime"><Icon nome="ig" /></a>
        <a className="ico" href={zap()} target="_blank" rel="noopener" aria-label="WhatsApp da MR Água Prime"><Icon nome="wa" /></a>
        <a className="btn" href={ZAP_ORCAMENTO} target="_blank" rel="noopener">Solicitar orçamento</a>
        <button className="burger" id="burger" type="button" aria-expanded={aberto} aria-controls="menu" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto((o) => !o)}>
          <Icon nome={aberto ? 'x' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
