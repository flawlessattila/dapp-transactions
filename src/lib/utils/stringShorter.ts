export const stringShorter = (string: string, parts: number = 4) => {
  if (string.length < 10) {
    return string
  }
  const piece = string.length / parts
  return string.slice(0, piece) + '...' + string.slice(-piece)
}