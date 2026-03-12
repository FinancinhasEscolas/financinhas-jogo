// ═══════════════════════════════════════
// FINANCINHAS – MOTOR DE MISSÕES
// story_choice, sort, piggy, budget
// ═══════════════════════════════════════

let CURRENT_MISSION = null;

// ── Lançar missão ──────────────────────
function launchMission(mission) {
  CURRENT_MISSION = mission;
  showScreen('screen-mission');

  const char = GAME_DATA.characters[mission.character];
  document.getElementById('mission-title').textContent = mission.title;
  document.getElementById('mission-coins').textContent = GAME_STATE.coins;

  const content = document.getElementById('mission-content');
  content.innerHTML = '';

  switch (mission.type) {
    case 'story_choice': renderStoryChoice(mission, content, char); break;
    case 'sort':         renderSort(mission, content, char);        break;
    case 'piggy':        renderPiggy(mission, content, char);       break;
    case 'budget':       renderBudget(mission, content, char);      break;
    default:             renderStoryChoice(mission, content, char);
  }
}

// ══════════════════════════════════════
// TIPO 1: HISTÓRIA + ESCOLHA MÚLTIPLA
// ══════════════════════════════════════
function renderStoryChoice(mission, container, char) {
  const c = mission.content;
  const div = document.createElement('div');
  div.className = 'mission-card';
  div.innerHTML = `
    <div class="mission-char">${char ? char.emoji : '🧒'}</div>
    <div class="mission-char-name">${char ? char.name : ''}</div>
    <div class="mission-story">${c.story}</div>
    <div class="mission-question">${c.question}</div>
    <div class="mission-choices" id="choices-wrap">
      ${c.choices.map((ch, i) => `
        <button class="choice-btn" id="choice-${i}" onclick="handleChoice(${i})">
          <span class="choice-icon">${ch.icon}</span>
          <span>${ch.text}</span>
        </button>
      `).join('')}
    </div>
    <div id="feedback-area"></div>
    <div id="next-btn-area"></div>
  `;
  container.appendChild(div);
}

let choiceAnswered = false;

function handleChoice(index) {
  if (choiceAnswered) return;
  choiceAnswered = true;

  const m = CURRENT_MISSION;
  const choice = m.content.choices[index];
  const btn = document.getElementById('choice-' + index);
  const feedback = document.getElementById('feedback-area');
  const nextArea = document.getElementById('next-btn-area');

  // Marca resposta
  btn.classList.add(choice.correct ? 'correct' : 'wrong');

  // Mostra feedback
  feedback.innerHTML = `
    <div class="feedback-box ${choice.correct ? 'correct' : 'wrong'}">
      <strong>${choice.correct ? '✅ Muito bem!' : '💭 Quase!'}</strong>
      <p>${choice.feedback}</p>
    </div>
  `;

  // Botão continuar
  const coinsEarned = choice.correct ? m.coinsReward : Math.floor(m.coinsReward * 0.3);
  nextArea.innerHTML = `
    <button class="btn-primary" style="margin-top:16px" onclick="finishMission(${m.id}, ${coinsEarned}, '${choice.correct}')">
      ${choice.correct ? '🌟 Próxima missão!' : '💪 Continuar assim!'}
    </button>
  `;

  // Animação nos botões errados
  if (choice.correct) {
    document.querySelectorAll('.choice-btn').forEach((b, i) => {
      if (i !== index && !m.content.choices[i].correct) {
        b.style.opacity = '0.4';
      }
    });
  }

  choiceAnswered = false; // Permite clicar em continuar
}

// ══════════════════════════════════════
// TIPO 2: CLASSIFICAÇÃO (SORT/DRAG)
// ══════════════════════════════════════
function renderSort(mission, container, char) {
  const c = mission.content;
  const div = document.createElement('div');
  div.className = 'mission-card';

  const itemsHTML = c.items.map(item => `
    <div class="sort-item" id="sort-item-${item.id}" data-id="${item.id}" data-cat="${item.category !== undefined ? item.category : ''}"
      onclick="handleSortClick('${item.id}')">
      <span>${item.emoji}</span>
      <span>${item.name}</span>
    </div>
  `).join('');

  const colsHTML = c.categories.map((cat, i) => `
    <div class="sort-col">
      <div class="sort-col-title">${cat}</div>
      <div class="sort-drop-zone" id="zone-${i}" data-zone="${i}"></div>
    </div>
  `).join('');

  div.innerHTML = `
    <div class="mission-char">${char ? char.emoji : '🧒'}</div>
    <div class="mission-char-name">${char ? char.name : ''}</div>
    <div class="mission-story">${c.story}</div>
    <div class="mission-question">${c.question}</div>
    <div class="sort-items" id="sort-source">${itemsHTML}</div>
    <div class="sort-columns">${colsHTML}</div>
    <div id="sort-feedback"></div>
    <div id="sort-next"></div>
  `;
  container.appendChild(div);
}

