import uniq from "lodash/uniq";
import remove from "lodash/remove";

export function arrayContainsArray(superset, subset) {
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
}

// if item is in array, removes it. Otherwise adds it.
export function removeOrAddItemFromArray(item, array) {
  if (array.includes(item)) {
    remove(array, i => i === item);
    return [...array];
  } else {
    return uniq([...array, item]);
  }
}
