import React, { useState } from 'react';

function GetDetails() {
  // State to store the user ID and timestamp entered by the user
  const [userId, setUserId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [transactions, setTransactions] = useState('');

  // Function to handle input change in the text box for user ID
  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  // Function to handle input change in the text box for timestamp
  const handleTimestampChange = (event) => {
    setTimestamp(event.target.value);
  };

  // Function to validate the timestamp
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString.replace(' ', 'T'));
    return !isNaN(date.getTime());
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the timestamp
    if (!isValidDate(timestamp)) {
      alert('Please enter a valid date and time in the format YYYY-MM-DD HH:MM:SS.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'POST', // You can use GET or POST as per your backend API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, timestamp }),
      });

      // Handle response from the backend as needed
      const data = await response.json();
      console.log('Response from backend:', data);
      setTransactions(JSON.stringify(data.netAmounts))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Another Component</h1>
      <p>This is another component rendered on a different path.</p>

      {/* Form for entering user ID and timestamp, and submitting */}
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
        <br />
        <label>
          Timestamp:
          <input
            type="text"
            value={timestamp}
            onChange={handleTimestampChange}
            placeholder="YYYY-MM-DD HH:MM:SS"
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        {transactions && <>{transactions}</>}
      </form>
    </div>
  );
}

export default GetDetails;
