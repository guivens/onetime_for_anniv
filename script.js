/* ══════════════════════════════════════
   CONFIGURATION — modifie ici facilement
   ══════════════════════════════════════ */

const introText = `Your gift 😏💖`;

const preVideoMessage = `Tu sais ce qui est fou ?\n\nTout a commencé sans importance. Juste un sourire qui t'intriguait, et moi qui ne te calculais même pas. On ne se connaissait pas vraiment. La vie nous a même séparés une première fois, sans qu'on ait eu le temps de créer quoi que ce soit.\n\nEt pourtant, on s'est retrouvés. Comme si quelque chose insistait, pour qu'on se donne une vraie chance. Quand tu es revenu dans ma vie, je n'étais pas prête, j'avais peur, j'étais encore fragile… Et toi aussi, tu prenais ton temps. Mais entre les appels, les taquineries, les heures passées à parler de tout et de rien, sans même s'en rendre compte tu es devenu important. Puis essentiel.\n\nEt le 16 octobre 2022, j'ai fait la plus belle folie de ma vie : te dire ce que je ressentais. Et depuis ce jour Steev, rien n'est plus pareil.\n\nOn n'est pas parfaits. La distance nous fatigue parfois, la vie nous éloigne un peu, on s'embrouille, on se perd… Mais on ne se quitte jamais. On se retrouve toujours. Et ça, ça veut tout dire.\n\nParce qu'au fond, peu importe les kilomètres ou les silences, c'est toi que je choisis. Encore et encore. Tu es mon apaisement et mon trouble à la fois. Mon Tentazione ardente, The other me… mais surtout, la personne qui compte vraiment.\n\nAujourd'hui, pour ton anniversaire, je ne veux pas juste te dire "joyeux anniversaire". Je veux te rappeler que tu es une des plus belles choses qui me soit arrivée. Que malgré tout, malgré la distance, malgré les hauts et les bas, je suis là. Et je le serai encore.\n\nJe ne sais pas de quoi demain sera fait… mais ce que je sais, c'est que depuis toi, j'ai appris à aimer sans retenue. J'ai appris à aimer différemment. Plus vrai, plus fort.\n\nJoyeux anniversaire, mon Steev. ❤️`;
const correctPassword = "ACTS0603";

const questions = [
  {
    question: "1 - Qui a dit je t'aime en premier ?",
    options: ["Toi", "Moi"],
    answer: 0,
    success: "Bien sûr, j'étais amoureuse 😍",
    fail: "Et oui !! T'aurais dû le dire en premier 😂"
  },
  {
    question: "2 - Quel surnom je préfère quand tu m'appelles ?",
    options: ["Tawen", "Choupette", "Chou-Bourèt", "Twin"],
    answer: 0,
    success: "On m'appelle souvent ainsi mais quand ça sort de ta bouche c'est autre chose 🥰",
    fail: "Mèwi ! T'as la tête ailleurs 😅"
  },
  {
    question: "3 - Qui est le plus têtu ?",
    options: ["Toi", "Moi"],
    answer: 1,
    success: "Enfin quelqu'un qui accepte la vérité 😌",
    fail: "Tu mens et tu le sais 😆"
  },
  {
    question: "4 - Quel est mon endroit préféré pour recevoir un bisou ?",
    options: ["La bouche", "La chatte", "Les pieds"],
    answer: 1,
    success: "Hummm… Petit coquin 😘",
    fail: "Mais t'es pas sérieux 😤"
  },
  {
    question: "5 - Si notre histoire avait un titre, ce serait quoi ?",
    text: true,
    alwaysSuccess: true,
    success: "💖",
    fail: ""
  },
  {
    question: "6 - Pour le mois d'Avril j'ai eu mes règles quand ?",
    text: true,
    expected: "16/04/26",
    success: "Bon… tu connais vraiment tout 👀",
    fail: "Ayyy mauvaise réponse"
  },
  {
    question: "7 - C'est quoi ma nourriture préférée ?",
    options: [
      "Riz djondjon, plantains, viande",
      "Lalo et riz blanc",
      "Asteev",
      "Griot, plantains"
    ],
    answer: 0,
    success: "Bravoooo 🎉",
    fail: "Mais Steev t'es pas sérieux 😂"
  },
  {
    question: "8 - Le premier animé que j'ai regardé et mon animé préféré ?",
    text: true,
    // Vérifie juste que les deux œuvres sont mentionnées, peu importe la casse/accents/ponctuation
    customCheck: (raw) => {
      const s = normalize(raw);
      const hasAOT = s.includes("attack") && (s.includes("titan") || s.includes("ttan") || s.includes("tiitan"));
      const hasOP  = s.includes("one") && s.includes("piece") || s.includes("onepiece");
      return hasAOT && hasOP;
    },
    success: "Hummm Bravo !! 🏆",
    fail: "Tu me connais maaaaaal 😭"
  },
  {
    question: "9 - Sur une échelle de 1 à 10, à combien es-tu amoureux ? 😏",
    text: true,
    alwaysSuccess: true,   // peu importe la réponse → success
    success: "11 😭💖 Je savais que tu ne pouvais pas vivre sans moi",
    fail: ""               // jamais affiché
  }
];

