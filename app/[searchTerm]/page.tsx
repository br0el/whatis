import React from 'react';
import Link from 'next/link';

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type KeyMoment = {
  text: string;
  time: string;
  link: string;
  thumbnail: string;
};

type Sitelink = {
  title: string;
  link: string;
  snippet?: string;
};

type RichSnippetExtension = {
  extensions: string[];
  detected_extensions: {
    price?: string;
    currency?: string;
    month?: string;
    week?: string;
    top_answer?: string;
    vote_count?: string;
    link?: string;
    answer_count?: string;
  };
};

type AboutThisResult = {
  source: {
    description: string;
    source_info_link: string;
    security: string;
    icon: string;
  };
  keywords: string[];
  languages: string[];
  regions: string[];
};

type OrganicResult = {
  position: number;
  title: string;
  link: string;
  displayed_link: string;
  thumbnail: string;
  favicon: string;
  snippet: string;
  snippet_highlighted_words: string[];
  duration?: string;
  key_moments?: KeyMoment[];
  video_link?: string;
  sitelinks_search_box: boolean;
  sitelinks?: {
    inline?: Sitelink[];
    expanded?: Sitelink[];
    list?: Sitelink[];
  };
  rich_snippet?: {
    top?: RichSnippetExtension;
    bottom?: RichSnippetExtension;
  };
  about_this_result?: AboutThisResult;
  about_page_link?: string;
  about_page_serpapi_link?: string;
  cached_page_link?: string;
  related_pages_link?: string;
  source?: string;
};

type SearchResult = {
  organic_results: OrganicResult[];
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
  related_searches?: {
    block_position: number;
    query: string;
    image: string;
    link: string;
    serpapi_link: string;
    items: {
      name: string;
      image: string;
      reviews?: number;
      rating?: number;
      extensions?: string[];
      link: string;
      serpapi_link: string;
    }[];
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
  const relatedSearches = searchResults?.related_searches || [];

  return (
    <div>
      {searchResults ? (
        <>
          <p className="text-gray-500 text-sm p-2">You searched for: {searchTerm}</p>
          {knowledgeGraph && (
            <div className="p-5 border rounded-md my-4">
              <h2 className="text-xl font-bold">{knowledgeGraph.title}</h2>
              {knowledgeGraph.description && (
                <p className="text-gray-500">{knowledgeGraph.description}</p>
              )}
              {knowledgeGraph.source && (
                <p className="text-sm">
                  Source: <a href={knowledgeGraph.source.link}>{knowledgeGraph.source.name}</a>
                </p>
              )}
            </div>
          )}
          <div className="p-5 border rounded-md my-4">
            <h2 className="py-1 text-xl font-bold">What is {searchTerm}?</h2>
            <ul className="space-y-4">
              {relatedQuestions.map((question, index) => (
                <li key={index} className="flex">
                  <div>
                    <h3 className="text-blue-500">
                      <a href={question.link} target="_blank" rel="noopener">{question.question}</a>
                    </h3>
                    <p className="py-1 text-gray-500">{question.snippet}</p>
                    <p className="text-sm">
                      Source: <a className='text-sm' href={question.link} target="_blank" rel="noopener">{question.title}</a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {organicResults.length > 0 ? (
              <div className="p-5 border rounded-md">
                <h3 className="text-blue-500">
                  <a href={organicResults[0].link} target="_blank" rel="noopener">
                    {organicResults[0].title}
                  </a>
                </h3>
                <p className="text-gray-500">
                  <a href={organicResults[0].link} target="_blank" rel="noopener">
                    {organicResults[0].snippet}
                  </a>
                </p>
                {organicResults[0].thumbnail && (
                  <img src={organicResults[0].thumbnail} alt={organicResults[0].title} className="w-16 h-16" />
                )}
                {/* About this result */}
                {organicResults[0].about_this_result && (
                  <div>
                    <h4>About this Result:</h4>
                    <p>Source: {organicResults[0].about_this_result.source.description}</p>
                    {/* Other properties within about_this_result */}
                  </div>
                )}
                {/* Sitelinks */}
                {organicResults[0].sitelinks && (
                  <div className="mt-4">
                    {organicResults[0].sitelinks.inline && (
                      <div className="text-sm">
                        <ul className="list-disc list-inside">
                          {organicResults[0].sitelinks.inline.map((sitelink, i) => (
                            <li key={i} className="mb-1">
                              <a href={sitelink.link} target="_blank" rel="noopener">
                                {sitelink.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Expanded Sitelinks */}
                    {organicResults[0].sitelinks.expanded && (
                      <div>
                        <h5>Expanded Sitelinks:</h5>
                        <ul>
                          {organicResults[0].sitelinks.expanded.map((sitelink, i) => (
                            <li key={i}>
                              <a href={sitelink.link} target="_blank" rel="noopener">
                                {sitelink.title}
                              </a>
                              <p>{sitelink.snippet}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {/* Add more properties as needed */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchResults;
