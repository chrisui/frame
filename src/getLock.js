const fs = require('fs');
const path = require('path');
const LOCK_FILENAME = require('./LOCK_FILENAME');

/** Get lock json */
module.exports = function getLock(project) {
  const lockPath = path.join(project, LOCK_FILENAME);

  if (fs.existsSync(lockPath)) {
    return require(lockPath);
  }

  return null;
};