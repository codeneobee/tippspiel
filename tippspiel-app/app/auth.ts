import jwt from 'express-jwt'
import express from 'express'

function getTokenFromHeaders(req: express.Request): string {
    const authorization = req.headers.authorization;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1]
    }
    return ''
}

export const auth: any = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms: ['HS256']
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ['HS256']
    }),
};
