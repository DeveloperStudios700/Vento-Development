require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const BOT_PORT = process.env.BOT_PORT || 3001;
const BOT_INTERNAL_SECRET = process.env.BOT_INTERNAL_SECRET;

app.use(cors());
app.use(express.json());


// =====================================================
// APPLICATION SUBMISSION
// =====================================================

app.post("/api/apply", async (req, res) => {

    try {

        const {
            username,
            discord,
            age,
            role,
            experience,
            portfolio,
            additional
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (
            !username ||
            !discord ||
            !role ||
            !experience
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please complete all required fields."
            });

        }


        // =================================================
        // CREATE APPLICATION EMBED
        // =================================================

        const embed = {

            color: 0x1683FF,

            author: {
                name:
                    "VENTO DEVELOPMENT",

                icon_url:
                    "https://raw.githubusercontent.com/DeveloperStudios700/Vento-Development/main/vento-banner.png"
            },

            title:
                "New Career Application",

            description:
                "A new application has been submitted through the Vento Development website.",

            fields: [

                {
                    name:
                        "Applicant",

                    value:
                        `\`${username}\``,

                    inline:
                        true
                },

                {
                    name:
                        "Position",

                    value:
                        `\`${role}\``,

                    inline:
                        true
                },

                {
                    name:
                        "Discord",

                    value:
                        `\`${discord}\``,

                    inline:
                        true
                },

                {
                    name:
                        "Age",

                    value:
                        age
                            ? `\`${age}\``
                            : "`Not provided`",

                    inline:
                        true
                },

                {
                    name:
                        "Experience",

                    value:
                        experience.length > 1024
                            ? experience.substring(0, 1021) + "..."
                            : experience,

                    inline:
                        false
                },

                {
                    name:
                        "Portfolio",

                    value:
                        portfolio ||
                        "Not provided",

                    inline:
                        false
                },

                {
                    name:
                        "Additional Information",

                    value:
                        additional
                            ? (
                                additional.length > 1024
                                    ? additional.substring(0, 1021) + "..."
                                    : additional
                            )
                            : "None provided",

                    inline:
                        false
                },

                {
                    name:
                        "Status",

                    value:
                        "🟡 **Awaiting Staff Review**",

                    inline:
                        false
                }

            ],

            footer: {
                text:
                    "Vento Development • Careers"
            },

            timestamp:
                new Date().toISOString()

        };


        // =================================================
        // ACCEPT / DENY BUTTONS
        // =================================================

        const buttons = {

            type: 1,

            components: [

                {

                    type: 2,

                    custom_id:
                        "vento_accept_application",

                    label:
                        "Accept Application",

                    emoji: {
                        name:
                            "✅"
                    },

                    style:
                        3

                },

                {

                    type: 2,

                    custom_id:
                        "vento_deny_application",

                    label:
                        "Deny Application",

                    emoji: {
                        name:
                            "❌"
                    },

                    style:
                        4

                }

            ]

        };


        // =================================================
        // SEND APPLICATION TO DISCORD BOT
        // =================================================

        const botResponse = await fetch(

            `http://localhost:${BOT_PORT}/internal/send-application`,

            {

                method:
                    "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${BOT_INTERNAL_SECRET}`

                },

                body:
                    JSON.stringify({

                        embed:
                            embed,

                        buttons:
                            buttons

                    })

            }

        );


        // =================================================
        // CHECK BOT RESPONSE
        // =================================================

        if (!botResponse.ok) {

            const errorText =
                await botResponse.text();

            console.error(
                "Discord bot error:",
                errorText
            );

            throw new Error(
                "Discord bot could not send the application."
            );

        }


        const botResult =
            await botResponse.json();


        if (!botResult.success) {

            throw new Error(
                "Discord bot failed to send the application."
            );

        }


        console.log(
            `${username} applied for ${role}`
        );


        return res.json({

            success:
                true,

            message:
                "Application submitted successfully."

        });


    } catch (error) {

        console.error(
            "Application submission error:",
            error
        );


        return res.status(500).json({

            success:
                false,

            message:
                "Unable to submit application."

        });

    }

});


// =====================================================
// API STATUS
// =====================================================

app.get("/", (req, res) => {

    res.json({

        success:
            true,

        message:
            "Vento Development application server is online."

    });

});


// =====================================================
// API HEALTH CHECK
// =====================================================

app.get("/api/status", (req, res) => {

    res.json({

        success:
            true,

        status:
            "online",

        service:
            "Vento Development Application API"

    });

});


// =====================================================
// START SERVER
// =====================================================

app.listen(

    PORT,

    () => {

        console.log(
            `Vento Development server running on port ${PORT}`
        );

        console.log(
            `Discord bot connection target: http://localhost:${BOT_PORT}`
        );

    }

);
