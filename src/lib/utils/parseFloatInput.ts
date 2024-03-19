export const parseFloatInput = (str: string) => {
  const pieces = str.split('.') || ['0']
  let pieceCount = 0;
  let formated = '';
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];

    if (pieceCount == 0 && piece != '') {
      formated += parseInt(piece).toString()
      pieceCount++;
    } else if (pieceCount == 1 && piece != '') {
      formated += '.' + piece.replace(/[^\d.]/g, '')
      break;
    } else if (pieces.length > 1 && i === pieces.length - 1 && piece == '') {
      formated += '.'
    }   
  }

  return formated;
}