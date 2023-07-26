import NavBar from "@/public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import Product from "@/pages/Product";
import Intro from "@/pages/Intro";
import {OuterBox} from "@/public/components/common/Boxes";

export default function Home() {
    const { user, error, isLoading } = useUser();

    const Page = () => {
        if (user) return (
            <Product/>
        )
        return (
            <Intro/>
        )
    }

    return (
        <OuterBox>
            <NavBar user={user} error={error} isLoading={isLoading}/>
            <Page/>
        </OuterBox>
    )
}
