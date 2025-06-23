document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animation
    const faders = document.querySelectorAll(".fade-in");

    const options = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    },
        options);

    faders.forEach((fader) => {
        appearOnScroll.observe(fader);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const moonIconClass = "fa-moon";
    const sunIconClass = "fa-sun";

    darkModeToggle.addEventListener("click", (event) => {
        // Create ripple element
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const rect = darkModeToggle.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = event.clientX - rect.left - size / 2 + "px";
        ripple.style.top = event.clientY - rect.top - size / 2 + "px";

        // Remove old ripple if any
        const oldRipple = darkModeToggle.querySelector(".ripple");
        if (oldRipple) {
            oldRipple.remove();
        }
        darkModeToggle.appendChild(ripple);

        // Set CSS variables for ripple origin on body
        document.body.style.setProperty("--ripple-top", event.clientY + "px");
        document.body.style.setProperty("--ripple-left", event.clientX + "px");
        document.body.style.setProperty("--ripple-color", "#4a6fa5");

        // Add ripple-active class to body to trigger overlay animation
        document.body.classList.add("ripple-active");

        // After animation ends, toggle dark mode and remove ripple-active class
        setTimeout(() => {
            document.body.classList.toggle("dark-mode");
            const icon = darkModeToggle.querySelector("i");
            if (document.body.classList.contains("dark-mode")) {
                icon.classList.remove(moonIconClass);
                icon.classList.add(sunIconClass);
            } else {
                icon.classList.remove(sunIconClass);
                icon.classList.add(moonIconClass);
            }
            document.body.classList.remove("ripple-active");
        }, 800); // match ripple-expand animation duration
    });

    // About category filter
    const aboutButtons = document.querySelectorAll(".about-button");
    const aboutCards = document.querySelectorAll(".about-container .card");

    function filterCategory(category) {
        // Remove active class from all buttons
        aboutButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to the button with matching category
        aboutButtons.forEach((btn) => {
            if (btn.getAttribute("data-category") === category) {
                btn.classList.add("active");
            }
        });

        // Show/hide cards based on category
        aboutCards.forEach((card) => {
            if (category === "all") {
                card.style.display = "block";
            } else {
                if (card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
    }

    aboutButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            filterCategory(category);
        });
    });

    // Default filter to 'all' on page load
    filterCategory("all");

    // Project category filter (mirip about)
    const projectButtons = document.querySelectorAll(".project-button");
    const projectCards = document.querySelectorAll(".projects-grid .project-card");

    function filterProjectCategory(category) {
        projectButtons.forEach((btn) => btn.classList.remove("active"));
        projectButtons.forEach((btn) => {
            if (btn.getAttribute("data-category") === category) {
                btn.classList.add("active");
            }
        });
        projectCards.forEach((card) => {
            if (category === "all") {
                card.style.display = "block";
            } else {
                if (card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }
        });
    }

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            filterProjectCategory(category);
        });
    });

    // Default project filter (optional)
    if (projectButtons.length) {
        filterProjectCategory("all");
    }
});
