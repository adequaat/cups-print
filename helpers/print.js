import { exec } from "node:child_process";
import parseOutput from "./parseOutput.js";
import makeFunctionToExecuteForType from "./makeFunctionToExecuteForType.js";

const defaultExecSettings = { stdio: ["ignore", "pipe", "pipe"] };
const baseCommand = "lp ";

function print(instructions) {
  let cp;

  if ("string" === typeof instructions) {
    cp = exec(`${baseCommand} ${instructions}`, defaultExecSettings);
  } else if ("object" === typeof instructions) {
    const { file, destination, name, cwd } = instructions;
    let settings = defaultExecSettings;
    let command = baseCommand;

    if (name) {
      command += `-t ${name} `;
    }

    if (destination) {
      command += `-d ${destination} `;
    }

    if (file) {
      command += file;
    }

    if (cwd) {
      settings = Object.assign(settings, { cwd });
    }

    cp = exec(command, settings);
  }

  return new Promise((resolve, reject) => {
    cp.stdout.on("data", (data) => {
      resolve(parseOutput(data.toString()));
    });

    cp.stderr.on("data", (data) => {
      resolve({ message: data.toString() });
    });
  });
}

export default makeFunctionToExecuteForType({
  string: print,
  object: print,
  array: (instructions) => Promise.all(instructions.map(print)),
});
