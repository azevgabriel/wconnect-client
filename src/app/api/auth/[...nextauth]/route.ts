import { authUser } from "@/requests/users/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        console.log("response");

        const response = await authUser(credentials);

        console.log("response", response);

        if (response) {
          const { user, token } = response;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.expires = new Date(
        Date.now() + 60 * 60 * 24 * 1000
      ).toISOString();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/",
    newUser: "/registro",
  },
});

export { handler as GET, handler as POST };
