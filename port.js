document.addEventListener("DOMContentLoaded", () => {

    // 1. Dynamic Footer Year
    const footer = document.querySelector("footer");

    if (footer) {
        const year = new Date().getFullYear();
        const yearText = footer.querySelector(".year");

        if (yearText) {
            yearText.textContent = year;
        }
    }

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 3. Active Navigation Link on Scroll
    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const isActive =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", isActive);
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(
        ".section-title, .about-card, .skill-card, " +
        ".certificate-card, .project-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    // 5. Download CV Button
    const downloadButton = document.querySelector("#download-cv");

    if (downloadButton) {
        downloadButton.addEventListener("click", event => {
            const cvPath = downloadButton.getAttribute("href");

            if (!cvPath || cvPath === "#") {
                event.preventDefault();
                alert("Please add your CV file path first!");
            }
        });
    }

    // 6. Contact Email Button
    const emailButtons = document.querySelectorAll(".email-btn");

    emailButtons.forEach(button => {
        button.addEventListener("click", event => {
            const email = button.dataset.email;

            if (!email) {
                event.preventDefault();
                alert("Please add your email address!");
            }
        });
    });

});