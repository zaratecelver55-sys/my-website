// Load projects from JSON (checks for project.json or projects.json)
async function loadProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    // List of potential file naming paths to try automatically
    const pathsToTry = ["data/project.json"];
    let response = null;

    for (const path of pathsToTry) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                response = res;
                break;
            }
        } catch (e) {
            // Continue trying the next path layout option
        }
    }

    try {
        if (!response) {
            throw new Error("Unable to locate a valid JSON data file.");
        }

        const projects = await response.json();
        container.innerHTML = ""; // Safe to clear now that HTML nesting is fixed

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
            technologies.textContent = "Technologies: " + project.technologies.join(", ");
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
        console.error("Project loader error:", error);
        // Do not clear the container entirely if it fails; keep your hardcoded fallbacks safe
    }
}

// Load the five most recently updated public GitHub repositories
async function loadGitHubRepositories() {
    const container = document.getElementById("github-repositories");
    if (!container) return;

    try {
        const response = await fetch(
            "https://github.com"
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
        console.error("GitHub API error:", error);
        // Keeps your hardcoded link functional without layout shifting
    }
}

// Contact Form
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        formMessage.textContent = "Thank you! Your message was sent successfully.";
        formMessage.style.display = "block";
        formMessage.style.color = "green";
        formMessage.style.fontWeight = "bold";

        contactForm.reset();
        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

// Back to Top button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

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
