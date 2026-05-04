import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("🔐 [AUTH_ATTEMPT]:", credentials?.username);
        
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) return null;

        const { prisma } = await import('@/lib/prisma');
        const bcrypt = await import('bcryptjs');

        // Search by email as it's the unique key in our Prisma schema
        // In our seed we use 'admin@portfolio.com' but users can change it
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: username },
              { name: username }
            ]
          }
        });

        if (user && user.password) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            console.log("✅ [AUTH_SUCCESS]: Session established for", user.email);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        console.log("❌ [AUTH_FAILURE]: Invalid credentials provided");
        return null;
      },
    }),
  ],
});
