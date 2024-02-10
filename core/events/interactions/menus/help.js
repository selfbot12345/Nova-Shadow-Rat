const Discord = require("discord.js"),
{config} = require("../../../../config");

module.exports = async (interaction, client) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "help_menu") {
    let msg = await interaction.channel.messages.fetch(interaction.message.id);

    if (interaction.values[0] === "settings") {
      await interaction.deferUpdate();

      const settingsEmbed = new Discord.EmbedBuilder()
        .setTitle("Config Commands")
        .setDescription(`No Command Yet`)
        .setColor(config.Color);

      await msg.edit({ embeds: [settingsEmbed] });
    } else if (interaction.values[0] === "hack") {
      await interaction.deferUpdate();

      const funEmbed = new Discord.EmbedBuilder()
        .setTitle("Hack Commands")
        .setDescription(
          `>>> \`download\`
\`exec\` [[powershell cmd](https://discord.gg/grabber)]
\`get\` [[tokens info](https://discord.gg/grabber)]
\`keylog\` [[start stop](https://discord.gg/grabber)]
\`lock-mouse\` [[time](https://discord.gg/grabber)]
\`lock-keyboard\` [[time](https://discord.gg/grabber)]
\`navigate\` [[path](https://discord.gg/grabber)]
\`screenshot\`
\`start\` [[path](https://discord.gg/grabber)]
\`steal\`
\`stream\` [[mic](https://discord.gg/grabber)]
\`upload\` [[file_url](https://discord.gg/grabber)]
\`download\` [[file_url](https://discord.gg/grabber)]
\`askadmin\`
\`bluescreen\`
\`currentpage\` [[info close reopen restart](https://discord.gg/grabber)]
\`inject\` [[atomic mailspring mullvad exodus discord](https://discord.gg/grabber)]
\`kill\` [[process](https://discord.gg/grabber)]
\`remove\` [[path](https://discord.gg/grabber)]
\`restart\`
\`start\` [[path](https://discord.gg/grabber)]
\`shutdown\`
\`zip\` [[path](https://discord.gg/grabber)]
`
        )
        .setColor(config.Color);

      await msg.edit({ embeds: [funEmbed] });
    } else if (interaction.values[0] === "info") {
      await interaction.deferUpdate();

      const infoEmbed = new Discord.EmbedBuilder()
        .setTitle("Info Commands")
        .setDescription(
          `>>> \`help\` [[command](https://discord.gg/grabber)]
\`ping\`
\`search\` [[query](https://discord.gg/grabber)]
\`goon\` [[url](https://discord.gg/grabber)]`
        )
        .setColor(config.Color);

      await msg.edit({ embeds: [infoEmbed] });
    } else if (interaction.values[0] === "ddos") {
      await interaction.deferUpdate();

      const utilityEmbed = new Discord.EmbedBuilder()
        .setTitle("DDoS Commands")
        .setDescription(`>>> \`layer7\` [[threads target time](https://discord.gg/grabber)]`)
        .setColor(config.Color);

      await msg.edit({ embeds: [utilityEmbed] });
    }
  }
};
