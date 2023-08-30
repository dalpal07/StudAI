import {useUser} from "@auth0/nextjs-auth0/client";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectSub} from "@/slices/userSlice";
import {getSubscription, selectProductAccess} from "@/slices/subscriptionSlice";
import {useEffect} from "react";

export default function PageWrapper(WrappedPage, RequireAuth = false, RequireProductAccess = false) {
    return function Page(props) {
        const {user, error, isLoading} = useUser();
        const sub = useSelector(selectSub);
        const productAccess = useSelector(selectProductAccess);
        const dispatch = useDispatch();
        useEffect(() => {
            if (!isLoading && !error) {
                if (user && !sub) {
                    dispatch(getUser({sub: user.sub, name: user.name}));
                    dispatch(getSubscription({id: user.sub}));
                }
                if (!user && sub) {
                    dispatch(getUser({sub: null, name: null}));
                    dispatch(getSubscription({id: null}));
                }
                if (RequireAuth && !user) {
                    window.location.href = "/api/auth/login";
                }
            }
        }, [user, error, isLoading])
        useEffect(() => {
            if (RequireProductAccess && productAccess === false) {
                window.location.href = "/payment";
            }
        }, [productAccess])
        return <WrappedPage {...props} />
    }
}