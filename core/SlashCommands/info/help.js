const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js"),
{config} = require("../../../config.js");

module.exports = {
  name: "help",
  description: "Shows the Help Menu",
  options: [
    {
      name: "command",
      description: "Get help for a command!",
      required: false,
      type: ApplicationCommandOptionType.String,
    }
  ],
  run: async (client, interaction, args) => {
    let commandInfo = await interaction.options.getString("command")

    if (commandInfo) {
      let cmd = client.slash.get(commandInfo);

      if (!cmd) {
        return interaction.reply("Couldn't find that command!")
      } else if (cmd) {
        let description = cmd.description ? cmd.description : "No description available.";
        let aliases = cmd.aliases ? cmd.aliases.join(", ") : "No aliases available.";
        let botPerms = cmd.botPerms ? cmd.botPerms.join(", ") : "No permissions required.";
        let userPerms = cmd.userPerms ? cmd.userPerms.join(", ") : "No permissions required.";
        let ownerOnly = cmd.ownerOnly ? "Yes" : "No";
        let nsfwOnly = cmd.nsfwOnly ? "Yes" : "No";
        let cooldown = cmd.cooldown ? cmd.cooldown : "No cooldown.";
        let isDisabled = cmd.isDisabled ? "Yes" : "No";

        let helpEmbed = new EmbedBuilder()
        .setTitle(`Help for **${cmd.name}**`)
        .addFields([
          { name: "Name", value: `${cmd.name}` },
          { name: "Description", value: `${description}` },
          { name: "Aliases", value: `${aliases}` },
          { name: "Owner Only", value: `${ownerOnly}` },
          { name: "NSFW Only", value: `${nsfwOnly}` },
          { name: "Cooldown", value: `${cooldown}` },
          { name: "Disabled", value: `${isDisabled}` },
          { name: "Required Bot Permissions", value: `${botPerms}` },
          { name: "Required User Permissions", value: `${userPerms}` }
        ])
        .setColor(config.Color)

        return interaction.reply({ embeds: [helpEmbed], ephemeral: true });
      }
    } else {

    let helpMenu = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot settings",
          value: "settings",
          emoji: "🛠"
        },
        {
          label: "Hack",
          description: "Shows all the hack commands",
          value: "hack",
          emoji: "💀"
        },
        {
          label: "Information",
          description: "Shows all the information commands",
          value: "info",
          emoji: "📢"
        },
        {
          label: "DDoS",
          description: "Shows all the DDoS commands",
          value: "ddos",
          emoji: "💿"
        },
      ])
    )

    let helpEmbed = new EmbedBuilder()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor(config.Color)

    interaction.reply({ embeds: [helpEmbed], components: [helpMenu]})
    }
  }
};