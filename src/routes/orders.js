import express from 'express';
import { Order } from '../models/Order.js';
import { orders, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const order = new Order(
        nextId(), 
        req.body.userId, 
        req.body.productIds, 
        req.body.totalAmount
    );
    orders.push(order);
    res.status(201).json(order);
});

router.get('/', (req, res) => {
    res.json(orders);
});

router.get('/:id', (req, res) => {
    const found = orders.find(o => o.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Заказ не найден' });
    }
});

router.put('/:id', (req, res) => {
    const found = orders.find(o => o.id === req.params.id);
    if (found) {
        if (req.body.status !== undefined) found.status = req.body.status;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Заказ не найден' });
    }
});

router.delete('/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === req.params.id);
    if (index !== -1) {
        orders.splice(index, 1);
        res.json({ message: 'Заказ удален' });
    } else {
        res.status(404).json({ error: 'Заказ не найден' });
    }
});

export default router;