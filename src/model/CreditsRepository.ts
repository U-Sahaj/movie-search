import { Collection, Db, MongoClient } from 'mongodb';
import { CreditsModel } from '../mongoose/Credits.model';
import { ICreditsDocument } from '../mongoose/Credits.schema';
import { Cast, Credits, Crew } from './Credits';


export class CreditsRepository {
  private client!: MongoClient;
  private creditsCollection!: Collection<ICreditsDocument>;
//   private creditsModel: Model<CreditsDocument>;

  constructor(private readonly connectionString: string, 
              private readonly dbName: string) {}

  public async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.connectionString);
    // this.creditsModel = mongoose.model<CreditsDocument>('Credits', creditsSchema);

    const db = this.client.db(this.dbName);
    this.creditsCollection = db.collection<ICreditsDocument>('credits');
  }

  public async findByMovieId(movieId: string): Promise<Credits | null> {
console.log(`CreditsRepository:findByMovieId() `, CreditsModel)
    const doc = await this.creditsCollection.findOne({ movieId : movieId});
    return doc ? Credits.fromDocument(doc) : null;
  }
  
//   async findAll(): Promise<Credits[]> {
//     const docs = await this.creditsCollection.find().toArray();
//     return docs.map((doc) => {
//       const cast = Cast.fromDocument(doc.cast);
//       const crew = Crew.fromDocument(doc.crew);
//       return new Credits(doc.title, cast, crew);
//     });
//   }
  async findAll(): Promise<Credits[]> {
    const docs = await CreditsModel.find().limit(5).exec();
    return docs.map((doc) => Credits.fromDocument(doc));
  }
    
  public async findById(id: string): Promise<Credits | null> {
console.log(`CreditsRepository:findById() `, CreditsModel)
    const doc = await CreditsModel.findOne({ movieId: id }).exec();
    if (!doc) {
      return null;
    }
    return Credits.fromDocument(doc.toObject());
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }
}
