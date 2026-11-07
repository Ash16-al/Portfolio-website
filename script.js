//Navigation 
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

// Mobile Menu
const mobileMenu = document.getElementById("mobile-menu");

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.removeAttribute("open");
    });
});

// Contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus){

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";


        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                contactForm.reset();

                formStatus.textContent = "Your message has been sent successfully!";
                formStatus.className = "text-sm mt-4 text-center text-green-400";

            } else {
                formStatus.textContent = "Oops! Something went wrong. Please try again.";
                formStatus.className = "text-sm mt-4 text-center text-red-400";
            }

        } catch (error) {
            formStatus.textContent = "Unable to send your message. Please check your connection.";
            formStatus.className = "text-sm mt-4 text-center text-red-400";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message ✉";
        }
    });

}