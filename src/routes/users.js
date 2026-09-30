import express from 'express';
import { User } from '../models/User.js';
import { users, nextId } from '../data/db.js';

const router = express.Router();

router.post('/', (req, res) => {
    const user = new User(nextId(), req.body.name, req.body.email);
    users.push(user);
    res.json(user);
});

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    let found = null;
    for (let u of users) {
        if (u.id === req.params.id) found = u;
    }
    if (found) {
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.put('/:id', (req, res) => {
    let found = null;
    for (let u of users) {
        if (u.id === req.params.id) found = u;
    }
    if (found) {
        found.name = req.body.name;
        found.email = req.body.email;
        res.json(found);
    } else {
        res.status(404).json({ error: 'Не найдено' });
    }
});

router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'Удалено' });
    } else {
        res.status(404).json({ error: 'Не найденоооо' });
    }
});

export default router;