const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("bg-purple-800/60", isActive);
        link.classList.toggle("text-white", isActive);
        link.classList.toggle("text-purple-200", !isActive);
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

const mobileMenu = document.getElementById("mobile-menu");

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.removeAttribute("open");
    });
});