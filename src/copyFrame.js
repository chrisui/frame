const path = require('path');
const cosmiconfig = require('cosmiconfig');
const log = require('npmlog');
const diff = require('lodash.difference')
const asyncFilter = require('./asyncFilter');
const findFrameFiles = require('./findFrameFiles');
const copyFrameFile = require('./copyFrameFile');
const resolveFrame = require('./resolveFrame');
const getLock = require('./getLock');
const getPackage = require('./getPackage');
const writeLock = require('./writeLock');
const isFileOverridden = require('./isFileOverridden');
const getFileSum = require('./getFileSum');

/** Copy files from our source frame to our project destination */
module.exports = async function copyFrame(project, frameOverride, force = forceOverride, forceOverride) {
  // TODO: Frame is configured usually
  // TODO: If frame name/path+version hasn't changed we do nothing
  const {config = {}} = await cosmiconfig('frame').load(project);
  const exclude = config.exclude || [];
  const frame = frameOverride || config.source;
  const source = resolveFrame(frame, project);
  const lock = getLock(project);

  const framePkg = getPackage(source);
  if (!framePkg) {
    throw new Error(`Could not find package.json for frame \`${frame}\``);
  }

  if (lock) {
    if (framePkg.version === lock.version && framePkg.name === lock.name && !force) {
      log.warn(`No new frame version - maybe you need to \`npm install ${lock.name}@latest\` first?`, `${lock.name}@${lock.version}`);
      return;
    } else {
      log.info(`Updating frame`, `${lock.name}@${lock.version} -> ${framePkg.name}@${framePkg.version}`);
    }
  } else {
    log.info(`Initializing frame`, `${framePkg.name}@${framePkg.version}`);
  }

  const pkg = getPackage(project);
  const data = Object.assign({}, {pkg}, config.data);

  const files = await findFrameFiles(source, exclude);
  const copyArgs = files.map(
    file => [file, path.join(source, file), path.join(project, file), data]
  );

  const filteredArgs = forceOverride ? copyArgs : await asyncFilter(
    copyArgs,
    ([file, source, destination]) => isFileOverridden(lock, file, destination).then(is => !is)
  );
  filteredArgs.forEach(([file]) => log.verbose(`Copying file`, file));

  const skippedFiles = await Promise.all(
    diff(copyArgs, filteredArgs).map(([file, source]) => getFileSum(source).then(sum => [file, sum]))
  );
  skippedFiles.forEach(([file]) => log.warn(`Skipped overridden file`, file));

  const copiedFiles = await Promise.all(
    filteredArgs.map(([file, ...args]) => copyFrameFile(...args).then(sum => [file, sum]))
  );
  copiedFiles.forEach(([file]) => log.info(`Copied file`, file));

  const write = await writeLock(project, framePkg.name, framePkg.version, copiedFiles, skippedFiles);
  log.info('Wrote lock file');
  return write;
}