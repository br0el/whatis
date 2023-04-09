import React from 'react'
import Link from 'next/link'

type PageProps = {
    params: {
        searchTerm: string;
    }
}
type SearchResults = {
    organic_results: [
        {
            position: number
            title: string
            link: string
            thumbnail: string
            snippet: string
        }
    ]
}

const search = async (searchTerm: string) => {
    const res = await fetch(
        `https://serpapi.com/search.json?q=allintitle:what+is+${searchTerm}&api_key=${process.env.API_KEY}`
    )

        const data: SearchResults = await res.json()
        return data
}


    async function SearchResults({ params: { searchTerm } }: PageProps) {
    const searchResults = await search(searchTerm)

  return (
        <div>
            <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>
            
            <ol className="space-y-5 p-5">
                {searchResults.organic_results.map((result) => (
                    
                    <li key={result.position} className="list-decimal">
                        <Link href={result.link}><p className="font-bold text-blue-500">{result.title}</p></Link>
                        <Link href={result.link}><p className="text-blue-500">{result.link}</p></Link>
                        <Link href={result.link}><p>{result.snippet}</p></Link>
                    </li>
                    
                ))}
                </ol>
        </div>

  )
  
}

export default SearchResults