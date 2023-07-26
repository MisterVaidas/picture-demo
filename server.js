const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const API = 'https://api.unsplash.com';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8093;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.status(200).json('Hello there');
});

app.get('/photos', async (req, res) => {
    const subject = req.query.subject;

    try {
        const response = await axios.get(`${API}/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`);
        const photos = response.data.results.map(photo => {
            return {
                id: photo.id,
                img_url: photo.urls.regular,
                original_image: photo.links.self,
                photographer: photo.user.name
            };
        });

        res.json(photos);
    } catch (error) {
        res.status(500).json({error: error.toString()});
    }
});
