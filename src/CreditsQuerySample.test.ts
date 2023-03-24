import mongoose, { Connection } from 'mongoose';
import { test, expect, assert, describe, beforeAll, afterAll, it } from 'vitest';
import { CreditsModel, IMovieDocument, MovieModel } from './CreditsQuerySample';

describe('Movies', () => {
    let connection: mongoose.Connection;
  
    beforeAll(async () => {
      // Connect to MongoDB in memory
      connection = await mongoose.createConnection('mongodb://localhost:27017/MoviesDB'); 
    });
  
    afterAll(async () => {
      // Disconnect and close the MongoDB connection
      await connection.close();
    });

    it('should find movies acted by "Actor1" or "Actor2" or directed by "Director1" or "Director2"', async () => {
  
        const result: IMovieDocument[] = await MovieModel.find({
            $or: [
              { "cast.name": { $in: ["Sam Worthington", "Johnny"] } },
              { "crew.name": { $in: ["Gore Verbinski"] }, "crew.job": "Director" }
            ],
        });

      

console.log(`CreditsQuerySample.test result: ${result}`)    
        // Expect the correct movies to be found
        expect(result).toHaveLength(2);
        expect(result.map(movie => movie.title)).toContain('Avatar');
        expect(result.map(movie => movie.title)).toContain('Pirates of the Caribbean: At World\'s End');
  
    })
    

    it('should return movies with specified actors or directors', async () => {
      // Insert simplified data into the database
      await MovieModel.insertMany([
        {
          title: 'Avatar',
          cast: [
            {
              name: 'Sam Worthington'
            },
            {
              name: 'Zoe Saldana'
            }
          ],
          crew: [
            {
              name: 'Stephen E. Rivkin',
              job: 'Editor'
            },
            {
              name: 'Rick Carter',
              job: 'Production Design'
            }
          ]
        },
        {
          title: "Pirates of the Caribbean: At World's End",
          cast: [
            {
              name: 'Johnny Depp'
            },
            {
              name: 'Orlando Bloom'
            }
          ],
          crew: [
            {
              name: 'Dariusz Wolski',
              job: 'Director of Photography'
            },
            {
              name: 'Gore Verbinski',
              job: 'Director'
            }
          ]
        }
      ]);
    
      // Query the database for movies with specified actors or directors
      const movies = await MovieModel.find({
        $or: [
          { 'cast.name': { $in: ['Sam Worthington'] } },
          { 'crew.name': { $in: ['Gore Verbinski'] }, 'crew.job': 'Director' }
        ]
      });
    
      // Expect the query to return two movies
      expect(movies.length).toEqual(2);
      expect(movies.map(movie => movie.title)).toContain('Avatar');
      expect(movies.map(movie => movie.title)).toContain('Pirates of the Caribbean: At World\'s End');

    });

    it.only('should return movies with specified actors or directors', async () => {
    
      // Query the database for movies with specified actors or directors
      const movies = await CreditsModel.find({
        $or: [
          { 'cast.name': { $in: ['Sam Worthington'] } },
          { 'crew.name': { $in: ['Gore Verbinski'] }, 'crew.job': 'Director' }
        ]
      });
    
      // Expect the query to return two movies
      expect(movies.length).toEqual(2);
      expect(movies.map(movie => movie.title)).toContain('Avatar');
      expect(movies.map(movie => movie.title)).toContain('Pirates of the Caribbean: At World\'s End');

    });


})  