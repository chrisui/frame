const minimist = require('minimist');
const chalk = require('chalk');
const log = require('npmlog');
const copyFrame = require('../src/copyFrame');

// TODO: Use commander for nicer ux out the box
const argv = minimist(process.argv.slice(2), {
  default: {
    log: 'info',
    force: false,
    'force-override': false,
  },
  boolean: ['force', 'force-override'],
});
const projectPath = process.cwd();
const frame = argv._[0];
const logLevel = argv.log;
const force = argv.force;
const forceOverride = argv['force-override'];

log.level = logLevel;

async function runCopy() {
  await copyFrame(projectPath, frame, force, forceOverride);
  log.info(chalk.green('Done! 👌'));
}

runCopy();