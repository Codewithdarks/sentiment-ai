import React from 'react';

const TrendingHashtags = () => {
  // Trending hashtags moved from Dashboard component
  const hashtags = ['AI', 'TechNews', 'Bitcoin'];

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Trending Hashtags & Mentions
      </h2>
      <ul className="list-disc pl-5 text-gray-700">
        {hashtags.length > 0 ? (
          hashtags.map((tag, index) => (
            <li key={index} className="text-blue-600">
              #{tag}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No trending hashtags available.</p>
        )}
      </ul>
    </div>
  );
};

export default TrendingHashtags;
