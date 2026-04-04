export const perfil = {
  nome: 'Daniel Holanda',
  titulo: 'Desenvolvedor full stack com foco em web e desktop',
  descricao:
    'Atuo com desenvolvimento web, aplicações desktop e design gráfico, construindo soluções objetivas para necessidades reais.',
  frase:
    'Desenvolvimento de aplicações web, desktop e design gráfico com foco em eficiência e eficácia.',
  email: 'daniel.holanda.campos@gmail.com',
  github: 'https://github.com/dholandac',
  linkedin: 'https://linkedin.com/in/daniel-holanda-campos'
};

export const resumoProfissional = [
  {
    titulo: 'Sobre mim',
    descricao:
      'Sou desenvolvedor com atuação full stack em web e desktop e também atuo com design gráfico, com atenção à usabilidade e organização do código.'
  },
  {
    titulo: 'Objetivo',
    descricao:
      'Evoluir continuamente na programação, aprendendo técnicas que entreguem eficiência e qualidade durante todo o desenvolvimento.'
  },
  {
    titulo: 'Formação',
    descricao:
      'Formação acadêmica e técnica em andamento, com foco em base sólida de desenvolvimento.',
    itens: [
      'Ciência da Computação (2023-2026)',
      'Técnico em Informática (2024-2025)',
      'Ênfase em POO, banco de dados, CRUD, arquitetura de computadores e redes'
    ]
  },
  {
    titulo: 'Conhecimentos',
    descricao:
      'React.js, Node.js, HTML/CSS, WinForms/.NET, C#, Java, Python, JavaScript, MySQL, Git/GitHub, Photoshop e Illustrator.'
  },
  {
    titulo: 'Experiência',
    descricao:
      'Experiência como desenvolvedor web em projetos autorais com React e integrações de API, além de estágio técnico com instalação, configuração e monitoramento de sistemas.'
  }
];

export const casosWeb = [
  {
    nome: 'InvestiChat',
    objetivo:
      'Criar uma plataforma web para educação financeira com chatbot contextual, perfil de investidor e visão de carteira.',
    decisao:
      'Estruturei o projeto em Django com apps separados, integrações com Gemini/Finnhub/Marketaux e camadas de cache para cotações e notícias.',
    resultado:
      'Entreguei um produto funcional com login, histórico de conversas, painel de mercado e carteira virtual com acompanhamento de transações.',
    stack: 'Django, Gemini API, Finnhub, Marketaux',
    link: 'https://github.com/dholandac/investichat',
    thumb: '/imagens/dev/dev_investichat.png',
    tom: '#3a6296'
  },
  {
    nome: 'BuscarCEP',
    objetivo:
      'Facilitar a consulta rápida de endereço a partir do CEP em uma interface simples e direta.',
    decisao:
      'Usei React com estados locais e camada de serviço via Axios para consumir a API ViaCEP, incluindo validações de entrada e tratamento de erro.',
    resultado:
      'A aplicação retorna os dados completos do endereço com feedback imediato de CEP inválido e fluxo fluido de consulta.',
    stack: 'React, Axios, ViaCEP API',
    link: 'https://github.com/dholandac/buscarcep',
    thumb: '/imagens/dev/dev_buscarcep.png',
    tom: '#4b5f93'
  },
  {
    nome: 'InfoTarefas',
    objetivo:
      'Organizar tarefas diárias com foco em simplicidade de uso e acompanhamento de progresso.',
    decisao:
      'Implementei arquitetura Django MVT com modelo único de tarefa, rotas de adicionar/marcar/remover e cálculo de progresso no backend.',
    resultado:
      'O sistema entrega um CRUD funcional de tarefas com barra de progresso e atualização consistente do status concluído/pendente.',
    stack: 'Django, HTML, CSS, SQLite',
    link: 'https://github.com/dholandac/infotarefas',
    thumb: '/imagens/dev/dev_tarefas.png',
    tom: '#3f6d95'
  }
];

export const appsDesktop = [
  {
    nome: 'Gerenciador de Estoque',
    objetivo:
      'Centralizar o controle de produtos em estoque com operações rápidas de cadastro, consulta e atualização.',
    decisao:
      'Desenvolvi em Windows Forms com C# e integração com MySQL para persistência relacional dos dados.',
    resultado:
      'O sistema permite gerenciar entradas e saídas de itens de forma organizada, com dados salvos e fáceis de consultar.',
    stack: 'C#, Windows Forms, MySQL',
    link: 'https://youtu.be/Tum3PXIXI7E?si=UT-AkYptXi25M-8j',
    thumb: '/imagens/dev/dev_gerenciamentoestoque.png',
    tom: '#3d638f'
  }
];

export const galeriaDesign = [
  {
    titulo: 'Convite RayKids',
    categoria: 'Convites',
    ferramenta: 'Adobe Photoshop',
    descricao:
      'Convite com identidade visual infantil e composição focada em leitura rápida.',
    tom: '#335ea8',
    imagem: '/imagens/design/design_conviteraykids.png',
    tipo: 'imagem'
  },
  {
    titulo: 'Convite Doce Ray Boutique',
    categoria: 'Convites',
    ferramenta: 'Adobe Photoshop',
    descricao:
      'Peça de convite com foco em estética delicada e harmonia visual da marca.',
    tom: '#5c6b8f',
    imagem: '/imagens/design/design_convitedocerayboutique.png',
    tipo: 'imagem'
  },
  {
    titulo: 'Logo RayKids',
    categoria: 'Logos',
    ferramenta: 'Adobe Photoshop',
    descricao:
      'Estudo de logotipo com aplicação em peças digitais e reforço de identidade.',
    tom: '#2d7d9e',
    imagem: '/imagens/design/design_logoraykids.png',
    tipo: 'imagem'
  },
  {
    titulo: 'Reels Promoção',
    categoria: 'Reels',
    ferramenta: 'Canva',
    descricao: 'Peça em vídeo curto para campanha promocional em formato vertical.',
    tom: '#7562a1',
    imagem: '/imagens/design/design_reelspromocao.mp4',
    tipo: 'video'
  }
];
