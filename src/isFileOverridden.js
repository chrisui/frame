const getFileSum = require('./getFileSum');

/** Given the lock determine whether a file has been overridden or not */
module.exports = async function isFileOverridden(lock, file, destination) {
  // if there's no lock it's a new frame usage or forcibly copying
  if (!lock) return false;
  // if this file hasn't been locked or forcibly removed
  // then consider it not overridden
  const lockSum = lock.files[file];
  if (!lockSum) return false;
  try {
    const fileSum = await getFileSum(destination);
    // finally if we have a lock then see if the user has changed
    // the file since they used frame last time. If they did we
    // expect they want to keep their changes and not overwrite
    return lockSum !== fileSum;
  } catch (err) {
    return true;
  }
}