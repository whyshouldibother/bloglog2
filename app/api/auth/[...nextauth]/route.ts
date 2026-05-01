import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string }


        if (
          username === process.env.ADMIN_USER &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', name: 'Admin' }
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
      strategy: 'jwt' as const ,
      maxAge: 60*30,
      updateAge: 60*15
  },
  pages: { signIn: '/login' },
}

const handler = NextAuth(authOptions);
export const GET = handler
export const POST = handler
