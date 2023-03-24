import mongoose, { Schema } from "mongoose";

mongoose.connect('mongodb://localhost:27017/' + 'MoviesDB');

// const movieSchema = new mongoose.Schema({
//   movie_id: String,
//   title: String,
//   cast: [{ cast_id: Number, character: String, credit_id: String, gender: Number, id: Number, name: String, order: Number }],
//   crew: [{ credit_id: String, department: String, gender: Number, id: Number, job: String, name: String }]
// });

// const Movie = mongoose.model('Movie', movieSchema);
// Movie.find({}, function(err: Error, movies: IMovieDocument[]) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(movies);
//     }
//   });
  


interface ICast {
  name: string;
}
interface ICastDocument extends ICast, Document {}

interface ICrew {
  name: string;
  job: string;
}
interface ICrewDocument extends ICrew, Document {}

interface IMovie {
  title: string;
  cast: ICast[];
  crew: ICrew[];
}
export interface IMovieDocument extends IMovie, Document {}

const castSchema = new mongoose.Schema<ICast>({
  name: String,
});

const crewSchema = new mongoose.Schema<ICrew>({
  name: String,
  job: String,
});

const movieSchema = new mongoose.Schema<IMovieDocument>({
  title: String,
  cast: [castSchema],
  crew: [crewSchema],
});

export const CastModel = mongoose.model<ICastDocument>('Cast', castSchema);
export const CrewModel = mongoose.model<ICrewDocument>('Crew', crewSchema);
export const MovieModel = mongoose.model<IMovieDocument>('Movie', movieSchema);
export const CreditsModel = mongoose.model<IMovieDocument>('Credit', movieSchema);


