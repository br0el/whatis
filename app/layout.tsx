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
      <main className="flex space-x-4 p-5">
       
          <div className="flex-1 pl-5">
              <Search />

              <div>{children}</div>
              <div className="py-4 ml-[-10px]">
          <rssapp-wall id="_GBI9swuZjzeZVXvM"></rssapp-wall><script src="https://widget.rss.app/v1/wall.js" type="text/javascript" async></script>
          </div>
          </div>
      </main>
      </body>
      </html>
  )
}
