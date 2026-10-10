import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
const port = 3000;

app.use(express.json()); 

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.get('/search', (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    res.json({ q });
});
app.get('/', (req, res) => {
    res.json({ 
        message: 'API работает!',
        endpoints: {
            users: '/users',
            products: '/products',
            orders: '/orders',
            search: '/search?q=...'
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});