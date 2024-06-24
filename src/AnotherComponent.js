import React, { useState } from 'react';

function AnotherComponent() {
  // State to store the user ID entered by the user
  const [userId, setUserId] = useState('');

  // Function to handle input change in the text box
  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'POST', // You can use GET or POST as per your backend API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      // Handle response from the backend as needed
      console.log('Response from backend:', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Another Component</h1>
      <p>This is another component rendered on a different path.</p>

      {/* Form for entering user ID and submitting */}
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnotherComponent;
