const { ApplicationCommandOptionType } = require("discord.js"),
 { upload } = require("../../../Sentinel/utils/uploadFiles");

module.exports = {
  name: "upload",
  ownerOnly: true,
  description: "Upload a file on gofile",
  options: [
    {
      name: "file_path", 
      description: 
        "File Path (Example: 'C:/Desktop/help.txt')",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const fileUrl = interaction.options.getString("file_path");
    await interaction.reply({
      content: `Wait...`,
      ephemeral: true,
    });
    try {
      let link_url = await upload(fileUrl)
      await interaction.editReply({
        content: `File Upload on: ${link_url ?? "none"}`,
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
