import {useUser} from "@auth0/nextjs-auth0/client";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectSub} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {getSaved} from "@/slices/fileSlice";
import {useEffect} from "react";
import NavBar from "@/public/components/NavBar";

export default function PageWrapper(WrappedPage, RequireAuth = false) {
    return function Page(props) {
        const {user, error, isLoading} = useUser();
        const sub = useSelector(selectSub);
        const dispatch = useDispatch();
        useEffect(() => {
            if (!isLoading && !error) {
                if (user && !sub) {
                    dispatch(getUser({sub: user.sub, name: user.name}));
                    dispatch(getSubscription({id: user.sub}));
                    dispatch(getSaved({id: user.sub}));
                }
                if (!user && sub) {
                    dispatch(getUser({sub: null, name: null}));
                    dispatch(getSubscription({id: null}));
                }
                if (RequireAuth && !user) {
                    window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(
                        window.location.pathname
                    )}`;
                }
            }
        }, [user, error, isLoading])
        return (
            <>
                <NavBar/>
                <WrappedPage {...props} />
            </>
        )
    }
}