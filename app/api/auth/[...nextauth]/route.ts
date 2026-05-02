import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {verifyPassword} from '@/lib/auth/password'
import pool from "@/lib/db"
const dummyHash = '$argon2id$v=19$m=65536,t=3,p=4$dummysaltdummysaltdummy$dummyhashvaluedummyhashvaluedummy'
export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;
            const result = await pool.query('select id, username, hash from users where username = $1', [credentials.username]);
            const user = result.rows[0];
            const valid = await verifyPassword(user?.hash??dummyHash, credentials.password).catch(()=>false)

            if(!user || !valid) return null;
            return {id:String(user.id), name:user.username}
            }}),


  ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt' as const,
        maxAge: 60 * 30,
        updateAge: 60 * 15
    },
    pages: {signIn: '/login'},
}

const handler = NextAuth(authOptions);
export const GET = handler
export const POST = handler
