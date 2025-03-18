import React, { useState } from 'react';
import Result from './Result';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const SentimentSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      // API call for sentiment analysis (pseudo-code)
      // const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      // const data = await response.json();
      // Simulate results for demonstration purposes:
      const data = [
        { id: 1, text: `Result for "${query}" – Sample text snippet`, sentiment: 'positive' },
        { id: 2, text: `Another result about "${query}"`, sentiment: 'negative' }
      ];
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Sentiment Search</h2>
      {/* Search input and button */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex shadow-sm">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a keyword or phrase..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md border border-blue-600 border-l-0 flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <FaSearch className="mr-2" /> Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Feedback messages */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}
      {hasSearched && !loading && results.length === 0 && !error && (
        <p className="text-gray-600">No results found for "{query}".</p>
      )}

      {/* Results list */}
      {results.map(item => (
        <Result
          key={item.id}
          data={item}
          onSave={(data) => {
            // Handle save action (pseudo-code)
            console.log('Save item:', data);
            // e.g., update saved list or show notification
          }}
        />
      ))}
    </div>
  );
};

export default SentimentSearch;
