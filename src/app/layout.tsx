import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { headers } from 'next/headers' 
import { cookieToInitialState } from 'wagmi' 


import { Inter } from 'next/font/google'
import { Stack } from '@mui/joy'
import Navbar from '@components/navbar/Navbar'


import { Providers } from './providers'
import { appName } from '@/app.config'
import wagmiConfig from '@app/wagmi.config';

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: {
    absolute: appName,
    template: `%s | ${appName}`
  },
  description: 'dApp for exhange tokens',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState( 
    wagmiConfig, 
    headers().get('cookie') 
  ) 

  return (
    <html lang="en">
      <body
        className={inter.className}>
          <Providers initialState={initialState}>
            <Stack height={{
              sm: '100vh'
            }}>
              <Navbar/>
              {props.children}
            </Stack>
          </Providers>
      </body>
    </html>
  )
}
