import mongoose from "mongoose";
import { CreditsModel } from "../mongoose/Credits.model";

// connect to MongoDB
mongoose.connect('mongodb://localhost/movie-search');

// define a function to load CreditsModel data from the database
async function loadCreditsModelData() {
  try {
    // find all CreditsDocuments in the database
    const credits = await CreditsModel.find().exec();
    console.log(credits);
  } catch (error) {
    console.error(error);
  } finally {
    // disconnect from MongoDB
    mongoose.disconnect();
  }
}

// call the function to load the data
loadCreditsModelData();
