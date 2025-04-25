const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownTimerEl = document.getElementById("countdown-timer");
const celebrationEl = document.getElementById("celebration");
const celebrateBtn = document.getElementById("celebrate-btn");
const birthdayAudio = document.getElementById("birthday-audio");
const balloonsContainer = document.querySelector(".balloons"); // Changed selector

const targetMonth = 3; // 0-indexed: January is 0, May is 4
const targetDay = 25;

function getNextBirthday() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let birthdayThisYear = new Date(
    currentYear,
    targetMonth,
    targetDay,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  return birthdayThisYear;
}

const birthdayDate = getNextBirthday();

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;

  // Check if it's birthday time!
  if (diff <= 0) {
    clearInterval(countdownInterval);
    showCelebration();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = d;
  hoursEl.textContent = h.toString().padStart(2, "0");
  minutesEl.textContent = m.toString().padStart(2, "0");
}

function showCelebration() {
  countdownTimerEl.classList.add("hidden");
  celebrationEl.classList.remove("hidden");
  document.body.classList.add("celebration-active"); // Add class to body to show background
  // Balloons will now only be created on button click
}

function createBalloons(count) {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  balloonsContainer.innerHTML = ""; // Clear previous balloons if any

  for (let i = 0; i < count; i++) {
    const balloon = document.createElement("div");
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 95; // % position from left (0-95)
    const randomDelay = Math.random() * 2; // Delay up to 2s
    const randomDuration = 5 + Math.random() * 5; // Duration 5-10s

    balloon.className = `balloon ${randomColor}`;
    balloon.style.left = `${randomLeft}%`;
    balloon.style.animationDelay = `${randomDelay}s`;
    balloon.style.animationDuration = `${randomDuration}s`;
    // Optional: Remove balloon after animation ends to prevent DOM clutter
    balloon.addEventListener("animationend", () => {
      if (balloon.parentNode === balloonsContainer) {
        // Check if still attached
        balloonsContainer.removeChild(balloon);
      }
    });

    balloonsContainer.appendChild(balloon);
  }
}

celebrateBtn.addEventListener("click", () => {
  // Attempt to play audio
  birthdayAudio.play().catch((error) => {
    console.warn(
      "Audio playback failed. User interaction might be required first.",
      error
    );
    // Browsers often block autoplay until user interacts with the page.
    // Clicking the button counts as interaction, but sometimes issues persist.
  });

  // Add more balloons on click
  createBalloons(25); // Add a burst of balloons
});

// Initial call & Interval
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to display immediately without 1s delay
