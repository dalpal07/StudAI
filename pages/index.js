import {Box, styled} from "@mui/material";
import NavBar from "@/public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import Product from "@/pages/Product";
import Intro from "@/pages/Intro";

const OuterBox = styled(Box) ({
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.3125rem",
    background: "#EEE",
});

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
