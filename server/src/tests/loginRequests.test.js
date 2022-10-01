const server = require('../../dist/app');
const { it, describe, expect } = require('@jest/globals');
const supertest = require('supertest');
const request = supertest(server);

describe('Testing POST /login endpoint', () => {
    it('Testing an invalid login request structure', async () => {
        let answer = await request.post('/login').set('Accept', 'application/json').send({
            username: 'asd',
            password: '123',
            invalidField: false,
        });
        expect(answer.status).toBe(403);
    });
    it('Testing invalid credentials', async () => {
        let answer = await request.post('/login').set('Accept', 'application/json').send({
            username: '',
            password: ''
        });
        expect(answer.status).toBe(400);
    });
});

describe('Testing POST /register endpoint', () => { 
    it('Testing an invalid register request structure', async () => {
        let answer = await request.post('register').set('Accept', 'application/json').send({ 
            username: 'asdcc',
            passrd: 'vczxxc'
        });
        expect(answer.status).toBe(400);
    });
});