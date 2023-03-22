import mongoose from 'mongoose';
import UserPreferencesSchema, { IUserPreferences } from './UserPreferences.schema';

export default mongoose.model<IUserPreferences>('UserPreferences', UserPreferencesSchema);
