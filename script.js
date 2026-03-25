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

// Show/hide logic
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

// =================== Contact Form AJAX Handler ===================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Extra simple anti-spam (honeypot, add a hidden input with CSS if needed)
            // let botField = document.getElementById("bot-field")?.value;
            // if (botField) return false;

            // Disable submit button and show loading
            const submitBtn = this.querySelector('input[type="submit"]');
            submitBtn.value = "Sending...";
            submitBtn.disabled = true;

            // Prepare data
            const formData = new FormData(this);

            fetch("send_message.php", {
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("responseMessage").innerText = data;
                contactForm.reset();
            })
            .catch(error => {
                document.getElementById("responseMessage").innerText = "There was an error sending your message.";
            })
            .finally(() => {
                submitBtn.value = "Send";
                submitBtn.disabled = false;
            });
        });
    }
});

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


// Handle the contact form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevents the default form submission

    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const message = document.getElementById("message").value;

    // Check if all fields are filled
    if (!name || !company || !gender || !email || !mobile || !message) {
        alert("All fields are required!");
        return;
    }

    // Prepare the data to send to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("company", company);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("message", message);

    // Send the form data using Fetch API (AJAX)
    fetch("send_message.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())  // Parse the response as text
    .then(data => {
        // Display the response message after submission
        document.getElementById("responseMessage").innerText = data;
        document.getElementById("contactForm").reset();  // Reset form after successful submission
    })
    .catch(error => {
        // Display an error message if something goes wrong
        document.getElementById("responseMessage").innerText = "There was an error sending your message.";
        console.error(error);
    });
});