/* ══════════════════════════════════════
   STATE
   ══════════════════════════════════════ */
let currentQuestion = 0;
let answered       = false;
let userName       = "";

const music       = document.getElementById("music");
const typingBox   = document.getElementById("typingText");
const preVideoBox = document.getElementById("preVideoText");

/* ══════════════════════════════════════
   INIT
   ══════════════════════════════════════ */
window.onload = () => {
  createStars();
  launchConfetti();
  setTimeout(() => typeText(introText, typingBox), 400);
};

/* ══════════════════════════════════════
   TYPEWRITER
   ══════════════════════════════════════ */
function typeText(text, el, speed = 35, onDone = null) {
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

/* ══════════════════════════════════════
   SCREEN NAVIGATION
   ══════════════════════════════════════ */
function switchScreen(hideId, showId) {
  document.getElementById(hideId).classList.remove("active");
  const next = document.getElementById(showId);
  next.classList.add("active");
  // Re-trigger card animation
  const card = next.querySelector(".card");
  if (card) {
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
  }
}

function showNameStep() {
  switchScreen("intro", "nameScreen");
}

function validateName() {
  const input = document.getElementById("nameInput");
  if (!input.value.trim()) {
    shakeInput(input);
    return;
  }
  userName = input.value.trim();
  switchScreen("nameScreen", "passwordScreen");
}

function validatePassword() {
  const pass = document.getElementById("passwordInput").value.trim();
  if (pass !== correctPassword) {
    shakeInput(document.getElementById("passwordInput"));
    return;
  }
  music.play().catch(() => {});
  switchScreen("passwordScreen", "quizScreen");
  renderQuestion();
}

/* ══════════════════════════════════════
   TEXT NORMALIZER
   Retire accents, ponctuation, espaces doubles, casse
   ══════════════════════════════════════ */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")                        // décompose les accents
    .replace(/[\u0300-\u036f]/g, "")         // supprime les diacritiques
    .replace(/[^a-z0-9\s]/g, "")            // supprime la ponctuation
    .replace(/\s+/g, " ")                   // espaces multiples → un seul
    .trim();
}

/* ══════════════════════════════════════
   QUIZ
   ══════════════════════════════════════ */
