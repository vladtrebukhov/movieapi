const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const apiKey = '';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

const getData = async (url, res) => {
    const fetch_response = await fetch(url);
    const json = await fetch_response.json();
    try {
        res.send(json);
    } catch(error) {
        throw new Error(json.message);
    }
};

app.get('/getPopular', async (req, res) => {
    //this is only querying the first page of popular movies
    const endpointUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    await getData(endpointUrl, res);
});

app.post('/getNewMovie', async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const endpointUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    await getData(endpointUrl, res);
});
