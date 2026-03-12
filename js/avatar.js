════════════════════════════════════════════════════════════
 
// ═══════════════════════════════════════
// FINANCINHAS – SISTEMA DE AVATAR
// Criação estilo The Sims
// ═══════════════════════════════════════
 
const AvatarSystem = {
  current: {
    skinColor: '#FDDBB4',
    skinId: 'skin1',
    hairStyle: 'hair1',
    hairColor: '#1a0a00',
    clothesStyle: 'clothes1',
    clothesColor: '#4FC3F7',
    eyeStyle: 'eyes1',
    accessory: 'none'
  },
 
  hairStyles: {
    hair1: { name: 'Curto', shape: 'border-radius: 50% 50% 30% 30%; height:32px;' },
    hair2: { name: 'Longo', shape: 'border-radius: 50% 50% 20% 20%; height:45px;' },
    hair3: { name: 'Enrolado', shape: 'border-radius: 50%; height:38px; width:85px;' },
    hair4: { name: 'Trancinha', shape: 'border-radius: 60% 60% 40% 40%; height:36px;' },
    hair5: { name: 'Careca', shape: 'border-radius: 50%; height:10px; opacity:0.3;' }
  },
 
  eyeEmojis: {
    eyes1: '😊', eyes2: '😄', eyes3: '🤩', eyes4: '😎'
  },
 
  accessoryEmojis: {
    none: '', glasses: '🕶️', hat: '🎩', crown: '👑', bow: '🎀'
  },
 
  render() {
    const c = this.current;
 
    // Corpo / pele
    const body = document.getElementById('av-body');
    if (body) {
      body.style.background = c.skinColor;
      body.style.border = `3px solid ${this.darken(c.skinColor)}`;
    }
 
    // Rosto
    const face = document.getElementById('av-face');
    if (face) face.style.background = c.skinColor;
 
    // Olhos
    const eyes = document.getElementById('av-eyes');
    if (eyes) eyes.textContent = this.eyeEmojis[c.eyeStyle] || '😊';
 
    // Boca
    const mouth = document.getElementById('av-mouth');
    if (mouth) mouth.textContent = '😄';
 
    // Cabelo
    const hair = document.getElementById('av-hair');
    if (hair) {
      hair.style.background = c.hairColor;
      const hs = this.hairStyles[c.hairStyle];
      if (hs) {
        const parts = hs.shape.split(';').filter(Boolean);
        parts.forEach(p => {
          const [prop, val] = p.split(':').map(s => s.trim());
          if (prop && val) {
            const camel = prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
            hair.style[camel] = val;
          }
        });
      }
    }
 
    // Roupas
    const clothes = document.getElementById('av-clothes');
    if (clothes) {
      clothes.style.background = c.clothesColor;
      clothes.style.border = `2px solid ${this.darken(c.clothesColor)}`;
    }
 
    // Acessório
    const acc = document.getElementById('av-accessory');
    if (acc) {
      acc.textContent = this.accessoryEmojis[c.accessory] || '';
      if (c.accessory === 'glasses') {
        acc.style.top = '25px';
        acc.style.fontSize = '1.1rem';
      } else if (c.accessory === 'hat' || c.accessory === 'crown') {
        acc.style.top = '-8px';
        acc.style.fontSize = '1.6rem';
      } else if (c.accessory === 'bow') {
        acc.style.top = '-4px';
        acc.style.right = '-8px';
        acc.style.left = 'auto';
        acc.style.transform = 'none';
        acc.style.fontSize = '1.3rem';
      } else {
        acc.style.top = '0';
        acc.style.left = '50%';
        acc.style.right = 'auto';
        acc.style.transform = 'translateX(-50%)';
      }
    }
  },
 
  darken(hex) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (num >> 16) - 30);
    const g = Math.max(0, ((num >> 8) & 0xff) - 30);
    const b = Math.max(0, (num & 0xff) - 30);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  },
 
  // Renderizar avatar como emoji no HUD (simplificado)
  getHudEmoji() {
    const bodyColors = {
      skin1: '🧒', skin2: '🧒', skin3: '👦', skin4: '👧', skin5: '🧑'
    };
    return bodyColors[this.current.skinId] || '🧒';
  },
 
  // Salvar avatar no storage
  save() {
    try {
      localStorage.setItem('financinhas_avatar', JSON.stringify(this.current));
    } catch(e) {}
  },
 
  // Carregar avatar do storage
  load() {
    try {
      const saved = localStorage.getItem('financinhas_avatar');
      if (saved) {
        this.current = { ...this.current, ...JSON.parse(saved) };
      }
    } catch(e) {}
  }
};
 
// ── Funções globais chamadas pelo HTML ──
 
function setSkin(btn, color, id) {
  AvatarSystem.current.skinColor = color;
  AvatarSystem.current.skinId = id;
  document.querySelectorAll('#skin-picker .skin-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function setHair(btn, style) {
  AvatarSystem.current.hairStyle = style;
  document.querySelectorAll('#hair-picker .item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function setHairColor(btn, color) {
  AvatarSystem.current.hairColor = color;
  document.querySelectorAll('#hair-color-picker .skin-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function setClothes(btn, style, color) {
  AvatarSystem.current.clothesStyle = style;
  AvatarSystem.current.clothesColor = color;
  document.querySelectorAll('#clothes-picker .item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function setEyes(btn, style) {
  AvatarSystem.current.eyeStyle = style;
  document.querySelectorAll('#eyes-picker .item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function setAccessory(btn, acc) {
  AvatarSystem.current.accessory = acc;
  document.querySelectorAll('#acc-picker .item-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  AvatarSystem.render();
}
 
function saveAvatar() {
  AvatarSystem.save();
  showToast('Avatar salvo! 🎉');
  // Atualiza HUD
  const hudAvatar = document.getElementById('hud-avatar');
  if (hudAvatar) hudAvatar.textContent = AvatarSystem.getHudEmoji();
  showScreen('screen-city');
}
 
