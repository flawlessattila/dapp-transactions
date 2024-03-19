import { Button, CircularProgress } from '@mui/joy';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { connect } from 'wagmi/actions';
import { injected } from 'wagmi/connectors';
import { useConfig } from 'wagmi';

export const ConnectButton = ({loading}: {loading?: boolean | undefined}) => {

  const config = useConfig();

  const handleConnect = async () => {
    console.log('[CONNECTION] proccessing...')
    const connectResult = await connect(config, { connector: injected() })
    console.log('[CONNECTION] result', connectResult)
  }

  return (
    <>
      { !loading && 
      <Button
      size="lg" 
      onClick={handleConnect}
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