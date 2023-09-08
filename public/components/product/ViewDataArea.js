import {HeightSpacer} from "@/public/components/common/Spacers";
import UndoRedo from "@/public/components/product/UndoRedo";
import ViewData from "@/public/components/product/ViewData";
import ViewDataUtilities from "@/public/components/product/ViewDataUtilities";

export default function ViewDataArea() {
    return (
        <>
            <UndoRedo/>
            <HeightSpacer height={"0.75rem"}/>
            <ViewData/>
            <HeightSpacer height={"0.75rem"}/>
            <ViewDataUtilities/>
        </>
    )
}