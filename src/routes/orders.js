import express from 'express';
import { Order } from '../models/Order.js';
import { orders, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const order = new Order(nextId(), req.body.userId, req.body.productIds);
    orders.push(order);
    res.json(order);
});

router.get('/', (req, res) => {
    res.json(orders);
});

router.get('/:id', (req, res) => {
    let found = null;
    for (let o of orders) {
        if (o.id === req.params.id) found = o;
    }
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.put('/:id', (req, res) => {
    let found = null;
    for (let o of orders) {
        if (o.id === req.params.id) found = o;
    }
    if (found) {
        found.status = req.body.status;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.delete('/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === req.params.id);
    if (index !== -1) {
        orders.splice(index, 1);
        res.json({ message: 'Удалено' });
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

export default router;