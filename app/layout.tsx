import '../styles/globals.css'
import Search from './[searchTerm]/Search';
import Header from './Header';

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
    


