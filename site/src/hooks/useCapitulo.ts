import { useEffect } from 'react';
import { clamp, easeIO, easeOut, reducedMotion, seg } from '../lib/util';

const root = () => document.documentElement;
const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const tocar = (v: HTMLVideoElement) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

/**
 * Entrada do hero e vídeo da água.
 * O vídeo só começa a baixar depois que a página ficou pronta (para não competir com o poster, que é o LCP)
 * e pausa quando o hero sai da tela. Com movimento reduzido ele nem baixa.
 */
export function useHeroVideo() {
  useEffect(() => {
    const ac = new AbortController();
    const timers: number[] = [];
    const r = root();
    const hero = el('hero'), video = el<HTMLVideoElement>('vid');
    const mobile = matchMedia('(max-width: 899px)').matches;

    // a entrada só começa depois da primeira pintura
    requestAnimationFrame(() => requestAnimationFrame(() => r.classList.add('ready')));
    timers.push(window.setTimeout(() => r.classList.add('settled'), 2200));   // depois da entrada, a rolagem controla a opacidade sem atraso
    if (reducedMotion()) { r.dataset.ready = '1'; return () => timers.forEach(clearTimeout); }

    const iniciar = () => {
      if (video.getAttribute('src')) return;
      video.src = mobile ? '/media/agua-mobile.mp4' : '/media/agua-desktop.mp4';
      video.addEventListener('playing', () => { hero.dataset.video = 'on'; r.dataset.ready = '1'; }, { once: true });
      tocar(video);
    };
    if (document.readyState === 'complete') timers.push(window.setTimeout(iniciar, 0));
    else addEventListener('load', () => timers.push(window.setTimeout(iniciar, 0)), { signal: ac.signal, once: true });

    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (!video.getAttribute('src')) return; if (e.isIntersecting) tocar(video); else video.pause(); });
    }, { threshold: 0.05 });
    io.observe(hero);

    return () => { ac.abort(); io.disconnect(); timers.forEach(clearTimeout); };
  }, []);
}

/**
 * Capítulo: hero -> Quem somos, guiado pela rolagem.
 * p = quanto do capítulo já foi rolado (0 a 1). Tudo é função de p:
 *   0.00-0.26  o texto do hero sobe e some
 *   0.10-0.62  a água do hero encolhe até o retângulo da direita (clip-path, sem mexer em layout)
 *   0.40-0.80  o texto do Quem somos entra, linha por linha
 *   0.60       o emblema toca uma vez e fica no último quadro; ao voltar abaixo de 0.36 ele reinicia
 * Sem capítulo fixo (celular, tela baixa, movimento reduzido) o hero é comum e o Quem somos é uma seção logo abaixo.
 */
