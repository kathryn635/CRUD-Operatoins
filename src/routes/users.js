import express from 'express';
import { User } from '../models/User.js';
import { users, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const user = new User(nextId(), req.body.name, req.body.email);
    users.push(user);
    res.status(201).json(user);
});

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const found = users.find(u => u.id === req.params.id);
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Пользователь не найден' });
    }
});

router.put('/:id', (req, res) => {
    const found = users.find(u => u.id === req.params.id);
    if (found) {
        if (req.body.name !== undefined) found.name = req.body.name;
        if (req.body.email !== undefined) found.email = req.body.email;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Пользователь не найден' });
    }
});

router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'Пользователь удален' });
    } else {
        res.status(404).json({ error: 'Пользователь не найден' });
    }
});

export default router;