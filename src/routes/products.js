import express from 'express';
import { Product } from '../models/Product.js';
import { products, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const product = new Product(
        nextId(), 
        req.body.name, 
        req.body.price, 
        req.body.description
    );
    products.push(product);
    res.status(201).json(product);
});

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const found = products.find(p => p.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Товар не найден' });
    }
});

router.put('/:id', (req, res) => {
    const found = products.find(p => p.id === req.params.id);
    if (found) {
        if (req.body.name !== undefined) found.name = req.body.name;
        if (req.body.price !== undefined) found.price = req.body.price;
        if (req.body.description !== undefined) found.description = req.body.description;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Товар не найден' });
    }
});

router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Товар удален' });
    } else {
        res.status(404).json({ error: 'Товар не найден' });
    }
});

export default router;