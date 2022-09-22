import supertest from "supertest";
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
        const { recommendation } = result.body

        expect(result.status).toBe(200)
        expect(recommendation.length).toEqual(10)
        expect(recommendation[0].id).toEqual(5)
        expect(recommendation[9].id).toEqual(15)
        
    })
})

afterAll( async () => {
    await prisma.$disconnect()
})