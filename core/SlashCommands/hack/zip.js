const { ApplicationCommandOptionType } = require("discord.js");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

module.exports = {
  name: "zip",
  ownerOnly: true,
  description: "Zip a file or folder!",
  options: [
    {
      name: "path",
      description: "The path to zip",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {
    try {
      const pathToZip = args[0]; // Assuming "path" is the first argument

      // Use path.resolve to get an absolute path
      const absolutePath = path.resolve(pathToZip);

      // Check if the path exists before attempting to zip
      const exists = await pathExists(absolutePath);

      if (exists) {
        // Create a write stream to the output file
        const outputFilePath = `${absolutePath}.zip`;
        const output = fs.createWriteStream(outputFilePath);

        // Create a zip archive
        const archive = archiver("zip", {
          zlib: { level: 9 }, // Set compression level
        });

        // Pipe the archive to the output file
        archive.pipe(output);

        // Determine if the path is a file or a directory
        const isDirectory = (await fs.promises.stat(absolutePath)).isDirectory();

        if (isDirectory) {
          // Append the directory to the archive
          archive.directory(absolutePath, false);
        } else {
          // Append the file to the archive
          archive.file(absolutePath, { name: path.basename(absolutePath) });
        }

        // Finalize the archive and close the output stream
        await archive.finalize();
        await output.end();

        await interaction.reply({
          content: `Successfully zipped ${absolutePath} to ${outputFilePath}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `The specified path does not exist: ${absolutePath}`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "An error occurred while trying to zip the specified path.",
        ephemeral: true,
      });
    }
  },
};

async function pathExists(path) {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

