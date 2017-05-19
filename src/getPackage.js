const fs = require('fs');
const path = require('path');

const PACKAGE_FILENAME = 'package.json';

/** Get package json */
module.exports = function getPackage(project) {
  const packagePath = path.join(project, PACKAGE_FILENAME);

  if (fs.existsSync(packagePath)) {
    return require(packagePath);
  }

  return null;
};