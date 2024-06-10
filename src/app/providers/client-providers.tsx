// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


let queryClient: QueryClient

export default function Providers({ children }: { children: React.ReactNode }) {
  // put your context providers in here

  if (!queryClient) queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  })


  return (<QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>)

}