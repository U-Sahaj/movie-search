import { MongoClient, ObjectId } from 'mongodb';
import { UserPreferences } from '../model/UserPreferences';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);

async function getUserPreferences(id: number): Promise<UserPreferences | null> {
  try {
    await client.connect();

    const db = client.db('movie-search');
    const collection = db.collection('user-preferences');

    const result = await collection.findOne({ id: new ObjectId(id) });

    if (!result) {
      return null;
    }

    const userPreferences = new UserPreferences(result as { 
      userId: number; 
      preferred_languages: { [key: number]: string };
      favourite_actors: { [key: number]: string };
      favourite_directors: { [key: number]: string };
      _id: ObjectId;});

    return userPreferences;
  } finally {
    await client.close();
  }
}

const prefs = getUserPreferences(100)
console.log(prefs)