let selectedSortItem = null;

function handleSortClick(itemId) {
  const item = document.getElementById('sort-item-' + itemId);
  if (!item) return;

  if (selectedSortItem && selectedSortItem.id === item.id) {
    // Deselect
    item.style.border = '2px solid #e0e0e0';
    selectedSortItem = null;
    return;
  }

  // Check if clicking a zone zone
  if (item.dataset.inzone !== undefined) {
    // Move back to source
    const source = document.getElementById('sort-source');
    if (source) {
      item.style.border = '2px solid #e0e0e0';
      item.style.background = '#fff';
      delete item.dataset.inzone;
      source.appendChild(item);
    }
    selectedSortItem = null;
    return;
  }

  // Select item
  if (selectedSortItem) selectedSortItem.style.border = '2px solid #e0e0e0';
  selectedSortItem = item;
  item.style.border = '2px solid var(--primary)';
  item.style.background = 'var(--primary-light)';

  // Show zone selection prompt
  showToast('Agora clique na coluna onde quer colocar este item!');

  // Add click to zones
  document.querySelectorAll('.sort-drop-zone').forEach(zone => {
    zone.onclick = () => dropItemInZone(zone);
  });
}

function dropItemInZone(zone) {
  if (!selectedSortItem) return;

  zone.appendChild(selectedSortItem);
  selectedSortItem.dataset.inzone = zone.dataset.zone;
  selectedSortItem.style.border = '2px solid #e0e0e0';
  selectedSortItem.style.background = '#fff';
  selectedSortItem.onclick = () => handleSortClick(selectedSortItem.dataset.id);
  selectedSortItem = null;

  // Remove zone onclick
  document.querySelectorAll('.sort-drop-zone').forEach(z => z.onclick = null);

  // Check if all placed
  const totalItems = CURRENT_MISSION.content.items.length;
  const placed = document.querySelectorAll('[data-inzone]').length;
  if (placed >= totalItems) {
    checkSortAnswer();
  }
}

function checkSortAnswer() {
  const items = CURRENT_MISSION.content.items;
  let correct = 0;

  items.forEach(item => {
    const el = document.getElementById('sort-item-' + item.id);
    if (!el) return;
    const placedZone = parseInt(el.dataset.inzone);
    const expectedCat = item.category;
    if (placedZone === expectedCat) {
      correct++;
      el.style.borderColor = '#4CAF50';
      el.style.background = '#E8F5E9';
    } else {
      el.style.borderColor = '#f44336';
      el.style.background = '#FFEBEE';
    }
  });

  const total = items.length;
  const pct = Math.round((correct / total) * 100);
  const coinsEarned = Math.round(CURRENT_MISSION.coinsReward * (pct / 100));

  document.getElementById('sort-feedback').innerHTML = `
    <div class="feedback-box ${pct >= 70 ? 'correct' : 'wrong'}" style="margin-top:16px">
      <strong>${pct >= 70 ? '🎉 Ótimo trabalho!' : '💭 Bom esforço!'}</strong>
      <p>Você acertou ${correct} de ${total} itens (${pct}%)!</p>
      ${pct < 100 ? '<p>Itens em vermelho precisam ir para a outra coluna!</p>' : ''}
    </div>
  `;

  document.getElementById('sort-next').innerHTML = `
    <button class="btn-primary" style="margin-top:12px" onclick="finishMission(${CURRENT_MISSION.id}, ${coinsEarned}, '${pct >= 70}')">
      ${pct >= 70 ? '🌟 Continuar!' : '💪 Continuar assim!'}
    </button>
  `;
}

