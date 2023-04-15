import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface User {
      id?: string
      _id: string
  }
};

export const authOptions = {
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        console.log({ credentials });
        return await dbUsers.checkUserEmailPassword(credentials?.email!, credentials?.password!);
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user, ...rest }: any) {
      console.log('nextauth... callbacks-jwt');
      console.log({ token, account, user, rest });
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            const authUser = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
            token.user = authUser;
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log('nextauth... session')
      console.log({session, token});
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    }
  }
} as any;

export default NextAuth(authOptions)
