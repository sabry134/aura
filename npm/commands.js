// commands.js
const { SlashCommandBuilder } = require('discord.js');

// Define a base object to hold the command registration methods
const auraflux = {
  register: {}
};

// Define the commands dynamically
auraflux.register.ping = (client) => {
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!')
  );
};

auraflux.register['remove-video'] = (client) => {
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName('remove-video')
      .setDescription('Remove the video role')
  );
};

// Interaction handler for commands
async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (commandName === 'remove-video') {
    // Logic for removing the video role can be added here
    await interaction.reply('The video role has been removed!');
  }
}

// Export the auraflux object and the interaction handler
module.exports = { auraflux, handleInteraction };
