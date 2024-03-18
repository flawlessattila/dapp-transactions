import { Button, Input, Sheet, Stack, ToggleButtonGroup, Typography } from "@mui/joy"
import { useState } from "react";
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";

export const SendForm = () => {
  const [chain, setChain] = useState(null)


  return (
    <Sheet
      sx={{
        p: 2,
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: 500,
          md: 600
        },
        border: {
          xs: 'none',
          sm: '1px solid var(--joy-palette-divider)'
        },
        borderColor: 'divider',
        borderRadius: '5px',
        backgroundColor: {
          xs: 'transparent',
          sm: 'var(--Sheet-background)'
        }
      }}>
      <Typography
        mb={3}
        level="h4">
        Send
      </Typography>
      
      <Stack>
        <ToggleButtonGroup
          color="neutral"
          spacing={1}
          variant="outlined"
          value={chain}
          onChange={(event, newValue) => {
            setChain(newValue);
          }}
        > 
          <Button 
            sx={{py: 0}}
            startDecorator={ <CryptoIcon height="25px" width="25px" size="m" currencySymbol="ETH"/>} 
            value="ETH">
            ETH
          </Button>
          <Button 
            sx={{py: 0}}
            startDecorator={ <CryptoIcon height="25px" width="25px" size="m" currencySymbol="BNB"/>} 
            value="BNB">
            BNB
          </Button>
        </ToggleButtonGroup>
        <Typography
        mt={1}
        mb={2}
        level="title-sm">
          Availble: 0.4444
        </Typography>
        <Input
        size="lg"
          variant="outlined"/>
        <Stack
        mt={2}
        direction="row">
            <Button  size="lg" onClick={function(){}}>Send</Button>
        </Stack>
      </Stack>
          
        
     
    </Sheet>
  )
}