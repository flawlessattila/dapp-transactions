export const stringShorter = (string: string | null, parts: number = 4) => {
  if (string === null) {
    return "";
  }

  if (string.length < 10) {
    return string;
  }
  const piece = string.length / parts;
  return string.slice(0, piece) + "..." + string.slice(-piece);
};
