const path = require('path');
const fs = require('async-file');
const sortObj = require('sort-object');
const LOCK_FILENAME = require('./LOCK_FILENAME');

/** Write a new lock file */
module.exports = async function writeLock(project, newName, newVersion, copiedFiles, skippedFiles) {
  const newLock = {
    name: newName,
    version: newVersion,
    files: {},
  };
  copiedFiles.forEach(([file, sum]) => newLock.files[file] = sum);
  skippedFiles.forEach(([file, sum]) => newLock.files[file] = sum);
  newLock.files = sortObj(newLock.files); // sort to maintain prettier diffs
  const content = JSON.stringify(newLock, null, 2);
  const destination = path.join(project, LOCK_FILENAME);
  return fs.writeFile(destination, content, 'utf8');
}