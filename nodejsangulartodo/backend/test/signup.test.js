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

describe('POST /sigup', () => {
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
        it('should return a status of 201 if user is created', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, []);
            });

            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, { affectedRows: 1 });
            });

            mockbcrypt.hash.mockImplementationOnce((password, salt, cb) => {
                cb(null, 'hashed_pw');
            });

            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('User created.');
            expect(mockpool.query).toHaveBeenCalledTimes(2);
            expect(mockbcrypt.hash).toHaveBeenCalledTimes(1);
        });

        it('should return a status of 400 if user already exists', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, [
                    {
                        id: 3,
                    },
                ]);
            });

            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('User already exists.');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('should return a status of 500 if insert fails', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, []);
            });

            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb('DB crashed', null);
            });

            mockbcrypt.hash.mockImplementationOnce((password, salt, cb) => {
                cb(null, 'hashed_pw');
            });

            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('DB crashed');
            expect(mockpool.query).toHaveBeenCalledTimes(2);
            expect(mockbcrypt.hash).toHaveBeenCalledTimes(1);
        });

        it('should return a status of 500 if bcrypt fails', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb(null, []);
            });

            mockbcrypt.hash.mockImplementationOnce((password, salt, cb) => {
                cb('Bcrypt crashed', null);
            });

            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('Bcrypt crashed');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.hash).toHaveBeenCalledTimes(1);
        });

        it('should return a status of 500 select fails', async () => {
            mockpool.query.mockImplementationOnce((sql, params, cb) => {
                cb('DB crashed', null);
            });

            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('DB crashed');
            expect(mockpool.query).toHaveBeenCalledTimes(1);
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });
    });

    describe('some credentials are missing', () => {
        it('shold return a status of 400 if username is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: '',
                email: 'test@gmail.com',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('shold return a status of 400 if email is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: 'test',
                email: '',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('shold return a status of 400 if password is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: 'test',
                email: 'test@gmail.com',
                password: '',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('shold return a status of 400 if username and email is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: '',
                email: '',
                password: 'test',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('shold return a status of 400 if username and password is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: '',
                email: 'test@gmail.com',
                password: '',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });

        it('shold return a status of 400 if email and passwors is missing', async () => {
            const res = await request(app).post('/signup').send({
                username: 'test',
                email: '',
                password: '',
            });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('Missing credentials.');
            expect(mockpool.query).not.toHaveBeenCalled;
            expect(mockbcrypt.hash).not.toHaveBeenCalled;
        });
    });

    it('shold return a status of 400 if all credentials are missing', async () => {
        const res = await request(app).post('/signup').send({
            username: '',
            email: '',
            password: '',
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Missing credentials.');
        expect(mockpool.query).not.toHaveBeenCalled;
        expect(mockbcrypt.hash).not.toHaveBeenCalled;
    });
});
