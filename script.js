
/* ==========================================
   01. MOBILE NAVIGATION
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   02. INTERACTIVE CURSOR GLOW
========================================== */

const glow = document.querySelector(".cursor-glow");
const grid = document.querySelector(".grid-background");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;


if (hasFinePointer && !prefersReducedMotion) {

    document.addEventListener("mousemove", (event) => {

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Move green glow with cursor

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${mouseX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${mouseY}px`
        );

        // Subtle interactive grid movement

        const gridX =
            (mouseX / window.innerWidth - 0.5) * 12;

        const gridY =
            (mouseY / window.innerHeight - 0.5) * 12;

        grid.style.backgroundPosition =
            `${gridX}px ${gridY}px`;

    });

} else {

    glow.style.display = "none";

}


/* ==========================================
   03. TERMINAL TYPING ANIMATION
========================================== */

const terminalText = document.getElementById("terminalTyping");

const commands = [
    "root@portfolio:~# whoami",
    "Computer Science Student",
    "root@portfolio:~# status",
    "Learning. Building. Securing.",
    "root@portfolio:~# echo $FUTURE",
    "Cybersecurity Professional"
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

            commandIndex =
                (commandIndex + 1) % commands.length;

        }

    }

    setTimeout(
        typeTerminal,
        deleting ? 30 : 65
    );

}

if (!prefersReducedMotion) {
    typeTerminal();
} else {
    terminalText.textContent = "root@portfolio:~# system.ready";
}


/* ==========================================
   04. HERO TEXT TYPING ANIMATION
========================================== */

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

    const currentTitle = titles[titleIndex];

    if (!removing) {

        typingText.textContent =
            currentTitle.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentTitle.length) {

            removing = true;

            setTimeout(typeHero, 1400);

            return;
        }

    } else {

        typingText.textContent =
            currentTitle.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            removing = false;

            titleIndex =
                (titleIndex + 1) % titles.length;

        }

    }

    setTimeout(
        typeHero,
        removing ? 40 : 85
    );

}

if (!prefersReducedMotion) {
    typeHero();
} else {
    typingText.textContent = titles[0];
}


/* ==========================================
   05. SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* ==========================================
   06. BACK TO TOP BUTTON
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: prefersReducedMotion ? "auto" : "smooth"

    });

});


/* ==========================================
   07. ACTIVE NAVIGATION LINK
========================================== */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   08. AUTOMATIC COPYRIGHT YEAR
========================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==========================================
   09. CONSOLE MESSAGE
========================================== */

console.log(
    "%croot@portfolio:~$ Welcome!",
    "color: #00d995; font-size: 18px; font-weight: bold;"
);

console.log(
    "%cSystem initialized successfully.",
    "color: #87958e; font-size: 12px;"
);
