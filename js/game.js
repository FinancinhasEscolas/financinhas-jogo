════════════════════════════════════════════════════════════
 
// ═══════════════════════════════════════
// FINANCINHAS – MOTOR DO JOGO
// Login, Progresso, Tempo de Tela,
// Painel dos Pais, Sistema de Moedas
// ═══════════════════════════════════════
 
// ── Estado Global ──
let GAME_STATE = {
  user: null,        // { email, parentName, childName, grade, password }
  coins: 0,
  completedMissions: [],   // IDs das missões concluídas
  achievements: [],        // IDs das conquistas
  dream: null,             // { name, cost }
  sessionStart: null,      // timestamp de início da sessão
  sessionMinutes: 0,       // minutos jogados HOJE
  screenTimeWarned: false,
  trailProgress: { 1:0, 2:0, 3:0, 4:0, 5:0 }
};
 
// ── Inicialização ──────────────────────
window.addEventListener('DOMContentLoaded', () => {
  loadGame();
  AvatarSystem.load();
  AvatarSystem.render();
 
  // Timer de tempo de tela
  setInterval(checkScreenTime, 60000); // checa a cada minuto
  GAME_STATE.sessionStart = Date.now();
});
 
// ── ARMAZENAMENTO ──────────────────────
function saveGame() {
  try {
    localStorage.setItem('financinhas_state', JSON.stringify(GAME_STATE));
  } catch(e) {}
}
 
function loadGame() {
  try {
    const saved = localStorage.getItem('financinhas_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      GAME_STATE = { ...GAME_STATE, ...parsed };
      // Reseta tempo de tela diário
      const today = new Date().toDateString();
      const lastDay = localStorage.getItem('financinhas_lastday');
      if (lastDay !== today) {
        GAME_STATE.sessionMinutes = 0;
        GAME_STATE.screenTimeWarned = false;
        localStorage.setItem('financinhas_lastday', today);
        saveGame();
      }
    }
  } catch(e) {}
}
 
// ── NAVEGAÇÃO DE TELAS ─────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
}
 
// ── LOGIN ──────────────────────────────
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  if (!email || !pass) { showToast('Preencha e-mail e senha!'); return; }
 
  const stored = loadUser(email);
  if (!stored) { showToast('Conta não encontrada. Cadastre-se!'); return; }
  if (stored.password !== pass) { showToast('Senha incorreta!'); return; }
 
  GAME_STATE.user = stored;
  loadUserProgress(email);
  enterGame();
}
 
function doRegister() {
  const parent = document.getElementById('reg-parent').value.trim();
  const email  = document.getElementById('reg-email').value.trim();
  const pass   = document.getElementById('reg-pass').value;
  const child  = document.getElementById('reg-child').value.trim();
  const grade  = document.getElementById('reg-grade').value;
 
  if (!parent||!email||!pass||!child||!grade) { showToast('Preencha todos os campos!'); return; }
  if (pass.length < 4) { showToast('Senha precisa ter pelo menos 4 caracteres!'); return; }
 
  const user = { parentName: parent, email, password: pass, childName: child, grade };
  saveUser(email, user);
  GAME_STATE.user = user;
  GAME_STATE.coins = 0;
  GAME_STATE.completedMissions = [];
  saveGame();
  showToast(`Bem-vindo(a), ${child}! 🎉`);
  setTimeout(() => showScreen('screen-avatar'), 800);
}
 
function saveUser(email, data) {
  try { localStorage.setItem('fu_user_' + email, JSON.stringify(data)); } catch(e) {}
}
function loadUser(email) {
  try {
    const d = localStorage.getItem('fu_user_' + email);
    return d ? JSON.parse(d) : null;
  } catch(e) { return null; }
}
function loadUserProgress(email) {
  const saved = localStorage.getItem('financinhas_state');
  if (saved) {
    const p = JSON.parse(saved);
    if (p.user && p.user.email === email) {
      GAME_STATE = { ...GAME_STATE, ...p };
    }
  }
}
 
function enterGame() {
  if (!GAME_STATE.user) return;
  updateHUD();
  updateDreamBar();
  updatePlaceBadges();
  showScreen('screen-city');
}
 
// ── HUD ────────────────────────────────
function updateHUD() {
  const name = document.getElementById('hud-name');
  const coins = document.getElementById('hud-coins');
  if (name && GAME_STATE.user) name.textContent = GAME_STATE.user.childName;
  if (coins) coins.textContent = GAME_STATE.coins;
  // Avatar no HUD
  const hud = document.getElementById('hud-avatar');
  if (hud) hud.textContent = AvatarSystem.getHudEmoji();
}
 
// ── MOEDAS ─────────────────────────────
function addCoins(amount) {
  GAME_STATE.coins += amount;
  saveGame();
  updateHUD();
  updateDreamBar();
  // Checa conquistas de moedas
  if (GAME_STATE.coins >= 50) grantAchievement('saver');
}
 
