════════════════════════════════════════════════════════════
 
// ═══════════════════════════════════════
// FINANCINHAS – DADOS DO JOGO
// Personagens, Missões, Conquistas
// ═══════════════════════════════════════
 
const GAME_DATA = {
 
  // ── PERSONAGENS ──────────────────────
  characters: {
    caio:    { name: "Caio",         emoji: "👦", color: "#FFD54F", desc: "Curioso e aventureiro" },
    miguel:  { name: "Miguel",       emoji: "🧒", color: "#81C784", desc: "Aprende com o trabalho" },
    aninha:  { name: "Aninha",       emoji: "👧", color: "#F48FB1", desc: "Organizada e planejadora" },
    dede:    { name: "Dedé",         emoji: "🧑", color: "#FFB74D", desc: "Impulsivo mas aprende" },
    margo:   { name: "Margô",        emoji: "👩", color: "#CE93D8", desc: "Ama compras" },
    davi:    { name: "Davi",         emoji: "👦", color: "#4FC3F7", desc: "Compara preços" },
    marina:  { name: "Marina",       emoji: "👧", color: "#80CBC4", desc: "Evita desperdício" },
    bento:   { name: "Seu Bento",    emoji: "🧓", color: "#8D6E63", desc: "Dono da cooperativa" },
    lucia:   { name: "Dona Lúcia",   emoji: "👵", color: "#F06292", desc: "Dona do mercadinho" },
    lucas:   { name: "Prof. Lucas",  emoji: "👨‍🏫", color: "#42A5F5", desc: "Guia das missões" }
  },
 
  // ── LUGARES ──────────────────────────
  places: {
    home:     { name: "Casa da Família",      icon: "🏠", trail: 1, unlocked: true  },
    school:   { name: "Escola",               icon: "🏫", trail: 2, unlocked: true  },
    market:   { name: "Mercadinho",           icon: "🏪", trail: 3, unlocked: true  },
    coop:     { name: "Cooperativa Sicoob",   icon: "🏦", trail: 4, unlocked: true  },
    park:     { name: "Praça",                icon: "🌳", trail: 5, unlocked: true  },
    workshop: { name: "Oficina",              icon: "🔧", trail: 6, unlocked: false }
  },
 
  // ── TRILHAS ──────────────────────────
  trails: [
    { id: 1, name: "Valor do Dinheiro",   icon: "💰", place: "home",   color: "#FFD54F" },
    { id: 2, name: "Poupar",              icon: "🐷", place: "school", color: "#81C784" },
    { id: 3, name: "Escolhas",            icon: "🎯", place: "market", color: "#FFB74D" },
    { id: 4, name: "Consumo Consciente",  icon: "🌱", place: "coop",   color: "#4FC3F7" },
    { id: 5, name: "Planejamento",        icon: "🌟", place: "park",   color: "#CE93D8" }
  ],
 
  // ── CONQUISTAS ───────────────────────
  achievements: [
    { id: "first_mission",  icon: "🌟", title: "Primeira Missão!",     desc: "Completou a primeira missão", coins: 5  },
    { id: "saver",          icon: "🐷", title: "Poupador",             desc: "Guardou 50 moedas",           coins: 10 },
    { id: "wise_shopper",   icon: "🛒", title: "Comprador Esperto",    desc: "Fez boa escolha no mercado",  coins: 8  },
    { id: "eco_hero",       icon: "🌱", title: "Herói do Planeta",     desc: "Completou trilha consciente", coins: 15 },
    { id: "dreamer",        icon: "🌈", title: "Sonhador",             desc: "Definiu seu primeiro sonho",  coins: 5  },
    { id: "trail1",         icon: "💰", title: "Especialista em €",    desc: "Trilha 1 completa!",          coins: 20 },
    { id: "trail2",         icon: "🐷", title: "Poupador Mestre",      desc: "Trilha 2 completa!",          coins: 20 },
    { id: "trail3",         icon: "🎯", title: "Mestre das Escolhas",  desc: "Trilha 3 completa!",          coins: 20 },
    { id: "trail4",         icon: "🌱", title: "Guardião da Terra",    desc: "Trilha 4 completa!",          coins: 20 },
    { id: "trail5",         icon: "🌟", title: "Guardião do Dinheiro", desc: "Trilha 5 completa!",          coins: 30 }
  ],
 
  // ── RECOMPENSAS DA LOJA ──────────────
  rewards: [
    { id: "shirt",    cost: 10,  icon: "👕", name: "Camiseta nova",   type: "clothes" },
    { id: "hat",      cost: 20,  icon: "🎩", name: "Chapéu legal",    type: "accessory" },
    { id: "bag",      cost: 30,  icon: "🎒", name: "Mochila",         type: "accessory" },
    { id: "bike",     cost: 50,  icon: "🚲", name: "Bicicleta",       type: "item" },
    { id: "pet",      cost: 80,  icon: "🐶", name: "Mascote",         type: "item" },
    { id: "house",    cost: 150, icon: "🏡", name: "Casa nova",       type: "item" },
    { id: "crown",    cost: 100, icon: "👑", name: "Coroa de campeão",type: "accessory" }
  ]
};
 
