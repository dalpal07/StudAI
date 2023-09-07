import {
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

function Product(props) {
    const sub = useSelector(selectSub);
    if (sub) {
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