import supertest from "supertest";
import { createNewSong } from "../factories/newSongFactory";
import app from "../src/app";
import { prisma }  from "../src/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
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
    
    it("Trying to insert an existing song but  with a diferent name ,return status 201",async () => {
        const newSong = await createNewSong()
        await supertest(app).post('/recommendations').send(newSong);
        const result = await supertest(app).post('/recommendations').send({name: "Other", youtubeLink: newSong.youtubeLink});
        const createdSong = await prisma.recommendation.findUnique({where: {name:"Other"}});

        expect(result.status).toBe(201)
        expect(createdSong).not.toBeNull()

    })
    

    it("Trying to insert a new song with empty object,return status 422",async () => {
        const newSong = await createNewSong()
        const result = await supertest(app).post('/recommendations').send({});
    
        expect(result.status).toBe(422)
    })
});

