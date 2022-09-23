import { faker } from "@faker-js/faker";
import { createNewSong } from "./newSongFactory";
import { prisma }  from "../src/database";
import { recommendationService } from "../src/services/recommendationsService";

export async function create15Recommendations() {
    for(let i=1;i<=15; i++){
        const song = await createNewSong()
        await prisma.recommendation.create({data:song});
    }
}

export async function create15RecommendationsDiferentScores() {
    await create15Recommendations();
    for(let i=1;i<=15; i++){
        await recommendationService.upvote(i)
    }
    for(let i=1;i<=10; i++){
        await recommendationService.upvote(i)
    }
    for(let i=1;i<=5; i++){
        await recommendationService.upvote(i)
    }
    for(let i=1;i<=2; i++){
        await recommendationService.upvote(i)
    }
}