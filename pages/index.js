import NavBar from "../public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import {InnerBox, OuterBox} from "../public/components/common/Boxes";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const { user, isLoading, error } = useUser();
    const router = useRouter();

    const getUserStatus = async (user) => {
        const apiUrl = `/api/user/`;
        const queryParams = new URLSearchParams({ id: user.sub });
        const response = await fetch(`${apiUrl}get-subscription-type?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            const subscription = await response.json();
            if (subscription.type === "owner" || subscription.type === "unlimited") {
                router.push("/product");
            }
            else if (subscription.type === "standard" || subscription.type === "free") {
                const response = await fetch(`${apiUrl}get-subscription-requests?${queryParams}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    if ((subscription.type === "standard" && data.requests < 150) || (subscription.type === "free" && data.requests < 50 && data.requests > 0)) {
                        router.push("/product");
                    }
                    else {
                        router.push("/payment");
                    }
                }
            }
            else {
                router.push("/payment");
            }
        }
    }

    useEffect(() => {
        if (!isLoading && !error) {
            if (user) {
                getUserStatus(user)
            } else {
                router.push("/welcome");
            }
        }
    }, [user, isLoading, error]);

    return (
        <OuterBox>
            <NavBar/>
            <InnerBox/>
        </OuterBox>
    )
}
