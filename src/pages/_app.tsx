import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily}
          }
        `}</style>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
