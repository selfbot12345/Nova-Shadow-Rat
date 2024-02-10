const { ApplicationCommandOptionType } = require("discord.js"),
 fs = require("fs"),
 path = require("path");

const MAX_MESSAGE_LENGTH = 1800;

module.exports = {
  name: "navigate",
  ownerOnly: true,
  description: "Navigate Between Files!",
  options: [
    {
      name: "path",
      description: "Navigate starting from a path",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {
    const userPath = interaction.options.getString("path");
    const basePath = userPath ? userPath : process.env.PUBLIC;

    try {
      const files = fs.readdirSync(basePath);

      const formattedEntries = files.map((entry) => {
        const fullPath = path.join(basePath, entry);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        if (isDirectory) {
          return `╟══ 📁 ${entry}`;
        } else {
          return `╟══ 📄 ${entry}`;
        }
      });

      if (formattedEntries.length > 0) {
        const replyMessage = `\`\`\`yaml\n╓ "${basePath}"\n║\n${formattedEntries.join("\n")}📁\n\`\`\``;

        // Vérifier la longueur du message
        if (replyMessage.length > MAX_MESSAGE_LENGTH) {
          const chunks = chunkString(replyMessage, MAX_MESSAGE_LENGTH);
          for (const chunk of chunks) {
            await interaction.reply({
              content: chunk,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: replyMessage,
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: "No files or subdirectories found.",
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.reply({
        content: `Error navigating files: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};

function chunkString(str, maxLen) {
  const chunks = [];
  for (let i = 0; i < str.length; i += maxLen) {
    chunks.push(str.slice(i, i + maxLen));
  }
  return chunks;
}
