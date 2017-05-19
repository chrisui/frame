const checksum = require('checksum');

/** Get the sha1 sum of a file */
module.exports = async function getFileSum(filePath) {
  return new Promise(
    (resolve, reject) => checksum.file(filePath,
      (err, sum) => err ? reject(err) : resolve(sum)
    )
  );
}