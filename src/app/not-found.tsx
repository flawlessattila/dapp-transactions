'use client';

import { Stack, Typography, Link } from '@mui/joy';
import NextLink from 'next/link';

export default function NotFound() {
  return (
  <Stack flexGrow={1} alignItems="center" justifyContent="center">
    <Typography mt={5} level="h1">
      NOT FOUND
    </Typography>
    <NextLink href="/">
      <Link variant="plain">
       Home
      </Link>
    </NextLink>
  </Stack>
  )
}