// RecentSearches.js
import React from 'react';

const RecentSearches = ({ searches }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-48 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Searches</h2>
      {searches.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {searches.map((search, index) => (
            <li key={index} className="truncate">{search}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No recent searches yet.</p>
      )}
    </div>
  );
};

export default RecentSearches;