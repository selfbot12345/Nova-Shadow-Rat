const{ exec } = require("child_process"),
  PowerShell = require("powershell");

async function executePowerShellCommand(command) {
    return new Promise((resolve) => {
      const ps = new PowerShell(command);
  
      ps.on("error", (err) => {
        console.error(`Error executing command: ${err.message}`);
        resolve(`Error executing command: ${err.message}`);
      });
  
      ps.on("output", (data) => {
        resolve(`Command output:\n\`\`\`${data ?? "Success"}\`\`\``);
      });
  
      ps.on("error-output", (data) => {
        resolve(`Command output:\n\`\`\`${data ?? "Success"}\`\`\``);
      });
  
      ps.on("end", (code) => {
        resolve(`Command ended, with the code ${code}`);
      });
    });
  }
  
async function PowershellnoKi(command) {
  return new Promise((resolve) => {
    const ps = new PowerShell(command);

    ps.on("error", (err) => {
      console.error(`Error executing command: ${err.message}`);
      resolve(`Error executing command: ${err.message}`);
    });

    ps.on("output", (data) => {
      resolve(`${data ?? "Success"}`);
    });

    ps.on("error-output", (data) => {
      resolve(`${data ?? "Success"}`);
    });

    ps.on("end", (code) => {
      resolve(`Command ended, with the code ${code}`);
    });
  });
}
  
  async function executeCommand(command) {
    return new Promise((resolve) => {
      let outputChunks = [];
  
      const childProcess = exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          outputChunks.push(`Error executing command: ${error.message}`);
          resolve(outputChunks);
        }
  
        const result = stdout || stderr;
  
        const chunkSize = 1800;
        for (let i = 0; i < result.length; i += chunkSize) {
          const chunk = result.substring(i, i + chunkSize);
          outputChunks.push(chunk);
        }
  
        resolve(outputChunks);
      });
    });
  }

  module.exports = {
    executePowerShellCommand,
    executeCommand,
    PowershellnoKi,
  }