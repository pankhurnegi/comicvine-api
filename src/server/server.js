const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const API_KEY = '8c35462eea652a85602f7ba88ee72c581e949e9d';
const BASE_URL = 'https://comicvine.gamespot.com/api/movies/';

app.get('/api/movies', async (req, res) => {
    const { limit = 20, offset = 0 } = req.query;
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                format: 'json',
                limit,
                offset
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
