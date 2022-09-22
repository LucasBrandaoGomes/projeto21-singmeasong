import supertest from "supertest";
import { createNewSong } from "../factories/newSongFactory";
import { create15Recommendations } from "../factories/scenarioFactory";
import app from "../src/app";
import { prisma }  from "../src/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`

})

describe("Test route GET /recommendations", () => {
    it("Returning 10 recommendations",async () => {
        await create15Recommendations()
        const result = await supertest(app).get('/recommendations')
        expect(result.status).toBe(200)
        expect(result.body.length).toEqual(10)
        expect(result.body[0].id).toEqual(15)
        expect(result.body[9].id).toEqual(6)
        
    })
})

describe("Test route GET /recommendations/:id", () => {
    it("Returning one recomendation, by ID, return status 200",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const createdSong = await prisma.recommendation.findUnique({where: {name:newSong.name}});
        const { id } = createdSong
        const result = await supertest(app).get(`/recommendations/${id}`)

        expect(result.status).toBe(200)
        
    })

    it("Trying to rReturning one recomendation, by invalid ID, return status 404",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).get(`/recommendations/2`)

        expect(result.status).toBe(404)
        
    })
})

afterAll( async () => {
    await prisma.$disconnect()
})
