import {Box, styled} from "@mui/material";

export const BasicBox = styled(Box)({
    display: "flex",
});
export const StackColumnBox = styled(BasicBox)({
    flexDirection: "column",
});
export const StackRowBox = styled(BasicBox)({
    flexDirection: "row",
});
// index.js
export const OuterBox = styled(StackColumnBox) ({
    borderRadius: "0.3125rem",
    background: "#F2F2F2",
    height: "100vh",
    width: "100%",
    position: "relative",
});
// intro.js
export const InnerBox = styled(StackColumnBox)({
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 0 0",
    alignSelf: "stretch",
    background: "linear-gradient(180deg, #F2F2F2 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
});
export const InnerBox3 = styled(InnerBox)({
    top: -50,
});
// product.js
export const InnerBox2 = styled(StackColumnBox) ({
    marginTop: "3rem",
    padding: "1rem 2rem",
    height: "100%",
});
export const InnerBox4 = styled(InnerBox2) ({
    height: "auto",
});
export const OverlayContainer = styled(BasicBox) ({
    position: "fixed",
    top: 0,
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
});
export const OverlayBox = styled(StackColumnBox) ({
    background: "#F2F2F2",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.30), 0px 0px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
    width: "35rem",
    height: "15rem",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
});
export const VerifyOverlayBox = styled(OverlayBox) ({
    width: "25rem",
    height: "10rem",
    textAlign: "center",
    padding: "0.75rem 1.5rem",
});
export const Spinner = styled(Box) ({
    width: 64,
    height: 64,
    border: "8px solid",
    borderColor: "var(--main-green, #53B753) transparent var(--main-green, #53B753) transparent",
    borderRadius: "50%",
    animation: "spin-anim 1.2s linear infinite",
    marginBottom: "1.5rem",
});
// Chat.js
export const ChatBox = styled(StackColumnBox)({
    minHeight: "15rem",
    maxHeight: "15rem",
    padding: "1.125rem 1.75rem",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "0.5rem",
    flex: "1 0 0",
    borderRadius: "1.25rem",
    border: "1px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    background: "#F2F2F2",
});
export const UpperBox = styled(Box)({
    overflowY: "scroll",
    width: "100%",
    height: "fit-content",
    maxHeight: "100%",
});
export const AssistantChatLine = styled(BasicBox)({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
});
export const UserChatLine = styled(BasicBox)({
    justifyContent: "flex-end",
    alignItems: "flex-end"
});
const ChatMessage = styled(Box)({
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    padding: "0.75rem 1.125rem",
    gap: "0.625rem",
    borderRadius: "1.25rem",
    marginBottom: "0.75rem",
    maxWidth: "60%",
});
export const UserChatMessage = styled(ChatMessage)({
    alignItems: "flex-end",
    background: "#E3E3E3",
    color: "var(--main-black, #3F3636)",
});
export const AssistantChatMessage = styled(ChatMessage)({
    background: "#53B753",
    color: "#F2F2F2",
});

export const BottomBox = styled(BasicBox)({
    width: "100%",
    height: "fit-content",
    alignItems: "top",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
});

export const ChatInputOuterBox = styled(BasicBox)({
    padding: "0.5rem 1rem",
    alignItems: "flex-end",
    borderRadius: "1.25rem",
    background: "#E3E3E3",
    height: "fit-content",
    maxHeight: "5rem",
    overflowY: "scroll",
    width: "100%",
});
// FileContent.js
export const TableContainer = styled(Box)({
    width: "100%",
    height: "100%",
    overflow: "scroll",
});
// NavBar.js
export const NavBox = styled(StackRowBox) (({ismobile}) => ({
    position: "fixed",
    top: 0,
    zIndex: 1,
    width: "100vw",
    boxSizing: "border-box",
    padding: ismobile === true.toString() ? "0.75rem" : "0.75rem 1.75rem",
    alignItems: "center",
    background: "var(--ui-white, #F9F9F9)",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.20), 0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 0px 12px 0px rgba(0, 0, 0, 0.05)",
}));
export const LeftNavBox = styled(StackRowBox) (({ismobile}) => ({
    alignItems: "center",
    justifyContent: "left",
    width: ismobile === true.toString() ? "fit-content" : "50%",
}));

