
/* =================================
   INTERACTIVE CURSOR BACKGROUND
================================= */

const glow = document.querySelector(".cursor-glow");
const grid = document.querySelector(".grid-background");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let gridX = 0;
let gridY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    document.documentElement.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
    );

    // Subtle grid movement
    gridX = (mouseX / window.innerWidth - 0.5) * 12;
    gridY = (mouseY / window.innerHeight - 0.5) * 12;

    grid.style.backgroundPosition =
        `${gridX}px ${gridY}px`;

});

// Disable mouse-follow effect on touch devices
if (window.matchMedia("(hover: none)").matches) {
    glow.style.display = "none";
}


/* =================================
   TERMINAL TYPING ANIMATION
================================= */

const terminalText = document.getElementById("terminalTyping");

const commands = [
    "root@portfolio:~# whoami",
    "Computer Science Student",
    "root@portfolio:~# status",
    "Learning. Building. Securing."
];

let commandIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeTerminal() {

    const currentCommand = commands[commandIndex];

    if (!deleting) {

        terminalText.textContent =
            currentCommand.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentCommand.length) {
            deleting = true;
            setTimeout(typeTerminal, 1800);
            return;
        }

    } else {

        terminalText.textContent =
            currentCommand.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
        }

    }

    setTimeout(typeTerminal, deleting ? 35 : 75);
}

typeTerminal();


/* =================================
   HERO SUBTITLE TYPING
================================= */

const typingText = document.getElementById("typingText");

const titles = [
    "Security Enthusiast",
    "Systems Builder",
    "Tech Explorer",
    "Problem Solver"
];

let titleIndex = 0;
let letterIndex = 0;
let removing = false;

function typeHero() {

    const title = titles[titleIndex];

    if (!removing) {
        typingText.textContent = title.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === title.length) {
            removing = true;
            setTimeout(typeHero, 1400);
            return;
        }

    } else {
        typingText.textContent = title.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            removing = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
    }

    setTimeout(typeHero, removing ? 45 : 90);
}
typeHero();
