import '../globals.css';
import React from 'react';
import Link from 'next/link';

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResult = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snippet: string;
    }
  ];
};

export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }];
}

async function search(searchTerm: string): Promise<SearchResult> {
  const res = await fetch(`https://serpapi.com/search.json?q=allintitle:what+is+${searchTerm}&api_key=${process.env.API_KEY}`);

  const results: SearchResult = await res.json();
  return results;
}

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm);
  console.log('searchResults:', searchResults); // Log the results

  // Check if searchResults.organic_results is defined before using map
  const organicResults = searchResults?.organic_results || [];

  return (
    <div>
      {searchResults ? (
        <>
          <p className="text-gray-500 text-sm p-2">You searched for: {searchTerm}</p>
          <ol className="space-y-5 p-5 text-blue-500">
            {organicResults.map((result) => (
              <li key={result.position} className="list-decimal">
                <h3 className="text-blue-500">
		<a href={result.link} target="_blank" rel="noopener noreferrer">
		{result.title}
		</a>
		</h3>
                <p className="text-gray-500">
		 <a href={result.link} target="_blank" rel="noopener noreferrer">
		{result.snippet}
		</a>
		</p>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchResults;