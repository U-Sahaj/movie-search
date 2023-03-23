// import { CastType, CreditsType, CrewType } from "../interfaces/ICredits";
import { model, Schema } from 'mongoose'
import { ICredit } from "./types/ICredit";
import { ICast } from "./types/ICast";


// export class Cast implements CastType {
//   constructor(
//     public castId: number,
//     public name: string,
//   ) {}

//   public static fromDocument(doc: CastType): Cast {
//     return new Cast(doc.castId, doc.name);
//   }
// }

// export class Crew implements CrewType {
//   constructor(
//     public crewId: number,
//     public job: string,
//     public name: string,
//   ) {}

//   public static fromDocument(doc: CrewType): Crew {
//     return new Crew(doc.crewId, doc.job, doc.name);
//   }
// }

const CastSchema: Schema = new Schema({
  cast_id: {
      type: Number,
  },
  name: {
      type: String,
  }
})

const creditSchema: Schema = new Schema({
  movie_id: {
      type: String,
      required: true
  },

  title: {
      type: String,
      required: true
  },
  cast: {
    type: String,
    required: true
  },

  crew: {
    type: String,
    required: true
  }
})

export default model<ICredit>('Credit', creditSchema)

// export class Credits implements CreditsType {
//   constructor(
//     public movieId: string,
//     public title: string,
//     public cast: string,
//     public crew: string,
//   ) {}
//   // constructor(data: CreditsType) {
//   //   this.movieId = data.movieId ?? '';
//   //   this.title = data.title;
//   //   this.cast = data.cast as CastType[];
//   //   this.crew = data.crew as CrewType[];
//   // }
  
//   // public static fromDocument(doc: CreditsType): Credits {
//   //   const cast = doc.cast.map((castDoc) => Cast.fromDocument(castDoc));
//   //   const crew = doc.crew.map((crewDoc) => Crew.fromDocument(crewDoc));

//   //   return new Credits(doc.movieId, doc.title, cast, crew);
//   // }
// }
