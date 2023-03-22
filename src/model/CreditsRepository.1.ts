import { CreditsModel } from "../mongoose/Credits.model";
import { ICreditsDocument } from "../mongoose/Credits.schema";
import { Cast, Credits, Crew } from "./Credits";

export class CreditsRepository {

    async findByMovieId(movieId: string): Promise<Credits | null> {
        const creditsDoc = await CreditsModel.findOne({ movieId }).exec();
        return creditsDoc ? this.mapToDomain(creditsDoc) : null;
      }
    
      private mapToDomain(doc: ICreditsDocument): Credits {
        return {
          movieId: doc.movieId,
          title: doc.title,
          cast: doc.cast.map(this.mapToCast),
          crew: doc.crew.map(this.mapToCrew),
        };
      }
    
      private mapToCast(doc: Cast): Cast {
        return {
          castId: doc.castId,
          name: doc.name,
        };
      }
    
      private mapToCrew(doc: Crew): Crew {
        return {
          crewId: doc.crewId,
          job: doc.job,
          name: doc.name,
        };
      }
    
    async findAll(): Promise<Credits[]> {
        const creditsDocuments = await CreditsModel.find();
        const credits = creditsDocuments.map((creditsDocument) => {
          const cast = creditsDocument.cast.map((cast) => ({
            castId: cast.castId,
            name: cast.name,
          }));
          const crew = creditsDocument.crew.map((crew) => ({
            crewId: crew.crewId,
            job: crew.job,
            name: crew.name,
          }));
          return new Credits(creditsDocument.movieId, creditsDocument.title, cast, crew);
        });
        return credits;
    }
      

}