// ── MISSÕES CONCLUÍDAS ─────────────────
function completeMission(missionId, coinsEarned) {
  if (!GAME_STATE.completedMissions.includes(missionId)) {
    GAME_STATE.completedMissions.push(missionId);
    addCoins(coinsEarned);
    updateTrailProgress();
    updatePlaceBadges();
    if (GAME_STATE.completedMissions.length === 1) grantAchievement('first_mission');
    saveGame();
  }
}
 
function updateTrailProgress() {
  MISSIONS.forEach(m => {
    if (GAME_STATE.completedMissions.includes(m.id)) {
      const trail = m.trail;
      const trailMissions = MISSIONS.filter(x => x.trail === trail);
      const done = trailMissions.filter(x => GAME_STATE.completedMissions.includes(x.id)).length;
      GAME_STATE.trailProgress[trail] = Math.round((done / trailMissions.length) * 100);
    }
  });
 
  // Conquistas por trilha completa
  for (let t = 1; t <= 5; t++) {
    if (GAME_STATE.trailProgress[t] === 100) {
      grantAchievement('trail' + t);
      if (t === 4) grantAchievement('eco_hero');
    }
  }
}
 
function updatePlaceBadges() {
  GAME_DATA.places && Object.entries(GAME_DATA.places).forEach(([key, place]) => {
    const badge = document.getElementById('badge-' + key);
    if (!badge) return;
    const trailMissions = MISSIONS.filter(m => m.place === key);
    const done = trailMissions.filter(m => GAME_STATE.completedMissions.includes(m.id)).length;
    if (done > 0) {
      badge.textContent = done === trailMissions.length ? '✓' : done + '/' + trailMissions.length;
      badge.style.display = 'flex';
    }
  });
}
 
// ── SONHO ──────────────────────────────
function updateDreamBar() {
  const dream = GAME_STATE.dream;
  const nameEl = document.getElementById('dream-name');
  const fill = document.getElementById('dream-fill');
  const pct = document.getElementById('dream-pct');
  if (!dream) return;
  if (nameEl) nameEl.textContent = dream.name;
  const percent = Math.min(100, Math.round((GAME_STATE.coins / dream.cost) * 100));
  if (fill) fill.style.width = percent + '%';
  if (pct) pct.textContent = percent + '%';
  if (percent >= 100) {
    showToast('🎉 Você juntou moedas suficientes para o seu sonho!');
    grantAchievement('dreamer');
  }
}
 
function showDreamSetup() {
  openModal('modal-dream');
}
 
function saveDream() {
  const pass = document.getElementById('dream-parent-pass').value;
  const item = document.getElementById('dream-item').value.trim();
  const cost = parseInt(document.getElementById('dream-cost').value);
 
  if (!pass || !item || !cost) { showToast('Preencha todos os campos!'); return; }
  if (!GAME_STATE.user || pass !== GAME_STATE.user.password) {
    showToast('Senha incorreta!'); return;
  }
  if (cost < 1) { showToast('Informe um valor válido em Moedas Coop!'); return; }
 
  GAME_STATE.dream = { name: item, cost };
  saveGame();
  updateDreamBar();
  updateParentPanel();
  closeModal('modal-dream');
  grantAchievement('dreamer');
  showToast(`Sonho "${item}" cadastrado! 🌟`);
  // Limpa campos
  document.getElementById('dream-parent-pass').value = '';
  document.getElementById('dream-item').value = '';
  document.getElementById('dream-cost').value = '';
}
 
// ── PAINEL DOS PAIS ────────────────────
function showParentPanel() {
  updateParentPanel();
  showScreen('screen-parent');
}
 
