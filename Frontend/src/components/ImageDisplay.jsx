// ImageDisplay.js (React Component)
import React from 'react';

const ImageDisplay = () => {
  const imageName = "1738671956641-Screenshot from 2025-02-03 21-57-51.png";
  
  // Construct the URL for the image
  const imageUrl = `http://localhost:5000/uploads/${encodeURIComponent(imageName)}`;

  return (
    <div>
      <h2>Uploaded Image</h2>
      <img
        src={imageUrl} // This will point to the backend server
        alt="User Uploaded Document"
        className="document-image"
      />
    </div>
  );
};

export default ImageDisplay;
