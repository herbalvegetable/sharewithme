import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('NEXTAUTH', user); // displays in vscode terminal

            /*
            ! IMPORTANT
            1. when user logs in with google, check if user stored in mongodb
            1.1. IF NOT, on google login, redirect to second login form page, asking to create new username - each username MUST be unique
            1.2. IF YES, login completed, redirect to home page
            */

            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
    secret: process.env.JWT_SECRET,
})