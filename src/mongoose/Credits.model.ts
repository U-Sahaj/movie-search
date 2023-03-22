import mongoose from 'mongoose';
import CreditsSchema, { ICreditsDocument } from './Credits.schema';

export const CreditsModel = mongoose.model<ICreditsDocument>('Credits', CreditsSchema);
