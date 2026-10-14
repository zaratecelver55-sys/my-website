// Load projects from JSON
async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch("data/projects.json");

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


    try {

        const response = await fetch(

            "https://api.github.com/users/zaratecelver55-sys/repos?sort=updated&direction=desc&per_page=5"

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


            const language = document.createElement("span");

            language.textContent =

                " — " + (repository.language || "Language not specified");


            item.appendChild(language);

            list.appendChild(item);

        });


        container.appendChild(list);


    } catch (error) {

        container.textContent =

            "GitHub repositories are currently unavailable.";

        console.error(error);

    }

}

// Contact form
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your message was sent successfully.";

    contactForm.reset();
});


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
