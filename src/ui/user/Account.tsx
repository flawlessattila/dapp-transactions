import { Stack, Typography, Avatar } from '@mui/joy'
import React from 'react'

export function Account({address} : {address: string}) {
  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      spacing={1}
    >
      <Typography>
        {address}
      </Typography>
      <Avatar src="/static/avatar-fallback.svg" variant="outlined" />
    </Stack>
  )
}
