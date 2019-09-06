require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a habit', () => {
    return request(app)
      .post('/api/v1/habits')
      .send({ habit: 'somehabit', description: 'somedescription' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          habit: 'somehabit',
          description: 'somedescription',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all habits', async() => {
    const habit = await Habit.create({ 
      habit: 'somehabit',
      description: 'somedescription',
      user: 'someuser'
    });
    return request(app)
      .get('/api/v1/habits')
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({
          _id: habit._id.toString(),
          habit: 'somehabit',
          description: 'somedescription',
          user: 'someuser',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a habit by id', async() => {
    const habit = await Habit.create({ 
      habit: 'somehabit',
      description: 'somedescription',
      user: 'someuser'
    });
    return request(app)
      .get(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: habit._id.toString(),
          habit: 'somehabit',
          description: 'somedescription',
          user: 'someuser',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        });
      });
  });
});
