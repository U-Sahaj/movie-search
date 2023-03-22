import mongoose from "mongoose";
import { CreditsModel } from "../mongoose/Credits.model";
import { CreditsRepository } from "./CreditsRepository.five";

describe('CreditsRepository', () => {
  let creditsRepository: CreditsRepository;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(() => {
    // Create a new instance of the repository for each test
    creditsRepository = new CreditsRepository(CreditsModel);
  });

  afterEach(async () => {
    // Remove all documents from the Credits collection after each test
    // await CreditsModel.deleteMany({});
  });

  describe('findCredits', () => {
    it('should return the first 5 credits', async () => {
      // Create 10 test credits
      const credits = [];
      for (let i = 0; i < 10; i++) {
        credits.push({
          movieId: i.toString(),
          title: `Title ${i}`,
          cast: [{ castId: 1, name: 'Actor 1' }],
          crew: [{ crewId: 1, job: 'Job 1', name: 'Person 1' }]
        });
      }

      // Insert the test credits into the database
      await CreditsModel.insertMany(credits);

      // Find the first 5 credits
      const result = await creditsRepository.find(5);

      // Check that the correct number of credits were returned
      expect(result.length).toEqual(5);

      // Check that the returned credits match the expected values
      for (let i = 0; i < 5; i++) {
        expect(result[i].movieId).toEqual(i.toString());
        expect(result[i].title).toEqual(`Title ${i}`);
        expect(result[i].cast.length).toEqual(1);
        expect(result[i].cast[0].name).toEqual('Actor 1');
        expect(result[i].crew.length).toEqual(1);
        expect(result[i].crew[0].job).toEqual('Job 1');
        expect(result[i].crew[0].name).toEqual('Person 1');
      }
    });
  });
});
