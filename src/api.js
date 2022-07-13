import axios from 'axios';

export const normalizedAPIError = (error) => {
    if (error.response && error.response.data && error.response.data.error) {
      return { message: error.response.data.error };
    }
  
    if (error.message) {
      return error;
    }
  
    return { message: 'Something went wrong.' };
};

export const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000'
});