const guildEvent = (event) => require(`../events/guild/${event}`);

const menuEvents = (event) => require(`../events/interactions/menus/${event}`);

function loadEvents(client) {
  // guild events
  client.on("interactionCreate", (m) =>
    guildEvent("interactionCreate")(m, client)
  );

  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);

  
  // Menu Events
  client.on('interactionCreate', (m) => menuEvents("help")(m, client));
}

module.exports = {
  loadEvents,
};
