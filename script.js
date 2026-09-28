
const demo = document.getElementById("demo");
const cord = document.getElementById("cord");
const form = document.getElementById("loginForm");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");

let isLit = false;
let startY = 0;
let dragging = false;

function toggleLamp() {
  isLit = !isLit;
  demo.classList.toggle("lit", isLit);
}

// کشیدن بند چراغ با لمس یا ماوس
cord.addEventListener("pointerdown", (e) => {
  dragging = true;
  startY = e.clientY;
  cord.setPointerCapture(e.pointerId);
});

cord.addEventListener("pointermove", (e) => {
  if (!dragging) return;

  const distance = e.clientY - startY;
  const pull = Math.max(0, Math.min(55, distance));

  cord.style.transform = `translateY(${pull}px)`;

  if (pull > 30) {
    cord.dataset.pulled = "true";
  }
});

cord.addEventListener("pointerup", () => {
  if (!dragging) return;

  dragging = false;
  cord.style.transform = "translateY(0)";

  if (cord.dataset.pulled === "true") {
    toggleLamp();
  }

  cord.dataset.pulled = "false";
});

cord.addEventListener("click", () => {
  toggleLamp();
});

// نمایش یا مخفی کردن رمز
togglePassword.addEventListener("click", () => {
  const hidden = password.type === "password";

  password.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "◎" : "◉";
  togglePassword.setAttribute(
    "aria-label",
    hidden ? "Hide password" : "Show password"
  );
});

// فرم ورود آزمایشی
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username =
    document.getElementById("username").value.trim();

  if (!username || !password.value) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  message.textContent = "Welcome, " + username + "!";
});
