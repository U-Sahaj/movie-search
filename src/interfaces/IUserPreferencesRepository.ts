import { UserPreferences } from "../model/UserPreferences";

export interface UserPreferencesRepository {
  getUserPreferences(userId: number): Promise<UserPreferences | undefined>;
  saveUserPreferences(userPreferences: UserPreferences): Promise<void>;
}
