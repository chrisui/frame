const resolve = require('resolve');

/** Resolve a frame directory from the given basedir */
module.exports = function resolveFrame(frame, basedir) {
  return resolve.sync(frame, {
    basedir: basedir,
    isFile: () => true,
    extensions: [''],
  });
}