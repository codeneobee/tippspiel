import {CreateUsersRequest} from "../../../app/users/create-users-request";

describe('CreateUsersRequest', () => {
    describe('fromObject', () => {
        it('should create a CreateUserRequest object from the raw object', () => {
            const rawUser = {name: "Test", email: "test@test", password: "testpassword"};
            const user = CreateUsersRequest.fromObject(rawUser);
            expect(user).toEqual(new CreateUsersRequest("Test", "test@test", "testpassword"))
        });

        it('throws error if password is missing', () => {
            const create = () => {
                const rawUser = {name: "Test", email: "test@test"};
                CreateUsersRequest.fromObject(rawUser)
            }
            expect(create).toThrowError(Error('password is missing'))
        })

        it('throws error if username is missing', () => {
            const create = () => {
                const rawUser = {password: "test", email: "test@test"};
                CreateUsersRequest.fromObject(rawUser)
            }
            expect(create).toThrowError(Error('username is missing'))
        })

        it('throws error if email is missing', () => {
            const create = () => {
                const rawUser = {name: "Test", password: "test"};
                CreateUsersRequest.fromObject(rawUser)
            }
            expect(create).toThrowError(Error('email is missing'))
        })
    })
})