import { MongoClient, ObjectId } from "mongodb";
import { UserPreferences } from "../model/UserPreferences";

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);


async function loadUserPreferences(id: number): Promise<UserPreferences[] | null> {
  try {
    await client.connect();

    const db = client.db('movie-search');

    const cursor = db.collection('credits').find();
    const userPreferences = await cursor.toArray();
    const mappedUserPreferences = userPreferences.map(up => new UserPreferences(up as { 
      userId: number; 
      preferred_languages: { [key: number]: string };
      favourite_actors: { [key: number]: string };
      favourite_directors: { [key: number]: string };
      _id: ObjectId;
    }));
        
    return mappedUserPreferences;

  } finally {
    await client.close();
  }
}
