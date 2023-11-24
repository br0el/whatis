import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './Header'
import Search from './[searchTerm]/Search';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'whatis',
  description: 'what-is',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html>
      <body>
          <Header />
      <main className="flex space-x-4 divide-x-2 p-5">
          <div>
              <h1>Search</h1>
          </div>
          <div className="flex-1 pl-5">
              <Search />

              <div>{children}</div>
          </div>
      </main>
      </body>
      </html>
  )
}