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

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});