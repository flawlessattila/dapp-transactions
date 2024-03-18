import { Button, CircularProgress } from '@mui/joy';

import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

export const ConnectButton = ({loading}: {loading?: boolean | undefined}) => {
  console.log(typeof loading)

  return (
    <>
      { !loading && 
      <Button
      size="lg" 
      endDecorator={<LinkOutlinedIcon/>}>
        Connect MetaMask
      </Button>}

      {loading && 
      <Button 
      size="lg" 
      endDecorator={<CircularProgress />}
      sx={{
        userSelect: 'none',
        pointerEvents: 'fill !important',
        '&:hover': {
          cursor: 'not-allowed'
        }
      }}
      disabled>
        Connecting
      </Button>}
    </>
  )
}