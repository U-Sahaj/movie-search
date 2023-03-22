export type CastType = {
    castId: number;
    name: string;
}
  
export type CrewType = {
    crewId: number;
    job: string;
    name: string;
}
  
export type CreditsType = {
    movieId: string;
    title: string;
    cast: CastType[];
    crew: CrewType[];
}