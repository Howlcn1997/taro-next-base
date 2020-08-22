function isFunction(fn) {
  return typeof fn === "function";
}

function isArray(arr) {
  return Array.isArray(arr);
}

export { isFunction, isArray };
