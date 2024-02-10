const {
  ApplicationCommandOptionType,
  ChannelType,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js"),
 {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
  StreamType,
} = require("@discordjs/voice"),
 prism = require("prism-media"),
 portAudio = require("naudiodon");

module.exports = {
  name: "stream",
  ownerOnly: true,
  description: "Stream your microphone on Discord",
  options: [
    {
      name: "mic",
      description: "Stream Microphone on Discord",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],

  run: async (client, interaction, args) => {
    let voiceConnection;
    let inter = interaction.options.getSubcommand();

    if (inter === "mic") {
      try {
        const guild = interaction.guild;
        const channelName = `MicStreamer_${process.env.USERNAME.replace(
          ".",
          ""
        )}`;

        // Find or create the voice channel
        const existingChannel = guild.channels.cache.find(
          (channel) => channel.name === channelName
        );
        const targetChannel =
          existingChannel ||
          (await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildVoice,
          }));

        // Get a list of available input devices
        const inputDevices = portAudio
          .getDevices(portAudio.getHostAPIs()[0])
          .filter((device) => device.maxInputChannels > 0);

        // Create a select menu with input device options
        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId("selectDevice")
          .setPlaceholder("Select your input device")
          .addOptions(
            inputDevices.map((device) => ({
              label: device.name,
              value: device.id.toString(),
            }))
          );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send a message with the select menu
        await interaction.reply({
          content: "Please select your input device:",
          components: [row],
        });

        // Wait for user interaction
        const filter = (i) =>
          i.customId === "selectDevice" && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
          filter,
          time: 15000,
        });

        collector.on("collect", async (i) => {
          const selectedDeviceId = i.values[0];

          // Join the voice channel
          voiceConnection = await joinVoiceChannel({
            channelId: targetChannel.id,
            guildId: targetChannel.guild.id,
            adapterCreator: targetChannel.guild.voiceAdapterCreator,
          });

          // Create an audio player
          const audioPlayer = createAudioPlayer();

          // Use prism-media to create an Opus stream from the selected microphone
          const opusStream = createRecorder(selectedDeviceId);
          // Acknowledge the user's selection
          await i.update({
            content: `Microphone streaming started in channel: ${
              targetChannel.name
            } with device: ${
              inputDevices.find(
                (device) => device.id.toString() === selectedDeviceId
              ).name
            }`,
              ephemeral: true,
            components: [],
          });
          // Configure the audio player to play the Opus stream
          audioPlayer.on(AudioPlayerStatus.Idle, () => {
            const buffer = opusStream.read(1920); // Adjust the buffer size if needed
            if (buffer) {
              const resource = createAudioResource(buffer, {
                inputType: StreamType.Raw,
              });
              audioPlayer.play(resource);
            }
          });

          // Subscribe the audio player to the voice connection
          voiceConnection.subscribe(audioPlayer);

          // Handle errors
          audioPlayer.on("error", (error) => {
            console.error("Error playing audio:", error);
          });

          collector.stop();
        });

        collector.on("end", (collected) => {
          if (collected.size === 0) {
            interaction.followUp({
              ephemeral: true,
              content:
                "You did not select an input device within the time limit.",
            });
          }
        });
      } catch (error) {
        console.error("Error:", error.message);
        interaction.reply({
          ephemeral: true,
          content:
            "Error while starting microphone streaming. Please check the console for details.",
        });
      }
    }
  },
};

function createRecorder(hardwareDeviceId) {
  return new prism.FFmpeg({
    args: [
      "-f",
      "dshow",
      "-i",
      `audio="${hardwareDeviceId}"`,
      "-acodec",
      "libopus",
      "-f",
      "opus",
      "-ar",
      "48000",
      "-ac",
      "2",
    ],
  });
}
