import './globals.css'
import { Inter } from 'next/font/google'
import {ThemeProvider} from "@/components/ThemeProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vox8',
  description: 'Search for your favorite movies and TV shows.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
