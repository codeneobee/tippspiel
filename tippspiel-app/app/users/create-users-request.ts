
export class CreateUsersRequest {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    static fromObject(rawObject: any) {
        if (!rawObject.name) throw new Error('username is missing')

        if(!rawObject.email) throw new Error('email is missing')

        if(!rawObject.password) throw new Error('password is missing')

        return new CreateUsersRequest(
            rawObject.name,
            rawObject.email,
            rawObject.password
        )
    }
}
