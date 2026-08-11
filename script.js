const navbar = document.getElementById("navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const cursorGlow = document.querySelector(".cursor-glow");

/* =========================================================
   VENTO DEVELOPMENT — CAREERS
   =========================================================
   Add, remove or edit jobs here.

   To CLOSE a position:
   Remove it from this list.

   To OPEN a position:
   Add a new job object.
   ========================================================= */

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
        ],
        application:
            "https://forms.google.com/"
    },

    {
        title: "Builder / 3D Developer",
        department: "Development",
        type: "Contract",
        description:
            "Design and create modern buildings, environments, maps and custom assets for our projects and clients.",
        requirements: [
            "Strong building skills",
            "Good understanding of modern design",
            "Attention to detail",
            "Portfolio or previous work preferred"
        ],
        application:
            "https://forms.google.com/"
    }
];


/* =========================================================
   NAVIGATION
   ========================================================= */

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
});


if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", open);
    });
}


document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


/* =========================================================
   CURSOR GLOW
   ========================================================= */

if (cursorGlow) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}


/* =========================================================
   CAREERS NAVIGATION BUTTON
   ========================================================= */

if (navLinks && !document.querySelector('.nav-links a[href="#careers"]')) {

    const careersLink = document.createElement("a");

    careersLink.href = "#careers";
    careersLink.textContent = "Careers";

    const contactButton = navLinks.querySelector(".nav-cta");

    if (contactButton) {
        navLinks.insertBefore(careersLink, contactButton);
    } else {
        navLinks.appendChild(careersLink);
    }

    careersLink.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
}


/* =========================================================
   CAREERS SECTION
   ========================================================= */

function createCareersSection() {

    if (document.getElementById("careers")) {
        return;
    }

    const careersSection = document.createElement("section");

    careersSection.className = "section careers";
    careersSection.id = "careers";

    careersSection.innerHTML = `
        <div class="section-heading reveal">
            <p class="eyebrow">
                <span></span> JOIN VENTO DEVELOPMENT
            </p>

            <h2>
                Build something <em>great.</em>
            </h2>

            <p>
                We're always looking for talented and motivated people
                who want to create modern, functional and impressive
                development work.
            </p>
        </div>

        <div class="careers-status">
            <div class="status-dot"></div>

            <div>
                <strong>
                    ${jobOpenings.length > 0
                        ? "Applications are currently open"
                        : "No applications currently open"}
                </strong>

                <span>
                    ${jobOpenings.length > 0
                        ? `${jobOpenings.length} position${jobOpenings.length === 1 ? "" : "s"} available`
                        : "Check back later for new opportunities"}
                </span>
            </div>
        </div>

        <div class="job-list">
            ${
                jobOpenings.length > 0
                    ? jobOpenings.map((job, index) => `
                    
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
                                        <span>${job.department}</span>
                                        <span>${job.type}</span>
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
                                        ${job.requirements.map(requirement => `
                                            <li>
                                                <span>✓</span>
                                                ${requirement}
                                            </li>
                                        `).join("")}
                                    </ul>

                                </div>

                                <a
                                    href="${job.application}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-primary job-apply"
                                >
                                    Apply Now
                                    <span>→</span>
                                </a>

                            </div>

                        </article>

                    `).join("")
                    : `
                    
                        <div class="no-jobs reveal">

                            <div class="no-jobs-icon">
                                +
                            </div>

                            <h3>
                                No Open Positions
                            </h3>

                            <p>
                                There are currently no open applications.
                                Please check back later for future
                                opportunities at Vento Development.
                            </p>

                        </div>

                    `
            }
        </div>
    `;


    /* Put Careers before the Contact section */

    const contactSection = document.getElementById("contact");

    if (contactSection) {
        contactSection.parentNode.insertBefore(
            careersSection,
            contactSection
        );
    } else {
        document.querySelector("main").appendChild(careersSection);
    }
}


/* Create Careers */

createCareersSection();


/* =========================================================
   CAREERS STYLING
   ========================================================= */

const careersStyles = document.createElement("style");

