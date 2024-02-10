const { InteractionType } = require("discord.js"),
{stat} = require("../../modules/Save.js");

module.exports = async (interaction, client) => {

  if (interaction.type !== InteractionType.ApplicationCommand) return;
  if(interaction.channel.name !== process.env.USERNAME.replace(".",""))return;
  const command = client.slash.get(interaction.commandName);
  if (!command) return interaction.reply({ content: "an Erorr" });

  if (command.ownerOnly) {
    if (!stat.OwnerID.includes(interaction.member.user.id)) {
      return interaction.reply({
        content:
          ":x: **Not Your Bot** :x: you need bot owner",
          ephemeral: true,
      });
    }
  }

  if (command.userPerms) {
    if (
      !client.guilds.cache
        .get(interaction.guild.id)
        .members.cache.get(interaction.member.id)
        .permissions.has(command.userPerms || [])
    ) {
      if (command.noUserPermsMessage) {
        return interaction.reply(command.noUserPermsMessage);
      } else if (!command.noUserPermsMessage) {
        return interaction.reply(
          `You need the \`${command.userPerms}\` permission to use this command!`
        );
      }
    }
  }

  if (command.botPerms) {
    if (
      !client.guilds.cache
        .get(interaction.guild.id)
        .members.cache.get(client.user.id)
        .permissions.has(command.botPerms || [])
    ) {
      if (command.noBotPermsMessage) {
        return interaction.reply(command.noBotPermsMessage);
      } else if (!command.noBotPermsMessage) {
        return interaction.reply(
          `I need the \`${command.userPerms}\` permission to execute this command!`
        );
      }
    }
  }

  const args = [];

  for (let option of interaction.options.data) {
    if (option.type === "SUB_COMMAND") {
      if (option.name) args.push(option.name);
      option.options?.forEach((x) => {
        if (x.value) args.push(x.value);
      });
    } else if (option.value) args.push(option.value);
  }

  try {
    command.run(client, interaction, args);
  } catch (e) {
    interaction.reply({ content: e.message });
  }
};