export const RightNavBox = styled(StackRowBox) (({ismobile}) => ({
    alignItems: "center",
    justifyContent: "right",
    flexGrow: 1,
}));
export const HomeBox = styled(StackColumnBox) ({
    borderRadius: "0.3125rem",
    background: "linear-gradient(180deg, #F9F9F9 0%, rgba(242, 242, 242, 0.00) 57.81%, rgba(83, 183, 83, 0.16) 100%)",
    flexShrink: 0,
    height: "300vh",
});

export const HomePage = styled(StackColumnBox) ({
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    height: "100vh",
});

export const HomeTopBox = styled(StackColumnBox) ({
    height: "33%",
});

export const HomeMiddleBox = styled(StackColumnBox) ({
    alignItems: "center",
    justifyContent: "center",
    height: "34%",
});

export const HomeBottomBox = styled(HomeTopBox) ({
    alignItems: "center",
    justifyContent: "flex-end",
});

export const DemoBox = styled(StackColumnBox) (({ismobile}) => ({
    flex: 1,
    margin: ismobile === true.toString() ? "12rem 1rem 12rem 1rem" : "6rem 6rem 0rem 6rem",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.25rem",
    background: "#DCDCDC",
}));

export const ProductBox = styled(StackColumnBox) ({
    width: "100wh",
    maxWidth: "100wh",
    height: "100vh",
    borderRadius: "0.3125rem",
    background: "var(--ui-white, #F9F9F9)",
});
export const ProductInnerBox = styled(StackRowBox) ({
    width: "inherit",
    maxWidth: "inherit",
    height: "inherit",
});
export const MobileProductInnerBox = styled(StackColumnBox) ({
    width: "inherit",
    maxWidth: "inherit",
    height: "inherit",
});
export const DataSetsBox = styled(StackColumnBox) ({
    width: "18rem",
    height: "100%",
    boxSizing: "border-box",
    padding: "1.75rem",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "0rem 0.3125rem 0.3125rem 0rem",
    background: "var(--ui-white, #F9F9F9)",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.20), 0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 0px 12px 0px rgba(0, 0, 0, 0.05)",
});
export const MobileDataSetsBox = styled(DataSetsBox) ({
    width: "100vw",
    height: "fit-content",
    padding: "1rem",
});
export const DataSetsListBox = styled(StackColumnBox) ({
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    overflowY: "auto",
    paddingRight: "1rem",
    flex: "1 0 0",
});
export const MobileDataSetsListBox = styled(StackRowBox) ({
    width: "100vw",
    height: "5rem%",
    overflowX: "auto",
});
export const ContextMenuBox = styled(StackColumnBox) ({
    position: "absolute",
    zIndex: "1",
    padding: "0.75rem",
    justifyContent: "left",
    alignItems: "center",
    display: "none",
    borderRadius: "0.3125rem",
    background: "var(--UI-white, #F9F9F9)",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.35), 0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 10px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.10)",
});
export const DataBox = styled(StackColumnBox) (({greenborder}) => ({
    cursor: "pointer",
    width: "100%",
    height: "fit-content",
    boxSizing: "border-box",
    padding: "0.75rem 1.125rem",
    borderRadius: "0.3125rem",
    border: greenborder === true.toString() ? "2px solid var(--main-green, #53B753)" : "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
}));
export const MobileDataBox = styled(DataBox) (({greenborder}) => ({
    width: "15rem",
}));
export const DataBottomBox = styled(StackRowBox) ({
    width: "100%",
    alignItems: "center",
});
export const DataBoxBottomLeft = styled(StackRowBox) ({
    width: "50%",
    height: "1.5rem",
    justifyContent: "flex-start",
});
export const DataBoxBottomRight = styled(StackRowBox) ({
    width: "50%",
    justifyContent: "flex-end",
});
export const DataSetEditedBox = styled(StackRowBox) ({
    justifyContent: "center",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.3125rem",
    background: "var(--Main-green, #53B753)"
});
export const DataEditorBox = styled(StackColumnBox) ({
    padding: "0rem 1.125rem",
    width: "calc(100% - 18rem - 1.12rem)",
    boxSizing: "border-box",
    alignItems: "center",
    flexGrow: 1,
});
export const MobileDataEditorBox = styled(DataEditorBox) ({
    width: "100vw",
});
export const RequestUtilitiesBox = styled(StackRowBox) ({
    width: "100%",
    boxSizing: "border-box",
});
export const JustifyRightBox = styled(StackRowBox) ({
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "flex-end",
});
export const ViewDataContainer = styled(StackColumnBox) ({
    borderRadius: "0.3125rem",
    border: "1px solid var(--25-black, rgba(28, 26, 26, 0.25))",
    background: "#F0F0F0",
    boxSizing: "border-box",
    justifyContent: "flex-start",
    alignItems: "start",
    alignSelf: "stretch",
    flex: "1 0 0",
    overflow: "scroll",
});
export const ViewDataBox = styled(StackColumnBox) ({
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
});
export const ViewDataUtilitiesBox = styled(StackRowBox) ({
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "flex-end",
});
export const ProfileBox = styled(BasicBox)({
    alignItems: "center",
});
// NoFileContent.js
export const TextBox = styled(StackColumnBox)({
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
});
// Run.js
export const DownloadContainer = styled(StackRowBox) ({
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
});
// beta-announcement.js
export const BetaContainer = styled(StackRowBox) ({
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: "1rem",
});
// Payment.js
export const BannerBox = styled(Box) ({
    backgroundColor: "#53B753",
    transform: "rotate(-45deg)",
    color: "#F2F2F2",
    width: "fit-content",
    padding: "0.25rem",
    position: "absolute",
    top: "1.7rem",
    left: "-0.4rem",
});
export const BannerLeftTriangle = styled(Box) ({
    transform: "rotate(-45deg)",
    width: "fit-content",
    position: "absolute",
    top: "4.2rem",
    left: "-0.65rem",
});
export const BannerRightTriangle = styled(Box) ({
    transform: "rotate(45deg)",
    width: "fit-content",
    position: "absolute",
    top: "-0.89rem",
    left: "4.1rem",
});

