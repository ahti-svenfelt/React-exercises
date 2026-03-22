import React, { useState, useEffect } from 'react';

export function DogGallery() {
  // 1. State to store the URL of the dog image
  const [dogUrl, setDogUrl] = useState('');

  // 2. useEffect runs only once when the page loads (because of the empty array [])
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random') // Fetch data
      .then((response) => response.json())           // Convert response to JSON
      .then((data) => setDogUrl(data.message))       // Save the image URL to state
      .catch((error) => console.error(error));       // Catch any potential errors
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Random Dog</h2>
      {/* 3. Conditional rendering: Show image only when the URL exists */}
      {dogUrl ? (
        <img src={dogUrl} alt="Dog" className="rounded-xl shadow-lg w-64 h-64 object-cover" />
      ) : (
        <p>Loading dog...</p>
      )}
    </div>
  );
}