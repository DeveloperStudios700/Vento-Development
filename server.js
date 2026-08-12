require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());


// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Vento Development application server is online."
    });
});


// --------------------------------------------------
// Submit application
// --------------------------------------------------

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


        // ------------------------------------------
        // Validation
        // ------------------------------------------

        if (!username || !discord || !role) {

            return res.status(400).json({
                success: false,
                message: "Please complete all required fields."
            });

        }


        if (!DISCORD_WEBHOOK_URL) {

            console.error(
                "DISCORD_WEBHOOK_URL is not configured."
            );

            return res.status(500).json({
                success: false,
                message: "Server configuration error."
            });

        }


        // ------------------------------------------
        // Discord Embed
        // ------------------------------------------

        const embed = {

            title: "New Vento Development Application",

            description:
                `**${username}** has applied for **${role}**.`,

            color: 0x087CFF,

            fields: [

                {
                    name: "Applicant",
                    value: username || "Not provided",
                    inline: true
                },

                {
                    name: "Position",
                    value: role || "Not provided",
                    inline: true
                },

                {
                    name: "Discord",
                    value: discord || "Not provided",
                    inline: true
                },

                {
                    name: "Age",
                    value: age || "Not provided",
                    inline: true
                },

                {
                    name: "Experience",
                    value:
                        experience || "Not provided",
                    inline: false
                },

                {
                    name: "Portfolio",
                    value:
                        portfolio || "Not provided",
                    inline: false
                },

                {
                    name: "Additional Information",
                    value:
                        additional || "None provided",
                    inline: false
                }

            ],

            footer: {
                text: "Vento Development • Careers"
            },

            timestamp: new Date().toISOString()

        };


        // ------------------------------------------
        // Send to Discord
        // ------------------------------------------

        const discordResponse = await fetch(
            DISCORD_WEBHOOK_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    username: "Vento Careers",

                    avatar_url:
                        "https://cdn.discordapp.com/embed/avatars/0.png",

                    embeds: [embed]

                })

            }
        );


        if (!discordResponse.ok) {

            const errorText =
                await discordResponse.text();

            console.error(
                "Discord error:",
                errorText
            );

            throw new Error(
                "Discord webhook request failed."
            );

        }


        // ------------------------------------------
        // Success
        // ------------------------------------------

        console.log(
            `${username} applied for ${role}`
        );


        return res.json({

            success: true,

            message:
                "Application submitted successfully."

        });


    } catch (error) {

        console.error(
            "Application submission error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while submitting your application."

        });

    }

});


// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {

    console.log(
        `Vento Development server running on port ${PORT}`
    );

});
