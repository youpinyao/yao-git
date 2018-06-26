// const fs = require('fs');
// const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const childProcessExec = require('child_process').exec;

function spawnSync(cmd, args) {
  const options = {
    stdio: 'inherit',
  };
  console.log(chalk.yellow(`${cmd} ${args.join(' ')}`));
  console.log(chalk.yellow('------------------------------'));

  const ret = spawn.sync(cmd, args, options);

  console.log(chalk.yellow('=============================='));
  return ret;
}

async function exec(cmd, args) {
  const str = `${cmd} ${args.join(' ')}`;
  console.log(chalk.yellow('------------------------------'));
  console.log(chalk.yellow(str));
  return new Promise((resolve, reject) => {
    childProcessExec(str, (error, stdout, stderr) => {
      if (stderr) {
        console.log(stderr);
        reject(stderr);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
      console.log(chalk.yellow('=============================='));
    });
  });
}

// eslint-disable-next-line
module.exports = async (branch) => {
  process.chdir(process.cwd());

  const currentBranch = (await exec('git', ['symbolic-ref', '--short', '-q', 'HEAD'])).trim();

  spawnSync('git', ['pull']);
  spawnSync('git', ['add', './']);
  spawnSync('git', ['commit', '-m', `build: ${(new Date()).toLocaleString()}`]);
  spawnSync('git', ['push']);
  spawnSync('git', ['checkout', branch]);
  spawnSync('git', ['pull']);
  spawnSync('git', ['merge', currentBranch, '-m', `merge: ${currentBranch} merge to ${branch} ${(new Date()).toLocaleString()}`]);
  spawnSync('git', ['push']);
  spawnSync('git', ['checkout', currentBranch]);
};
