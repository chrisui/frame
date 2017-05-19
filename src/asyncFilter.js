/**Filter an array using a function that returns a promise as it's predicate. */
module.exports = async function asyncFilter(array, filter) {
  const map = await Promise.all(array.map(filter));
  return array.filter((_, index) => map[index]);
}
