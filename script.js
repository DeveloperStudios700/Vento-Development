const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const cursorGlow = document.querySelector(".cursor-glow");

// =====================================================
// BACKEND
// =====================================================

// LOCAL TEST SERVER
const API_URL = "http://localhost:3000";


// =====================================================
// NAVBAR
// =====================================================

window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }
});


// Mobile menu
if (menuToggle) {
    menuToggle.addEventListener("click", () => {

        const open =
            navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            open
        );
    });
}


// Close mobile menu
document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


// =====================================================
// CURSOR GLOW
// =====================================================

if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


// =====================================================
// CAREERS
// =====================================================

const jobOpenings = [

    {
        title: "Scripting Developer",
        department: "Development",
        type: "Contract",

        description:
            "Create functional scripted assets, systems and interactive features for Vento Development projects.",

        requirements: [
            "Experience with scripting",
            "Strong problem-solving skills",
            "Ability to work independently",
            "Good communication"
        ]
    },

    {
        title: "Builder / 3D Developer",
        department: "Development",
        type: "Contract",

        description:
            "Create modern buildings, environments, maps and custom assets for Vento Development projects.",

        requirements: [
            "Strong building skills",
            "Modern design knowledge",
            "Attention to detail",
            "Portfolio preferred"
        ]
    }

];


// =====================================================
// CREATE CAREERS SECTION
// =====================================================

function createCareersSection() {

    if (document.getElementById("careers")) {
        return;
    }

    const careersSection =
        document.createElement("section");

    careersSection.className =
        "section careers";

    careersSection.id =
        "careers";


    careersSection.innerHTML = `

        <div class="section-heading reveal">

            <p class="eyebrow">
                <span></span>
                JOIN VENTO DEVELOPMENT
            </p>

            <h2>
                Build something
                <em>great.</em>
            </h2>

            <p>
                We're always looking for talented
                and motivated people who want to
                create modern, functional and
                impressive development work.
            </p>

        </div>


        <div class="careers-status">

            <div class="status-dot"></div>

            <div>

                <strong>
                    ${
                        jobOpenings.length > 0
                            ? "Applications are currently open"
                            : "No applications currently open"
                    }
                </strong>

                <span>
                    ${
                        jobOpenings.length > 0
                            ? `${jobOpenings.length} position${
                                jobOpenings.length === 1
                                    ? ""
                                    : "s"
                            } available`
                            : "Check back later"
                    }
                </span>

            </div>

        </div>


        <div class="job-list">

            ${
                jobOpenings.length > 0

                ?

                jobOpenings.map((job, index) => `

                    <article class="job-card reveal">

                        <div class="job-number">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="job-main">

                            <div class="job-header">

                                <div>

                                    <span class="job-open">
                                        APPLICATIONS OPEN
                                    </span>

                                    <h3>
                                        ${job.title}
                                    </h3>

                                </div>

                                <div class="job-tags">

                                    <span>
                                        ${job.department}
                                    </span>

                                    <span>
                                        ${job.type}
                                    </span>

                                </div>

                            </div>


                            <p class="job-description">
                                ${job.description}
                            </p>


                            <div class="job-requirements">

                                <strong>
                                    Requirements
                                </strong>

                                <ul>

                                    ${job.requirements.map(
                                        requirement => `
                                            <li>
                                                <span>✓</span>
                                                ${requirement}
                                            </li>
                                        `
                                    ).join("")}

                                </ul>

                            </div>


                            <button
                                class="btn btn-primary job-apply"
                                data-role="${job.title}"
                            >
                                Apply Now
                                <span>→</span>
                            </button>

                        </div>

                    </article>

                `).join("")

                :

                `

                    <div class="no-jobs reveal">

                        <h3>
                            No Open Positions
                        </h3>

                        <p>
                            There are currently no open
                            applications. Please check
                            back later.
                        </p>

                    </div>

                `
            }

        </div>


        <!-- APPLICATION MODAL -->

        <div
            class="application-modal"
            id="applicationModal"
        >

            <div class="application-overlay"></div>

            <div class="application-box">

                <button
                    class="application-close"
                    id="applicationClose"
                >
                    ×
                </button>


                <p class="eyebrow">
                    <span></span>
                    VENTO DEVELOPMENT
                </p>


                <h2>
                    Apply for
                    <em id="applicationRole">
                        Position
                    </em>
                </h2>


                <p class="application-intro">
                    Complete the application below.
                    Your application will be reviewed
                    by the Vento Development team.
                </p>


                <form id="applicationForm">

                    <input
                        type="hidden"
                        id="roleInput"
                        name="role"
                    >


                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                Roblox Username *
                            </label>

                            <input
                                type="text"
                                name="username"
                                required
                                placeholder="Your Roblox username"
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Discord Username *
                            </label>

                            <input
                                type="text"
                                name="discord"
                                required
                                placeholder="Your Discord username"
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Age
                            </label>

                            <input
                                type="number"
                                name="age"
                                min="13"
                                max="100"
                                placeholder="18"
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Portfolio
                            </label>

                            <input
                                type="url"
                                name="portfolio"
                                placeholder="https://..."
                            >

                        </div>


                        <div class="form-group full">

                            <label>
                                Development Experience *
                            </label>

                            <textarea
                                name="experience"
                                required
                                placeholder="Tell us about your experience..."
                            ></textarea>

                        </div>


                        <div class="form-group full">

                            <label>
                                Additional Information
                            </label>

                            <textarea
                                name="additional"
                                placeholder="Anything else you'd like us to know?"
                            ></textarea>

                        </div>

                    </div>


                    <button
                        type="submit"
                        class="btn btn-primary application-submit"
                    >
                        Submit Application
                        <span>→</span>
                    </button>


                    <div
                        class="application-message"
                        id="applicationMessage"
                    ></div>

                </form>

            </div>

        </div>

    `;


    const contactSection =
        document.getElementById("contact");


    if (contactSection) {

        contactSection.parentNode.insertBefore(
            careersSection,
            contactSection
        );

    } else {

        document
            .querySelector("main")
            .appendChild(careersSection);

    }

}


