import { faker } from "@faker-js/faker";

export async function createNewSong () {
    const song = {
      name: faker.random.alphaNumeric(),
      youtubeLink: "https://www.youtube.com/watch?v=HcBFyVnf-_o"
    };

    return song;
}