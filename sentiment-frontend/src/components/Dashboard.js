import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaTwitter } from 'react-icons/fa';

const Dashboard = () => {
  const [tweet, setTweet] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedEntities, setSavedEntities] = useState([]);

  const handleAnalyze = () => {
    if (!tweet.trim()) return;
    
    // Simulated sentiment analysis logic with emoji support
    const getSentiment = (text) => {
      const lowerText = text.toLowerCase();
      if (
        lowerText.includes('good') ||
        lowerText.includes('great') ||
        lowerText.includes('happy') ||
        lowerText.includes('😊') ||
        lowerText.includes('👍')
      ) {
        return { type: 'positive', emoji: '😊👍' };
      } else if (
        lowerText.includes('bad') ||
        lowerText.includes('terrible') ||
        lowerText.includes('sad') ||
        lowerText.includes('😢') ||
        lowerText.includes('👎')
      ) {
        return { type: 'negative', emoji: '😢👎' };
      } else {
        return { type: 'neutral', emoji: '😐' };
      }
    };

    const sentiment = getSentiment(tweet);
    setAnalysisResult({
      text: tweet,
      sentiment: sentiment.type,
      emoji: sentiment.emoji
    });
    setRecentSearches((prev) => [...prev, tweet]);
    setTweet('');
  };

  const handleSaveEntity = () => {
    if (analysisResult) {
      setSavedEntities((prev) => [
        ...prev,
        `${analysisResult.text} (${analysisResult.sentiment} ${analysisResult.emoji})`
      ]);
      setAnalysisResult(null);
    }
  };

  // Sentiment color mapping
  const sentimentColors = {
    positive: 'bg-green-50 border-green-200 text-green-800',
    negative: 'bg-red-50 border-red-200 text-red-800',
    neutral: 'bg-gray-50 border-gray-200 text-gray-800'
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800">Sentiment Analysis Dashboard</h2>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Analyze Tweet Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyze Tweet</h3>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a tweet... (try adding 😊 or 😢)"
              rows={3}
            />
            <button
              onClick={handleAnalyze}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Analyze
            </button>
            {analysisResult && (
              <div className={`mt-3 p-3 border rounded ${sentimentColors[analysisResult.sentiment]}`}>
                <p className="mb-2 font-medium">
                  Text: "{analysisResult.text}"
                </p>
                <p className="mb-2 font-medium">
                  Sentiment: <span className="capitalize">{analysisResult.sentiment}</span> {analysisResult.emoji}
                </p>
                <button
                  onClick={handleSaveEntity}
                  className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Recent Searches */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Searches</h3>
            {recentSearches.length > 0 ? (
              <ul className="list-disc ml-5 text-sm">
                {recentSearches.map((search, idx) => (
                  <li key={idx}>{search}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent searches yet.</p>
            )}
          </div>

          {/* Saved Entities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Saved Entities</h3>
            {savedEntities.length > 0 ? (
              <ul className="list-disc ml-5 text-sm">
                {savedEntities.map((entity, idx) => (
                  <li key={idx}>{entity}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No saved entities yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
