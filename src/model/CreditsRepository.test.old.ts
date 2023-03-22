import mongoose from 'mongoose';
import { assert, test, describe, it} from 'vitest'
import { CreditsModel } from '../mongoose/Credits.model';
import { CreditsRepository } from './CreditsRepository';

const uri = "mongodb://localhost:27017/movie-search";
const conn = mongoose.createConnection(uri);
    
// test('loads credits data from MongoDB', async () => {
//     const repository = new CreditsRepository(CreditsModel);
//     const credits = await repository.findByMovieId('19995');
//     assert(credits.title === 'Avatar');
//     assert(credits.cast.length === 8);
//     assert(credits.crew.length === 8);
// });


const testSuite = {
    setup: async () => {
      await conn;
    },
    teardown: async () => {
      await conn.close();
    },
  };
  
export default testSuite;
