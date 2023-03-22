import mongoose, { Document } from 'mongoose';
import { CreditsType } from '../interfaces/ICredits';
import { Credits } from './Credits';

export interface CreditsDocument extends CreditsType, Document {}

export class CreditsRepository {
  async findById(id: string): Promise<Credits | null> {
    const doc = await CreditsModel.findById(id).exec();
    if (!doc) {
      return null;
    }
    return Credits.fromDocument(doc.toObject());
  }

  async save(credits: Credits): Promise<Credits> {
    const doc = new CreditsModel({
      movieId: credits.movieId,
      title: credits.title,
      cast: credits.cast,
      crew: credits.crew,
    });
    await doc.save();
    return Credits.fromDocument(doc.toObject());
  }
}

const CastSchema = new mongoose.Schema({
  castId: { type: Number, required: true },
  name: { type: String, required: true },
});

const CrewSchema = new mongoose.Schema({
  crewId: { type: Number, required: true },
  job: { type: String, required: true },
  name: { type: String, required: true },
});

const CreditsSchema = new mongoose.Schema<CreditsDocument>({
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  cast: { type: [CastSchema], required: true },
  crew: { type: [CrewSchema], required: true },
});

export const CreditsModel = mongoose.model<CreditsDocument>(
  'Credits',
  CreditsSchema
);
