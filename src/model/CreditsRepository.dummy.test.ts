import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreditsRepository } from './CreditsRepository.dummy';
import { CastType, CrewType } from '../interfaces/ICredits';
import { Credits } from './Credits';

let mongoServer: MongoMemoryServer;
let repo: CreditsRepository;

beforeAll(async () => {
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27018, // use a unique port number
      dbName: 'test'
    }
  });
  
  const mongoUri = mongod.getUri();
  await mongoose.connect(mongoUri);

  repo = new CreditsRepository();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe.skip('CreditsRepository', () => {
  describe('findById', () => {
    it('returns the correct credits for a valid ID', async () => {
      // Populate test data
      const cast: CastType[] = [
        { castId: 1, name: 'Actor 1' },
        { castId: 2, name: 'Actor 2' },
      ];
      const crew: CrewType[] = [
        { crewId: 1, job: 'Director', name: 'Director 1' },
        { crewId: 2, job: 'Writer', name: 'Writer 1' },
      ];
      const credits = new Credits('123', 'Test Movie', cast, crew);
      const savedCredits = await repo.save(credits);

      // Test findById
      const foundCredits = await repo.findById(savedCredits.movieId);
      expect(foundCredits).not.toBeNull();
      expect(foundCredits?.movieId).toEqual(savedCredits.movieId);
      expect(foundCredits?.title).toEqual(savedCredits.title);
      expect(foundCredits?.cast).toEqual(savedCredits.cast);
      expect(foundCredits?.crew).toEqual(savedCredits.crew);
    });

    it('returns null for an invalid ID', async () => {
      const foundCredits = await repo.findById('invalid-id');
      expect(foundCredits).toBeNull();
    });
  });
});
