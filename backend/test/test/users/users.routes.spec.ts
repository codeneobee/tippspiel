import {User, UserDocument, Users} from "../../../app/users/user.schema";
import {app} from "../../../app/app";
import supertest from "supertest";

const request = supertest(app);

describe('UserRoutes', () => {
    describe('POST /users', () => {
        it('should create a user on post of user', async (done) => {
            //given
            const body = {
                email: "test@test.com",
                password: "testpassword"
            }
            //when
            const response = await request
                .post('/v1/users')
                .send(body)
            //then
            const savedUsers: UserDocument[] = await Users.find({}).exec();

            expect(savedUsers).toHaveLength(1);
            expect(response.status).toEqual(201);
            expect(response.body.message).toEqual('Signup successful');
            expect(response.body.user._id).toEqual(savedUsers[0].id);
            expect(response.body.user.email).toEqual("test@test.com");
            done();
        });

        it('should return 400 error if request is malformed', async (done) => {
            //given
            const body = {
                email: "test@test.com",
            }
            //when
            const response = await request
                .post('/v1/users')
                .send(body)
            //then
            expect(response.status).toEqual(400)
            done();
        });
    });

    describe('POST /users/login', () => {
        beforeEach(async () => {
            const user: User = {
                email: 'test@test.com',
                password: 'testP4ssword'
            }
            await new Users(user).save();
        });

        it('should return token for valid user', async () => {
            const email = 'test@test.com';
            const password = 'testP4ssword';
            const response = await request
                .post('/v1/users/login')
                .send({email, password});


            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Login successful');
            expect(response.body.token).not.toBeFalsy()
        });
        it('should return error if password is false', async () => {
            const email = 'test@test.com';
            const password = 'wrongP4ssword';

            const response = await request
                .post('/v1/users/login')
                .send({email, password});

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Password is incorrect')
        });
        it('should return error if email is false', async () => {
            const email = 'wrong@test.com';
            const password = 'testP4ssword';

            const response = await request
                .post('/v1/users/login')
                .send({email, password});

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Email is incorrect')
        });
    })
});