export const Line = styled(Box) (({width, height}) => ({
    display: "flex",
    border: "0.5px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    width: width,
    height: height,
}));

export const MenuBox = styled(StackColumnBox) ({
    padding: "1.75rem",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "1.75rem",
    top: "4.5rem",
    borderRadius: "0.3125rem",
    background: "var(--ui-white, #F9F9F9)",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.20), 0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 0px 12px 0px rgba(0, 0, 0, 0.05)",
});
export const HelpBox = styled(StackColumnBox) ({
    width: "25rem",
    minWidth: "fit-content",
    height: "100%",
    borderRight: "2px solid var(--low-opacity-black, rgba(63, 54, 54, 0.25))",
    position: "relative",
});

export const InsideHelpBox = styled(StackColumnBox) ({
    position: "sticky",
    top: 68,
});

export const DataUploadBox = styled(StackColumnBox) ({
    padding: "1.75rem",
    width: "43rem",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.3125rem",
    background: "var(--ui-white, #F9F9F9)",
    boxShadow: "0px 0px 1px 0px rgba(0, 0, 0, 0.35), 0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 10px 0px rgba(0, 0, 0, 0.15), 0px 0px 20px 0px rgba(0, 0, 0, 0.10)",
});

export const DragDropBox = styled(StackColumnBox) (({isdraggingover}) => ({
    width: "100%",
    height: "15rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.3125rem",
    border: "1px dashed var(--25-black, rgba(28, 26, 26, 0.25))",
    backgroundColor: isdraggingover === true.toString() ? '#E0E0E0' : '#F0F0F0'
}));