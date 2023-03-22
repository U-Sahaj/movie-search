import { Document, Schema } from 'mongoose';

export interface IUserPreferences extends Document {
  userId: number;
  preferredLanguages: { [key: number]: string };
  favouriteActors: { [key: number]: string };
  favouriteDirectors: { [key: number]: string };
}

const UserPreferencesSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  preferredLanguages: { type: Object, required: true },
  favouriteActors: { type: Object, required: true },
  favouriteDirectors: { type: Object, required: true },
});

export default UserPreferencesSchema