careersStyles.textContent = `

/* Careers Section */

.careers {
    background:
        radial-gradient(
            circle at 85% 30%,
            rgba(0, 124, 255, .10),
            transparent 35%
        ),
        #020b18;
}


/* Status */

.careers-status {
    display: inline-flex;
    align-items: center;
    gap: 13px;

    padding: 13px 18px;

    margin-bottom: 30px;

    border: 1px solid rgba(80, 180, 255, .18);

    border-radius: 10px;

    background: rgba(5, 35, 65, .45);
}

.status-dot {
    width: 9px;
    height: 9px;

    border-radius: 50%;

    background: #45e68a;

    box-shadow:
        0 0 10px rgba(69, 230, 138, .8);

    animation: careerPulse 2s infinite;
}

@keyframes careerPulse {

    50% {
        opacity: .45;

        transform: scale(.75);
    }

}

.careers-status strong {
    display: block;

    color: #dceeff;

    font-size: 12px;
}

.careers-status span {
    display: block;

    color: #65809b;

    font-size: 10px;

    margin-top: 3px;
}


/* Job list */

.job-list {
    display: flex;

    flex-direction: column;

    gap: 17px;
}


/* Job card */

.job-card {
    position: relative;

    display: flex;

    gap: 25px;

    padding: 32px;

    border-radius: 16px;

    border: 1px solid rgba(80, 175, 255, .15);

    background:
        linear-gradient(
            145deg,
            rgba(8, 46, 83, .55),
            rgba(2, 16, 31, .72)
        );

    overflow: hidden;

    transition: .35s ease;
}

.job-card::before {
    content: "";

    position: absolute;

    left: 0;
    top: 0;

    width: 3px;
    height: 100%;

    background: linear-gradient(
        to bottom,
        #48b5ff,
        transparent
    );

    opacity: .7;
}

.job-card:hover {
    transform: translateY(-5px);

    border-color: rgba(72, 180, 255, .4);

    box-shadow:
        0 20px 60px rgba(0, 80, 180, .14);
}


/* Job number */

.job-number {
    color: #3e8ac1;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 2px;

    padding-top: 5px;

    min-width: 30px;
}


/* Main content */

.job-main {
    flex: 1;
}


/* Header */

.job-header {
    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    gap: 20px;
}

.job-open {
    display: inline-block;

    color: #52d98b;

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 1.8px;

    margin-bottom: 9px;
}

.job-header h3 {
    font-size: 24px;

    margin: 0;
}


/* Tags */

.job-tags {
    display: flex;

    gap: 7px;

    flex-wrap: wrap;
}

.job-tags span {
    padding: 7px 10px;

    border-radius: 6px;

    border: 1px solid rgba(77, 166, 231, .16);

    background: rgba(20, 100, 165, .1);

    color: #80a9c9;

    font-size: 9px;

    text-transform: uppercase;

    letter-spacing: 1px;
}


/* Description */

.job-description {
    color: #829ab2;

    font-size: 13px;

    line-height: 1.8;

    max-width: 720px;

    margin: 17px 0 20px;
}


/* Requirements */

.job-requirements {
    margin-bottom: 23px;
}

.job-requirements strong {
    display: block;

    color: #bcd6ed;

    font-size: 11px;

    margin-bottom: 10px;
}

.job-requirements ul {
    display: flex;

    flex-wrap: wrap;

    gap: 8px 20px;

    list-style: none;
}

.job-requirements li {
    color: #718aa4;

    font-size: 11px;
}

.job-requirements li span {
    color: #42aaff;

    margin-right: 5px;
}


/* Apply */

.job-apply {
    width: fit-content;
}


/* No jobs */

.no-jobs {
    text-align: center;

    padding: 75px 30px;

    border-radius: 16px;

    border: 1px solid rgba(80, 175, 255, .14);

    background: rgba(5, 30, 55, .35);
}

.no-jobs-icon {
    width: 55px;
    height: 55px;

    display: grid;
    place-items: center;

    margin: 0 auto 20px;

    border: 1px solid rgba(72, 174, 255, .3);

    border-radius: 50%;

    color: #53b4ff;

    font-size: 25px;
}

.no-jobs h3 {
    font-size: 20px;

    margin-bottom: 10px;
}

.no-jobs p {
    color: #7189a3;

    max-width: 500px;

    margin: auto;

    font-size: 12px;

    line-height: 1.8;
}


/* Mobile */

@media (max-width: 700px) {

    .job-card {
        padding: 24px;

        flex-direction: column;

        gap: 12px;
    }

    .job-header {
        flex-direction: column;
    }

    .job-header h3 {
        font-size: 21px;
    }

    .job-tags {
        margin-top: 5px;
    }

    .job-requirements ul {
        flex-direction: column;
        gap: 8px;
    }

}

`;

document.head.appendChild(careersStyles);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

            entry.target.style.transitionDelay =
                `${Math.min(index * 60, 240)}ms`;

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});


document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* =========================================================
   YEAR
   ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
