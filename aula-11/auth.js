import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Autenticar } from "./app/login/actions";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const resultado = await Autenticar(credentials);

                    if (resultado && resultado.id)
                        return resultado;
                    else
                        return null;
                } catch {
                    return null
                }
            }
        })
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            if (!isLoggedIn) {
                if (nextUrl.pathname === '/login/novo')
                    return true;
                return false;
            }

            if (nextUrl.pathname.startsWith('/login'))
                return Response.redirect(new URL('/', nextUrl))

            return true;
        }
    }, 
    pages: { signIn: '/login' }
})
