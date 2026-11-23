// Dados da empresa e dos produtos num só lugar. Só entra o que o dono informou (ver docs/BRIEF.md).

export const WHATSAPP = '5579998553063';
export const TELEFONE = '(79) 99855-3063';
export const INSTAGRAM_URL = 'https://www.instagram.com/mraguaprimemrionizadorespro/';
export const INSTAGRAM_USER = '@mraguaprimemrionizadorespro';

/** Link do WhatsApp com mensagem pronta. Sem texto, abre só a conversa. */
export function zap(texto?: string): string {
  return `https://wa.me/${WHATSAPP}` + (texto ? `?text=${encodeURIComponent(texto)}` : '');
}
export const ZAP_ORCAMENTO = zap('Olá! Quero solicitar um orçamento.');
export const zapModelo = (modelo: string) => zap(`Olá! Quero solicitar um orçamento do ${modelo}.`);

export interface Filtro {
  modelo: string;
  faixa: string;       // rótulo da faixa colorida no topo do cartão
  titulo: string;
  descricao: string;
  imagem: string;
  imagens?: string[];   // quando há mais de uma foto, aparecem lado a lado
  itens: string[];
  destaque?: boolean;
}

/** Sem preço: o brief do projeto só libera valores autorizados pelo dono. */
export const FILTROS: Filtro[] = [
  {
    modelo: 'MR-844', faixa: 'Filtro central', titulo: 'MR-844',
    descricao: 'Instalado direto na bomba do poço, ideal para residências.',
    imagem: '/media/prod-844c.webp',
    itens: ['Remove cheiro, cor e sabor', 'Retrolavagem eficiente', 'Equipamento resistente', 'Instalação e suporte técnico garantido'],
  },
  {
    modelo: 'MR-1252', faixa: 'Filtro central', titulo: 'MR-1252', destaque: true,
    descricao: 'Para empresas, sítios, fazendas e condomínios.',
    imagem: '/media/prod-1252.webp',
    itens: ['Elimina metais pesados', '7 camadas de filtragem', 'Retrolavagem eficiente', 'Instalação e suporte técnico garantido'],
  },
  {
    modelo: 'MR-1054', faixa: 'Filtro central', titulo: 'MR-1054',
    descricao: 'Indicado para hotéis, pousadas, edifícios comerciais e empresariais.',
    imagem: '/media/prod-1054.webp',
    itens: ['Válvula automática e manual', 'Ideal para hotéis e pousadas', 'Ideal para edifícios comerciais', 'Instalação e suporte técnico garantido'],
  },
  {
    modelo: 'MR-1252 para empresas', faixa: 'Filtro central', titulo: 'MR-1252 para empresas de vários segmentos',
    descricao: 'Filtro central com instalação e suporte técnico.',
    imagem: '/media/prod-1252b.webp',
    itens: ['Atende vários segmentos', 'Elimina metais pesados', 'Até 7 mídias filtrantes no tratamento', 'Instalação e suporte técnico garantido'],
  },
  {
    modelo: 'MR-2719', faixa: 'Filtro por gravidade', titulo: 'MR-2719',
    descricao: 'Indicado para áreas rurais.',
    imagem: '/media/prod-2719.webp',
    itens: ['Água tratada em toda a casa', '7 mídias filtrantes', 'Retrolavagem alternada por gravidade', 'Manutenção econômica', 'Instalação e suporte técnico garantido'],
  },
  {
    modelo: 'MR Compact 2714', faixa: 'Estágio final no tratamento de água para cozinha', titulo: 'MR Compact 2714',
    descricao: 'Estágio final no tratamento de água para cozinha.',
    imagem: '/media/prod-2714.webp',
    itens: ['Filtragem em três etapas', '1 kg e 200 g de carvão ativado de casca de coco de babaçu', 'Água mais pura na cozinha', 'Instalação e suporte técnico garantido'],
  },
];

export const DUVIDAS: { q: string; a: string }[] = [
  {
    q: 'Por que a água do meu poço fica amarelada ou com cheiro?',
    a: 'Água de poço costuma carregar ferro. Ao entrar em contato com o oxigênio na superfície, o ferro oxida e deixa a água amarelada, manchando roupas na máquina de lavar, paredes e áreas comuns do imóvel. O filtro central trata a água na entrada do imóvel, removendo as deficiências antes de ela chegar às caixas d\'água. A indicação certa depende da água bruta do seu poço, que passa por uma análise antes da comercialização e da instalação dos equipamentos.',
  },
  {
    q: 'Onde o filtro é instalado?',
    a: 'O filtro será instalado após uma avaliação técnica da nossa equipe, que verifica as condições do imóvel e do local adequado para instalação dos equipamentos.',
  },
  {
    q: 'Vocês fazem a instalação e o suporte técnico?',
    a: 'Sim. Depois da avaliação técnica, a nossa equipe própria instala o equipamento, e a instalação e o suporte técnico são garantidos. No pós-venda, você fala direto no WhatsApp com o Mister Prime, e a equipe também faz a manutenção de todos os equipamentos do mercado.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Atendemos Sergipe, Alagoas, Bahia e Pernambuco, com bases em Aracaju e Maceió.',
  },
  {
    q: 'Como eu peço um orçamento?',
    a: 'Pelo WhatsApp. Você conta como é o seu poço e a nossa equipe liga para indicar o equipamento adequado.',
  },
];
