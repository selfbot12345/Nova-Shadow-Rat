
function loadSlashCommands(client) {
    const fs = require("fs");
    const path = require("path");
    const ascii = require("ascii-table");
    let slash = []
    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

    const table = new ascii().setHeading(" Slash Commands", "Load Status");
    const commandFolders = fs.readdirSync(path.join(__dirname, "..","SlashCommands"));
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(path.join(path.join(__dirname, "..","SlashCommands"), `${folder}`))
        .filter((file) => file.endsWith(".js"));
        myConsole.log(commandFiles)
      for (const file of commandFiles) {
        myConsole.log(file)
        const command = require(path.join(__dirname, "..","SlashCommands", `${folder}`, `${file}`));
        myConsole.log(command)
        if (command.name) {
          client.slash.set(command.name, command);
          slash.push(command)
          table.addRow(file, "✔️");
        } else {
          table.addRow(
            file,
            "❌ => Missing a help.name or help.name is not in string"
          );
          continue;
        }
      }
      console.log(table.toString());
    }
    client.on("ready", async() => {
      await client.application.commands.set(slash)
    })
  }
  
  module.exports = {
    loadSlashCommands,
  };