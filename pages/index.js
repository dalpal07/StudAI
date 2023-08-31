import {
    HomeBox,
    HomeTopBox,
} from "@/public/components/common/Boxes";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import HomeMiddle from "@/public/components/home/HomeMiddle";
import HomeBottom from "@/public/components/home/HomeBottom";

function Home() {
    return (
        <HomeBox>
            <HomeTopBox/>
            <HomeMiddle/>
            <HomeBottom/>
        </HomeBox>
    )
}

export default PageWrapper(Home);