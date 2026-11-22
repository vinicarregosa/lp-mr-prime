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
index.html            classes js / fx definidas antes da 1ª pintura
public/media/         hero-casa (.webp e -m.webp), fotos dos filtros (prod-*), instalações (cli-*), vídeos do comparador
src/
  main.tsx, App.tsx
  styles.css          paleta azul-marinho + verde-petróleo (variáveis em :root)
  data/site.ts        WhatsApp, filtros e perguntas frequentes (textos e medidas informados pelo dono)
  components/
    Bar.tsx           barra fixa, menu recolhido, seção atual
    Hero.tsx          foto da casa com aproximação lenta (CSS), cartão de vidro e destaques
    Sobre.tsx         quem somos, onde atuamos e cartões
    Filtros.tsx       cartões dos modelos (sem preço) com CTA para o WhatsApp
    AntesDepois.tsx   comparador "sem filtro / com filtro" (arrastar + rolagem)
    Demonstracao.tsx  bloco escuro com fotos reais de instalações
    Duvidas.tsx       perguntas frequentes (details/summary)
    Contato.tsx       CTA, links e rodapé
    Reveal.tsx        FxUp (sobe com fade)
    Icon.tsx          ícones embutidos
```

## Decisões

- **Sem preço, sem "tecnologia americana" como selo, sem números ou falas de clientes inventados.** Ver `../docs/BRIEF.md`.
- **Textos:** citar o dono só como "Mr. Prime"; falar em água de poço (sem "cacimba").
- **Movimento reduzido:** a classe `fx` não é aplicada; a aproximação do hero e as entradas animadas ficam desligadas.
- **Comparador:** a rolagem escreve variáveis CSS direto no DOM, sem estado do React, de propósito.
