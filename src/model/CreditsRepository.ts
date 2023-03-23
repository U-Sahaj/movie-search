import { Collection } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import Credit from './Credits';
import { ICredit } from './types/ICredit';

export class CreditsRepository {

  constructor(private readonly connectionString: string) {
      this.connectionString = connectionString
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.connectionString);
}

  public async findByMovieId(movieId: string):Promise<ICredit>{
    const credit: ICredit = await Credit.findOne({movie_id: movieId}) as unknown as ICredit;
    return credit
  }

}