export function convertToCamelCase(
  objectOrArray: object | object[]
): object | object[] {
  if (!objectOrArray) {
    return objectOrArray;
  }

  if (Array.isArray(objectOrArray)) {
    return objectOrArray.map((object) => {
      const newObject: any = {};

      Object.keys(object).forEach((key) => {
        const newKey = key
          .split("_")
          .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join("");
        newObject[newKey] = object[key];
      });

      return newObject;
    });
  }

  const newObject: any = {};

  Object.keys(objectOrArray).forEach((key) => {
    const newKey = key
      .split("_")
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
    newObject[newKey] = objectOrArray[key];
  });

  return newObject;
}
