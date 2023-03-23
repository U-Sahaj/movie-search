import { test, expect, assert, describe, beforeAll, afterAll, it } from 'vitest';
import { ICreditsDocument } from '../mongoose/Credits.schema';
import { CreditsRepository } from './CreditsRepository';
import { ICredit } from './types/ICredit';

describe('CreditsRepository', () => {
  let repository: CreditsRepository;

  beforeAll(async () => {
    repository = new CreditsRepository('mongodb://localhost:27017/movie-search');
    await repository.connect();
  });


  describe('findByMovieId', () => {
    it.only('should return 5 credits', async () => {
      const credit: ICredit = await repository.findByMovieId("777");
      console.log("credits ==== ID", credit.movie_id)
      console.log("credits ==== cast", credit.cast)
      expect(credit).not.toBeNull();
    },10000);


  });


});
