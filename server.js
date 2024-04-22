const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/login', (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (!user) return res.status(400).send('Користувач не знайдений');
    
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Невірний пароль');

    const token = jwt.sign({ id: user.id }, 'SECRET_KEY');
    res.header('auth-token', token).send(token);
});

app.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    users.push(user);
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