// ══════════════════════════════════════
// TIPO 3: COFRINHO (CLIQUE)
// ══════════════════════════════════════
function renderPiggy(mission, container, char) {
  const c = mission.content;
  let count = 0;
  const target = c.target || 10;

  const div = document.createElement('div');
  div.className = 'mission-card';
  div.innerHTML = `
    <div class="mission-char">${char ? char.emoji : '🧒'}</div>
    <div class="mission-char-name">${char ? char.name : ''}</div>
    <div class="mission-story">${c.story}</div>
    <div class="piggy-game">
      <div class="piggy-instructions">${c.question}</div>
      <div class="coin-rain" id="coin-rain"></div>
      <div class="piggy-icon" id="piggy-icon" onclick="clickPiggy()">🐷</div>
      <div class="piggy-counter"><span id="piggy-count">0</span> / ${target}</div>
      <div style="margin:12px 0">
        <div class="skill-bar">
          <div class="skill-fill" id="piggy-bar" style="width:0%"></div>
        </div>
      </div>
    </div>
    <div id="piggy-next"></div>
  `;
  container.appendChild(div);

  // Store count in closure
  window._piggyCount = 0;
  window._piggyTarget = target;
}

function clickPiggy() {
  const target = window._piggyTarget || 10;
  window._piggyCount = (window._piggyCount || 0) + 1;
  const count = window._piggyCount;

  // Update counter
  const countEl = document.getElementById('piggy-count');
  if (countEl) countEl.textContent = count;

  // Update bar
  const bar = document.getElementById('piggy-bar');
  if (bar) bar.style.width = Math.min(100, (count / target) * 100) + '%';

  // Animate piggy
  const piggy = document.getElementById('piggy-icon');
  if (piggy) {
    piggy.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => { piggy.style.transform = 'scale(1) rotate(0)'; }, 200);
  }

  // Coin rain
  spawnCoin();

  // Check complete
  if (count >= target) {
    const nextArea = document.getElementById('piggy-next');
    if (nextArea && !nextArea.innerHTML) {
      nextArea.innerHTML = `
        <div class="feedback-box correct" style="margin-top:12px">
          <strong>🎉 Cofrinho cheio!</strong>
          <p>Incrível! Você guardou ${target} moedas! É assim que poupadores campeões fazem!</p>
        </div>
        <button class="btn-primary" style="margin-top:12px" onclick="finishMission(${CURRENT_MISSION.id}, ${CURRENT_MISSION.coinsReward}, 'true')">
          🌟 Continuar!
        </button>
      `;
    }
  }
}

function spawnCoin() {
  const rain = document.getElementById('coin-rain');
  if (!rain) return;
  const coin = document.createElement('div');
  coin.className = 'coin-particle';
  coin.textContent = '💰';
  coin.style.left = Math.random() * 80 + 10 + '%';
  coin.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
  rain.appendChild(coin);
  setTimeout(() => coin.remove(), 1000);
}

// ══════════════════════════════════════
// TIPO 4: ORÇAMENTO (BUDGET)
// ══════════════════════════════════════
let budgetSelected = [];
let budgetTotal = 0;

function renderBudget(mission, container, char) {
  const c = mission.content;
  budgetSelected = [];
  budgetTotal = 0;

  const div = document.createElement('div');
  div.className = 'mission-card';
  div.innerHTML = `
    <div class="mission-char">${char ? char.emoji : '🧒'}</div>
    <div class="mission-char-name">${char ? char.name : ''}</div>
    <div class="mission-story">${c.story}</div>
    <div class="budget-bar-wrap">
      <div class="budget-label">
        <span>💰 Orçamento: R$ ${c.budget.toFixed(2)}</span>
        <span>Gasto: R$ <span id="budget-spent">0,00</span></span>
      </div>
      <div class="budget-bar">
        <div class="budget-fill" id="budget-fill" style="width:0%"></div>
      </div>
    </div>
    <p style="font-size:0.85rem;color:#888;margin-bottom:12px;text-align:center">${c.tip}</p>
    <div class="shop-items">
      ${c.items.map((item, i) => `
        <div class="shop-item" id="shop-${i}" onclick="toggleBudgetItem(${i})">
          <div class="shop-icon">${item.emoji}</div>
          <div class="shop-name">${item.name}</div>
          <div class="shop-price">R$ ${item.price.toFixed(2)}</div>
          ${item.healthy !== undefined ? `<div style="font-size:0.7rem;color:${item.healthy ? '#4CAF50' : '#f44336'}">${item.healthy ? '✅ Saudável' : '⚠️'}</div>` : ''}
        </div>
      `).join('')}
    </div>
    <div id="budget-feedback" style="margin-top:16px"></div>
    <button class="btn-primary" style="margin-top:12px" onclick="checkBudget()">
      ✅ Confirmar escolhas!
    </button>
  `;
  container.appendChild(div);
}

