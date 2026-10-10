import express from 'express';
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

const app = express();
const port = 3000;

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use(logger);

const rateLimitMap = new Map();
const WINDOW_MS = 10000; 
const MAX_REQUESTS = 5; 

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip);
    const validTimestamps = timestamps.filter(timestamp => now - timestamp < WINDOW_MS);
    
    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    if (validTimestamps.length > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Слишком много запросов' });
    }

    next();
};

app.use(rateLimiter);

setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap.entries()) {
        const valid = timestamps.filter(t => now - t < WINDOW_MS);
        if (valid.length === 0) {
            rateLimitMap.delete(ip); 
        } else {
            rateLimitMap.set(ip, valid);
        }
    }
}, WINDOW_MS);


app.use(express.json());

app.post('/echo', (req, res) => {
    res.json(req.body);
});


const adminAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Доступ запрещен: отсутствует заголовок Authorization' });
    }
    next();
};

app.get('/admin', adminAuth, (req, res) => {
    res.json({ message: 'Добро пожаловать в админ-панель!' });
});


app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// Маршрут поиска
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
        endpoints: ['/users', '/products', '/orders', '/search?q=...', '/echo', '/admin']
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});