import { Document, Schema } from 'mongoose';
import { CastType, CreditsType, CrewType } from '../interfaces/ICredits';

export interface ICreditsDocument extends CreditsType, Document {
}

const CastSchema = new Schema<CastType>({
  castId: { type: Number, required: true },
  name: { type: String, required: true },
});

const CrewSchema = new Schema<CrewType>({
  crewId: { type: Number, required: true },
  job: { type: String, required: true },
  name: { type: String, required: true },
});

const CreditsSchema = new Schema<ICreditsDocument>({
  movieId: { type: String, required: true , alias: 'movie_id'},
  title: { type: String, required: true },
  cast: { type: [CastSchema], required: true },
  crew: { type: [CrewSchema], required: true },
});

export default CreditsSchema