function toggleBudgetItem(index) {
  const item = CURRENT_MISSION.content.items[index];
  const el = document.getElementById('shop-' + index);
  const budget = CURRENT_MISSION.content.budget;

  if (budgetSelected.includes(index)) {
    // Remove
    budgetSelected = budgetSelected.filter(i => i !== index);
    budgetTotal -= item.price;
    el.classList.remove('selected');
  } else {
    // Add
    if (budgetTotal + item.price > budget) {
      showToast('⚠️ Isso ultrapassaria o orçamento!');
      el.classList.add('unavailable');
      setTimeout(() => el.classList.remove('unavailable'), 500);
      return;
    }
    budgetSelected.push(index);
    budgetTotal += item.price;
    el.classList.add('selected');
  }

  // Update bar
  const pct = (budgetTotal / budget) * 100;
  const fill = document.getElementById('budget-fill');
  const spent = document.getElementById('budget-spent');
  if (fill) {
    fill.style.width = Math.min(100, pct) + '%';
    fill.className = 'budget-fill' + (pct > 100 ? ' over' : '');
  }
  if (spent) spent.textContent = budgetTotal.toFixed(2).replace('.', ',');
}

function checkBudget() {
  const c = CURRENT_MISSION.content;
  if (budgetSelected.length === 0) {
    showToast('Escolha pelo menos um item!');
    return;
  }

  const items = budgetSelected.map(i => c.items[i]);
  const healthyCount = items.filter(i => i.healthy).length;
  const withinBudget = budgetTotal <= c.budget;
  const success = withinBudget && healthyCount >= Math.ceil(items.length / 2);

  const feedback = document.getElementById('budget-feedback');
  feedback.innerHTML = `
    <div class="feedback-box ${success ? 'correct' : 'wrong'}">
      <strong>${success ? '🎉 Ótima escolha!' : '💭 Bom esforço!'}</strong>
      <p>Você escolheu: ${items.map(i => i.emoji + ' ' + i.name).join(', ')}</p>
      <p>Total gasto: R$ ${budgetTotal.toFixed(2)} de R$ ${c.budget.toFixed(2)}</p>
      ${!withinBudget ? '<p>⚠️ Atenção: você ultrapassou o orçamento!</p>' : ''}
      ${healthyCount < Math.ceil(items.length / 2) ? '<p>💡 Tente incluir mais itens saudáveis da próxima vez!</p>' : ''}
    </div>
    <button class="btn-primary" style="margin-top:12px" onclick="finishMission(${CURRENT_MISSION.id}, ${success ? CURRENT_MISSION.coinsReward : Math.floor(CURRENT_MISSION.coinsReward * 0.5)}, '${success}')">
      ${success ? '🌟 Continuar!' : '💪 Continuar!'}
    </button>
  `;

  // Remove check button
  const checkBtn = document.querySelector('.mission-content .btn-primary:not(#budget-feedback .btn-primary)');
}

// ══════════════════════════════════════
// FINALIZAR MISSÃO
// ══════════════════════════════════════
function finishMission(missionId, coinsEarned, wasCorrect) {
  completeMission(missionId, coinsEarned);

  const mission = MISSIONS.find(m => m.id === missionId);
  const isLastInTrail = mission && MISSIONS.filter(m => m.trail === mission.trail)
    .every(m => GAME_STATE.completedMissions.includes(m.id));

  // Update coins display in mission header
  document.getElementById('mission-coins').textContent = GAME_STATE.coins;

  // Verifica se é a última missão da trilha
  if (isLastInTrail) {
    showCompleteModal(
      `Você concluiu a Trilha "${GAME_DATA.trails.find(t => t.id === mission.trail)?.name}"! 🎉`,
      GAME_DATA.trails.find(t => t.id === mission.trail)?.icon + ' 🏆'
    );
  } else {
    // Mostra toast simples e próxima missão
    showToast(`+${coinsEarned} 💰 Moedas Coop ganhas!`);
    setTimeout(() => {
      // Avança para próxima missão do lugar
      if (mission) {
        const nextMission = MISSIONS.find(m =>
          m.place === mission.place &&
          m.order === mission.order + 1 &&
          !GAME_STATE.completedMissions.includes(m.id)
        );
        if (nextMission) {
          choiceAnswered = false;
          launchMission(nextMission);
        } else {
          backToCity();
        }
      }
    }, 1500);
  }
}
