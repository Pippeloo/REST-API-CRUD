const express = require('express');
const router = express.Router();
const Alien = require('../models/alien');

router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.json(aliens);
    } catch (err) {
        res.send('Error ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const aliens = await Alien.findById(req.params.id);
        res.json(aliens);
    } catch (err) {
        res.send('Error ' + err);
    }
});

router.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try {
        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.send('Error');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        // Update the alien with the name, tech, and sub from the request if they exist
        alien.name = req.body.name || alien.name;
        alien.tech = req.body.tech || alien.tech;
        alien.sub = req.body.sub || alien.sub;

        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.send('Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        const a1 = await alien.deleteOne();
        res.json(a1);
    } catch (err) {
        res.send('Error');
    }
});

module.exports = router;