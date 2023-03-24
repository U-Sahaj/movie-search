import { test, expect, assert, describe, beforeAll, afterAll, it } from 'vitest';
import { ICreditsDocument } from '../mongoose/Credits.schema';
import { CreditsRepository } from './CreditsRepository';
import { ICredit, Cast } from './types/ICredit';

describe.skip('CreditsRepository', () => {
  let repository: CreditsRepository;

  beforeAll(async () => {
    repository = new CreditsRepository('mongodb://localhost:27017/','movie-search');
    await repository.connect();
  });


  describe('findByMovieId', () => {
    it.only('should return 5 credits', async () => {
      const credit: ICredit = await repository.findByMovieId("777");
      const cast = (credit.castDoc) as unknown as Cast[]
      console.log("**************", cast[0].name)
      expect(credit).not.toBeNull();
      expect(cast).not.toBeNull();
      
    },10000);


  });


});
