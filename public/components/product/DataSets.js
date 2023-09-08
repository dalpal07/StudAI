import {DataSetsBox, MobileDataSetsBox} from "@/public/components/common/Boxes";
import {BoldText, WhiteBoldText} from "@/public/components/common/Typographies";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import DataSetsList from "@/public/components/product/DataSetsList";
import {UploadDataSetButton} from "@/public/components/common/Buttons";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {setDataUpload} from "@/slices/dataSlice";
import {selectProductAccess} from "@/slices/subscriptionSlice";
import {useMediaQuery} from "@mui/material";
export default function DataSets() {
    const dispatch = useDispatch();
    const productAccess = useSelector(selectProductAccess);
    const isMobile = useMediaQuery('(max-width:600px)');
    if (isMobile) {
        return (
            <MobileDataSetsBox>
                <BoldText size={"1.125rem"}>My Data Sets</BoldText>
                <HeightSpacer height={"0.5rem"}/>
                <DataSetsList/>
                <HeightSpacer height={"1.12rem"}/>
                <UploadDataSetButton disabled={!productAccess} onClick={() => dispatch(setDataUpload({dataUpload: true}))}>
                    <WhiteBoldText>Upload data set</WhiteBoldText>
                    <WidthSpacer width={"0.5rem"}/>
                    <Image src={"./images/Upload.svg"} alt={"Upload"} width={12} height={10}/>
                </UploadDataSetButton>
            </MobileDataSetsBox>
        )
    }
    return (
        <DataSetsBox>
            <BoldText size={"1.5rem"}>My Data Sets</BoldText>
            <HeightSpacer height={"1.12rem"}/>
            <DataSetsList/>
            <HeightSpacer height={"1.12rem"}/>
            <UploadDataSetButton disabled={!productAccess} onClick={() => dispatch(setDataUpload({dataUpload: true}))}>
                <WhiteBoldText size={"1.125rem"}>Upload data set</WhiteBoldText>
                <WidthSpacer width={"0.5rem"}/>
                <Image src={"./images/Upload.svg"} alt={"Upload"} width={12} height={10}/>
            </UploadDataSetButton>
        </DataSetsBox>
    )
}