import React, { useState } from 'react';

import { API_URL } from './global/constants';

function GetDetails() {

  const [userId, setUserId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [transactions, setTransactions] = useState('');

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const handleTimestampChange = (event) => {
    setTimestamp(event.target.value);
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString.replace(' ', 'T'));
    return !isNaN(date.getTime());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidDate(timestamp)) {
      alert('Please enter a valid date and time in the format YYYY-MM-DD HH:MM:SS.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, timestamp }),
      });

      
      const data = await response.json();
      console.log('Response from backend:', data);
      setTransactions(JSON.stringify(data.netAmounts))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Get Details</h1>
      <p>This is a page to enter your user id and get the details of transactions.</p>

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
