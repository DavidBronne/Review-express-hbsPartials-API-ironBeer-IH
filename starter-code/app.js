const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req,res,next) => {
    punkAPI
    .getBeers()
        .then((beersFromAPI) => {
            // console.log('beersFromAPI', beersFromAPI);
            console.log('check beers');
            const data = {
                beers: beersFromAPI
            }
            res.render('beers', data);
        })
        .catch((error) => console.log('error', error))
    })

app.get('/random-beer', (req,res,next) => {
    punkAPI
        .getRandom()
        .then((apiRandomBeer) => {
            console.log('apiRandomBeer', apiRandomBeer);
            const data = {
                randomBeer: apiRandomBeer[0]
            }
            res.render('random-beer', data)
        })
})

app.get('/beer-detail/:beerId', (req,res,next) => {
    // console.log('req.params', req.params)
    const {beerId} = req.params;
    // console.log('beerId', beerId);
    punkAPI
        .getBeer(beerId)
        .then((apiBeer) => {
            const data = {
                beer: apiBeer[0]
            }
            res.render('detail-beer', data)
        })
        .catch((error) => console.log('error', error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
