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
  itens: string[];
  destaque?: boolean;
}

/** Sem preço: o brief do projeto só libera valores autorizados pelo dono. */
export const FILTROS: Filtro[] = [
  {
    modelo: 'MR-844', faixa: 'Filtro central', titulo: 'MR-844',
    descricao: 'Instalado direto na bomba do poço, ideal para residências.',
    imagem: '/media/prod-844.webp',
    itens: ['Remove cor, cheiro e gosto', 'Retrolavagem eficiente', 'Equipamento resistente', 'Instalação e suporte'],
  },
  {
    modelo: 'MR-1252', faixa: 'Filtro central', titulo: 'MR-1252', destaque: true,
    descricao: 'Para empresas, sítios, fazendas e condomínios.',
    imagem: '/media/prod-1252.webp',
    itens: ['Elimina metais pesados', '7 camadas de filtragem', 'Retrolavagem eficiente', 'Instalação e suporte'],
  },
  {
    modelo: 'MR-2719', faixa: 'Filtro por gravidade', titulo: 'MR-2719',
    descricao: 'Para casa ou empresa, com retrolavagem.',
    imagem: '/media/prod-2719.webp',
    itens: ['Água tratada na casa toda', '7 mídias filtrantes', 'Retrolavagem eficiente', 'Manutenção econômica'],
  },
  {
    modelo: 'MR Compact 2714', faixa: 'Refino de cozinha', titulo: 'MR Compact 2714',
    descricao: 'Refino final para a água que você bebe e cozinha.',
    imagem: '/media/prod-2714.webp',
    itens: ['Filtragem em três etapas', 'Carvão ativado e resina', 'Água mais pura na cozinha', 'Suporte especializado'],
  },
];

export const DUVIDAS: { q: string; a: string }[] = [
  {
    q: 'Por que a água do meu poço fica amarelada ou com cheiro?',
    a: 'Água de poço costuma carregar ferro, metais e outras impurezas que dão cor, cheiro e gosto ruim, e deixam manchas em louça, roupa e azulejo. O filtro central trata a água na entrada do imóvel. A indicação certa depende da água do seu poço.',
  },
  {
    q: 'Onde o filtro é instalado?',
    a: 'Na entrada do imóvel, junto à bomba do poço. Assim a água já chega tratada a todas as torneiras, do chuveiro à cozinha.',
  },
  {
    q: 'Vocês fazem a instalação e o suporte técnico?',
    a: 'Sim. A MR Água Prime instala o equipamento e dá o suporte técnico depois, inclusive para a retrolavagem e a manutenção.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Atendemos Sergipe, Alagoas, Bahia e Pernambuco, com base em Aracaju.',
  },
  {
    q: 'Como eu peço um orçamento?',
    a: 'Pelo WhatsApp. Você conta como é o seu poço e a nossa equipe liga para indicar o equipamento adequado.',
  },
];
