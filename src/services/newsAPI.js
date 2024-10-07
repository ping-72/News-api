import axios from 'axios';

const API_KEY = '9008d5f9fcde4dc19eb888e3113d1e89';
const BASE_URL = 'https://newsapi.org/v2';

export const getTopHeadlines = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country: 'us', // change this to any country code if needed
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching the news:", error);
    throw error;
  }
};
