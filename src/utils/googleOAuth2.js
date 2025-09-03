import { OAuth2Client } from 'google-auth-library';
import path from 'node:path';
import { readFile } from 'fs/promises';

import { env } from './env.js';
import createHttpError from 'http-errors';


const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');


const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
    clientId: env('GOOGLE_AUTH_CLIENT_ID'),
    clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
    redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateAuthUrl = () =>
    googleOAuthClient.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    });

export const validateCode = async (code) => {

    try {
        const response = await googleOAuthClient.getToken(code)

        if (!response.tokens.id_token) {
            throw createHttpError(401, "Unauthorized")
        }
        //sahte token kontrolü
        const ticket = await googleOAuthClient.verifyIdToken({
            idToken: response.tokens.id_token
        })

        return ticket
    } catch (error) {
        throw createHttpError(500, "Failed"+ error.message)
    }
}

export const getFullNameFromGoogleTokenPayload = (payload) => {

    if (!payload) return "Guest"

    // ad kontrolü

    if (payload.name) return payload.name

    if (payload.given_name && payload.family_name) {
        return `${payload.given_name} ${payload.family_name}`;
    }

    if(payload.given_name) return payload.given_name

    return "Guest"


}