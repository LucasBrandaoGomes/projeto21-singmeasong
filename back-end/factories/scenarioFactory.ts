import { faker } from "@faker-js/faker";
import { createNewSong } from "./newSongFactory";
import { prisma }  from "../src/database";

export async function create15Recommendations() {
    for(let i=1;i<=15; i++){
        const song = await createNewSong()
        await prisma.recommendation.create({data:song});
    }
}