function updateProgress() {
  const pct = (currentQuestion / questions.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";
}

function renderQuestion() {
  updateProgress();
  answered = false;

  const container   = document.getElementById("questionContainer");
  const feedbackBox = document.getElementById("feedbackBox");
  const quizBtn     = document.getElementById("quizBtn");

  feedbackBox.className = "feedback-box hidden";
  feedbackBox.textContent = "";
  quizBtn.textContent = "Valider 💖";

  const q = questions[currentQuestion];
  let html = `<div class="question"><h3>${q.question}</h3>`;

  if (q.options) {
    q.options.forEach((option, index) => {
      html += `
        <label class="option" onclick="selectOption(this)">
          <input type="radio" name="answer" value="${index}">
          ${option}
        </label>`;
    });
  } else {
    html += `<input type="text" id="textAnswer" class="input" placeholder="Ta réponse...">`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function selectOption(label) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  label.classList.add("selected");
  label.querySelector("input").checked = true;
}

function nextQuestion() {
  const q           = questions[currentQuestion];
  const feedbackBox = document.getElementById("feedbackBox");
  const quizBtn     = document.getElementById("quizBtn");

  /* ── FIRST CLICK: validate ── */
  if (!answered) {
    let good = false;

    if (q.options) {
      const selected = document.querySelector('input[name="answer"]:checked');
      if (!selected) { pulseBtn(quizBtn); return; }
      good = parseInt(selected.value) === q.answer;
    } else {
      const textEl = document.getElementById("textAnswer");
      const raw    = textEl ? textEl.value.trim() : "";
      if (!raw) { pulseBtn(quizBtn); return; }

      if (q.alwaysSuccess) {
        good = true;                                   // Q9 : toujours succès
      } else if (q.customCheck) {
        good = q.customCheck(raw);                     // Q8 : logique floue
      } else if (q.expected) {
        good = normalize(raw) === normalize(q.expected);
      } else {
        good = true;
      }
    }

    feedbackBox.textContent  = good ? q.success : q.fail;
feedbackBox.className    = "feedback-box " + (good ? "correct" : "wrong");
answered                 = good;
quizBtn.textContent      = good ? "Question suivante ➜" : "Mauvaise réponse, fais un autre choix";
    return;
  }

  /* ── SECOND CLICK: advance ── */
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    updateProgress();
    switchScreen("quizScreen", "typingScreen");
    startPreVideoTyping();
  } else {
    renderQuestion();
  }
}

/* ══════════════════════════════════════
   PRE-VIDEO TYPING SCREEN
   ══════════════════════════════════════ */
function startPreVideoTyping() {
  const nextBtn = document.getElementById("typingNextBtn");
  nextBtn.classList.add("hidden");
  typeText(preVideoMessage, preVideoBox, 40, () => {
    nextBtn.classList.remove("hidden");
  });
}

function showVideoScreen() {
  switchScreen("typingScreen", "videoScreen");
}

/* ══════════════════════════════════════
   FINAL
   ══════════════════════════════════════ */
function showFinal() {
  switchScreen("videoScreen", "finalScreen");
  burstConfetti();
}

/* ══════════════════════════════════════
   UI HELPERS
   ══════════════════════════════════════ */
function shakeInput(el) {
  el.style.animation = "none";
  void el.offsetWidth;
  el.style.animation = "shake 0.4s ease";
  el.addEventListener("animationend", () => { el.style.animation = ""; }, { once: true });
}

function pulseBtn(btn) {
  btn.style.animation = "none";
  void btn.offsetWidth;
  btn.style.animation = "pulseBtnShake 0.4s ease";
  btn.addEventListener("animationend", () => { btn.style.animation = ""; }, { once: true });
}

/* ══════════════════════════════════════
   STARS
   ══════════════════════════════════════ */
function createStars() {
  const container = document.getElementById("stars");
  for (let i = 0; i < 80; i++) {
    const star       = document.createElement("div");
    star.className   = "star";
    const size       = Math.random() * 3 + 1;
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --dur: ${(Math.random() * 4 + 2).toFixed(1)}s;
      --op:  ${(Math.random() * 0.5 + 0.3).toFixed(2)};
      animation-delay: ${(Math.random() * 5).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
}

/* ══════════════════════════════════════
   CONFETTI
   ══════════════════════════════════════ */
const canvas = document.getElementById("confettiCanvas");
const ctx    = canvas.getContext("2d");
let confettiPieces = [];
let animFrameId;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const COLORS = ["#f7c948","#ff6eb4","#b04fff","#62e0ff","#ff4f81","#fff5a0"];

function spawnPiece(x, y) {
  return {
    x, y,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * -8 - 3,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 10 + 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: Math.random() > 0.5 ? "rect" : "circle",
    life: 1,
    decay: Math.random() * 0.01 + 0.005
  };
}

function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    confettiPieces.push(spawnPiece(Math.random() * window.innerWidth, -20));
  }
  if (!animFrameId) animateConfetti();
}

function burstConfetti() {
  const cx = window.innerWidth / 2;
  for (let i = 0; i < 200; i++) {
    const p = spawnPiece(cx, window.innerHeight * 0.4);
    p.vx = (Math.random() - 0.5) * 18;
    p.vy = Math.random() * -14 - 4;
    confettiPieces.push(p);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces = confettiPieces.filter(p => p.life > 0);

  for (const p of confettiPieces) {
    p.x   += p.vx;
    p.y   += p.vy;
    p.vy  += 0.25;          // gravity
    p.rot += p.rotV;
    p.life -= p.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;

    if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  animFrameId = requestAnimationFrame(animateConfetti);
}

/* ══════════════════════════════════════
   EXTRA KEYFRAME ANIMATIONS (injected)
   ══════════════════════════════════════ */
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-5px); }
    80%      { transform: translateX(5px); }
  }
  @keyframes pulseBtnShake {
    0%,100% { transform: scale(1); }
    30%     { transform: scale(1.07); }
    60%     { transform: scale(0.95); }
  }
`;
document.head.appendChild(style);
