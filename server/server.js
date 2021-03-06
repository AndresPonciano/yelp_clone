require('dotenv').config();

const express = require('express');
const db = require('./db');

const morgan = require('morgan');

const app = express();

app.use(express.json());

//get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query('select * from restaurants');
        console.log('route ran?', results);

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: { restaurants: results.rows },
        });
    } catch (err) {
        console.log(err);
    }
});

//get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        console.log(req.params.id);

        const result = await db.query(
            'select * from restaurants where id = $1',
            [req.params.id]
        );

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        console.log(req.body);

        const result = await db.query(
            'insert into restaurants (name, location, price_range) values($1, $2, $3) returning *',
            [req.body.name, req.body.location, req.body.price_range]
        );

        res.status(201).json({
            status: 'success',
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//update a restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const result = await db.query(
            'update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *',
            [
                req.body.name,
                req.body.location,
                req.body.price_range,
                req.params.id,
            ]
        );

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const result = await db.query('delete from restaurants where id = $1', [
            req.params.id,
        ]);
        res.status(204).json({
            status: 'success',
            data: { restaurant: result.rows[0] },
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server started in port ${port}`);
});
