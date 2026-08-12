require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const app = express();

const PORT = process.env.PORT || 3000;

const WEBHOOK_URL =
    process.env.DISCORD_WEBHOOK_URL;

const BOT_TOKEN =
    process.env.DISCORD_BOT_TOKEN;

const STAFF_ROLE_ID =
    process.env.STAFF_ROLE_ID;


// =====================================================
// EXPRESS
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// DISCORD BOT
// =====================================================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// =====================================================
// BOT READY
// =====================================================

client.once("ready", () => {

    console.log(
        `Vento Development Discord bot logged in as ${client.user.tag}`
    );

});


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


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

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


        // -------------------------------------------------
        // CREATE EMBED
        // -------------------------------------------------

        const embed =
            new EmbedBuilder()

                .setColor(0x1683FF)

                .setAuthor({
                    name:
                        "VENTO DEVELOPMENT",
                    iconURL:
                        "https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/YOUR-REPOSITORY/main/vento-banner.png"
                })

                .setTitle(
                    "New Career Application"
                )

                .setDescription(
                    "A new application has been submitted through the Vento Development website."
                )

                .addFields(

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
                            portfolio
                                ? portfolio
                                : "Not provided",
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

                )

                .setFooter({
                    text:
                        "Vento Development • Careers"
                })

                .setTimestamp();


        // -------------------------------------------------
        // ACCEPT / DENY BUTTONS
        // -------------------------------------------------

        const buttons =
            new ActionRowBuilder()
                .addComponents(

                    new ButtonBuilder()
                        .setCustomId(
                            "vento_accept_application"
                        )
                        .setLabel(
                            "Accept Application"
                        )
                        .setEmoji("✅")
                        .setStyle(
                            ButtonStyle.Success
                        ),

                    new ButtonBuilder()
                        .setCustomId(
                            "vento_deny_application"
                        )
                        .setLabel(
                            "Deny Application"
                        )
                        .setEmoji("❌")
                        .setStyle(
                            ButtonStyle.Danger
                        )

                );


        // -------------------------------------------------
        // SEND TO DISCORD
        // -------------------------------------------------

        const response =
            await fetch(
                WEBHOOK_URL,
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            username:
                                "Vento Development",

                            avatar_url:
                                "https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/YOUR-REPOSITORY/main/vento-banner.png",

                            embeds: [
                                embed.toJSON()
                            ],

                            components: [
                                buttons.toJSON()
                            ]

                        })
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Discord webhook error:",
                errorText
            );

            throw new Error(
                "Discord webhook failed."
            );

        }


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
                "Unable to submit application."
        });

    }

});


// =====================================================
// STAFF BUTTON HANDLER
// =====================================================

client.on(
    "interactionCreate",
    async interaction => {

        if (!interaction.isButton()) {
            return;
        }


        if (
            interaction.customId !==
                "vento_accept_application" &&
            interaction.customId !==
                "vento_deny_application"
        ) {

            return;

        }


        // -------------------------------------------------
        // STAFF PERMISSION CHECK
        // -------------------------------------------------

        if (!interaction.member) {

            return interaction.reply({
                content:
                    "You cannot use this button.",
                ephemeral:
                    true
            });

        }


        const isStaff =
            STAFF_ROLE_ID &&
            interaction.member.roles.cache.has(
                STAFF_ROLE_ID
            );


        if (!isStaff) {

            return interaction.reply({
                content:
                    "You do not have permission to review Vento Development applications.",
                ephemeral:
                    true
            });

        }


        // -------------------------------------------------
        // CURRENT EMBED
        // -------------------------------------------------

        const oldEmbed =
            interaction.message.embeds[0];


        if (!oldEmbed) {

            return interaction.reply({
                content:
                    "Unable to find the application information.",
                ephemeral:
                    true
            });

        }


        // -------------------------------------------------
        // ACCEPT
        // -------------------------------------------------

        if (
            interaction.customId ===
            "vento_accept_application"
        ) {

            const acceptedEmbed =
                EmbedBuilder.from(oldEmbed)

                    .setColor(0x2ECC71)

                    .setFields(
                        oldEmbed.fields.map(field => {

                            if (
                                field.name ===
                                "Status"
                            ) {

                                return {
                                    name:
                                        "Status",
                                    value:
                                        `🟢 **Application Accepted**\nReviewed by ${interaction.user}`,
                                    inline:
                                        false
                                };

                            }

                            return field;

                        })
                    )

                    .setFooter({
                        text:
                            `Accepted by ${interaction.user.tag} • Vento Development`
                    });


            const disabledButtons =
                new ActionRowBuilder()
                    .addComponents(

                        new ButtonBuilder()
                            .setCustomId(
                                "application_accepted"
                            )
                            .setLabel(
                                "Application Accepted"
                            )
                            .setEmoji("✅")
                            .setStyle(
                                ButtonStyle.Success
                            )
                            .setDisabled(true),

                        new ButtonBuilder()
                            .setCustomId(
                                "application_denied"
                            )
                            .setLabel(
                                "Deny Application"
                            )
                            .setEmoji("❌")
                            .setStyle(
                                ButtonStyle.Danger
                            )
                            .setDisabled(true)

                    );


            await interaction.update({

                embeds: [
                    acceptedEmbed
                ],

                components: [
                    disabledButtons
                ]

            });


            return;

        }


        // -------------------------------------------------
        // DENY
        // -------------------------------------------------

        if (
            interaction.customId ===
            "vento_deny_application"
        ) {

            const deniedEmbed =
                EmbedBuilder.from(oldEmbed)

                    .setColor(0xE74C3C)

                    .setFields(
                        oldEmbed.fields.map(field => {

                            if (
                                field.name ===
                                "Status"
                            ) {

                                return {
                                    name:
                                        "Status",
                                    value:
                                        `🔴 **Application Denied**\nReviewed by ${interaction.user}`,
                                    inline:
                                        false
                                };

                            }

                            return field;

                        })
                    )

                    .setFooter({
                        text:
                            `Denied by ${interaction.user.tag} • Vento Development`
                    });


            const disabledButtons =
                new ActionRowBuilder()
                    .addComponents(

                        new ButtonBuilder()
                            .setCustomId(
                                "application_accepted"
                            )
                            .setLabel(
                                "Accept Application"
                            )
                            .setEmoji("✅")
                            .setStyle(
                                ButtonStyle.Success
                            )
                            .setDisabled(true),

                        new ButtonBuilder()
                            .setCustomId(
                                "application_denied"
                            )
                            .setLabel(
                                "Application Denied"
                            )
                            .setEmoji("❌")
                            .setStyle(
                                ButtonStyle.Danger
                            )
                            .setDisabled(true)

                    );


            await interaction.update({

                embeds: [
                    deniedEmbed
                ],

                components: [
                    disabledButtons
                ]

            });


            return;

        }

    }
);


// =====================================================
// STATUS
// =====================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
            "Vento Development application server is online."
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

    }
);


// =====================================================
// LOGIN DISCORD BOT
// =====================================================

if (!BOT_TOKEN) {

    console.error(
        "ERROR: DISCORD_BOT_TOKEN is missing from .env"
    );

} else {

    client.login(BOT_TOKEN);

}
