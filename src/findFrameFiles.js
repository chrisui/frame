const recursiveReaddir = require('recursive-readdir');
const path = require('path');
const IGNORED_FILES = require('./IGNORED_FILES');

/** Get appropriate list of relative file paths in directory to be framed */
module.exports = async function getFrameFiles(inPath, exclude) {
  const files = await recursiveReaddir(inPath, [...IGNORED_FILES, ...exclude]);
  return files.map(file => path.relative(inPath, file));
}