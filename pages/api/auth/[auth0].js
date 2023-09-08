// pages/api/auth/[auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    signup: async (req, res) => {
        console.log("signup");
        try {
            await handleLogin(req, res, {
                authorizationParams: {
                    screen_hint: 'signup',
                },
            });
        } catch (error) {
            res.status(error.status || 400).end(error.message);
        }
    }
});