export function useCapitulo() {
  useEffect(() => {
    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const r = root();
    const cap = el('cap'), quem = el('quem-somos'), inner = el('inner'), facts = el('facts'), vid = el<HTMLVideoElement>('vid');
    const panel = el('qPanel'), emb = el('emb'), vEmb = el<HTMLVideoElement>('vEmb'), vAgua = el<HTMLVideoElement>('vQuem');
    const reduced = reducedMotion();
    const coarse = matchMedia('(hover: none)').matches;
    const mqPin = matchMedia('(min-width: 900px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');

    let pinned = r.classList.contains('pinned');
    let run = 0, capTop = 0, ticking = false, embOn = false, resetT = 0, tiltRaf = 0, embTimer = 0, loadT = 0;
    const tg = { px: 0, py: 0, sy: 0 }, cur = { x: 0, y: 0 };
    const set = (n: string, v: string) => cap.style.setProperty(n, v);

    /* ----- emblema (vinheta) ----- */
    const carregarEmb = () => { if (!reduced && !vEmb.getAttribute('src')) vEmb.src = '/media/emblema.mp4'; };
    const embLigar = () => {
      if (embOn || reduced) return;
      embOn = true; clearTimeout(resetT); carregarEmb();
      if (vEmb.currentTime > 0.05 && vEmb.ended) { try { vEmb.currentTime = 0; } catch { /* ainda sem metadados */ } }
      tocar(vEmb);
      embTimer = window.setTimeout(() => { if (embOn) emb.classList.add('on'); }, 1500);   // se o play for barrado, mostra a capa
    };
    const embDesligar = () => {
      if (!embOn) return;
      embOn = false; emb.classList.remove('on');
      resetT = window.setTimeout(() => { vEmb.pause(); try { vEmb.currentTime = 0; } catch { /* idem */ } }, 450);
    };
    vEmb.addEventListener('playing', () => { if (embOn) emb.classList.add('on'); }, sig);
    if (!reduced) addEventListener('load', () => { loadT = window.setTimeout(carregarEmb, 2500); }, { ...sig, once: true });

    /* ----- inclinação: cursor + rolagem, suavizada ----- */
    const inclinar = () => {
      cur.x += (tg.px - cur.x) * 0.12; cur.y += ((tg.py + tg.sy) - cur.y) * 0.12;
      emb.style.setProperty('--rx', cur.x.toFixed(2) + 'deg'); emb.style.setProperty('--ry', cur.y.toFixed(2) + 'deg');
      tiltRaf = Math.abs(tg.px - cur.x) > 0.02 || Math.abs(tg.py + tg.sy - cur.y) > 0.02 ? requestAnimationFrame(inclinar) : 0;
    };
    const pedirTilt = () => { if (!tiltRaf && !reduced) tiltRaf = requestAnimationFrame(inclinar); };
    if (!reduced && !coarse) {
      addEventListener('pointermove', (e) => {
        if (!embOn) return;
        const b = panel.getBoundingClientRect();
        const nx = clamp((e.clientX - (b.left + b.width / 2)) / (innerWidth * 0.5), -1, 1);
        const ny = clamp((e.clientY - (b.top + b.height / 2)) / (innerHeight * 0.5), -1, 1);
        tg.px = ny * 7; tg.py = -nx * 11;
        emb.style.setProperty('--sx', (50 + nx * 42).toFixed(0) + '%'); emb.style.setProperty('--sy', (38 + ny * 42).toFixed(0) + '%');
        pedirTilt();
      }, { ...sig, passive: true });
    }

    /* ----- medidas ----- */
    const medir = () => {
      pinned = r.classList.contains('pinned');
      if (!pinned) {
        ['--m', '--ct', '--cr', '--cb', '--cl', '--t0', '--t1', '--t2', '--t3', '--t4', '--t5'].forEach((n) => cap.style.removeProperty(n));
        inner.style.transform = ''; inner.style.opacity = ''; inner.style.pointerEvents = ''; facts.style.opacity = ''; vid.style.transform = '';
        quem.classList.remove('live');
        return;
      }
      capTop = cap.getBoundingClientRect().top + scrollY;
      run = cap.offsetHeight - innerHeight;
      const q = quem.getBoundingClientRect(), p = panel.getBoundingClientRect();
      set('--ct', (p.top - q.top).toFixed(1) + 'px'); set('--cl', (p.left - q.left).toFixed(1) + 'px');
      set('--cr', (q.right - p.right).toFixed(1) + 'px'); set('--cb', (q.bottom - p.bottom).toFixed(1) + 'px');
    };

    /* ----- um quadro ----- */
    const frame = () => {
      ticking = false;
      const sy = scrollY;
      if (!pinned) {
        if (reduced) return;
        const q = clamp(sy / innerHeight, 0, 1);                       // hero comum: leve deslocamento do texto
        inner.style.transform = `translate3d(0,${(-q * 36).toFixed(1)}px,0)`;
        const op = Math.max(0, 1 - q * 2.6);
        inner.style.opacity = op.toFixed(3); inner.style.pointerEvents = op < 0.15 ? 'none' : 'auto';
        facts.style.opacity = Math.max(0, 1 - q * 3.2).toFixed(3);
        vid.style.transform = `scale(${(1 + q * 0.06).toFixed(4)})`;
        const b = panel.getBoundingClientRect(), c = clamp(1 - (b.top + b.height * 0.5) / innerHeight, 0, 1);   // 0 = embaixo da tela, 1 = em cima
        panel.style.setProperty('--o', easeOut(seg(c, 0.12, 0.45)).toFixed(3));
        tg.sy = (c - 0.5) * -22; pedirTilt();
        return;
      }
      const p = clamp((sy - capTop) / run, 0, 1);
      const m = easeIO(seg(p, 0.10, 0.62));
      set('--m', m.toFixed(4));
      const hp = seg(p, 0, 0.26), op2 = clamp(1 - hp * 1.25, 0, 1);
      inner.style.transform = `translate3d(0,${(-hp * 56).toFixed(1)}px,0)`;
      inner.style.opacity = op2.toFixed(3); inner.style.pointerEvents = op2 < 0.15 ? 'none' : 'auto';
      facts.style.opacity = clamp(1 - hp * 2.2, 0, 1).toFixed(3);
      vid.style.transform = `scale(${(1 + 0.05 * (1 - m)).toFixed(4)})`;
      for (let i = 0; i < 6; i++) set('--t' + i, easeOut(seg(p, 0.40 + i * 0.055, 0.56 + i * 0.055)).toFixed(3));
      quem.classList.toggle('live', p > 0.48);
      if (p > 0.6) embLigar(); else if (p < 0.36) embDesligar();
      tg.sy = -(1 - seg(p, 0.56, 0.92)) * 24; pedirTilt();
    };
    const pedir = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    const remedir = () => { medir(); frame(); };

    addEventListener('scroll', pedir, { ...sig, passive: true });
    let rt = 0;
    addEventListener('resize', () => { clearTimeout(rt); rt = window.setTimeout(remedir, 120); }, sig);
    mqPin.addEventListener('change', () => { r.classList.toggle('pinned', mqPin.matches); remedir(); }, sig);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remedir);
    addEventListener('load', remedir, sig);
    remedir();

    /* ----- sem capítulo fixo: água e emblema tocam quando o retângulo aparece ----- */
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (pinned) return;
        if (e.isIntersecting) {
          if (!reduced) {
            if (!vAgua.getAttribute('src')) vAgua.src = '/media/quem-agua.mp4';
            tocar(vAgua);
            embLigar();
          }
        } else { vAgua.pause(); embDesligar(); }
      });
    }, { threshold: 0.4 });
    io.observe(panel);

    /* ----- "Quem somos" na barra: no capítulo fixo o destino é o fim do capítulo, não o topo ----- */
    const irParaQuem = (suave: boolean) => scrollTo({ top: capTop + run * 0.94, behavior: suave && !reduced ? 'smooth' : 'auto' });
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest?.('a[href="#quem-somos"]');
      if (a && pinned) { e.preventDefault(); irParaQuem(true); }
    }, sig);
    if (location.hash === '#quem-somos') addEventListener('load', () => { if (pinned) irParaQuem(false); }, { ...sig, once: true });

    return () => {
      ac.abort(); io.disconnect();
      clearTimeout(resetT); clearTimeout(embTimer); clearTimeout(loadT); clearTimeout(rt);
      cancelAnimationFrame(tiltRaf);
    };
  }, []);
}
