import {DataBottomBox, DataBoxBottomLeft, DataBoxBottomRight, DataSetEditedBox} from "@/public/components/common/Boxes";
import Image from "next/image";
import {WidthSpacer} from "@/public/components/common/Spacers";
import {WhiteBoldText} from "@/public/components/common/Typographies";
import {useDispatch, useSelector} from "react-redux";
import {deleteFile, downloadFile, selectFileEdited, selectFileHistoriesIndex} from "@/slices/fileSlice";
import {HiddenButton} from "@/public/components/common/Buttons";
import {selectSub} from "@/slices/userSlice";

export default function DataBottom(props) {
    const edited = useSelector(selectFileEdited(props.name));
    const fileHistoriesIndex = useSelector(selectFileHistoriesIndex(props.name));
    const sub = useSelector(selectSub);
    const dispatch = useDispatch();
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
                <HiddenButton onClick={() => dispatch(downloadFile({fileName: props.name, historiesIndex: fileHistoriesIndex, id: sub}))}>
                    <Image src={"./images/Download.svg"} alt={"Download"} width={15} height={15}/>
                </HiddenButton>
                <WidthSpacer width={"0.5rem"}/>
                <HiddenButton onClick={() => dispatch(deleteFile({fileName: props.name, id: sub}))}>
                    <Image src={"./images/Delete.svg"} alt={"Delete"} width={15} height={15}/>
                </HiddenButton>
            </DataBoxBottomRight>
        </DataBottomBox>
    )
}