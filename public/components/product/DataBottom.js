import {DataBottomBox, DataBoxBottomLeft, DataBoxBottomRight, DataSetEditedBox} from "@/public/components/common/Boxes";
import Image from "next/image";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {WhiteBoldText} from "@/public/components/common/Typographies";
import {useSelector} from "react-redux";
import {selectFileEdited} from "@/slices/fileSlice";

export default function DataBottom(props) {
    const edited = useSelector(selectFileEdited(props.name));
    return (
        <DataBottomBox>
            <DataBoxBottomLeft>
                {
                    edited ?
                        <DataSetEditedBox>
                            <Image src={"./images/WhiteFavicon.svg"} alt={"WhiteFavicon"} width={15} height={14}/>
                            <WidthSpacer width={"0.25rem"}/>
                            <WhiteBoldText size={"0.75rem"}>Edited</WhiteBoldText>
                        </DataSetEditedBox>
                        :
                        <></>
                }
            </DataBoxBottomLeft>
            <DataBoxBottomRight>
                <Image src={"./images/Download.svg"} alt={"Download"} width={15} height={15}/>
                <WidthSpacer width={"0.5rem"}/>
                <Image src={"./images/Delete.svg"} alt={"Delete"} width={15} height={15}/>
            </DataBoxBottomRight>
        </DataBottomBox>
    )
}