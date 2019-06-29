// if arg 1 contains all items in arg 2, return true.
export function arrayContainsArray(superset, subset) {
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
}

// if item is in array, removes it. Otherwise adds it.
export function removeOrAddItemFromArray(item, array) {
  if (array.includes(item)) {
    return array.filter(i => i !== item);
  } else {
    return [...new Set([...array, item])];
  }
}
