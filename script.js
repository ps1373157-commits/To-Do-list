// =============================
// StudyVerse - interactive UI scripts (v2)
// =============================

const body = document.body;
const loader = document.getElementById("loader");

if (loader) {
  body.classList.add("loading");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
      body.classList.remove("loading");
    }, 850);
  });
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");

if (menuToggle && navLinks) {
  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu when nav link is clicked
  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const calculatorModal = document.getElementById("calculatorModal");
const openCalculatorBtn = document.getElementById("openCalculator");
const closeCalculatorBtn = document.getElementById("closeCalculator");
const calculateBtn = document.getElementById("calculateBtn");
const percentageResult = document.getElementById("percentageResult");

const obtainedMarksInput = document.getElementById("obtainedMarks");
const totalMarksInput = document.getElementById("totalMarks");
const countdownElement = document.getElementById("countdown");

if (calculatorModal && openCalculatorBtn && closeCalculatorBtn && calculateBtn) {
  // Percentage calculator modal control
  function openCalculatorModal() {
    calculatorModal.classList.add("open");
    calculatorModal.setAttribute("aria-hidden", "false");
  }

  function closeCalculatorModal() {
    calculatorModal.classList.remove("open");
    calculatorModal.setAttribute("aria-hidden", "true");
  }

  openCalculatorBtn.addEventListener("click", openCalculatorModal);
  closeCalculatorBtn.addEventListener("click", closeCalculatorModal);

  calculatorModal.addEventListener("click", (event) => {
    if (event.target === calculatorModal) {
      closeCalculatorModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && calculatorModal.classList.contains("open")) {
      closeCalculatorModal();
    }
  });

  // Percentage calculator logic
  calculateBtn.addEventListener("click", () => {
    const obtained = Number(obtainedMarksInput.value);
    const total = Number(totalMarksInput.value);

    if (!Number.isFinite(obtained) || !Number.isFinite(total) || total <= 0 || obtained < 0 || obtained > total) {
      percentageResult.textContent = "Please enter valid marks (obtained should be between 0 and total).";
      percentageResult.style.color = "#ff92af";
      return;
    }

    const percentage = (obtained / total) * 100;
    percentageResult.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    percentageResult.style.color = "#9ce5ff";
  });
}

// Countdown timer demo (set to next exam date)
if (countdownElement) {
  const examDate = new Date("2026-09-15T09:00:00");

  function updateCountdown() {
    const now = new Date();
    const timeLeft = examDate - now;

    if (timeLeft <= 0) {
      countdownElement.textContent = "Exam day is here. All the best!";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m left`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}
