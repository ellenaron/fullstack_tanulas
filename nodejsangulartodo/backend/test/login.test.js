import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest';
import request from 'supertest';
import { buildApp } from '../app.js';

const mockpool = {
    query: vi.fn(),
};

const mockbcrypt = {
    hash: vi.fn(),
    compare: vi.fn(),
};

describe('POST /login', () => {
    let app;

    beforeEach(() => {
        app = buildApp({
            pool: mockpool,
            bcrypt: mockbcrypt,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('all credentials included', () => {
        it('should return a status of 200 if login is successful', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, [
                    {
                        id: 3,
                        username: 'test',
                        email: 'test@gmail.com',
                        password: 'test',
                    },
                ]);
            });

            mockbcrypt.compare.mockImplementationOnce((password, hash, cb) => {
                cb(null, true);
            });

            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Logged in.');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.compare).toHaveBeenCalledTimes(1);
        });

        it('should return a status of 400 if email is incorrect', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, []);
            });

            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User not found.');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.compare).not.toHaveBeenCalled;
        });

        it('should return a status of 400 if password is incorrect', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, [
                    {
                        id: 3,
                        username: 'test',
                        email: 'test@gmail.com',
                        password: 'test',
                    },
                ]);
            });

            mockbcrypt.compare.mockImplementationOnce((password, hash, cb) => {
                cb(null, false);
            });

            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Incorrect password');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.compare).toHaveBeenCalledTimes(1);
        });

        it('should return a status of 500 if select fails', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb('DB crashed', null);
            });

            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('DB crashed');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.compare).not.toHaveBeenCalled;
        });

        it('should return a status of 500 if bcrypt fails', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, [
                    {
                        id: 3,
                        username: 'test',
                        email: 'test@gmail.com',
                        password: 'test',
                    },
                ]);
            });

            mockbcrypt.compare.mockImplementationOnce((password, salt, cb) => {
                cb('Bcrypt crashed', null);
            });

            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('Bcrypt crashed');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.compare).toHaveBeenCalledTimes(1);
        });
    });

    describe('some credentials are missing', () => {
        it('should return a status of 400 if email is missing', async () => {
            const res = await request(app).post('/login').send({
                email: '',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.compare).not.toHaveBeenCalled;
        });

        it('should return a status of 400 if password is missing', async () => {
            const res = await request(app).post('/login').send({
                email: 'test@gmail.com',
                password: '',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.compare).not.toHaveBeenCalled;
        });
    });

    it('should return a status of 400 if all credentials are missing', async () => {
        const res = await request(app).post('/login').send({
            email: '',
            password: '',
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Missing credentials.');
        expect(mockpool.query).not.toHaveBeenCalled;
        expect(mockbcrypt.compare).not.toHaveBeenCalled;
    });
});
