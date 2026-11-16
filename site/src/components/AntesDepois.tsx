import { useEffect, useRef } from 'react';
import { clamp, easeS, reducedMotion } from '../lib/util';
import { FxUp } from './Reveal';

const limitar = (v: number) => clamp(v, 0.04, 0.96);

/**
 * Antes e depois: puxar a barra dentro do retângulo.
 * - Arrastar com mouse ou toque em qualquer ponto, ou pelo teclado (setas, Home, End; Shift anda mais).
 * - Ao rolar, a barra é puxada da água suja até o meio (reversível). Quando a pessoa pega a barra, o controle passa a ser dela.
 * - Os dois vídeos são o mesmo copo, suja e limpa; tocam uma vez e param no último quadro, e recomeçam quando a seção volta à tela.
 * - Com movimento reduzido os vídeos nem baixam e a barra continua funcionando.
 */
function useComparador() {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const turvaRef = useRef<HTMLVideoElement>(null);
  const limpaRef = useRef<HTMLVideoElement>(null);
  const chipL = useRef<HTMLSpanElement>(null);
  const chipR = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current!, handle = handleRef.current!, vT = turvaRef.current!, vC = limpaRef.current!;
    const cl = chipL.current!, cr = chipR.current!;
    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const reduced = reducedMotion();
    let d = 0.5, interagiu = false, arrastando = false, carregado = false, recomecar = false, scrubEsperando = false;

    const setD = (x: number) => {
      d = x;
      card.style.setProperty('--d', x.toFixed(4));
      handle.setAttribute('aria-valuenow', String(Math.round(x * 100)));
      const w = card.clientWidth;                                  // o rótulo só aparece se couber sem encostar na barra
      cl.style.opacity = x * w > cl.offsetWidth + 40 ? '1' : '0';
      cr.style.opacity = (1 - x) * w > cr.offsetWidth + 40 ? '1' : '0';
    };
    setD(0.5);

    const doX = (clientX: number) => { const r = card.getBoundingClientRect(); return limitar((clientX - r.left) / r.width); };
    card.addEventListener('pointerdown', (e) => { interagiu = true; arrastando = true; card.setPointerCapture(e.pointerId); setD(doX(e.clientX)); }, sig);
    card.addEventListener('pointermove', (e) => { if (arrastando) setD(doX(e.clientX)); }, sig);
    const fim = () => { arrastando = false; };
    card.addEventListener('pointerup', fim, sig);
    card.addEventListener('pointercancel', fim, sig);
    handle.addEventListener('keydown', (e) => {
      const passo = e.shiftKey ? 0.15 : 0.05;
      if (e.key === 'ArrowLeft') setD(limitar(d - passo));
      else if (e.key === 'ArrowRight') setD(limitar(d + passo));
      else if (e.key === 'Home') setD(0.04);
      else if (e.key === 'End') setD(0.96);
      else return;
      interagiu = true; e.preventDefault();
    }, sig);

    if (reduced) return () => ac.abort();

    /* ----- vídeos ----- */
    const carregar = () => {
      if (carregado) return; carregado = true;
      vC.src = '/media/ba-limpa.mp4'; vT.src = '/media/ba-turva.mp4';
      vC.load(); vT.load();
    };
    const tocar = () => [vC, vT].forEach((v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
    const pausar = () => { vC.pause(); vT.pause(); recomecar = true; };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          carregar();
          if (recomecar) { vC.currentTime = 0; vT.currentTime = 0; recomecar = false; }   // ao voltar para a seção, a cena recomeça
          tocar();
        } else pausar();
      });
    }, { threshold: 0.35, rootMargin: '30% 0px' });
    io.observe(card);
    // os dois vídeos têm a mesma duração; isto só corrige uma deriva rara entre eles
    const sync = window.setInterval(() => {
      if (vC.paused || vT.paused || !vC.duration) return;
      if (Math.abs(vT.currentTime - vC.currentTime) > 0.08) vT.currentTime = vC.currentTime;
    }, 700);

    /* ----- a rolagem puxa a barra e firma o retângulo ----- */
    const scrub = () => {
      scrubEsperando = false;
      const r = card.getBoundingClientRect(), vh = innerHeight;
      const c = 1 - (r.top + r.height / 2) / vh;                   // 0: centro do retângulo na borda de baixo; 0,5: no meio da tela
      card.style.setProperty('--a', easeS(clamp((c - 0.02) / 0.3, 0, 1)).toFixed(3));   // o retângulo sobe e firma ao entrar
      if (interagiu) return;
      setD(0.94 + (0.5 - 0.94) * easeS(clamp((c - 0.2) / 0.34, 0, 1)));
    };
    const pedirScrub = () => { if (!scrubEsperando) { scrubEsperando = true; requestAnimationFrame(scrub); } };
    addEventListener('scroll', pedirScrub, { ...sig, passive: true });
    addEventListener('resize', pedirScrub, sig);
    scrub();

    return () => { ac.abort(); io.disconnect(); clearInterval(sync); };
  }, []);

  return { cardRef, handleRef, turvaRef, limpaRef, chipL, chipR };
}

export function AntesDepois() {
  const { cardRef, handleRef, turvaRef, limpaRef, chipL, chipR } = useComparador();
  return (
    <section className="sec ba-sec" id="antes-depois">
      <FxUp as="h2">Sem filtro. Com filtro.</FxUp>
      <FxUp as="p" className="lead" atraso={90}>A água do poço entra por um lado e sai pelo outro, depois de passar pelo equipamento. Puxe a barra para comparar.</FxUp>
      <div className="ba-card" id="ba" ref={cardRef} aria-label="Comparação da água sem filtro e com filtro">
        <video ref={limpaRef} id="vClean" muted playsInline preload="none" poster="/media/ba-limpa-poster.webp" aria-hidden="true" tabIndex={-1} />
        <div className="ba-turva">
          <video ref={turvaRef} id="vTurva" muted playsInline preload="none" poster="/media/ba-turva-poster.webp" aria-hidden="true" tabIndex={-1} />
        </div>
        <span className="ba-chip l" ref={chipL}>Sem filtro</span>
        <span className="ba-chip r" ref={chipR}>Com filtro</span>
        <span className="ba-line" aria-hidden="true" />
        <div className="ba-handle" id="handle" ref={handleRef} role="slider" tabIndex={0} aria-label="Comparar a água sem filtro e com filtro" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50}>
          <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 8l-6 6 6 6M18 8l6 6-6 6" /></svg>
        </div>
      </div>
      <FxUp as="p" className="ba-note">Imagens ilustrativas. Resultados variam conforme a água de cada poço.</FxUp>
    </section>
  );
}
