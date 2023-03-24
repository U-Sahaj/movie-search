import mongoose, { Document } from 'mongoose';
import { test, expect, assert, describe, beforeAll, afterAll, it } from 'vitest';

// define the schema for the "movies" collection
interface IMovie extends Document {
  title: string;
  cast: { cast_id: number; name: string }[];
  crew: { id: number; job: string; name: string }[];
}

// define the schema for the "details" collection
interface IMovieDetails extends Document {
  id: string;
  original_language: string;
}

// connect to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/movie-search');

// create the Mongoose models for the "movies" and "details" collections
const Movie = mongoose.model<IMovie>('movies', new mongoose.Schema({
  title: String,
  cast: [{ cast_id: Number, name: String }],
  crew: [{ id: Number, job: String, name: String }]
}));

const MovieDetails = mongoose.model<IMovieDetails>('details', new mongoose.Schema({
  id: String,
  original_language: String
}));

// perform the query to find all movies
const query = {
  $and: [
    {
      $or: [
        { 'cast.name': 'bruce lee' },
        { 'cast.name': 'michael' },
        { $and: [{ 'crew.job': 'Director' }, { $or: [{ 'crew.name': 'Stephen' }, { 'crew.name': 'Director2' }] }] }
      ]
    },
    { $or: [{ 'details.original_language': 'en' }, { 'details.original_language': 'es' }] }
  ]
};

const projection = { title: 1 };


describe('find movies', () => {
    it.only('should some movies', async () => {
      
        Movie.find(query, projection, (error: any, movies: any) => {
            if (error) {
              console.error(error);
              return;
            }
            
            console.log(movies);
          });
          
      
    },10000);
})
