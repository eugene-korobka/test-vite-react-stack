export const areObjectEqualsByValues = (firstObj: Object, secondObj: Object) => {
  if (typeof firstObj !== 'object' || typeof secondObj !== 'object') {
    return false;
  }

  if (firstObj === null || secondObj === null) {
    return false;
  }

  return !Object.entries(firstObj).some(([key, value]) => {
    return secondObj[key] !== value;
  });
};
