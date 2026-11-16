// Dados da empresa e dos produtos num só lugar. Só entra o que o dono informou (ver docs/BRIEF.md).

export const WHATSAPP = '5579998553063';
export const INSTAGRAM_URL = 'https://www.instagram.com/mraguaprimemrionizadorespro/';

/** Link do WhatsApp com mensagem pronta. Sem texto, abre só a conversa. */
export function zap(texto?: string): string {
  return `https://wa.me/${WHATSAPP}` + (texto ? `?text=${encodeURIComponent(texto)}` : '');
}
export const ZAP_ORCAMENTO = zap('Olá! Quero solicitar um orçamento.');
export const zapModelo = (modelo: string) => zap(`Olá! Quero solicitar um orçamento do ${modelo}.`);

export interface Spec { rotulo: string; valor: string; naoInformado?: boolean }
export interface Filtro {
  modelo: string;
  tipo: string;
  descricao: string;
  imagem: string;
  specs: Spec[];
  nota?: string;
}

/** O que a empresa não informou aparece como "sob consulta". */
export const FILTROS: Filtro[] = [
  {
    modelo: 'MR-844', tipo: 'Filtro central', imagem: '/media/prod-844.webp',
    descricao: 'Filtro de fibra de vidro, instalado direto na bomba do poço.',
    specs: [
      { rotulo: 'Altura', valor: 'sob consulta', naoInformado: true },
      { rotulo: 'Diâmetro', valor: 'sob consulta', naoInformado: true },
      { rotulo: 'Indicado para', valor: 'Residências' },
    ],
  },
  {
    modelo: 'MR-1252', tipo: 'Filtro central', imagem: '/media/prod-1252.webp',
    descricao: 'Coluna de água de 1,5 m de altura e 300 mm de diâmetro.',
    specs: [
      { rotulo: 'Altura', valor: '1,50 m' },
      { rotulo: 'Diâmetro', valor: '300 mm' },
      { rotulo: 'Indicado para', valor: 'Empresas, sítios, fazendas e condomínios' },
    ],
  },
  {
    modelo: 'MR-2719', tipo: 'Filtro por gravidade', imagem: '/media/prod-2719.webp',
    descricao: 'Mídias filtrantes em camadas, com sistema de retrolavagem.',
    specs: [
      { rotulo: 'Altura', valor: '1,15 m' },
      { rotulo: 'Diâmetro', valor: '200 mm' },
      { rotulo: 'Indicado para', valor: 'Casa ou empresa' },
    ],
    nota: 'Conexão 3/4" BSP · até 20 PSI',
  },
  {
    modelo: 'MR Compact 2714', tipo: 'Refino final de cozinha', imagem: '/media/prod-2714.webp',
    descricao: 'Três etapas: argila expandida, resina catiônica e carvão ativado.',
    specs: [
      { rotulo: 'Altura', valor: '0,60 m' },
      { rotulo: 'Diâmetro', valor: '100 mm' },
      { rotulo: 'Indicado para', valor: 'Cozinha' },
    ],
  },
];

export interface Cliente { nome: string; onde: string; equipamento: string; foto: string; alt: string; largura: number; altura: number }
// Falta confirmar a autorização de uso do nome e da foto de cada cliente.
export const CLIENTES: Cliente[] = [
  {
    nome: 'Condomínio Costa Marina', onde: 'Aracaju, SE · vizinho à Praia Sul', equipamento: 'Instalação com dois filtros MR-1252',
    foto: '/media/dep-costa-marina.webp', largura: 373, altura: 427,
    alt: 'Dois filtros MR instalados ao lado de uma parede de pedra no Condomínio Costa Marina, em Aracaju',
  },
  {
    nome: 'Condomínio Aprazível', onde: 'Aracaju, SE', equipamento: 'Instalação com dois filtros MR-1252',
    foto: '/media/cli-2.webp', largura: 738, altura: 984,
    alt: 'Dois filtros MR instalados lado a lado, com controladores digitais e tubulação azul, no Condomínio Aprazível, em Aracaju',
  },
  {
    nome: 'Fast Health', onde: 'Maceió, AL · Francisco, proprietário', equipamento: 'Instalação com um filtro MR-844',
    foto: '/media/cli-3.webp', largura: 1029, altura: 1373,
    alt: "Filtro MR instalado ao ar livre, com tubulação verde, ao lado de uma caixa d'água, em Maceió",
  },
];