// =====================================================
// CREATE CAREERS
// =====================================================

createCareersSection();


// =====================================================
// APPLICATION MODAL
// =====================================================

const applicationModal =
    document.getElementById("applicationModal");

const applicationForm =
    document.getElementById("applicationForm");

const applicationRole =
    document.getElementById("applicationRole");

const roleInput =
    document.getElementById("roleInput");

const applicationClose =
    document.getElementById("applicationClose");


document
    .querySelectorAll(".job-apply")
    .forEach(button => {

        button.addEventListener("click", () => {

            const role =
                button.dataset.role;

            applicationRole.textContent =
                role;

            roleInput.value =
                role;

            applicationModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        });

    });


// =====================================================
// CLOSE MODAL
// =====================================================

function closeApplication() {

    applicationModal.classList.remove(
        "active"
    );

    document.body.style.overflow = "";

}


if (applicationClose) {

    applicationClose.addEventListener(
        "click",
        closeApplication
    );

}


const applicationOverlay =
    document.querySelector(
        ".application-overlay"
    );


if (applicationOverlay) {

    applicationOverlay.addEventListener(
        "click",
        closeApplication
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            applicationModal.classList.contains(
                "active"
            )
        ) {

            closeApplication();

        }

    }
);


// =====================================================
// SUBMIT APPLICATION
// =====================================================

if (applicationForm) {

    applicationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                applicationForm.querySelector(
                    ".application-submit"
                );

            const message =
                document.getElementById(
                    "applicationMessage"
                );


            const formData =
                new FormData(
                    applicationForm
                );


            const application = {

                username:
                    formData.get("username"),

                discord:
                    formData.get("discord"),

                age:
                    formData.get("age"),

                role:
                    formData.get("role"),

                experience:
                    formData.get("experience"),

                portfolio:
                    formData.get("portfolio"),

                additional:
                    formData.get("additional")

            };


            submitButton.disabled = true;

            submitButton.innerHTML =
                "Submitting...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/apply`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    application
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Application failed."
                    );

                }


                message.textContent =
                    "Application submitted successfully! The Vento Development team has received your application.";

                message.className =
                    "application-message success";


                applicationForm.reset();


                submitButton.innerHTML =
                    "Application Submitted ✓";


                setTimeout(() => {

                    closeApplication();

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        "Submit Application <span>→</span>";

                }, 3000);


            } catch (error) {

                console.error(
                    "Application error:",
                    error
                );


                message.textContent =
                    "We couldn't submit your application. Please try again.";

                message.className =
                    "application-message error";


                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    "Submit Application <span>→</span>";

            }

        }
    );

}


// =====================================================
// SCROLL REVEAL
// =====================================================

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                (entry, index) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.transitionDelay =
                            `${Math.min(
                                index * 60,
                                240
                            )}ms`;

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        element =>
            observer.observe(element)
    );


// =====================================================
// YEAR
// =====================================================

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
