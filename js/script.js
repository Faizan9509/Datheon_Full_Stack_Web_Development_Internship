
// ==================================
// 1. DARK / LIGHT THEME
// ==================================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

// Apply saved theme
if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
} else {
    document.body.setAttribute("data-theme", "dark");
}

// Update theme button icon
function updateThemeIcon() {
    const currentTheme = document.body.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeToggle.textContent = "☀";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeToggle.textContent = "☾";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
}

updateThemeIcon();

// Toggle theme on button click
themeToggle.addEventListener("click", () => {

    const currentTheme = document.body.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeIcon();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
    ".section, .project-card, .experience-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ==================================
// 2. SMOOTH NAVIGATION
// ==================================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


// ==================================
// 3. CURRENT YEAR IN FOOTER
// ==================================

const footer = document.querySelector("footer p");

footer.innerHTML = `© ${new Date().getFullYear()} Faizan . All rights reserved.`;


// ==================================
// 4. CONSOLE MESSAGE
// ==================================

console.log("Welcome to Faizan Patel's Portfolio!");
console.log("Portfolio JavaScript loaded successfully.");


// ==================================
// 5. TYPING ANIMATION
// ==================================

const typingText = document.getElementById("typing-text");

const titles = [
    "Aspiring Developer",
    "Frontend Developer",
    "BSc IT Student",
    "Cloud Computing Enthusiast"
];

let titleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentTitle = titles[titleIndex];

    if (!deleting) {
        typingText.textContent =
            currentTitle.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentTitle.length) {
            deleting = true;
            setTimeout(typeEffect, 1300);
            return;
        }

    } else {
        typingText.textContent =
            currentTitle.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();
