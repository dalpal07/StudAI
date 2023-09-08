import {
    MobileProductInnerBox,
    ProductBox,
    ProductInnerBox,
} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import DataSets from "@/public/components/product/DataSets";
import DataEditor from "@/public/components/product/DataEditor";
import DisabledWrapper from "@/public/components/Wrappers/DisabledWrapper";
import {useSelector} from "react-redux";
import {selectSub} from "@/slices/userSlice";
import {useMediaQuery} from "@mui/material";

function Product(props) {
    const sub = useSelector(selectSub);
    const isMobile = useMediaQuery('(max-width:600px)');
    if (sub) {
        if (isMobile) {
            return (
                <ProductBox id={props.id}>
                    <HeightSpacer height={"5rem"}/>
                    <MobileProductInnerBox>
                        <DataSets/>
                        <HeightSpacer height={"1rem"}/>
                        <DataEditor/>
                    </MobileProductInnerBox>
                    <HeightSpacer height={"1.5rem"}/>
                </ProductBox>
            )
        }
        return (
            <ProductBox id={props.id}>
                <HeightSpacer height={"5rem"}/>
                <ProductInnerBox>
                    <DataSets/>
                    <WidthSpacer width={"1.12rem"}/>
                    <DataEditor/>
                </ProductInnerBox>
                <HeightSpacer height={"1.5rem"}/>
            </ProductBox>
        )
    }
}

export default DisabledWrapper(PageWrapper(Product, true));