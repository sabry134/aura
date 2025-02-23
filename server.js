require("dotenv").config();
const express = require("express");
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  REST,
  Routes,
} = require("discord.js");

const app = express();
const PORT = 8081;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const ADMIN_IDS = ["224253007246786561", "495265351270137883"];

if (
  !process.env.BOT_TOKEN ||
  !process.env.CLIENT_ID ||
  !process.env.GUILD_ID ||
  !process.env.VIDEO_ROLE_ID ||
  !process.env.MEMBER_ROLE_ID ||
  !process.env.CHANNEL_ID
) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}

function createEmbed(title, description, color, thumbnail = null, fields = []) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: `Joined at: ${new Date().toLocaleString()}` })
    .setColor(color)
    .addFields(fields);
  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }
  return embed;
}

const commands = [
  {
    name: "remove-video",
    description: "Remove the video role",
    type: 1,
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
(async () => {
  try {
    console.log("Refreshing application (/) commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Successfully registered commands.");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "remove-video"
  ) {
    if (!ADMIN_IDS.includes(interaction.user.id)) {
      return interaction.reply({
        content: "❌ You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    const embed = createEmbed(
      "Toggle Video Role",
      "Don't feel like receiving a ping when a new video is released? Click the button below to remove your video role. Removing your reaction will add it back.",
      "#00FF00"
    );

    const button = new ButtonBuilder()
      .setCustomId("toggle_video_role")
      .setLabel("Remove video role")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [embed], components: [row] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton() && interaction.customId === "toggle_video_role") {
    const roleId = process.env.VIDEO_ROLE_ID;
    const member = interaction.member;

    if (!roleId) {
      return interaction.reply({
        content: "Error: Video role ID is not configured.",
        ephemeral: true,
      });
    }

    try {
      if (member.roles.cache.has(roleId)) {
        await member.roles.remove(roleId);
        await interaction.reply({
          content: "✅ Video role removed.",
          ephemeral: true,
        });
      } else {
        await member.roles.add(roleId);
        await interaction.reply({
          content: "✅ Video role wasn't present, it was added.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error toggling video role:", error);
      await interaction.reply({
        content: "⚠️ An error occurred while toggling the video role.",
        ephemeral: true,
      });
    }
  }
});

app.get("/", (req, res) => {
  res.send("Hello! The bot is running.");
});

app.head("/health", (req, res) => {
  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

client.login(process.env.BOT_TOKEN);