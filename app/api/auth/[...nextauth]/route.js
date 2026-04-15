import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                await connectToDatabase();

                const admin = await Admin.findOne({ email: credentials.email }).select('+password');

                if (!admin) {
                    throw new Error('No admin found with this email');
                }
                
                const isMatch = await admin.matchPassword(credentials.password);

                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                return { 
                    id: admin._id.toString(), 
                    name: admin.name, 
                    email: admin.email 
                };
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = "admin";
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                if (!session.user) {
                    session.user = {};
                }
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
