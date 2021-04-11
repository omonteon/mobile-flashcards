// Helper function to generate a pseudo unique id.
// Code taken from: https://stackoverflow.com/a/53116778
const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export { uid };