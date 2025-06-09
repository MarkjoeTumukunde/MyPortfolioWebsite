// ====================== Portfolio Main Script ======================

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Smooth section scroll for anchor links
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
                // Optionally close menu on mobile
                if (window.innerWidth < 900) {
                    document.querySelector('.menu-links').classList.remove('open');
                    document.querySelector('.hamburger-icon').classList.remove('open');
                }
            }
        });
    });

    // Contact Form Submission (Formspree)
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById("responseMessage").innerText = "Thank you! Your message has been sent.";
                    contactForm.reset();
                } else {
                    document.getElementById("responseMessage").innerText = "Oops! Something went wrong. Please try again.";
                }
            })
            .catch(() => {
                document.getElementById("responseMessage").innerText = "Oops! Something went wrong. Please try again.";
            });
        });
    }
});

// Highlight nav links on scroll
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 80;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
});

// =================== Go to Top Button ===================
const goTopBtn = document.createElement("button");
goTopBtn.id = "goTopBtn";
goTopBtn.title = "Go to Top";
goTopBtn.innerHTML = "&#8679;";
document.body.appendChild(goTopBtn);

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        goTopBtn.style.display = "block";
    } else {
        goTopBtn.style.display = "none";
    }
};
goTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// ============ Accessibility: ESC key closes hamburger menu ==========
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.querySelector('.menu-links').classList.remove('open');
        document.querySelector('.hamburger-icon').classList.remove('open');
    }
});

// ========== Optionally: Click outside hamburger menu to close =========
document.addEventListener("click", function(e) {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    if (menu && menu.classList.contains('open')) {
        if (!menu.contains(e.target) && !icon.contains(e.target)) {
            menu.classList.remove('open');
            icon.classList.remove('open');
        }
    }
});
