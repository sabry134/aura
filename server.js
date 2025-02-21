#!/usr/bin/env node
require('dotenv').config();
const { Command } = require('commander');
const program = new Command();
const Discord = require('discord.js');

// Create a Discord client instance with proper intents
const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages]
});
const BOT_TOKEN = process.env.DISCORD_TOKEN;

// --- Mode Functions ---

// Discord Bot Mode: Standard bot operations
function discordBotMode() {
  console.log("Starting Discord Bot Mode...");
  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  client.on('messageCreate', message => {
    if (message.content === '!ping') {
      message.reply('Pong!');
    }
  });
  client.login(BOT_TOKEN);
}

// Linked Role Mode: Placeholder for linking roles with external systems
function linkedRoleMode() {
  console.log("Starting Linked Role Mode...");
  // Insert logic here for role linking (e.g., syncing roles with an external API)
  console.log("Linked Role Mode setup complete.");
}

// Discord Activity Mode: Set bot activity (presence)
function discordActivityMode() {
  console.log("Starting Discord Activity Mode...");
  client.once('ready', () => {
    client.user.setActivity('with code!', { type: 'PLAYING' });
    console.log("Activity set to 'Playing with code!'");
  });
  client.login(BOT_TOKEN);
}

// --- CLI Command Definitions ---

program
  .version('1.0.0')
  .description('Aura - Discord Bot Setup CLI');

program
  .command('dev')
  .description('Ready, set, code your bot to life! Starts development mode.')
  .option('-m, --mode <mode>', 'Select mode: bot, linked, or activity', 'bot')
  .action((options) => {
    console.log("Development mode starting...");
    switch (options.mode) {
      case 'bot':
        discordBotMode();
        break;
      case 'linked':
        linkedRoleMode();
        break;
      case 'activity':
        discordActivityMode();
        break;
      default:
        console.log("Unknown mode. Please choose 'bot', 'linked', or 'activity'.");
    }
  });

program
  .command('start')
  .description('Starts your bot in production mode.')
  .action(() => {
    console.log("Production mode starting...");
    // For production, we’ll use the default bot mode.
    discordBotMode();
  });

program
  .command('build [plugin]')
  .description('Builds your bot for production. Use "plugin" to optimize as an npm plugin.')
  .action((plugin) => {
    if (plugin === 'plugin') {
      console.log("Building plugin for production...");
      // Insert plugin build optimization logic here.
    } else {
      console.log("Building bot for production...");
      // Insert production build logic here.
    }
  });

program
  .command('upgrade')
  .description('Updates package and all installed plugins.')
  .action(() => {
    console.log("Upgrading package and plugins...");
    // Insert upgrade logic here (e.g., calling npm update or similar).
  });

program
  .command('deploy')
  .description('Deploys your bot to server!')
  .action(() => {
    console.log("Deploying bot to server...");
    // Insert deployment logic here.
  });

program
  .command('invite')
  .description('Generates a link for servers to add your bot.')
  .action(() => {
    console.log("Generating invite link...");
    const clientId = process.env.CLIENT_ID;
    const permissions = 8; // Example: Admin permissions
    const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
    console.log("Invite Link:", inviteLink);
  });

program
  .command('stop')
  .description('Stops the bot if it is running.')
  .action(() => {
    console.log("Stopping bot...");
    client.destroy();
    process.exit(0);
  });

program.parse(process.argv);
