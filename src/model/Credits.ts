import { CastType, CreditsType, CrewType } from "../interfaces/ICredits";


export class Cast implements CastType {
  constructor(
    public castId: number,
    public name: string,
  ) {}

  public static fromDocument(doc: CastType): Cast {
    return new Cast(doc.castId, doc.name);
  }
}

export class Crew implements CrewType {
  constructor(
    public crewId: number,
    public job: string,
    public name: string,
  ) {}

  public static fromDocument(doc: CrewType): Crew {
    return new Crew(doc.crewId, doc.job, doc.name);
  }
}



export class Credits implements CreditsType {
  constructor(
    public movieId: string,
    public title: string,
    public cast: CastType[],
    public crew: CrewType[],
  ) {}
  // constructor(data: CreditsType) {
  //   this.movieId = data.movieId ?? '';
  //   this.title = data.title;
  //   this.cast = data.cast as CastType[];
  //   this.crew = data.crew as CrewType[];
  // }
  
  public static fromDocument(doc: CreditsType): Credits {
    const cast = doc.cast.map((castDoc) => Cast.fromDocument(castDoc));
    const crew = doc.crew.map((crewDoc) => Crew.fromDocument(crewDoc));

    return new Credits(doc.movieId, doc.title, cast, crew);
  }
}
