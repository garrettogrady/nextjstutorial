import type { NextAuthConfig } from 'next-auth';
import {User} from "@/app/lib/definitions";

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: "/register/creator",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const userType = auth?.user?.type;
            console.log("userType: " + userType);
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnCreatorPage = nextUrl.pathname.startsWith('/creator');
            const isOnBusinessPage = nextUrl.pathname.startsWith('/business');
            const isOnProfilePage = nextUrl.pathname.endsWith('/profile');
            const isOnRegisterPage = nextUrl.pathname.startsWith('/register');
            const isOnboardPage = nextUrl.pathname.startsWith('/onboard');

            if (isOnRegisterPage || isOnboardPage) {
                return true;
            }

            if (userType === 'business') {
                if (isOnBusinessPage){
                    if (isOnProfilePage && isLoggedIn) {
                        return Response.redirect(new URL('/business/profile/'+auth?.user?.id, nextUrl));
                    }
                    if (isLoggedIn) return true;
                    return false;
                } else {
                    return Response.redirect(new URL('/business/promotions', nextUrl));

                }

            } else if (userType === 'creator' ) {
                if( isOnCreatorPage) {
                    if (isOnProfilePage && isLoggedIn) {
                        return Response.redirect(new URL('/creator/profile/'+auth?.user?.id, nextUrl));
                    }
                    if (isLoggedIn) return true;
                    return false;
                } else {
                    return Response.redirect(new URL('/creator/promotions', nextUrl));
                }
            }
            // if (isOnDashboard) {
            //     if (isOnProfilePage && isLoggedIn) {
            //         return Response.redirect(new URL('/dashboard/profile/'+auth?.user?.id, nextUrl));
            //     }
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }

        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
                token.type = (user as User).type;
            }
            return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            //session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.type = token.type;
            return session;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;