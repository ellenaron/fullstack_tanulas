import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import cors from 'cors';

export function buildApp({ pool, bcrypt }) {
    var app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
            },
        }),
    );

    app.get('/', (req, res) => {
        return res.status(200).json({ Hello: 'World' });
    });

    app.post('/signup', (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'Missing credentials.' });

        let sql = 'SELECT id FROM users WHERE email = ?';
        pool.query(sql, [email], (err, result) => {
            if (err) return res.status(500).json({ message: err });
            if (result.length > 0)
                return res
                    .status(400)
                    .json({ message: 'User already exists.' });

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ message: err });

                sql =
                    'INSERT INTO users(username, email, hash) VALUES (?, ?, ?)';
                pool.query(sql, [username, email, hash], (err, result) => {
                    if (err) return res.status(500).json({ message: err });

                    return res.status(201).json({ message: 'User created.' });
                });
            });
        });
    });

    return app;
}
