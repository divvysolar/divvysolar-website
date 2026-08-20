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
                password: { label: "Password", type: "password" },
                portal: { label: "Portal", type: "text" }
            },
            async authorize(credentials) {
                console.log("Authorize called with credentials:", credentials);
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }
                
                if (!credentials?.portal) {
                    throw new Error('Invalid login request: Portal information is missing');
                }

                await connectToDatabase();

                const admin = await Admin.findOne({ 
                    email: { $regex: new RegExp(`^${credentials.email.trim()}$`, 'i') } 
                }).select('+password');

                if (!admin) {
                    throw new Error('No user found with this email');
                }
                
                const isMatch = await admin.matchPassword(credentials.password);

                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                const role = admin.role || admin._doc?.role || 'admin';

                // Enforce portal-specific role checks
                if (credentials.portal === "sales" && role !== "salesperson") {
                    throw new Error('Access denied: Sales Portal is restricted to salesperson accounts');
                }
                if (credentials.portal === "admin" && role !== "admin") {
                    throw new Error('Access denied: Admin Panel is restricted to admin accounts');
                }

                return { 
                    id: admin._id.toString(), 
                    name: admin.name, 
                    email: admin.email,
                    role: role,
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
                token.role = user.role;
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
