import supertest from "supertest";
import { createNewSong } from "../factories/newSongFactory";
import app from "../src/app";
import { prisma }  from "../src/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`
})

describe("Test route POST /recommendations", () => {
    it("Insert a new song, return status 201",async () => {
        const newSong = await createNewSong()
        const result = await supertest(app).post('/recommendations').send(newSong);
    
        const createdSong = await prisma.recommendation.findUnique({where: {name:newSong.name}});
        expect(result.status).toBe(201)
        expect(createdSong).not.toBeNull()
    })

    it("Trying to insert a new song with a registered name,return status 409",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).post('/recommendations').send(newSong);

        expect(result.status).toBe(409)
    })
    
    it("Trying to insert an existing song but with a diferent name ,return status 201",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).post('/recommendations').send({name: "Other", youtubeLink: newSong.youtubeLink});
        const createdSong = await prisma.recommendation.findUnique({where: {name:"Other"}});

        expect(result.status).toBe(201)
        expect(createdSong).not.toBeNull()

    })
    
    it("Trying to insert a new song with empty object,return status 422",async () => {
        const result = await supertest(app).post('/recommendations').send({});
    
        expect(result.status).toBe(422)
    })
});

describe("Test route POST /recommendations/:id/upvote", () => {
    it("Increasing score , return status 200",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const createdSong = await prisma.recommendation.findUnique({where: {name:newSong.name}});
        const {id, score} = createdSong

        const result = await supertest(app).post(`/recommendations/${id}/upvote`).send(newSong);
        const scoreUpdate = await prisma.recommendation.findUnique({where: {name:newSong.name}});

        expect(result.status).toBe(200)
        expect(scoreUpdate.score).toEqual(score+1)
    })

    it("Trying to upvote in a unregistered song, return status 404",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).post(`/recommendations/2/upvote`).send(newSong);

        expect(result.status).toBe(404)
    })
})

describe("Test route POST /recommendations/:id/downvote", () => {
    it("Increasing score , return status 200",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const createdSong = await prisma.recommendation.findUnique({where: {name:newSong.name}});
        const {id, score} = createdSong

        const result = await supertest(app).post(`/recommendations/${id}/downvote`).send(newSong);
        const scoreUpdate = await prisma.recommendation.findUnique({where: {name:newSong.name}});

        expect(result.status).toBe(200)
        expect(scoreUpdate.score).toEqual(score-1)
    })

    it("Trying to downvote in a unregistered song, return status 404",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).post(`/recommendations/2/upvote`).send(newSong);

        expect(result.status).toBe(404)
    })
})

afterAll( async () => {
    await prisma.$disconnect()
})