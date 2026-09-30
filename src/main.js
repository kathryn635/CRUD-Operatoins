import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
const port = 3000;

// ✅ ЭТА СТРОКА ОБЯЗАТЕЛЬНА И ДОЛЖНА БЫТЬ ЗДЕСЬ (до роутеров)
app.use(express.json()); 

// Подключаем роуты
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});