const figlet = require('figlet');
const chalk = require('chalk');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(process.cwd(), 'package.json');

// Create ASCII Art for DepAuto
figlet('DepAuto', (err, data) => {
  if (err) {
    console.error('Something went wrong with ASCII art...');
    console.dir(err);
    return;
  }
  
  // Print the ASCII Art in a colored style
  console.log(chalk.greenBright(data));

  // Print additional information or a tagline
  console.log(chalk.blueBright.bold("\nAutomating Dependency Installation... 🚀\n"));

  // Now, proceed to read the package.json and install dependencies
  fs.readFile(packagePath, 'utf8', (err, data) => {
    if (err) {
      console.error(chalk.red("Error reading package.json:", err));
      process.exit(1);
    }

    const packageJson = JSON.parse(data);
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    const hasDependencies = Object.keys(dependencies).length > 0 || Object.keys(devDependencies).length > 0;

    if (hasDependencies) {
      console.log(chalk.yellow('Installing dependencies...'));

      exec('npm install', (err, stdout, stderr) => {
        if (err) {
          console.error(chalk.red('Error installing dependencies:', err));
          process.exit(1);
        }

        console.log(chalk.greenBright(stdout));
        console.error(chalk.red(stderr));
        console.log(chalk.greenBright('Dependencies installed successfully! 🎉'));
      });
    } else {
      console.log(chalk.cyan('No dependencies found in package.json.'));
    }
  });
});
