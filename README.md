 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index d55c199f7978dc42078771a4d01f77cc44671c98..923623116ad96d7268c05b9e8e7b00f45928b6c4 100644
--- a/README.md
+++ b/README.md
@@ -36,45 +36,50 @@ financinhas/
 
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
 
+
+## 🧭 Evolução guiada por perguntas
+
+Para planejar as próximas melhorias do jogo com foco em aprendizagem, diversão e adoção em escolas, use o roteiro em [`docs/questionario-melhoria.md`](docs/questionario-melhoria.md). Com as respostas consolidadas, o plano de produto fica em [`docs/plano-sucesso-financinhas.md`](docs/plano-sucesso-financinhas.md), incluindo pesquisa sobre a Coleção Financinhas, prioridades e próximos ciclos.
+
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
 
EOF
)
