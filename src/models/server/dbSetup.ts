import { db } from "../name";
import createAnwerCollection from "./answer.collection";
import createCommentCollection from "./comments.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db)
    console.log("Database connected")
  } catch (error) {
    try {
      await databases.create(db, db)
      console.log("Database created")

      await Promise.all([
        createQuestionCollection(),
        createAnwerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ])

      console.log("Collection created succesfully")
      console.log("Database connected")

    } catch (error) {
      console.log("Error creating databases or collection", error)
    }
  }

  return databases
}