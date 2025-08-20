export const formatName = (name) => {
  if (
    !name ||
    name.trim() === "" ||
    name === "undefined undefined" ||
    name === "undefined"
  ) {
    return null;
  }
  return name;
};
