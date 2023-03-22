import { MongoClient } from 'mongodb';
import { ICreditsDocument } from '../mongoose/Credits.schema';
import { Credits } from './Credits';
import { CreditsRepository } from './CreditsRepository';

describe('CreditsRepository', () => {
  let repository: CreditsRepository;

  beforeAll(async () => {
    repository = new CreditsRepository('mongodb://localhost:27017', 'movie-search');
    await repository.connect();
  });

  afterAll(async () => {
    await repository.disconnect();
  });

  describe.skip('findAll', () => {
    it('should return an array of 5 Credits objects', async () => {
      const credits = await repository.findAll();
      expect(credits).toBeInstanceOf(Array);
      expect(credits.length).toBeGreaterThan(0);
      expect(credits[0]).toBeInstanceOf(Credits);
      expect(credits[0].movieId).toBe(19995);
      expect(credits[0].title).toBe('Avatar');
      expect(credits[1]).toBeInstanceOf(Credits);
      expect(credits[1].movieId).toBe(285);
      expect(credits[1].title).toBe('Pirates of the Caribbean: At World\'s End');

    });
  });


  describe.skip('findById', () => {
    it.only('should return null when movie with given id is not found', async () => {
      const credits = await repository.findById("999");
      expect(credits).toBeNull();
    },50000);

    it('should return credits when movie with given id is found', async () => {
      const credits = await repository.findByMovieId("19995");
      expect(credits).not.toBeNull();
      expect(credits?.title).toBe('Avatar');
    },50000);
  });


});
