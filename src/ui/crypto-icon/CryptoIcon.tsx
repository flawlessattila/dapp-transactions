import { Stack, Typography } from '@mui/joy';
import { BnbIcon, EthIcon } from './Icons';


export default function CryptoIcon({ 
  size = 'm', 
  currencySymbol,
  width = '50px', 
  height = '50px'
  } : 
  {
  size: 'm' | 's', 
  currencySymbol: string,
  width?: string,
  height?: string}) {

  const svg = defineSvg(size,currencySymbol);
  let Icon = svg;
  if (typeof svg === 'string') {
    Icon = (
      <Stack 
      alignItems="center"
      justifyContent="center"
      style={{
        display: 'block',
        height: '100%',
        width: '100%',
        lineHeight: height,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: size === 'm' ? (20 * parseInt(height)) / 30 : (30 * parseInt(height)) / 30,
        backgroundColor: size === 'm' ? '#cdaffa' : 'transparent',
        borderRadius: '50%'
      }}>
        {svg}
      </Stack>
    )
  }

  return (
    <Stack 
    alignItems="center"
    justifyContent="center"
    className="c-icon"
    style={{
      height,
      width
    }}>
      {Icon}
    </Stack>
  )
}


function defineSvg(size: 'm' | 's', currencySymbol: string | undefined) {
  switch(currencySymbol) {
    case 'ETH':
      return <EthIcon size={size}/>;
    case 'BNB':
      return <BnbIcon size={size}/>;
    default:
      return currencySymbol ? currencySymbol.at(0) : '?'
  }
}