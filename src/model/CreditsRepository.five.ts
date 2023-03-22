import { Model } from 'mongoose';
import { CreditsType } from '../interfaces/ICredits';
import { ICreditsDocument } from '../mongoose/Credits.schema';
import { Credits } from './Credits';

export class CreditsRepository {
  constructor(private readonly creditsModel: Model<ICreditsDocument>) {}

  async create(credits: Credits): Promise<Credits> {
    const createdCredits = new this.creditsModel(credits);
    await createdCredits.save();
    return createdCredits.toObject() as Credits;
  }

  async findAll(): Promise<Credits[]> {
    const credits = await this.creditsModel.find().lean().exec();
    return credits.map((credits) => credits as Credits);
  }

  async find(limit: number): Promise<Credits[]> {
    const credits = await this.creditsModel.find().limit(limit).lean().exec();
    return credits.map((credits) => credits as Credits);
  }
}
