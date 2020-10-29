import {app} from "../../../app/app";
import supertest from "supertest";
import {UserDocument, Users} from "../../../app/users/user.schema";

const request = supertest(app);

describe('UsersController', () => {
    describe('POST /users', () => {
        it('should create a user on post of user', async (done) => {
            //given
            const body = {
                user: {
                    name: "TestUser",
                    email: "test@test.com",
                    password: "testpassword"
                }
            }
            //when
            const response = await request
                .post('/v1/users')
                .send(body)
            //then
            const savedUsers: UserDocument[] = await Users.find({}).exec();

            expect(savedUsers).toHaveLength(1);
            expect(response.status).toEqual(201);
            expect(response.body.user._id).toEqual(savedUsers[0].id);
            expect(response.body.user.email).toEqual("test@test.com");
            expect(response.body.user.token).not.toBeNull();
            done();
        });

        it('should return 400 error if request is malformed', async (done) => {
            //given
            const body = {
                user: {
                    email: "test@test.com",
                    password: "testpassword"
                }
            }
            //when
            const response = await request
                .post('/v1/users')
                .send(body)
            //then
            console.log(response.body)
            await expect(response.status).toEqual(400)
            await expect(response.body.message).not.toBeNull()
            done();
        });
    });
});