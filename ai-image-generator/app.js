const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch a random image from Pexels based on a search query
app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        // Use dynamic import for node-fetch
        const fetch = (await import('node-fetch')).default;

        // Replace with your Pexels API key
        const PEXELS_API_KEY = ' tpGDKDIcCG3HSbS9B9r7BhvEvVVE56B1Q8BTHC4mM2cfeuERSVfcUhG6';

        // Fetch a random image from Pexels based on the search query
        const response = await fetch(`https://api.pexels.com/v1/search?query=${prompt}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch image from Pexels');
        }

        const data = await response.json();

        if (!data.photos || data.photos.length === 0) {
            throw new Error('No image found for the given prompt');
        }

        const imageUrl = data.photos[0].src.medium; // You can use other sizes like 'large' or 'original' as well

        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
