import { Button, CircularProgress } from '@mui/joy';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

export const ConnectButton = ({loading, onClick}: {loading?: boolean | undefined, onClick: () => void}) => {
  return (
    <>
      { !loading && 
      <Button
      size="lg" 
      onClick={onClick}
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