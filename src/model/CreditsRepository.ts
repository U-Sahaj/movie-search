import { Collection } from 'mongodb';
import mongoose, { Model } from 'mongoose';
// import * as mongoDB from "mongodb";
import Credit from './Credits';
import { ICredit } from './types/ICredit';

export class CreditsRepository {
  // db!: mongoDB.Db 

  constructor(private readonly connectionString: string, private readonly dbName:string) {
      this.connectionString = connectionString
      this.dbName = dbName;
  }

  public async connect(): Promise<void> {
    // const client: mongoDB.MongoClient = new mongoDB.MongoClient(this.connectionString);
    // await client.connect();
  //  this.db = client.db(this.dbName);
  await mongoose.connect(this.connectionString+this.dbName);
}

  public async findByMovieId(movieId: string):Promise<ICredit>{
    const credit: ICredit = await Credit.findOne({movie_id: movieId}) as unknown as ICredit;
     credit.castDoc = JSON.parse(credit.cast)
     return credit
  }

}