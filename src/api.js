import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.BASE_URL || 'http://54.66.209.88:3000'
});