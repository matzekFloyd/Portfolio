import {Inter} from 'next/font/google'
import '../styles/globals.scss'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export default function App({Component, pageProps}) {
  return (
    <>
      <style jsx global>{`
        html {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
