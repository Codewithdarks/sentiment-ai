import React, { useState } from 'react';
import Result from './Result';

const SavedEntities = () => {
  // Sample saved items data
  const [savedItems, setSavedItems] = useState([
    { id: 1, text: 'Example saved item 1', sentiment: 'positive' },
    { id: 2, text: 'Example saved item 2', sentiment: 'negative' }
  ]);

  const handleRemove = (item) => {
    // Remove item from saved list
    setSavedItems(prevItems => prevItems.filter(obj => obj.id !== item.id));
    // (Optional) Show a notification about removal
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Saved Entities</h2>
      {savedItems.length > 0 ? (
        savedItems.map(item => (
          <Result
            key={item.id}
            data={item}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p className="text-gray-500">No saved entities.</p>
      )}
    </div>
  );
};

export default SavedEntities;
