import { CreditsModel } from "../mongoose/Credits.model";
import { Credits } from "./Credits";


export class CreditsRepository {
  constructor(private creditsModel = CreditsModel) {}

  async findByMovieId(movieId: string): Promise<Credits> {
    
      const creditsDoc = await this.creditsModel.findOne({ movie_id: movieId }).exec();
      if (!creditsDoc) {
          throw new Error(`Credits not found for movie ID ${movieId}`);
      }

      const cast = creditsDoc.cast.map((castDoc) => {
          return {
            castId: castDoc.castId,
            name: castDoc.name,
          };
        });
    
        const crew = creditsDoc.crew.map((crewDoc) => {
          return {
            crewId: crewDoc.crewId,
            name: crewDoc.name,
            job: crewDoc.job,
          };
        });
    
        const credits = new Credits(
          creditsDoc.movieId,
          creditsDoc.title,
          cast,
          crew,
        );
    
        return credits;
      
  }
}
