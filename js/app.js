document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= DARK MODE ================= */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("cloudconnect-theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
        }

        updateThemeIcon();


        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "cloudconnect-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    if (sections.length && links.length) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            links.forEach(link => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (href === `#
$ { currentSection }
`) {
                    link.classList.add("active");
                }

            });

        });

    }


    /* ================= COUNTER ANIMATION ================= */

    const counters =
        document.querySelectorAll("[data-count]");

    let countersStarted = false;

    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.dataset.count);

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 80));

            const timer =
                setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    counter.textContent =
                        current + "+";

                }, 20);

        });

    }


    if (counters.length) {

        const statsSection =
            document.querySelector(".stats-section");

        if (statsSection) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (entry.isIntersecting) {

                                startCounters();

                                observer.disconnect();

                            }

                        });

                    }, {
                        threshold: 0.3
                    }
                );

            observer.observe(statsSection);

        }

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .event-card, .stat-card"
        );

    if (revealElements.length) {

        revealElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

        });


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";
                            entry.target.style.transform =
                                "translateY(0)";

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                }, {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* ================= CURRENT YEAR ================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    const navbar =
        document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 10px 35px rgba(15, 23, 42, 0.08)";

            } else {

                navbar.style.boxShadow = "none";

            }

        });

    }

});