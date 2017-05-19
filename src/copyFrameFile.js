const mustache = require('mustache');
const fs = require('async-file');
const getFileSum = require('./getFileSum');

/** Copy a file from source frame to it's destination with parsing */
module.exports = async function copyFrameFile(source, destination, data) {
  const content = await fs.readFile(source, 'utf8'); // assuming utf8?
  const rendered = mustache.render(content, data);
  await fs.writeFile(destination, rendered, 'utf8'); // assuming utf8?
  return getFileSum(destination);
};