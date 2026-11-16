import { IG_PATH, WA_PATH } from '../icons';

/** Ícones oficiais (Simple Icons, CC0) embutidos como <symbol>: nenhuma requisição extra. */
export function Sprites() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="i-wa" viewBox="0 0 24 24"><path d={WA_PATH} /></symbol>
      <symbol id="i-ig" viewBox="0 0 24 24"><path d={IG_PATH} /></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></symbol>
    </svg>
  );
}

export function Icon({ nome }: { nome: 'wa' | 'ig' | 'menu' | 'x' }) {
  return (
    <svg className="i" aria-hidden="true" focusable="false"><use href={`#i-${nome}`} /></svg>
  );
}
