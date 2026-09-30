import express from 'express';
import { Product } from '../models/Product.js';
import { products, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const product = new Product(nextId(), req.body.name, req.body.price);
    products.push(product);
    res.json(product);
});

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    let found = null;
    for (let p of products) {
        if (p.id === req.params.id) found = p;
    }
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.put('/:id', (req, res) => {
    let found = null;
    for (let p of products) {
        if (p.id === req.params.id) found = p;
    }
    if (found) {
        found.name = req.body.name;
        found.price = req.body.price;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({ message: 'Удалено' });
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

export default router;