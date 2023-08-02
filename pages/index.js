import NavBar from "../public/components/NavBar";
import {useUser} from "@auth0/nextjs-auth0/client";
import {OuterBox} from "../public/components/common/Boxes";
import Page from "../public/components/conditionals/Page";

export default function Home() {
    const { user, error, isLoading } = useUser();

    return (
        <OuterBox>
            <NavBar user={user} error={error} isLoading={isLoading}/>
            <Page user={user}/>
        </OuterBox>
    )
}
