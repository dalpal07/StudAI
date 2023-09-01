import {DataSetsBox} from "@/public/components/common/Boxes";
import {BoldText, WhiteBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import DataSetsList from "@/public/components/product/DataSetsList";
import {UploadDataSetButton} from "@/public/components/common/Buttons";
import Image from "next/image";
export default function DataSets() {
    return (
        <DataSetsBox>
            <BoldText size={"1.5rem"}>My Data Sets</BoldText>
            <HeightSpacer height={"1.12rem"}/>
            <DataSetsList/>
            <HeightSpacer height={"1.12rem"}/>
            <UploadDataSetButton>
                <WhiteBoldText size={"1.125rem"}>Upload data set</WhiteBoldText>
                <WidthSpacer width={"0.5rem"}/>
                <Image src={"./images/Upload.svg"} alt={"Upload"} width={12} height={10}/>
            </UploadDataSetButton>
        </DataSetsBox>
    )
}