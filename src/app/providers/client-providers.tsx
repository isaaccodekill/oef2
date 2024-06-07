// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
  // put your context providers in here
  const queryClient = new QueryClient()
  return (<QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>)

}