import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

export function buildApp({ pool }) {
    var app = express();
    app.use(express.json());
    app.use(cors());

    app.get('/', function (req, res) {
        return res.status(200).json({ Hello: 'World' });
    });

    app.get('/berletek', function (req, res) {
        let sql =
            'SELECT b.*, t.nev AS tipus FROM berletek b INNER JOIN tipusok t ON b.tipus_id = t.id ORDER BY b.ar ASC';

        pool.query(sql, function (err, result) {
            if (err)
                return res.status(500).json({
                    error: 'Database error',
                    message: err,
                });

            return res.status(200).json({ result });
        });
    });

    app.get('/berletek/elerheto', function (req, res) {
        let sql = 'SELECT * FROM berletek WHERE elerheto = 1 AND ervenyesseg_nap <= 30';

        pool.query(sql, function (err, result) {
            if (err)
                return res.status(500).json({
                    error: 'Database error',
                    message: err,
                });

            return res.status(200).json({ result });
        })
    })

    app.get('/berletek/kereses/:szoveg', function (req, res) {
        const szoveg = req.params.szoveg;

        let sql =
            'SELECT * FROM berletek WHERE megnevezes LIKE ?';

        pool.query(sql,[`%${szoveg}%`], function (err, result) {
            if (err)
                return res.status(500).json({
                    error: 'Database error',
                    message: err,
                });

            return res.status(200).json({ result });
        });
    });

    app.get('/tipusok/statisztika', function (req, res) {
        let sql =
            'SELECT t.nev AS tipus_nev, COUNT(b.id) AS berletek_szama, ROUND(AVG(b.ar), 1) AS atlagos_ar FROM tipusok t INNER JOIN berletek b ON t.id = b.tipus_id GROUP BY t.nev';

        pool.query(sql, function (err, result) {
            if (err)
                return res.status(500).json({
                    error: 'Database error',
                    message: err,
                });

            return res.status(200).json({ result });
        });
    });

    app.get('/berletek/dragak', function (req, res) {
        let sql =
            'SELECT megnevezes, ar, ervenyesseg_nap FROM berletek WHERE ar > 20000 ORDER BY ervenyesseg_nap DESC';

        pool.query(sql, function (err, result) {
            if (err)
                return res.status(500).json({
                    error: 'Database error',
                    message: err,
                });

            return res.status(200).json({ result });
        });
    });

    return app;
}
