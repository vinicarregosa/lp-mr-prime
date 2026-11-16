# MR Água Prime: landing page (React + TypeScript + Vite)

Versão em React da página que existe em HTML puro em `../docs/hero/` (mantida como backup). O visual, os textos e os efeitos são os mesmos; mudou só a forma de organizar o código.

## Como rodar

```bash
cd site
npm install      # só na primeira vez
npm run dev      # http://127.0.0.1:4600
npm run build    # gera dist/ (tsc + vite)
npm run preview  # serve o dist/ em http://127.0.0.1:4600
```

O `dist/` é estático: qualquer hospedagem estática serve. O servidor precisa aceitar requisições Range (vídeos); o Vite aceita, e CDNs comuns também.

## Estrutura

```
index.html            classes js / pinned / fx definidas antes da 1ª pintura
public/media/         vídeos, posters e fotos (cópia de docs/hero/media)
src/
  main.tsx, App.tsx
  styles.css          o CSS do original, sem alteração de design
  data/site.ts        WhatsApp, filtros e clientes (textos e medidas informados pelo dono)
  lib/util.ts         clamp, easing, porQuadro
  components/
    Bar.tsx           barra, menu recolhido, seção atual
    Capitulo.tsx      Hero + Quem somos (capítulo fixo no desktop)
    AntesDepois.tsx   comparador (scrub pela rolagem + arrastar)
    Filtros.tsx       fila de filtros + detalhe (dialog)
    Clientes.tsx      cartões com paralaxe
    Contato.tsx       íris + links
    Reveal.tsx        FxUp (sobe com fade) e Kinetic (título em palavras)
    Icon.tsx          ícones embutidos
  hooks/useCapitulo.ts  vídeo do hero e rolagem do capítulo
```

## Decisões

- **A rolagem é imperativa de propósito.** Os efeitos escrevem `transform`, `opacity` e variáveis CSS direto no DOM a cada quadro, dentro de `useEffect`, sem estado do React. Estado em cada rolagem re-renderizaria a página inteira.
- **Só o que muda de conteúdo está em estado:** barra (menu aberto, seção atual) e o detalhe do filtro.
- **Movimento reduzido:** a classe `fx` não é aplicada e os efeitos das seções 3 a 6 não existem; o capítulo fixo (`pinned`) também não.
- **Conteúdo:** não inclua preço, "tecnologia americana"/"feito à mão" como selo, números inventados ou falas de clientes sem autorização. Ver `../docs/BRIEF.md`.
