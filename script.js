// Load projects from JSON
async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch("data/project.json");

        if (!response.ok) {
            throw new Error("Unable to load projects.");
        }

        const projects = await response.json();

        container.innerHTML = "";

        projects.forEach(function (project) {
            const card = document.createElement("article");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.title;
            card.appendChild(title);

            const description = document.createElement("p");
            description.textContent = project.description;
            card.appendChild(description);

            const technologies = document.createElement("p");
            technologies.textContent =
                "Technologies: " + project.technologies.join(", ");
            card.appendChild(technologies);

            const role = document.createElement("p");
            role.textContent = "My Role: " + project.role;
            card.appendChild(role);

            if (project.screenshot) {
                const image = document.createElement("img");
                image.src = "images/" + project.screenshot;
                image.alt = project.title + " screenshot";
                card.appendChild(image);
            }

            if (project.github) {
                const link = document.createElement("a");
                link.href = project.github;
                link.textContent = "View on GitHub";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                card.appendChild(link);
            }
                         
            container.appendChild(card);
        });

    } catch (error) {
        container.textContent =
            "Projects could not be loaded. Please try again later.";
        console.error(error);
    }
}


// Load the five most recently updated public GitHub repositories

async function loadGitHubRepositories() {

    const container = document.getElementById("github-repositories");
if (!container) return;

    try {
     const response = await fetch(

            "https://api.github.com/users/zaratecelver55/repos?sort=updated&direction=desc&per_page=5"

        );


        if (!response.ok) {

            throw new Error("Unable to load GitHub repositories.");

        }


        const repositories = await response.json();


        container.innerHTML = "";


        if (repositories.length === 0) {

            container.textContent = "No public repositories found.";
            return;
        }

        const list = document.createElement("ul");

        repositories.forEach(function (repository) {
            const item = document.createElement("li");
            const link = document.createElement("a");

            link.href = repository.html_url;
            link.textContent = repository.name;
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            item.appendChild(link);
            list.appendChild(item);
        });

        container.appendChild(list);
    
    } catch (error) {
      container.innerHTML ="";

            const link = document.createElement("a");
            link.href = "https://github.com/zaratecelver55";
            link.textContent = "Visit My GitHub Profile";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            container.appendChild(link);

            console.error(error);     
    }

}

// Contact Form & Scroll Management
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const backToTop = document.getElementById("back-to-top");
let isSubmittingForm = false; // Flag to prevent the scroll listener from forcing jumps

// 1. Safe window scroll event monitor
window.addEventListener("scroll", function () {
    if (isSubmittingForm) return; // Mute top jumps if submitting a message

    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }
});

// 2. Corrected Submit Event Listener Layout
if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        isSubmittingForm = true; // Lock scroll calculations safely

        // Format and show your success text popups
        formMessage.textContent = "Thank you! Your message was sent successfully.";
        formMessage.style.display = "block";
        formMessage.style.color = "green";
        formMessage.style.fontWeight = "bold";

        // Wipe the form fields
        contactForm.reset();

        // Let the browser settle layouts before focusing down onto the text message
        setTimeout(function () {
            formMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            
            // Release the scrolling trigger locks after navigation finishes
            isSubmittingForm = false;
        }, 100);
    });
}

// 3. Back to Top Click Action Handler
if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Run functions safely
loadProjects();
loadGitHubRepositories();


// Back to Top button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

loadProjects();
loadGitHubRepositories();
