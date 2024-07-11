// src/components/Verify.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/user/verify/${token}`);
        setMessage(response.data);
      } catch (error) {
        setMessage('Error verifying email');
      }
    };

    verifyEmail();
  }, [token]);

  return <div>{message}</div>;
};

export default Verify;
