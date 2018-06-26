#!/usr/bin/env node

// eslint-disable-next-line
const chalk = require('chalk');
const commander = require('commander');
const actions = require('../src/actions');

commander
  .version(require('../package.json').version)
  .option('-m --mergeto <branch>', 'merge to branch')
  .parse(process.argv);

if (commander.mergeto) actions.mergeto(commander.mergeto);
