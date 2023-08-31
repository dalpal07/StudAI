import {useEffect, useState} from "react";
import {
    ProductBox,
    ProductInnerBox,
} from "@/public/components/common/Boxes";
import {HeightSpacer, WidthSpacer} from "@/public/components/common/Spacers";
import PageWrapper from "@/public/components/Wrappers/PageWrapper";
import {useSelector} from "react-redux";
import {selectProductAccess} from "@/slices/subscriptionSlice";
import {selectDataProcessing} from "@/slices/dataSlice";
import DataSets from "@/public/components/product/DataSets";
import DataEditor from "@/public/components/product/DataEditor";

function Product() {
    const productAccess = useSelector(selectProductAccess);
    const dataProcessing = useSelector(selectDataProcessing);
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (document.getElementById("inner")) {
            if (disabled) {
                document.getElementById("inner").style.setProperty("opacity", "0.5")
                document.body.style.setProperty("overflow", "hidden")
            } else {
                document.getElementById("inner").style.setProperty("opacity", "1")
                document.body.style.setProperty("overflow", "auto")
            }
        }
    }, [disabled])
    useEffect(() => {
        if (dataProcessing) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [dataProcessing])
    if (productAccess) {
        return (
            <ProductBox>
                <HeightSpacer height={"5rem"}/>
                <ProductInnerBox>
                    <DataSets/>
                    <WidthSpacer width={"1.12rem"}/>
                    <DataEditor/>
                </ProductInnerBox>
                <HeightSpacer height={"1.12rem"}/>
            </ProductBox>
        )
    }
}

// <OuterBox>
//     <InnerBox2 id={"inner"}>
//         <HeightSpacer height={"1rem"}/>
//         <StackRowBox style={{width: "100%", height: "100%"}}>
//             <HelpBox style={{width: "15rem"}}>
//                 <BoldText size={"1.25rem"}>Saved Files:</BoldText>
//                 <HeightSpacer height={"1.5rem"}/>
//                 {saved && saved.length > 0 ? saved.map((file, index) => {
//                     return (
//                         <StackColumnBox key={index}>
//                             <StackRowBox style={{alignItems: "center"}}>
//                                 <BoldText>{file}</BoldText>
//                                 <WidthFlexSpacer/>
//                                 <DefaultButton onClick={() => openFile(file)}
//                                                style={{padding: "0"}}>Open</DefaultButton>
//                                 <WidthSpacer width={"1rem"}/>
//                             </StackRowBox>
//                             <HeightSpacer height={"1rem"}/>
//                         </StackColumnBox>
//                     )
//                 }) : ""}
//             </HelpBox>
//             <WidthSpacer width={"2rem"}/>
//             <StackColumnBox style={{width: "100%", height: "100%"}}>
//                 <Run disabled={disabled}
//                      extraFiles={extraFiles}/>
//                 <HeightSpacer height={"1rem"}/>
//                 <FileUpload disabled={disabled}
//                             handleFileChange={handleFileChange}/>
//                 <HeightSpacer height={"1.5rem"}/>
//                 <LowerChat disabled={disabled} extraFiles={extraFiles}
//                            setExtraFiles={setExtraFiles}/>
//                 <HeightSpacer height={"1.5rem"}/>
//                 <Script/>
//             </StackColumnBox>
//         </StackRowBox>
//         <HeightSpacer height={"1.5rem"}/>
//         <Footer/>
//     </InnerBox2>
//     <Loading/>
// </OuterBox>

export default PageWrapper(Product, true, true);