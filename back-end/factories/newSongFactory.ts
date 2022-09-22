import { faker } from "@faker-js/faker";
import { CreateRecommendationData } from "../src/services/recommendationsService";

export async function createNewSong () : Promise <CreateRecommendationData> {
    const song = {
      name: faker.random.alphaNumeric(),
      youtubeLink: "https://www.youtube.com/watch?v=HcBFyVnf-_o"
    };

    return song;
}