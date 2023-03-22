import { ObjectId } from "mongodb";

export class UserPreferences {
  public readonly userId: number;
  public readonly preferredLanguages: string[];
  public readonly favouriteActors: string[];
  public readonly favouriteDirectors: string[];
  public readonly id: ObjectId;

  constructor(data: {
    userId: number;
    preferred_languages: { [key: number]: string };
    favourite_actors: { [key: number]: string };
    favourite_directors: { [key: number]: string };
    _id: ObjectId;
  }) {
    this.userId = data.userId;
    this.preferredLanguages = Object.values(data.preferred_languages);
    this.favouriteActors = Object.values(data.favourite_actors);
    this.favouriteDirectors = Object.values(data.favourite_directors);
    this.id = data._id;
  }
}