// ── MISSÕES COMPLETAS (50 missões) ────
const MISSIONS = [
 
  // ═══ TRILHA 1 – VALOR DO DINHEIRO (Casa) ═══
  {
    id: 1, trail: 1, place: "home", order: 1,
    title: "O que é dinheiro?",
    character: "lucas",
    coinsReward: 10,
    type: "story_choice",
    content: {
      story: "O Professor Lucas reúne a turma na sala. 'Crianças,' diz ele, 'vocês sabem para que serve o dinheiro?' O Caio levanta a mão bem rápido! Mas será que ele sabe a resposta certa?",
      question: "Para que serve o dinheiro?",
      choices: [
        { icon: "🍭", text: "Para comprar qualquer coisa que quisermos", correct: false,
          feedback: "Quase! O dinheiro serve para trocar por coisas, mas não podemos comprar qualquer coisa – precisamos escolher com sabedoria! 🤔" },
        { icon: "🔄", text: "Para trocar por produtos e serviços de que precisamos", correct: true,
          feedback: "Isso mesmo! O dinheiro é uma forma de troca. Usamos ele para conseguir coisas que precisamos ou queremos muito! 🌟" },
        { icon: "📦", text: "Para guardar embaixo do colchão", correct: false,
          feedback: "Guardar dinheiro é importante, mas guardá-lo em lugar seguro é melhor! E o dinheiro serve principalmente para fazer trocas. 😄" }
      ]
    }
  },
 
  {
    id: 2, trail: 1, place: "home", order: 2,
    title: "A Moeda do Caio",
    character: "caio",
    coinsReward: 10,
    type: "story_choice",
    content: {
      story: "O Caio encontrou uma moeda brilhando no chão da praça! Uau! Ele ficou super animado. Agora ele precisa decidir o que fazer com ela.",
      question: "O que você faria no lugar do Caio?",
      choices: [
        { icon: "🍭", text: "Comprar um doce imediatamente!", correct: false,
          feedback: "Doce é gostoso, mas logo acaba. Será que existe algo melhor para fazer com a moeda? 🤔" },
        { icon: "🐷", text: "Guardar no cofrinho para juntar mais", correct: true,
          feedback: "Ótima ideia! Guardando a moeda, o Caio pode juntar mais e comprar algo ainda melhor depois! 💰" },
        { icon: "👫", text: "Dividir com um amigo que precisa", correct: true,
          feedback: "Que generosidade! Ajudar quem precisa é uma atitude incrível! Você tem um coração enorme! ❤️" }
      ]
    }
  },
 
  {
    id: 3, trail: 1, place: "home", order: 3,
    title: "De onde vem o dinheiro?",
    character: "miguel",
    coinsReward: 10,
    type: "story_choice",
    content: {
      story: "O Miguel perguntou para a mãe: 'Mãe, por que você não compra tudo que eu peço?' A mãe sorriu e explicou como o dinheiro chega até a família.",
      question: "De onde vem o dinheiro da família?",
      choices: [
        { icon: "🌳", text: "Nasce nas árvores do jardim", correct: false,
          feedback: "Que ideia criativa! Mas não, infelizmente o dinheiro não nasce em árvores. 😄 Tem outra explicação!" },
        { icon: "💼", text: "Vem do trabalho das pessoas", correct: true,
          feedback: "Exatamente! O dinheiro vem do trabalho. Por isso é tão importante valorizar cada moedinha e gastar com sabedoria! 👏" },
        { icon: "🏧", text: "A máquina do banco fabrica para todo mundo", correct: false,
          feedback: "O banco guarda o dinheiro, mas não cria para todo mundo. O dinheiro precisa ser ganho com trabalho! 💪" }
      ]
    }
  },
 
  {
    id: 4, trail: 1, place: "home", order: 4,
    title: "Quanto custa?",
    character: "davi",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "O Davi está aprendendo a reconhecer preços no mercado. Ajude-o a organizar os itens do mais barato para o mais caro!",
      question: "Arraste cada item para o lugar certo!",
      items: [
        { id: "a", emoji: "🍬", name: "Bala", price: 0.5 },
        { id: "b", emoji: "🍎", name: "Maçã", price: 2 },
        { id: "c", emoji: "🎒", name: "Mochila", price: 50 },
        { id: "d", emoji: "📚", name: "Livro", price: 20 },
        { id: "e", emoji: "🖊️", name: "Lápis", price: 1 },
        { id: "f", emoji: "🚲", name: "Bicicleta", price: 300 }
      ],
      categories: ["Mais barato (até R$5)", "Mais caro (acima de R$5)"]
    }
  },
 
  {
    id: 5, trail: 1, place: "home", order: 5,
    title: "O troco certo",
    character: "davi",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Davi foi ao mercado comprar um suco por R$2. Ele deu R$5 para a Dona Lúcia. Quanto de troco ele deve receber?",
      question: "Qual é o troco correto?",
      choices: [
        { icon: "💵", text: "R$ 1,00", correct: false, feedback: "Conta de novo! R$5 menos R$2 = R$3. O Davi deve receber R$3 de troco! 🔢" },
        { icon: "💵", text: "R$ 3,00", correct: true, feedback: "Isso! R$5 - R$2 = R$3. Você sabe fazer conta de troco! Ótimo! 🎉" },
        { icon: "💵", text: "R$ 4,00", correct: false, feedback: "Quase! R$5 menos R$2 = R$3, não R$4. Tente de novo! 💪" }
      ]
    }
  },
 
  {
    id: 6, trail: 1, place: "home", order: 6,
    title: "Necessidade ou desejo?",
    character: "margo",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "A Margô quer comprar várias coisas, mas precisa aprender a diferença entre o que é necessidade e o que é desejo. Ajude ela!",
      question: "Separe os itens em: PRECISO ou QUERO!",
      items: [
        { id: "a", emoji: "🥗", name: "Comida", category: 0 },
        { id: "b", emoji: "🎮", name: "Videogame", category: 1 },
        { id: "c", emoji: "👗", name: "Roupa bonita extra", category: 1 },
        { id: "d", emoji: "💊", name: "Remédio", category: 0 },
        { id: "e", emoji: "📚", name: "Material escolar", category: 0 },
        { id: "f", emoji: "🍭", name: "Doce caro", category: 1 }
      ],
      categories: ["Preciso (Necessidade)", "Quero (Desejo)"]
    }
  },
 
  {
    id: 7, trail: 1, place: "home", order: 7,
    title: "Guardando no cofrinho",
    character: "caio",
    coinsReward: 15,
    type: "piggy",
    content: {
      story: "O Caio ganhou mesada! Ele quer praticar guardar dinheiro no cofrinho. Cada vez que você clicar no cofrinho, uma moeda entra! Meta: 10 moedas!",
      question: "Clique no cofrinho para guardar moedas!",
      target: 10
    }
  },
 
  {
    id: 8, trail: 1, place: "home", order: 8,
    title: "Comprar ou esperar?",
    character: "dede",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Dedé viu um brinquedo incrível na vitrine! Mas ele só tem a metade do dinheiro. O Dedé está com muita vontade de comprar logo...",
      question: "O que o Dedé deve fazer?",
      choices: [
        { icon: "💳", text: "Pedir para o pai pagar o resto agora", correct: false,
          feedback: "Pedir ajuda pode ser necessário às vezes, mas aprender a guardar e esperar é muito mais especial! Tente novamente." },
        { icon: "⏳", text: "Guardar dinheiro por mais algum tempo e comprar depois", correct: true,
          feedback: "Que sabedoria! Esperar e guardar torna a compra muito mais especial. O Dedé vai ficar muito orgulhoso de si mesmo! 🌟" },
        { icon: "😤", text: "Ficar bravo e não comprar nada nunca", correct: false,
          feedback: "Ficar bravo não resolve! A melhor resposta é guardar pouquinho por dia até ter o suficiente! 💪" }
      ]
    }
  },
 
  {
    id: 9, trail: 1, place: "home", order: 9,
    title: "A escolha do lanche",
    character: "aninha",
    coinsReward: 12,
    type: "budget",
    content: {
      story: "A Aninha tem R$5 para o lanche. Ela quer comprar com sabedoria! Ajude-a a escolher um lanche que caiba no orçamento.",
      budget: 5,
      items: [
        { emoji: "🥤", name: "Suco", price: 2, healthy: true },
        { emoji: "🥙", name: "Lanche", price: 3, healthy: true },
        { emoji: "🍭", name: "Bala", price: 0.5, healthy: false },
        { emoji: "🍫", name: "Chocolate", price: 4, healthy: false },
        { emoji: "🍎", name: "Fruta", price: 1.5, healthy: true },
        { emoji: "🧃", name: "Caixinha", price: 2.5, healthy: true }
      ],
      tip: "Tente escolher itens saudáveis que caibam no orçamento!"
    }
  },
 
  {
    id: 10, trail: 1, place: "home", order: 10,
    title: "Guardião das Moedas",
    character: "lucas",
    coinsReward: 20,
    type: "story_choice",
    content: {
      story: "Parabéns! O Professor Lucas está impressionado com o que você aprendeu. Agora é hora do grande teste! Você é um verdadeiro Guardião das Moedas?",
      question: "Qual é a atitude mais inteligente com o dinheiro?",
      choices: [
        { icon: "🎯", text: "Gastar tudo assim que receber para ter coisas novas", correct: false,
          feedback: "Gastar tudo de uma vez não é sábio! Sempre é bom guardar um pouco para emergências ou sonhos futuros. 🤔" },
        { icon: "💰", text: "Guardar um pouco, gastar com sabedoria e planejar", correct: true,
          feedback: "PERFEITO! Você é um verdadeiro Guardião das Moedas! Guardar + planejar + gastar com sabedoria = vida financeira saudável! 🏆" },
        { icon: "🐷", text: "Guardar absolutamente tudo e nunca gastar nada", correct: false,
          feedback: "Guardar é ótimo, mas o dinheiro também serve para satisfazer nossas necessidades com sabedoria! Equilíbrio é a chave! ⚖️" }
      ]
    }
  },
 
  // ═══ TRILHA 2 – POUPAR (Escola) ═══
  {
    id: 11, trail: 2, place: "school", order: 1,
    title: "O Cofrinho Mágico",
    character: "caio",
    coinsReward: 10,
    type: "piggy",
    content: {
      story: "Na escola, a Prof. Ana ensinou que guardar dinheiro todo dia, mesmo pouco, faz grande diferença! O Caio quer experimentar. Ajude-o a encher o cofrinho!",
      question: "Clique no cofrinho para guardar moedas! Meta: 15 moedas!",
      target: 15
    }
  },
 
  {
    id: 12, trail: 2, place: "school", order: 2,
    title: "Esperar 3 dias",
    character: "dede",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Dedé viu um carrinho de controle remoto na loja. Ele ficou LOUCO de vontade! O pai do Dedé ensinou a 'regra dos 3 dias': espere 3 dias antes de comprar.",
      question: "Por que esperar 3 dias antes de comprar algo?",
      choices: [
        { icon: "🤔", text: "Para ver se a vontade de comprar continua ou some", correct: true,
          feedback: "Exatamente! Às vezes a vontade passa rápido. Esperar ajuda a decidir se realmente queremos ou foi só impulso! 🧠" },
        { icon: "😴", text: "Porque a loja fica fechada 3 dias", correct: false,
          feedback: "Não é isso! A regra dos 3 dias é para dar tempo de pensar com calma se realmente queremos ou precisamos do item. 😊" },
        { icon: "💸", text: "Para economizar dinheiro nesse tempo", correct: false,
          feedback: "Economizar é ótimo, mas a principal razão é pensar com calma. Às vezes depois de 3 dias a vontade passa! 🤔" }
      ]
    }
  },
 
  {
    id: 13, trail: 2, place: "school", order: 3,
    title: "Meta de economia",
    character: "aninha",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Aninha quer comprar um livro de histórias que custa R$20. Ela recebe R$5 de mesada por semana. Ela está animada para calcular!",
      question: "Quantas semanas a Aninha precisa guardar a mesada inteira?",
      choices: [
        { icon: "📅", text: "2 semanas", correct: false, feedback: "Conta de novo! R$20 ÷ R$5 = 4 semanas. Ela precisa de um pouquinho mais de paciência! 😊" },
        { icon: "📅", text: "4 semanas", correct: true, feedback: "Isso! 4 semanas × R$5 = R$20. A Aninha vai ter o livro em um mês guardando toda a mesada! 📚🎉" },
        { icon: "📅", text: "6 semanas", correct: false, feedback: "6 × R$5 = R$30, que é mais do que o livro custa. São apenas 4 semanas! 🔢" }
      ]
    }
  },
 
  {
    id: 14, trail: 2, place: "school", order: 4,
    title: "Comparando preços",
    character: "davi",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Davi precisa comprar uma mochila nova. Ele encontrou a mesma mochila em duas lojas: Loja A por R$45 e Loja B por R$38.",
      question: "Qual é a decisão mais inteligente do Davi?",
      choices: [
        { icon: "🏪", text: "Comprar na Loja A porque fica mais perto", correct: false,
          feedback: "A praticidade é importante, mas economizar R$7 é muito legal! Com esse dinheiro dá pra comprar mais coisas! 💡" },
        { icon: "🏪", text: "Comprar na Loja B e economizar R$7", correct: true,
          feedback: "Muito bem! Comparar preços é um hábito de consumidor inteligente. O Davi economizou R$7! 🛒💰" },
        { icon: "🚶", text: "Não comprar em nenhuma e continuar sem mochila", correct: false,
          feedback: "Se ele precisa da mochila, o melhor é comprar na mais barata. Não comprar quando precisa também não é sábio! 😊" }
      ]
    }
  },
 
  {
    id: 15, trail: 2, place: "school", order: 5,
    title: "Seu primeiro sonho",
    character: "aninha",
    coinsReward: 15,
    type: "story_choice",
    content: {
      story: "A Aninha está super empolgada! Ela aprendeu que todo grande objetivo começa com um sonho e um plano. Ela quer ensinar você a ter seu sonho financeiro!",
      question: "Qual é o melhor jeito de realizar um sonho que custa dinheiro?",
      choices: [
        { icon: "🌟", text: "Definir o sonho, calcular quanto custa e guardar pouquinho todo dia", correct: true,
          feedback: "Perfeito! Sonho + Plano + Ação diária = REALIZAÇÃO! Você já entende o segredo dos poupadores campeões! 🏆" },
        { icon: "😢", text: "Esperar alguém te dar de presente", correct: false,
          feedback: "Presentes são ótimos, mas conquistar algo com seu próprio esforço tem um sabor especial! Tente com seu próprio plano! 💪" },
        { icon: "💳", text: "Pedir emprestado e pagar depois", correct: false,
          feedback: "Pegar emprestado pode criar problemas. Melhor planejar e guardar! Demora mais mas a conquista é muito mais especial! ⭐" }
      ]
    }
  },
 
  // Missões 16-20 (Trail 2 continuação)
  {
    id: 16, trail: 2, place: "school", order: 6,
    title: "O cofrinho crescendo",
    character: "caio",
    coinsReward: 15,
    type: "piggy",
    content: {
      story: "O Caio está vendo seu cofrinho crescer todo dia! Ele fica tão feliz quando vê o progresso. Ajude-o a juntar mais moedas hoje! Meta: 20!",
      question: "Clique no cofrinho! Meta: 20 moedas!",
      target: 20
    }
  },
 
  {
    id: 17, trail: 2, place: "school", order: 7,
    title: "Resistir ao impulso",
    character: "dede",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Dedé estava guardando dinheiro para uma bicicleta. No caminho para a escola, viu um carrinho de pipoca e ficou com muita vontade... Ele tinha quase todo dinheiro da bicicleta!",
      question: "O que o Dedé deve fazer?",
      choices: [
        { icon: "🍿", text: "Comprar a pipoca, vida é para aproveitar!", correct: false,
          feedback: "Aproveitar é bom, mas gastar o dinheiro da bicicleta atrasa o sonho. Pense bem! 🤔" },
        { icon: "💪", text: "Resistir e continuar guardando para a bicicleta", correct: true,
          feedback: "Força de vontade! O Dedé está aprendendo a controlar impulsos. A bicicleta vai chegar logo! 🚲🏆" },
        { icon: "🤝", text: "Pedir para um amigo comprar e pagar depois", correct: false,
          feedback: "Pedir emprestado pode criar problemas. Resistir ao impulso é a melhor escolha! 💪" }
      ]
    }
  },
 
  {
    id: 18, trail: 2, place: "school", order: 8,
    title: "Prioridades",
    character: "aninha",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "A Aninha tem dinheiro para comprar apenas UMA coisa. Ajude-a a organizar suas prioridades do mais importante para o menos importante!",
      question: "Organize do mais prioritário para o menos prioritário",
      items: [
        { id: "a", emoji: "📚", name: "Material escolar" },
        { id: "b", emoji: "🎮", name: "Jogo novo" },
        { id: "c", emoji: "🩺", name: "Consulta médica" },
        { id: "d", emoji: "🍭", name: "Doces" }
      ],
      categories: ["Mais importante", "Menos importante"]
    }
  },
 
  {
    id: 19, trail: 2, place: "school", order: 9,
    title: "Lista de compras",
    character: "marina",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Marina vai ao mercado com a mamãe. Ela aprendeu um truque incrível para não desperdiçar dinheiro: fazer lista de compras ANTES de ir à loja!",
      question: "Por que fazer lista de compras antes de ir ao mercado?",
      choices: [
        { icon: "📝", text: "Para não esquecer o que precisa e não comprar o que não precisa", correct: true,
          feedback: "Exato! A lista evita esquecimentos E compras por impulso. É o segredo dos consumidores inteligentes! 🛒✨" },
        { icon: "😅", text: "Para mostrar para os amigos o que vai comprar", correct: false,
          feedback: "Haha! A lista não é para mostrar. Ela ajuda a se organizar e economizar dinheiro! 😄" },
        { icon: "🤷", text: "Não precisa de lista, a memória dá conta", correct: false,
          feedback: "Confiar só na memória pode fazer esquecer itens importantes ou comprar coisas desnecessárias. Lista é sempre melhor! 📝" }
      ]
    }
  },
 
  {
    id: 20, trail: 2, place: "school", order: 10,
    title: "Poupador Mestre!",
    character: "lucas",
    coinsReward: 25,
    type: "story_choice",
    content: {
      story: "Uau! Você concluiu a Trilha do Poupar! O Professor Lucas quer saber se você memorizou o segredo do poupador campeão!",
      question: "Qual é o segredo do poupador campeão?",
      choices: [
        { icon: "🏆", text: "Guardar um pouco todo dia, ter metas e resistir a impulsos", correct: true,
          feedback: "CAMPEÃO! Você aprendeu os 3 segredos: Guardar + ter Metas + resistir a Impulsos. Você é um POUPADOR MESTRE! 🏆🌟" },
        { icon: "💸", text: "Ganhar muito dinheiro para nunca precisar economizar", correct: false,
          feedback: "Ganhar mais ajuda, mas sem bons hábitos o dinheiro some rápido! O segredo é guardar, ter metas e resistir a impulsos! 💪" },
        { icon: "😴", text: "Esperar que o dinheiro apareça sozinho", correct: false,
          feedback: "O dinheiro não vem sozinho! Precisamos trabalhar, guardar e planejar. Você sabe disso! 😊" }
      ]
    }
  },
 
  // ═══ TRILHA 3 – ESCOLHAS (Mercadinho) ═══
  {
    id: 21, trail: 3, place: "market", order: 1,
    title: "No Mercadinho da Dona Lúcia",
    character: "lucia",
    coinsReward: 10,
    type: "budget",
    content: {
      story: "A Dona Lúcia tem um mercadinho cheio de coisas! O Davi chegou com R$8 para comprar o lanche da semana. Ajude-o a escolher bem!",
      budget: 8,
      items: [
        { emoji: "🍞", name: "Pão", price: 2, healthy: true },
        { emoji: "🧀", name: "Queijo", price: 3, healthy: true },
        { emoji: "🍫", name: "Chocolate", price: 4.5, healthy: false },
        { emoji: "🥤", name: "Suco", price: 2.5, healthy: true },
        { emoji: "🍭", name: "Bala", price: 1, healthy: false },
        { emoji: "🧁", name: "Cupcake", price: 5, healthy: false }
      ],
      tip: "Escolha itens nutritivos que caibam no orçamento!"
    }
  },
 
  {
    id: 22, trail: 3, place: "market", order: 2,
    title: "Promoção ou armadilha?",
    character: "margo",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Margô viu uma placa: 'PROMOÇÃO! Leve 3 pague 2!' Ela não precisava daquilo, mas ficou animada com a promoção...",
      question: "A Margô deve comprar por causa da promoção?",
      choices: [
        { icon: "🤔", text: "Não, se não precisa é desperdício mesmo com promoção", correct: true,
          feedback: "Exato! Promoção só é boa quando você precisa do produto! Comprar o que não precisa nunca é economizar! 🧠💡" },
        { icon: "🛒", text: "Sim! Promoção sempre vale a pena comprar!", correct: false,
          feedback: "Cuidado! Promoção pode ser uma armadilha. Se você não precisa do produto, não está economizando, está gastando! 🤔" },
        { icon: "📦", text: "Comprar e guardar para usar no futuro", correct: false,
          feedback: "Às vezes funciona, mas guardar mais do que precisa pode ser desperdício. Melhor pensar bem antes! 💭" }
      ]
    }
  },
 
  {
    id: 23, trail: 3, place: "market", order: 3,
    title: "Evitar desperdício",
    character: "marina",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "A Marina está aprendendo que desperdiçar é jogar dinheiro fora! Ajude-a a separar as atitudes que evitam desperdício das que causam desperdício.",
      question: "Separe as atitudes!",
      items: [
        { id: "a", emoji: "🔌", name: "Desligar a luz ao sair", category: 0 },
        { id: "b", emoji: "🚿", name: "Deixar torneira aberta", category: 1 },
        { id: "c", emoji: "🍱", name: "Terminar a comida do prato", category: 0 },
        { id: "d", emoji: "🗑️", name: "Jogar comida fora", category: 1 },
        { id: "e", emoji: "♻️", name: "Reutilizar objetos", category: 0 },
        { id: "f", emoji: "💡", name: "Deixar luz acesa", category: 1 }
      ],
      categories: ["Evita desperdício ✅", "Causa desperdício ❌"]
    }
  },
 
  {
    id: 24, trail: 3, place: "market", order: 4,
    title: "O melhor negócio",
    character: "davi",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Davi encontrou dois sucos: Suco A custa R$4 e tem 200ml. Suco B custa R$5 e tem 500ml. Qual tem o melhor preço por quantidade?",
      question: "Qual suco tem o melhor preço por ml?",
      choices: [
        { icon: "🥤", text: "Suco A (R$4 / 200ml)", correct: false,
          feedback: "O Suco A custa R$0,02 por ml. O Suco B custa R$0,01 por ml. O B tem o melhor preço! 🔢" },
        { icon: "🧃", text: "Suco B (R$5 / 500ml)", correct: true,
          feedback: "Muito bem! Mesmo custando mais, o Suco B tem melhor custo-benefício! Você pensa como um consumidor esperto! 🏆" },
        { icon: "🤷", text: "São iguais", correct: false,
          feedback: "Não são iguais! O Suco B dá mais quantidade pelo preço. Divide o preço pela quantidade para descobrir! 🔢" }
      ]
    }
  },
 
  {
    id: 25, trail: 3, place: "market", order: 5,
    title: "Consertar ou jogar fora?",
    character: "marina",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O brinquedo favorito da Marina quebrou um pouquinho. O papai disse que pode consertar. Mas a Marina ficou com vontade de pedir um novo...",
      question: "O que é mais inteligente fazer?",
      choices: [
        { icon: "🔧", text: "Consertar o brinquedo e continuar usando", correct: true,
          feedback: "Ótima atitude! Consertar economiza dinheiro, reduz lixo e ensina a valorizar o que temos! 🌍💚" },
        { icon: "🛒", text: "Pedir um brinquedo novo imediatamente", correct: false,
          feedback: "Um novo seria legal, mas consertar é mais econômico e sustentável! Dar valor ao que temos é muito importante! 🤔" },
        { icon: "🗑️", text: "Jogar fora e ficar sem brinquedo", correct: false,
          feedback: "Jogar fora não é bom para o meio ambiente nem para o bolso! Sempre tente consertar primeiro! ♻️" }
      ]
    }
  },
 
  // Missões 26-30 (Trail 3 continuação simplificada)
  {
    id: 26, trail: 3, place: "market", order: 6,
    title: "Trocar brinquedos",
    character: "marina",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Marina está entediada com seus brinquedos mas seu amigo Jonas tem brinquedos que ela ainda não conhece. O Jonas também está entediado com os dele!",
      question: "O que Marina e Jonas podem fazer?",
      choices: [
        { icon: "🔄", text: "Trocar brinquedos por um tempo!", correct: true,
          feedback: "Perfeito! Trocar brinquedos com amigos é super divertido e não custa nada! Todo mundo ganha! 🎉" },
        { icon: "🛒", text: "Cada um pedir brinquedos novos para os pais", correct: false,
          feedback: "Pedir novos quando os velhos ainda funcionam pode ser desperdício. Que tal trocar com o Jonas? 🤔" },
        { icon: "😔", text: "Ficar em casa entediado", correct: false,
          feedback: "Que pena! A solução criativa e econômica é trocar com o amigo! Criatividade economiza dinheiro! 💡" }
      ]
    }
  },
 
  {
    id: 27, trail: 3, place: "market", order: 7,
    title: "Pensar antes de gastar",
    character: "dede",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Dedé foi ao mercado com a mãe e ficou com vontade de comprar um brinquedo que estava na entrada da loja. Ele ficou animado mas não tinha planejado isso.",
      question: "O que o Dedé deve fazer?",
      choices: [
        { icon: "🤔", text: "Pensar: 'Eu realmente preciso? Tenho dinheiro guardado para isso?'", correct: true,
          feedback: "Excelente! Pausar e pensar antes de gastar é o hábito que separa os gastadores dos poupadores! 🧠⭐" },
        { icon: "💨", text: "Comprar rápido antes de mudar de ideia", correct: false,
          feedback: "Comprar rápido no impulso geralmente leva ao arrependimento! Pensar primeiro é sempre melhor! 🤔" },
        { icon: "😤", text: "Fazer birra até a mãe comprar", correct: false,
          feedback: "Birra não resolve e ainda deixa todo mundo chateado! Pensar com calma é sempre a melhor opção! 💛" }
      ]
    }
  },
 
  {
    id: 28, trail: 3, place: "market", order: 8,
    title: "Lanche saudável",
    character: "aninha",
    coinsReward: 15,
    type: "budget",
    content: {
      story: "A Aninha tem R$6 para o lanche e quer escolher algo nutritivo e dentro do orçamento. Ajude-a a montar um lanche saudável!",
      budget: 6,
      items: [
        { emoji: "🍌", name: "Banana", price: 1, healthy: true },
        { emoji: "🥪", name: "Sanduíche", price: 4, healthy: true },
        { emoji: "💧", name: "Água", price: 1, healthy: true },
        { emoji: "🍕", name: "Pizza", price: 7, healthy: false },
        { emoji: "🧁", name: "Cupcake", price: 5, healthy: false },
        { emoji: "🥛", name: "Leite", price: 2.5, healthy: true }
      ],
      tip: "Monte um lanche nutritivo dentro do orçamento!"
    }
  },
 
  {
    id: 29, trail: 3, place: "market", order: 9,
    title: "Compartilhar é bom",
    character: "caio",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Caio comprou uma caixa grande de biscoitos. Seus amigos estavam com fome mas sem dinheiro. O Caio ficou pensando...",
      question: "O que o Caio deve fazer?",
      choices: [
        { icon: "🍪", text: "Compartilhar os biscoitos com os amigos", correct: true,
          feedback: "Que coração generoso! Compartilhar fortalece amizades e faz todo mundo feliz! Caio é um amigo incrível! ❤️" },
        { icon: "🙅", text: "Esconder e comer tudo sozinho", correct: false,
          feedback: "Comer escondido não é legal. Compartilhar torna os momentos muito mais especiais! 🤔" },
        { icon: "💰", text: "Vender para os amigos", correct: false,
          feedback: "Com amigos próximos, compartilhar de graça fortalece muito mais a amizade! 😊" }
      ]
    }
  },
 
  {
    id: 30, trail: 3, place: "market", order: 10,
    title: "Mestre das Escolhas!",
    character: "lucia",
    coinsReward: 25,
    type: "story_choice",
    content: {
      story: "A Dona Lúcia ficou impressionada com o quanto você aprendeu sobre fazer escolhas inteligentes no mercado! Ela tem uma última pergunta...",
      question: "O que define uma escolha de compra inteligente?",
      choices: [
        { icon: "🏆", text: "Comprar o que precisa, pelo melhor preço, sem desperdiçar", correct: true,
          feedback: "PERFEITO! Você é o MESTRE DAS ESCOLHAS! Preciso + Melhor preço + Sem desperdício = Consumidor inteligente! 🏆🎉" },
        { icon: "💸", text: "Comprar o mais caro porque é sempre o melhor", correct: false,
          feedback: "Nem sempre o mais caro é o melhor! Comparar e escolher com sabedoria é o caminho! 🤔" },
        { icon: "🤷", text: "Comprar o mais barato sempre, não importa a qualidade", correct: false,
          feedback: "Qualidade também importa! A escolha inteligente considera preço, qualidade e necessidade juntos! ⚖️" }
      ]
    }
  },
 
  // ═══ TRILHA 4 – CONSUMO CONSCIENTE (Cooperativa) ═══
  {
    id: 31, trail: 4, place: "coop", order: 1,
    title: "Seu Bento explica",
    character: "bento",
    coinsReward: 10,
    type: "story_choice",
    content: {
      story: "O Seu Bento, dono da Cooperativa Sicoob, reúne as crianças. 'Consumo consciente,' ele diz, 'é pensar no planeta e no bolso ao mesmo tempo!'",
      question: "O que significa consumir de forma consciente?",
      choices: [
        { icon: "🌍", text: "Pensar no impacto das nossas compras no planeta e na sociedade", correct: true,
          feedback: "Exatamente! Consumo consciente é pensar: 'Preciso disso? Como foi feito? Vai gerar muito lixo?' Você é um consumidor consciente! 🌿" },
        { icon: "🛒", text: "Comprar tudo que é anunciado na TV", correct: false,
          feedback: "Propaganda quer que compremos mais. Consumo consciente é o oposto: pensar antes de comprar! 🤔" },
        { icon: "💰", text: "Comprar só o que for barato", correct: false,
          feedback: "Preço importa, mas consumo consciente vai além: pensa no meio ambiente, na necessidade real e no impacto social! 🌱" }
      ]
    }
  },
 
  {
    id: 32, trail: 4, place: "coop", order: 2,
    title: "Economizando água",
    character: "marina",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "A Marina aprendeu que economizar água também economiza dinheiro na conta da família! Ajude-a a separar as atitudes certas.",
      question: "Separe: Economiza água / Desperdiça água",
      items: [
        { id: "a", emoji: "🚿", name: "Banho rápido (5 min)", category: 0 },
        { id: "b", emoji: "🚿", name: "Banho de 30 min", category: 1 },
        { id: "c", emoji: "🦷", name: "Fechar torneira ao escovar", category: 0 },
        { id: "d", emoji: "🦷", name: "Deixar torneira aberta", category: 1 },
        { id: "e", emoji: "🌧️", name: "Reutilizar água da chuva", category: 0 },
        { id: "f", emoji: "🚗", name: "Lavar carro com mangueira aberta", category: 1 }
      ],
      categories: ["Economiza água 💧", "Desperdiça água 😔"]
    }
  },
 
  {
    id: 33, trail: 4, place: "coop", order: 3,
    title: "Energia em casa",
    character: "marina",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "O Seu Bento ensinou que economizar energia elétrica também economiza dinheiro da família! Cada luz apagada conta!",
      question: "Separe as atitudes de economia de energia!",
      items: [
        { id: "a", emoji: "💡", name: "Apagar luz ao sair", category: 0 },
        { id: "b", emoji: "📺", name: "Deixar TV ligada sem assistir", category: 1 },
        { id: "c", emoji: "🌞", name: "Usar luz natural do dia", category: 0 },
        { id: "d", emoji: "❄️", name: "Abrir geladeira várias vezes", category: 1 },
        { id: "e", emoji: "🔌", name: "Desligar carregador da tomada", category: 0 },
        { id: "f", emoji: "🎮", name: "Jogar videogame o dia todo", category: 1 }
      ],
      categories: ["Economiza energia ✅", "Desperdiça energia ❌"]
    }
  },
 
  {
    id: 34, trail: 4, place: "coop", order: 4,
    title: "Não desperdiçar comida",
    character: "marina",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "Na escola, a Marina viu amigos jogando metade do lanche fora. Ela ficou preocupada: 'Isso é desperdício de comida e de dinheiro!'",
      question: "Por que não devemos desperdiçar comida?",
      choices: [
        { icon: "🌍", text: "Porque é desperdício de dinheiro, trabalho e recursos naturais", correct: true,
          feedback: "Muito bem! A comida custou dinheiro, trabalho de agricultores e recursos da natureza. Desperdiçar é jogar tudo isso fora! 🌱" },
        { icon: "😅", text: "Porque a professora vai ficar brava", correct: false,
          feedback: "A professora ficaria chateada mesmo, mas a razão principal vai além: é respeito com o dinheiro e o meio ambiente! 🤔" },
        { icon: "🤷", text: "Não tem problema jogar fora, tem comida de sobra", correct: false,
          feedback: "Não é bem assim. Muitas pessoas não têm o suficiente para comer. Valorizar a comida é muito importante! 💛" }
      ]
    }
  },
 
  {
    id: 35, trail: 4, place: "coop", order: 5,
    title: "Menos plástico",
    character: "bento",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Seu Bento trouxe uma garrafa reutilizável para mostrar às crianças. 'Garrafa d'água reutilizável parece mais caro no começo, mas...'",
      question: "A garrafa reutilizável é mais econômica que comprar garrafinhas?",
      choices: [
        { icon: "♻️", text: "Sim! Economiza dinheiro a longo prazo e ajuda o planeta", correct: true,
          feedback: "Isso! Uma garrafa de R$30 dura anos. Garrafinhas descartáveis custam R$2 ou mais cada dia. É muito mais econômico e sustentável! 🌍" },
        { icon: "💸", text: "Não, é mais caro comprar uma garrafa boa", correct: false,
          feedback: "Parece caro no começo, mas a conta muda rápido! Em poucos meses a garrafa reutilizável já valeu muito mais! 🔢" },
        { icon: "🤷", text: "Tanto faz, o preço é igual", correct: false,
          feedback: "Não é igual! Calcule: R$2/dia em garrafinhas = R$60/mês. Uma garrafa boa custa isso uma única vez! 💡" }
      ]
    }
  },
 
  // Missões 36-40 simplificadas
  {
    id: 36, trail: 4, place: "coop", order: 6,
    title: "Reciclar e reutilizar",
    character: "bento",
    coinsReward: 12,
    type: "sort",
    content: {
      story: "O Seu Bento mostrou como objetos podem ter uma segunda vida! Ajude a separar o que pode ser reutilizado do que deve ir para o lixo.",
      question: "Reutilizar ou Jogar fora?",
      items: [
        { id: "a", emoji: "📦", name: "Caixa de papelão", category: 0 },
        { id: "b", emoji: "🧴", name: "Pote de plástico", category: 0 },
        { id: "c", emoji: "🩹", name: "Curativo usado", category: 1 },
        { id: "d", emoji: "📰", name: "Jornal velho", category: 0 },
        { id: "e", emoji: "🥫", name: "Lata vazia", category: 0 },
        { id: "f", emoji: "🦠", name: "Máscara velha", category: 1 }
      ],
      categories: ["Pode reutilizar ♻️", "Jogar fora 🗑️"]
    }
  },
 
  {
    id: 37, trail: 4, place: "coop", order: 7,
    title: "Cooperativa: o que é?",
    character: "bento",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Seu Bento explica orgulhoso: 'A Cooperativa Sicoob é diferente de um banco normal. Aqui TODOS somos donos e ajudamos uns aos outros!'",
      question: "O que torna uma cooperativa especial?",
      choices: [
        { icon: "🤝", text: "Todos cooperam, todos ganham juntos", correct: true,
          feedback: "Perfeito! Na cooperativa, os membros são donos e os lucros beneficiam a todos. É a força da união! 🌟🤝" },
        { icon: "💼", text: "Um dono fica com todo o lucro", correct: false,
          feedback: "Isso é empresa tradicional. Na cooperativa é diferente: os lucros são divididos entre todos os membros! 🤝" },
        { icon: "🏛️", text: "É igual a um banco comum", correct: false,
          feedback: "A cooperativa é bem diferente! Todos são donos, os lucros são divididos e as decisões são tomadas juntos! 🌟" }
      ]
    }
  },
 
  {
    id: 38, trail: 4, place: "coop", order: 8,
    title: "Moda consciente",
    character: "margo",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Margô adora roupas, mas o armário está cheio! Ela quer comprar mais, mas a mamãe a fez pensar...",
      question: "O que a Margô deve fazer com as roupas que não usa mais?",
      choices: [
        { icon: "♻️", text: "Doar para quem precisa ou trocar com amigas", correct: true,
          feedback: "Que atitude linda! Doar ou trocar roupas é consumo consciente: libera espaço, ajuda outros e é sustentável! 💚" },
        { icon: "🛒", text: "Comprar mais roupas e empilhar tudo", correct: false,
          feedback: "Empilhar roupas que não usa é desperdício. Melhor dar destino para o que não usa e pensar se realmente precisa das novas! 🤔" },
        { icon: "🗑️", text: "Jogar tudo fora", correct: false,
          feedback: "Jogar roupas fora é desperdício enorme! Doação e troca são muito melhores opções! ♻️💚" }
      ]
    }
  },
 
  {
    id: 39, trail: 4, place: "coop", order: 9,
    title: "Dinheiro na cooperativa",
    character: "bento",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Seu Bento explica: 'Guardar dinheiro na cooperativa Sicoob é diferente de esconder em casa. O dinheiro fica seguro E pode crescer!'",
      question: "Por que é melhor guardar dinheiro em uma instituição segura?",
      choices: [
        { icon: "🏦", text: "Fica protegido, pode render e há registro de tudo", correct: true,
          feedback: "Exato! Na cooperativa ou banco o dinheiro é protegido, pode crescer com juros e é muito mais seguro que em casa! 🌟" },
        { icon: "🛏️", text: "Debaixo do colchão é mais seguro", correct: false,
          feedback: "Debaixo do colchão pode ser perdido, roubado ou destruído. Instituições financeiras são muito mais seguras! 🏦" },
        { icon: "🛒", text: "Melhor gastar logo para não perder", correct: false,
          feedback: "Gastar tudo não é solução! Guardar em lugar seguro protege seu dinheiro para quando realmente precisar! 💪" }
      ]
    }
  },
 
  {
    id: 40, trail: 4, place: "coop", order: 10,
    title: "Guardião da Terra!",
    character: "bento",
    coinsReward: 25,
    type: "story_choice",
    content: {
      story: "O Seu Bento bate palmas! 'Você completou a trilha do Consumo Consciente! Agora é um verdadeiro Guardião da Terra e do bolso!'",
      question: "O que define um consumidor consciente?",
      choices: [
        { icon: "🌍", text: "Alguém que pensa no planeta, na sociedade e no bolso ao comprar", correct: true,
          feedback: "GUARDIÃO DA TERRA! Você entendeu que consumo consciente é cuidar do planeta E do bolso ao mesmo tempo! 🌍🏆💚" },
        { icon: "🛒", text: "Alguém que compra tudo que está em promoção", correct: false,
          feedback: "Promoção não define consumo consciente! É pensar no impacto de cada compra: preciso? Como foi feito? Gera lixo? 🌱" },
        { icon: "💸", text: "Alguém que nunca compra nada para economizar", correct: false,
          feedback: "Consumo zero não é o objetivo! Consumo consciente é comprar o que precisa, de forma responsável e sustentável! ⚖️" }
      ]
    }
  },
 
  // ═══ TRILHA 5 – PLANEJAMENTO (Praça) ═══
  {
    id: 41, trail: 5, place: "park", order: 1,
    title: "O Sonho da Praça",
    character: "aninha",
    coinsReward: 10,
    type: "story_choice",
    content: {
      story: "Na praça, a Aninha olha para o céu e sonha... Ela quer uma bicicleta novinha! Mas antes de ter a bicicleta, ela precisa de um PLANO!",
      question: "Qual é o primeiro passo para realizar um sonho que custa dinheiro?",
      choices: [
        { icon: "🎯", text: "Descobrir quanto custa o sonho", correct: true,
          feedback: "Perfeito! Saber o preço é o primeiro passo de todo bom planejamento! Sem saber o quanto precisa, como vai juntar? 📊" },
        { icon: "😴", text: "Esperar que aconteça por si mesmo", correct: false,
          feedback: "Sonhos não se realizam sozinhos! O primeiro passo é saber quanto custa para poder planejar! 💪" },
        { icon: "😢", text: "Desistir porque parece difícil", correct: false,
          feedback: "Nunca desista! Todo sonho pode ser realizado com um bom plano e dedicação! Vamos planejar juntos! 🌟" }
      ]
    }
  },
 
  {
    id: 42, trail: 5, place: "park", order: 2,
    title: "Fazendo as contas",
    character: "aninha",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Aninha descobriu que a bicicleta custa R$120. Ela recebe R$10 de mesada por semana. Ela quer calcular quantas semanas precisa guardar.",
      question: "Quantas semanas a Aninha precisa guardar toda a mesada?",
      choices: [
        { icon: "📅", text: "6 semanas", correct: false, feedback: "6 × R$10 = R$60. Ainda falta metade! São 12 semanas para chegar em R$120! 🔢" },
        { icon: "📅", text: "12 semanas (3 meses)", correct: true, feedback: "Isso! 12 × R$10 = R$120. Em 3 meses, guardando toda a mesada, a Aninha terá a bicicleta! 🚲🎉" },
        { icon: "📅", text: "20 semanas", correct: false, feedback: "20 × R$10 = R$200, mais do que precisa! São apenas 12 semanas! 🔢" }
      ]
    }
  },
 
  {
    id: 43, trail: 5, place: "park", order: 3,
    title: "O cofrinho do sonho",
    character: "caio",
    coinsReward: 15,
    type: "piggy",
    content: {
      story: "O Caio decidiu criar um cofrinho especial para seu sonho: uma bicicleta vermelha! Cada moeda no cofrinho é um passo mais perto do sonho. Ajude-o!",
      question: "Clique para guardar moedas no cofrinho do sonho! Meta: 25!",
      target: 25
    }
  },
 
  {
    id: 44, trail: 5, place: "park", order: 4,
    title: "Resistir pensando no sonho",
    character: "dede",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Dedé está guardando para seu sonho: um jogo de futebol. Mas na escola passaram um sorvete delicioso por R$3. O dinheiro que ele tem é para o sonho...",
      question: "O Dedé deve comprar o sorvete?",
      choices: [
        { icon: "💪", text: "Não, o dinheiro é para o sonho e ele vai resistir!", correct: true,
          feedback: "Força de vontade! Pensar no sonho ajuda a resistir tentações! O Dedé vai conseguir o jogo logo! ⚽🏆" },
        { icon: "🍦", text: "Sim, sorvete é gostoso e ele merece!", correct: false,
          feedback: "O sorvete até que vale, mas o sonho é maior! Quando resistir, o Dedé vai sentir um orgulho imenso! 💪" },
        { icon: "🤝", text: "Pedir para um amigo pagar e devolver depois", correct: false,
          feedback: "Dívidas podem complicar amizades! Melhor resistir com a força do sonho em mente! ⭐" }
      ]
    }
  },
 
  {
    id: 45, trail: 5, place: "park", order: 5,
    title: "Planejamento com a família",
    character: "aninha",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "A Aninha mostrou seu planejamento para a mãe. A mãe ficou tão orgulhosa que disse: 'Que tal a família planejar uma viagem juntos?' Que ideia incrível!",
      question: "Por que planejar em família é ainda melhor?",
      choices: [
        { icon: "👨‍👩‍👧", text: "Todos contribuem, todos decidem e todos se comprometem juntos", correct: true,
          feedback: "Maravilha! Planejar em família une todo mundo num objetivo comum. Cada um contribui e todos comemoram juntos! 💛" },
        { icon: "👤", text: "Cada um planeja sozinho, é mais fácil", correct: false,
          feedback: "Planejar em família multiplica as forças e cria momentos especiais! Objetivos compartilhados unem famílias! 🏠❤️" },
        { icon: "😴", text: "Não precisa planejar, as coisas acontecem naturalmente", correct: false,
          feedback: "Planejar em conjunto torna os sonhos muito mais prováveis de acontecer! Família que planeja unida, chega junto! 🌟" }
      ]
    }
  },
 
  // Missões 46-50
  {
    id: 46, trail: 5, place: "park", order: 6,
    title: "Mesada inteligente",
    character: "miguel",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Miguel recebe R$20 de mesada. O pai ensinou a divisão mágica: parte para guardar, parte para gastar, parte para ajudar!",
      question: "Qual é a melhor forma de dividir a mesada?",
      choices: [
        { icon: "💰", text: "Gastar tudo, todo mês", correct: false, feedback: "Gastar tudo não deixa nada para sonhos ou emergências! A divisão mágica é muito melhor! 🤔" },
        { icon: "⚖️", text: "Guardar uma parte, gastar uma parte, ajudar uma parte", correct: true,
          feedback: "A DIVISÃO MÁGICA! Guardar + Gastar + Ajudar = equilíbrio perfeito! Você aprendeu o segredo da mesada inteligente! 🏆" },
        { icon: "🐷", text: "Guardar tudo e nunca gastar nada", correct: false,
          feedback: "Guardar é ótimo, mas parte da mesada é para você aproveitar e outra parte pode ajudar alguém! Equilíbrio! ⚖️" }
      ]
    }
  },
 
  {
    id: 47, trail: 5, place: "park", order: 7,
    title: "Ajudando em casa",
    character: "miguel",
    coinsReward: 12,
    type: "story_choice",
    content: {
      story: "O Miguel descobriu que pode ganhar dinheiro EXTRA ajudando em casa: arrumar quarto, lavar louça, varrer. E aí pode poupar mais rápido!",
      question: "Ajudar em casa para ganhar um pouco mais é uma boa ideia?",
      choices: [
        { icon: "🤩", text: "Sim! Aprende responsabilidade e pode guardar mais", correct: true,
          feedback: "PERFEITO! Ajudar em casa ensina responsabilidade, valorização do trabalho e ainda acelera o sonho! 💪⭐" },
        { icon: "😤", text: "Não, tarefas de casa são obrigação dos adultos", correct: false,
          feedback: "Ajudar em casa é de todos! E quando há recompensa por isso, você aprende o valor do trabalho desde cedo! 😊" },
        { icon: "🛋️", text: "Melhor esperar os pais darem mais mesada", correct: false,
          feedback: "Esperar pode demorar mais! Tomar iniciativa e ajudar em casa mostra maturidade e acelera os sonhos! 🌟" }
      ]
    }
  },
 
  {
    id: 48, trail: 5, place: "park", order: 8,
    title: "Cofrinho cheio!",
    character: "caio",
    coinsReward: 20,
    type: "piggy",
    content: {
      story: "O Caio está na reta final! O cofrinho está quase cheio e o sonho está quase ao alcance! Um último esforço! Meta: 30 moedas!",
      question: "Último desafio do cofrinho! Meta: 30 moedas!",
      target: 30
    }
  },
 
  {
    id: 49, trail: 5, place: "park", order: 9,
    title: "O sonho se realizou!",
    character: "aninha",
    coinsReward: 20,
    type: "story_choice",
    content: {
      story: "A Aninha está radiante! Depois de semanas guardando, planejando e resistindo a impulsos, ela tem todo o dinheiro da bicicleta! O momento chegou!",
      question: "Como a Aninha deve se sentir ao realizar seu sonho com esforço próprio?",
      choices: [
        { icon: "🌟", text: "Muito orgulhosa e feliz! O esforço valeu muito!", correct: true,
          feedback: "É EXATAMENTE ISSO! A conquista com esforço próprio tem um gosto especial! A bicicleta vai ser muito mais especial porque foi planejada! 🚲🏆🌟" },
        { icon: "😐", text: "Normal, qualquer um consegue isso fácil", correct: false,
          feedback: "Não é fácil! Planejar, guardar e resistir a impulsos por semanas é uma conquista INCRÍVEL! Orgulho total! 🎉" },
        { icon: "😔", text: "Demorou muito, não valeu", correct: false,
          feedback: "Valeu SIM! O processo de planejar e conquistar ensinou muito mais do que a bicicleta em si! 💛" }
      ]
    }
  },
 
  {
    id: 50, trail: 5, place: "park", order: 10,
    title: "Guardião do Dinheiro!",
    character: "lucas",
    coinsReward: 50,
    type: "story_choice",
    content: {
      story: "PARABÉNS! O Professor Lucas, o Seu Bento, a Dona Lúcia e todos os personagens aparecem para comemorar! Você concluiu todas as 5 trilhas! Você é o GUARDIÃO DO DINHEIRO!",
      question: "Qual é o maior segredo que você aprendeu no Financinhas?",
      choices: [
        { icon: "🏆", text: "Com planejamento, economia e escolhas conscientes, qualquer sonho é possível!", correct: true,
          feedback: "🎊🎊🎊 GUARDIÃO DO DINHEIRO SUPREMO! Você dominou as 5 trilhas! Planejamento + Economia + Consciência = VIDA FINANCEIRA INCRÍVEL! Você é um exemplo! 🏆🌟💰🌍" },
        { icon: "💸", text: "Dinheiro é tudo e quem tem mais dinheiro é mais feliz", correct: false,
          feedback: "Dinheiro é uma ferramenta importante, mas felicidade vem de escolhas sábias, relações e conquistas! Refaça e acerte! 💛" },
        { icon: "😴", text: "É muito difícil, melhor não pensar no dinheiro", correct: false,
          feedback: "Não é difícil quando você aprende! E você aprendeu tudo! Refaça e mostre que é o Guardião! 💪" }
      ]
    }
  }
 
];
 
