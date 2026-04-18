// ================= STATE =================
let audioStarted = false;

// ================= AUDIO ENGINE =================
function initAudio() {
  if (audioStarted) return;

  const audio = document.getElementById("bgm");
  if (!audio) return;

  audio.volume = 0.6;

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        audioStarted = true;
        console.log("Audio unlocked");
      })
      .catch(err => {
        console.log("Audio blocked:", err);
      });
  }
}

// Unlock audio on FIRST interaction (production-safe)
document.addEventListener("click", initAudio, { once: true });

// ================= NAVIGATION SYSTEM =================
function nextScreen(id) {
  const screens = document.querySelectorAll(".screen, .intro");

  screens.forEach(s => s.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // trigger effects
  if (id === "screen5") {
    typeMessage();
    launchConfetti();
  }
}

// ================= TYPEWRITER =================
function typeMessage() {
  const text =
    "Happy Birthday 🎉\nYou are not just special... you are unforgettable ✨";

  let i = 0;
  const el = document.getElementById("msg");
  if (!el) return;

  el.innerHTML = "";

  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 45);
    }
  }

  type();
}

// ================= CONFETTI =================
function launchConfetti() {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 }
    });
  }
}