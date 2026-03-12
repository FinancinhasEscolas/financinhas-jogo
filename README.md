# 🎮 Financinhas – Missão dos Sonhos

Jogo educativo de educação financeira para alunos do 1º ao 5º ano.
Desenvolvido em parceria com **Sicoob Credivertentes**.

---

## 📁 Estrutura de arquivos

```
financinhas/
├── index.html         ← Página principal do jogo
├── css/
│   └── style.css      ← Estilos visuais
└── js/
    ├── data.js        ← Personagens, missões e dados
    ├── avatar.js      ← Sistema de criação de avatar
    ├── game.js        ← Motor principal (login, progresso, pais)
    └── missions.js    ← Motor de missões (mini-games)
```

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### Passo 1 – Criar conta no GitHub
1. Acesse https://github.com
2. Clique em **Sign up**
3. Crie sua conta gratuitamente

### Passo 2 – Criar repositório
1. Clique no botão verde **New** (ou + no canto superior)
2. Nome do repositório: `financinhas-jogo`
3. Marque **Public**
4. Clique em **Create repository**

### Passo 3 – Fazer upload dos arquivos
1. No repositório criado, clique em **uploading an existing file**
2. Arraste TODOS os arquivos e pastas do jogo
3. Estrutura deve ficar:
   - `index.html` na raiz
   - pasta `css/` com `style.css`
   - pasta `js/` com os 4 arquivos .js
4. Clique em **Commit changes**

### Passo 4 – Ativar GitHub Pages
1. No repositório, clique em **Settings** (engrenagem)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Branch: **main**, pasta: **/ (root)**
5. Clique em **Save**

### Passo 5 – Acessar o jogo
Após alguns minutos, seu jogo estará disponível em:
```
https://SEU-USUARIO.github.io/financinhas-jogo/
```

---

## 📱 Compatibilidade
- ✅ Computadores (Chrome, Firefox, Edge)
- ✅ Tablets
- ✅ Celulares (tela responsiva)

## 🔒 Privacidade (LGPD)
- Dados salvos APENAS no dispositivo do usuário (localStorage)
- Nenhum dado enviado para servidores externos
- Login criado pelo responsável adulto
- Sem chat, sem ranking público, sem localização

## 🌟 Funcionalidades
- 👤 Criador de avatar estilo The Sims
- 🗺️ Mapa da cidade com 5 lugares
- 📚 50 missões em 5 trilhas pedagógicas
- 🐷 Mini-games: história, classificação, cofrinho, orçamento
- 🌟 Sistema de sonho cadastrado pelos pais
- 👨‍👩‍👧 Painel dos responsáveis com progresso
- ⏰ Controle de tempo de tela (1h com senha)
- 💰 Moedas Coop e conquistas
