export const parseFloatInput = (str: string) => {
  const pieces = str.split('.') || ['0'];
  console.log(pieces)
  let pieceCount = 0;
  let formated = '';
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    if (pieceCount == 0 && piece != '') {
      formated += +piece ? parseInt(piece).toString() : '0';
      pieceCount++;
    } else if (pieceCount == 1 && piece != '') {
      formated += '.' + piece.replace(/[^\d.]/g, '');
      break;
    } else if (pieces.length > 1 && i === pieces.length - 1 && piece == '') {
      formated += '.';
    }   
  }
  return formated;
}