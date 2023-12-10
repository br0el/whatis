import '../globals.css';
import React from 'react';
import Link from 'next/link';

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResult = {
  organic_results: {
    position: number;
    title: string;
    link: string;
    snippet: string;
  }[];
  knowledge_graph?: {
    title: string;
    description: string;
    source: {
      name: string;
      link: string;
    };
  };
  related_questions?: {
    question: string;
    snippet: string;
    title: string;
    date: string;
    info: string;
    link: string;
    thumbnail: string;
    source_logo: string;
    next_page_token?: string;
    serpapi_link: string;
  }[];
};

export function generateStaticParams() {
  return [
    { slug: ['a', '1'] },
    { slug: ['b', '2'] },
    { slug: ['c', '3'] },
  ];
}

async function search(searchTerm: string): Promise<SearchResult> {
  const res = await fetch(`https://serpapi.com/search.json?q=allintitle:what+is+${searchTerm}&api_key=${process.env.API_KEY}`);
  const results: SearchResult = await res.json();
  return results;
}

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm);
  console.log('searchResults:', searchResults); // Log the results

  const organicResults = searchResults?.organic_results || [];
  const knowledgeGraph = searchResults?.knowledge_graph;
  const relatedQuestions = searchResults?.related_questions || [];

  return (
    <div>
      {searchResults ? (
        <>
          <p className="text-gray-500 text-sm p-2">You searched for:</p>
          {knowledgeGraph && (
            <div className="p-5 border rounded-md my-4">
              <h2 className="text-xl font-bold">{knowledgeGraph.title}</h2>
              <p className="text-gray-500">{knowledgeGraph.description}</p>
              <p className="text-sm">
                Source: <a href={knowledgeGraph.source.link}>{knowledgeGraph.source.name}</a>
              </p>
            </div>
          )}
          <div className="p-5 border rounded-md my-4">
            <h2 className="text-xl font-bold">Others Asked</h2>
            <ul className="space-y-4">
              {relatedQuestions.map((question, index) => (
                <li key={index} className="flex">
                  <div>
                    <h3 className="text-blue-500">
                      <a href={question.link} target="_blank" rel="noopener">{question.question}</a>
                    </h3>
                    <p className="text-gray-500">{question.snippet}</p>
                    <p className="text-sm">
                      Source: <img src={question.source_logo} alt={question.title} className="w-4 h-4 inline-block" />
                      <a href={question.link} target="_blank" rel="noopener">{question.title}</a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ol className="space-y-5 p-5 text-blue-500">
            {organicResults.map((result) => (
              <li key={result.position} className="list-decimal">
                <h3 className="text-blue-500">
                  <a href={result.link} target="_blank" rel="noopener">
                    {result.title}
                  </a>
                </h3>
                <p className="text-gray-500">
                  <a href={result.link} target="_blank" rel="noopener">
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