function updateParentPanel() {
  if (!GAME_STATE.user) return;
 
  document.getElementById('parent-child-name').textContent = GAME_STATE.user.childName || '-';
  document.getElementById('stat-missions').textContent = GAME_STATE.completedMissions.length;
  document.getElementById('stat-coins').textContent = GAME_STATE.coins;
 
  // Trilhas concluídas
  const trailsDone = Object.values(GAME_STATE.trailProgress).filter(p => p === 100).length;
  document.getElementById('stat-trails').textContent = trailsDone + '/5';
 
  // Tempo hoje
  const mins = GAME_STATE.sessionMinutes + Math.round((Date.now() - GAME_STATE.sessionStart) / 60000);
  document.getElementById('stat-time').textContent = mins + 'min';
 
  // Sonho
  const dreamDiv = document.getElementById('dream-display');
  if (GAME_STATE.dream) {
    const pct = Math.min(100, Math.round((GAME_STATE.coins / GAME_STATE.dream.cost) * 100));
    dreamDiv.innerHTML = `
      <p><strong>${GAME_STATE.dream.name}</strong></p>
      <p>Necessário: ${GAME_STATE.dream.cost} Moedas Coop</p>
      <p>Atual: ${GAME_STATE.coins} moedas (${pct}%)</p>
      <div class="skill-bar" style="margin-top:8px">
        <div class="skill-fill" style="width:${pct}%"></div>
      </div>
    `;
  }
 
  // Habilidades
  const sk = [
    GAME_STATE.trailProgress[1] || 0,
    GAME_STATE.trailProgress[2] || 0,
    GAME_STATE.trailProgress[3] || 0,
    GAME_STATE.trailProgress[4] || 0,
    GAME_STATE.trailProgress[5] || 0
  ];
  sk.forEach((v, i) => {
    const el = document.getElementById('sk' + (i+1));
    if (el) el.style.width = v + '%';
  });
 
  // Conquistas
  const achList = document.getElementById('achievements-list');
  if (achList) {
    if (GAME_STATE.achievements.length === 0) {
      achList.innerHTML = '<p style="color:#888;font-size:0.9rem">Nenhuma conquista ainda. Jogue para ganhar!</p>';
    } else {
      achList.innerHTML = GAME_STATE.achievements.map(id => {
        const a = GAME_DATA.achievements.find(x => x.id === id);
        return a ? `<div class="achievement-item">
          <div class="achievement-icon">${a.icon}</div>
          <div class="achievement-text">
            <strong>${a.title}</strong>
            <span>${a.desc}</span>
          </div>
        </div>` : '';
      }).join('');
    }
  }
}
 
function showProgress() {
  // Mostra progresso das trilhas inline
  showToast('📊 Use o Painel dos Responsáveis para ver o progresso completo!');
}
 
// ── CONQUISTAS ─────────────────────────
function grantAchievement(id) {
  if (GAME_STATE.achievements.includes(id)) return;
  const achievement = GAME_DATA.achievements.find(a => a.id === id);
  if (!achievement) return;
  GAME_STATE.achievements.push(id);
  addCoins(achievement.coins);
  saveGame();
  showRewardModal(
    achievement.icon + ' ' + achievement.title,
    achievement.desc,
    '+' + achievement.coins + ' 💰'
  );
}
 
// ── TEMPO DE TELA ──────────────────────
function checkScreenTime() {
  if (!GAME_STATE.user) return;
  const elapsed = Math.round((Date.now() - GAME_STATE.sessionStart) / 60000);
  const total = GAME_STATE.sessionMinutes + elapsed;
 
  if (total >= 60 && !GAME_STATE.screenTimeWarned) {
    GAME_STATE.screenTimeWarned = true;
    GAME_STATE.sessionMinutes = total;
    saveGame();
    openModal('modal-screentime');
  }
}
 
function unlockScreenTime() {
  const pass = document.getElementById('screentime-pass').value;
  if (!pass) { showToast('Digite a senha do responsável!'); return; }
  if (!GAME_STATE.user || pass !== GAME_STATE.user.password) {
    showToast('Senha incorreta!'); return;
  }
  // Reseta contador por mais 60 min
  GAME_STATE.sessionStart = Date.now();
  GAME_STATE.sessionMinutes = 0;
  GAME_STATE.screenTimeWarned = false;
  saveGame();
  document.getElementById('screentime-pass').value = '';
  closeModal('modal-screentime');
  showToast('Continuando o jogo! 🎮 Lembre-se de fazer pausas! 💧');
}
 
// ── MODAIS ─────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
 
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
 
function showRewardModal(title, msg, coins) {
  document.getElementById('reward-title').textContent = title;
  document.getElementById('reward-msg').textContent = msg;
  document.getElementById('reward-coins').textContent = coins;
  openModal('modal-reward');
}
 
function showCompleteModal(msg, badge) {
  document.getElementById('complete-msg').textContent = msg;
  document.getElementById('earned-badge').textContent = badge || '';
  openModal('modal-complete');
}
 
// ── TOAST ──────────────────────────────
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
}
 
// ── NAVEGAR PARA LUGAR ─────────────────
function enterPlace(placeKey) {
  const place = GAME_DATA.places[placeKey];
  if (!place) return;
  if (!place.unlocked) {
    showToast('🔒 Este lugar ainda está bloqueado! Complete mais missões!');
    return;
  }
  // Pega missões disponíveis deste lugar
  const placeMissions = MISSIONS.filter(m => m.place === placeKey);
  const nextMission = placeMissions.find(m => !GAME_STATE.completedMissions.includes(m.id));
 
  if (!nextMission) {
    showToast(`✅ Você completou todas as missões em ${place.name}!`);
    return;
  }
 
  launchMission(nextMission);
}
 
function backToCity() {
  updateHUD();
  updateDreamBar();
  updatePlaceBadges();
  showScreen('screen-city');
}
 
