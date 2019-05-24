export function arrayContainsArray(superset, subset) {
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
}
