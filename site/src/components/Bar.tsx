import { useEffect, useRef, useState } from 'react';
import { ZAP_ORCAMENTO } from '../data/site';
import { Icon } from './Icon';

const LINKS: [string, string][] = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre nós'],
  ['antes-depois', 'Sem e com filtro'],
  ['filtros', 'Filtros'],
  ['instalacao', 'Instalações'],
  ['duvidas', 'Dúvidas'],
  ['contato', 'Contato'],
];

export function Bar() {
  const [aberto, setAberto] = useState(false);
  const [solida, setSolida] = useState(false);
  const [atual, setAtual] = useState('inicio');
  const barRef = useRef<HTMLElement>(null);

  // fundo da barra depois do topo + seção atual
  useEffect(() => {
    const ac = new AbortController();
    let esperando = false;
    const atualizar = () => {
      esperando = false;
      setSolida(scrollY > 40);
      const y = scrollY + innerHeight * 0.4;
      let a = 'inicio';
      LINKS.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + scrollY <= y) a = id;
      });
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
    addEventListener('resize', () => { if (innerWidth >= 1280) setAberto(false); }, { signal: ac.signal });
    document.addEventListener('click', (e) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setAberto(false);
    }, { signal: ac.signal });
    return () => ac.abort();
  }, []);

  return (
    <header className={`bar${solida ? ' solid' : ''}${aberto ? ' open' : ''}`} id="bar" ref={barRef}>
      <div className="bar-in">
        <a className="marca" href="#inicio" aria-label="MR Água Prime, início">
          <img src="/media/logo-mr.png" alt="" width={254} height={304} />
          <span><b>MR ÁGUA PRIME</b><small>Água pura de verdade</small></span>
        </a>
        <nav className="menu" id="menu" aria-label="Seções da página" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setAberto(false); }}>
          {LINKS.map(([id, texto]) => (
            <a key={id} href={`#${id}`} aria-current={atual === id ? 'true' : undefined}>{texto}</a>
          ))}
          <a className="btn menu-cta" href={ZAP_ORCAMENTO} target="_blank" rel="noopener"><Icon nome="fone" /> Fale com o Mister Prime</a>
        </nav>
        <div className="bar-acoes">
          <a className="btn btn-bar" href={ZAP_ORCAMENTO} target="_blank" rel="noopener"><Icon nome="fone" /> Fale com o Mister Prime</a>
          <button className="burger" type="button" aria-expanded={aberto} aria-controls="menu" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto((o) => !o)}>
            <Icon nome={aberto ? 'x' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
