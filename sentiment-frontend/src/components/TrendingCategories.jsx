import React from 'react';
import { FaTag, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TrendingCategories = () => {
  const categories = [
    { name: 'Sports', change: 12 },
    { name: 'Politics', change: -5 },
    { name: 'Entertainment', change: 8 },
    { name: 'Technology', change: 15 }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Trending Categories</h3>
      <div className="space-y-2">
        {categories.map(cat => (
          <div
            key={cat.name}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-50 cursor-pointer"
          >
            <span className="flex items-center">
              <FaTag className="text-gray-500 mr-2" />
              {cat.name}
            </span>
            <span className={`flex items-center text-sm font-medium ${cat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {cat.change >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {Math.abs(cat.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;
