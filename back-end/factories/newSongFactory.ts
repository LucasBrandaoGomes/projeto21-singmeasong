import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../src/services/recommendationsService";

export async function createNewSong () : Promise <CreateRecommendationData> {
    const urlStart = "https://www.youtube.com/"
    const song = {
      name: faker.random.alphaNumeric(4),
      youtubeLink: urlStart + faker.random.alphaNumeric(15)
    };

    return song;
}