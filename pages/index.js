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
        const response = await fetch(`${apiUrl}get-product-access?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.access) {
            router.push("/product");
        }
        else {
            router.push("/payment");
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
