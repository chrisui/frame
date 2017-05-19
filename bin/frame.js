const minimist = require('minimist');
const chalk = require('chalk');
const log = require('npmlog');
const copyFrame = require('../src/copyFrame');

// TODO: Use commander for nicer ux out the box
const argv = minimist(process.argv.slice(2), {
  default: {
    /** Log level */
    log: 'info',
    /** Force checks to be run even if frame package hasn't changed */
    force: false,
    /** Force overidden files to be overwritten anyway */
    'force-override': false,
    /** Do a dry run (ie. don't actually write anything to disk) */
    dry: false,
  },
  boolean: ['force', 'dry', 'force-override'],
});
const projectPath = process.cwd();
const frame = argv._[0];
const logLevel = argv.log;
const force = argv.force;
const dryRun = argv.dry;
const forceOverride = argv['force-override'];

log.level = logLevel;

async function runCopy() {
  await copyFrame(projectPath, frame, force, forceOverride, dryRun);
  log.info(chalk.green('Done! 👌'));
}

runCopy();